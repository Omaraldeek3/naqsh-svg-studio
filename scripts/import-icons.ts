import fs from "node:fs/promises";
import path from "node:path";
import {createHash} from "node:crypto";
import {originalAssets} from "../src/lib/catalog.ts";
import {renderAsset,assetOptions} from "../src/lib/svg.ts";
import {makeZip} from "../src/lib/export.ts";
const root=path.resolve("public/assets/icons");
await fs.mkdir(root,{recursive:true});await fs.mkdir("public/packs",{recursive:true});await fs.mkdir("public/licenses",{recursive:true});
async function text(url:string){const response=await fetch(url,{headers:{"User-Agent":"Naqsh-SVG-Studio"},signal:AbortSignal.timeout(60000)});if(!response.ok)throw new Error(`${response.status}: ${url}`);return response.text();}
const commit=JSON.parse(await text("https://api.github.com/repos/iconify/icon-sets/commits/master")).sha as string;
if(!/^[a-f0-9]{40}$/.test(commit))throw new Error("Could not pin source snapshot");
const xml=(s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const seen=new Set<string>(),rows:[string,string,number,number][]=[];
const collections:{prefix:string;name:string;author:string;license:"MIT"|"Apache-2.0";licenseText:string;url:string;count:number;version:string;sha256:string}[]=[];
const allFiles:{name:string;content:string}[]=originalAssets.filter(a=>a.category==="icons").map(a=>({name:`icons/${a.id}.svg`,content:renderAsset(a,assetOptions(a))}));
for(const prefix of ["tabler","mdi"]){
  const dataText=await text(`https://raw.githubusercontent.com/iconify/icon-sets/${commit}/json/${prefix}.json`);
  const data=JSON.parse(dataText) as {width:number;height:number;info:{name:string;version?:string;author:{name:string;url:string};license:{spdx:"MIT"|"Apache-2.0";url:string}};icons:Record<string,{body:string;width?:number;height?:number;hidden?:boolean}>};
  if(!["MIT","Apache-2.0"].includes(data.info.license.spdx))throw new Error("Unexpected source license");
  const licenseText=await text(prefix==="tabler"?"https://raw.githubusercontent.com/tabler/tabler-icons/master/LICENSE":"https://raw.githubusercontent.com/Templarian/MaterialDesign/master/LICENSE");
  const sha256=createHash("sha256").update(dataText).digest("hex");
  const collection={prefix,name:data.info.name,author:data.info.author.name,license:data.info.license.spdx,licenseText,url:data.info.author.url,count:0,version:data.info.version||"snapshot",sha256};
  const files:{name:string;content:string}[]=[];
  for(const [name,icon]of Object.entries(data.icons)){
    if(icon.hidden)continue;
    if(!/^[a-z0-9-]+$/.test(name))throw new Error(`Unsafe icon name: ${name}`);
    const body=icon.body,w=icon.width||data.width||24,h=icon.height||data.height||24;
    if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0||h<=0||/<\/?(?:script|style|foreignObject|image|use|a|animate|set)\b|\bon\w+\s*=|(?:href|src)\s*=|url\s*\(|<!|<\?/i.test(body))continue;
    const hash=createHash("sha256").update(`${w} ${h} ${body.replace(/\s+/g," ").trim()}`).digest("hex");if(seen.has(hash))continue;seen.add(hash);
    const id=`${prefix}-${name}`,notice=`${collection.name} — ${collection.author}. ${collection.license}. ${collection.url}`;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${xml(name.replaceAll("-"," "))}</title><desc>${xml(notice)}</desc>${body}</svg>`;
    rows.push([prefix,name,w,h]);files.push({name:`icons/${id}.svg`,content:svg});collection.count++;
  }
  for(let start=0;start<files.length;start+=32)await Promise.all(files.slice(start,start+32).map(f=>fs.writeFile(path.join(root,path.basename(f.name)),f.content)));
  files.push({name:`LICENSE-${prefix}.txt`,content:`${collection.name}\n${collection.url}\n\n${licenseText}`});
  await fs.writeFile(`public/licenses/${prefix}.txt`,licenseText);await fs.writeFile(`public/packs/${prefix}.zip`,makeZip(files));
  allFiles.push(...files);collections.push(collection);console.log(`${prefix}: ${collection.count} distinct icons (${collection.license})`);
}
const index={snapshot:commit,collections,icons:rows};
await fs.mkdir("src/content",{recursive:true});await fs.writeFile("src/content/imported-icons.json",JSON.stringify(index));
allFiles.push({name:"LICENSE-naqsh.txt",content:"The 8 original Naqsh icons are dedicated under CC0 1.0. Imported collections retain their original licenses; see LICENSE-tabler.txt and LICENSE-mdi.txt."},{name:"sources.json",content:JSON.stringify({snapshot:commit,collections:collections.map(({licenseText,...c})=>c)},null,2)});
await fs.writeFile("public/packs/icons.zip",makeZip(allFiles));
await fs.writeFile("public/packs/all.zip",makeZip([...originalAssets.filter(a=>a.category!=="icons").map(a=>({name:`${a.category}/${a.id}.svg`,content:renderAsset(a,assetOptions(a))})),...allFiles]));
await fs.writeFile("public/licenses/sources.json",JSON.stringify({snapshot:commit,collections:collections.map(({licenseText,...c})=>c)},null,2));
console.log(`Catalog: ${originalAssets.length+rows.length} actual SVG assets. Snapshot: ${commit}`);
