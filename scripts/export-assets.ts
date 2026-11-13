import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";
import {assets,originalAssets,ornamentAssets,importedAssets} from "../src/lib/catalog.ts";
import {assetOptions,renderAsset} from "../src/lib/svg.ts";
import {crc32} from "../src/lib/export.ts";
import {iconCollections,sourceLicense} from "../src/lib/icon-sources.ts";

function makeDeflatedZip(files:{name:string;content:string}[]):Buffer{
  const local:Buffer[]=[],central:Buffer[]=[];let offset=0;
  for(const file of files){
    const name=Buffer.from(file.name,"utf8"),raw=Buffer.from(file.content,"utf8"),body=zlib.deflateRawSync(raw,{level:9}),crc=crc32(raw);
    const header=Buffer.alloc(30+name.length);
    header.writeUInt32LE(0x04034b50,0);header.writeUInt16LE(20,4);header.writeUInt16LE(0x800,6);header.writeUInt16LE(8,8);header.writeUInt16LE(0x21,12);header.writeUInt32LE(crc,14);header.writeUInt32LE(body.length,18);header.writeUInt32LE(raw.length,22);header.writeUInt16LE(name.length,26);name.copy(header,30);
    const entry=Buffer.alloc(46+name.length);
    entry.writeUInt32LE(0x02014b50,0);entry.writeUInt16LE(20,4);entry.writeUInt16LE(20,6);entry.writeUInt16LE(0x800,8);entry.writeUInt16LE(8,10);entry.writeUInt16LE(0x21,14);entry.writeUInt32LE(crc,16);entry.writeUInt32LE(body.length,20);entry.writeUInt32LE(raw.length,24);entry.writeUInt16LE(name.length,28);entry.writeUInt32LE(offset,42);name.copy(entry,46);
    local.push(header,body);central.push(entry);offset+=header.length+body.length;
  }
  const size=central.reduce((n,b)=>n+b.length,0),end=Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);end.writeUInt32LE(size,12);end.writeUInt32LE(offset,16);
  return Buffer.concat([...local,...central,end]);
}

const root=path.resolve("public/assets");
const originals:{name:string;content:string}[]=[];
for(const asset of originalAssets){const dir=path.join(root,asset.category),content=renderAsset(asset,assetOptions(asset));await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,`${asset.id}.svg`),content);originals.push({name:`${asset.category}/${asset.id}.svg`,content});}
await fs.writeFile(path.join(root,"manifest.json"),JSON.stringify(assets,null,2));
const notice={name:"LICENSE-naqsh.txt",content:"Original Naqsh vectors, including the geometric and botanical ornament constructions, are dedicated under CC0 1.0. They are contemporary constructions inspired by ornament, not historical reproductions."};
await fs.mkdir("public/packs",{recursive:true});
await fs.writeFile("public/packs/ornaments.zip",makeDeflatedZip([...originals.filter(f=>ornamentAssets.some(a=>f.name.endsWith(`/${a.id}.svg`))),notice]));
const imported:{name:string;content:string}[]=[];
for(let i=0;i<importedAssets.length;i+=32)imported.push(...await Promise.all(importedAssets.slice(i,i+32).map(async a=>({name:`icons/${a.id}.svg`,content:await fs.readFile(path.join(root,"icons",`${a.id}.svg`),"utf8")}))));
await fs.writeFile("public/packs/all.zip",makeDeflatedZip([...originals,...imported,notice,...iconCollections.map(c=>({name:`LICENSE-${c.prefix}.txt`,content:sourceLicense(c.prefix)})),{name:"manifest.json",content:JSON.stringify(assets)}]));
console.log(`Exported ${originalAssets.length} original designs; catalog contains ${assets.length} total SVG assets.`);
