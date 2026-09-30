import fs from "node:fs/promises";
import path from "node:path";
import {assets,originalAssets,ornamentAssets,importedAssets} from "../src/lib/catalog.ts";
import {assetOptions,renderAsset} from "../src/lib/svg.ts";
import {makeZip} from "../src/lib/export.ts";
import {iconCollections,sourceLicense} from "../src/lib/icon-sources.ts";
const root=path.resolve("public/assets");
const originals:{name:string;content:string}[]=[];
for(const asset of originalAssets){const dir=path.join(root,asset.category),content=renderAsset(asset,assetOptions(asset));await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,`${asset.id}.svg`),content);originals.push({name:`${asset.category}/${asset.id}.svg`,content});}
await fs.writeFile(path.join(root,"manifest.json"),JSON.stringify(assets,null,2));
const notice={name:"LICENSE-naqsh.txt",content:"Original Naqsh vectors, including the geometric and botanical ornament constructions, are dedicated under CC0 1.0. They are contemporary constructions inspired by ornament, not historical reproductions."};
await fs.mkdir("public/packs",{recursive:true});
await fs.writeFile("public/packs/ornaments.zip",makeZip([...originals.filter(f=>ornamentAssets.some(a=>f.name.endsWith(`/${a.id}.svg`))),notice]));
const imported:{name:string;content:string}[]=[];
for(let i=0;i<importedAssets.length;i+=32)imported.push(...await Promise.all(importedAssets.slice(i,i+32).map(async a=>({name:`icons/${a.id}.svg`,content:await fs.readFile(path.join(root,"icons",`${a.id}.svg`),"utf8")}))));
await fs.writeFile("public/packs/all.zip",makeZip([...originals,...imported,notice,...iconCollections.map(c=>({name:`LICENSE-${c.prefix}.txt`,content:sourceLicense(c.prefix)})),{name:"manifest.json",content:JSON.stringify(assets)}]));
console.log(`Exported ${originalAssets.length} original designs; catalog contains ${assets.length} total SVG assets.`);
