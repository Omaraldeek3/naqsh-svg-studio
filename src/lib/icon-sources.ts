import index from "../content/imported-icons.json" with {type:"json"};
export type IconCollection={prefix:string;name:string;author:string;license:"MIT"|"Apache-2.0";licenseText:string;url:string;count:number;version:string;sha256:string};
export const iconCollections=index.collections as IconCollection[];
export const iconRows=index.icons as [string,string,number,number][];
export const sourceSnapshot=index.snapshot;
const rawSources=new Map<string,string>();
const requests=new Map<string,Promise<string>>();
export function sourceSvg(id:string){return rawSources.get(id);}
export function registerSource(id:string,svg:string){rawSources.set(id,svg);}
export async function loadSource(id:string){
  if(rawSources.has(id))return rawSources.get(id)!;
  if(requests.has(id))return requests.get(id)!;
  const request=(async()=>{const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH||""}/assets/icons/${encodeURIComponent(id)}.svg`);if(!response.ok)throw new Error("تعذّر تحميل الرسم؛ حاول مجددًا");const text=await response.text();const {sanitizeSvg}=await import("./sanitize.ts");const safe=sanitizeSvg(text);rawSources.set(id,safe);return safe;})();
  requests.set(id,request);try{return await request;}finally{requests.delete(id);}
}
export function sourceLicense(prefix:string){const c=iconCollections.find(c=>c.prefix===prefix);return c?`${c.name} — ${c.author}\nSource: ${c.url}\nSPDX-License-Identifier: ${c.license}\n\n${c.licenseText}`:"";}
