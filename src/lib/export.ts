import {svgOpeningTag,xmlTagParts} from "./xml.ts";
export function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of data) { crc ^= byte; for (let n = 0; n < 8; n++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ 0xffffffff) >>> 0;
}
export function makeZip(files: { name: string; content: string }[]): Uint8Array<ArrayBuffer> {
  const encoder = new TextEncoder(); const local: Uint8Array[] = [], central: Uint8Array[] = []; let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name), body = encoder.encode(file.content), crc = crc32(body);
    const header = new Uint8Array(30 + name.length); const h = new DataView(header.buffer);
    h.setUint32(0,0x04034b50,true); h.setUint16(4,20,true); h.setUint16(6,0x800,true); h.setUint16(12,0x21,true); h.setUint32(14,crc,true); h.setUint32(18,body.length,true); h.setUint32(22,body.length,true); h.setUint16(26,name.length,true); header.set(name,30);
    const entry = new Uint8Array(46 + name.length); const e = new DataView(entry.buffer);
    e.setUint32(0,0x02014b50,true); e.setUint16(4,20,true); e.setUint16(6,20,true); e.setUint16(8,0x800,true); e.setUint16(14,0x21,true); e.setUint32(16,crc,true); e.setUint32(20,body.length,true); e.setUint32(24,body.length,true); e.setUint16(28,name.length,true); e.setUint32(42,offset,true); entry.set(name,46);
    local.push(header,body); central.push(entry); offset += header.length + body.length;
  }
  const size = central.reduce((n,a)=>n+a.length,0), end = new Uint8Array(22), e = new DataView(end.buffer);
  e.setUint32(0,0x06054b50,true); e.setUint16(8,files.length,true); e.setUint16(10,files.length,true); e.setUint32(12,size,true); e.setUint32(16,offset,true);
  const out = new Uint8Array(offset+size+22); let pos = 0; for (const chunk of [...local,...central,end]) { out.set(chunk,pos); pos += chunk.length; } return out;
}
export function toReact(svg: string, component = "NaqshGraphic") {
  const notices=[...new Set([...svg.matchAll(/<!-- Naqsh license:\n([\s\S]*?)\n-->/g)].map(m=>m[1]))].map(text=>`/*\n${text.replace(/\*\//g,"* /")}\n*/\n`).join("\n");
  const clean=svg.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,(_,text:string)=>text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/<!--[\s\S]*?-->/g,"").replace(/<\?[\s\S]*?\?>/g,"");
  const jsx=clean.split(xmlTagParts).map(part=>part.startsWith("<")?part.replace(/(\s)([\w:-]+)=("[^"]*"|'[^']*')/g,(_,space:string,name:string,value:string)=>{
    const converted=name==="class"?"className":name==="xlink:href"?"xlinkHref":name==="xmlns:xlink"?"xmlnsXlink":name.startsWith("aria-")||name.startsWith("data-")?name:name.replace(/-([a-z])/g,(_,c:string)=>c.toUpperCase());
    return `${space}${converted}=${value}`;
  }):part.replace(/\{/g,"&#123;").replace(/\}/g,"&#125;")).join("").replace(svgOpeningTag,root=>root.replace(/>$/," {...props}>"));
  return `${notices}import type { SVGProps } from "react";\n\nexport default function ${component}(props: SVGProps<SVGSVGElement>) {\n  return (\n    ${jsx}\n  );\n}\n`;
}
export function toCss(svg: string,repeatSize?:[number,number]) {const notices=[...new Set([...svg.matchAll(/<!-- Naqsh license:\n([\s\S]*?)\n-->/g)].map(m=>m[1]))].map(text=>`/*\n${text.replace(/\*\//g,"* /")}\n*/\n`).join("\n");const repeating=repeatSize?.every(n=>Number.isFinite(n)&&n>0);return `${notices}.naqsh-background {\n  background-image: url("data:image/svg+xml,${encodeURIComponent(svg)}");\n  background-size: ${repeating?repeatSize!.map(n=>`${Number(n.toFixed(3))}px`).join(" "):"cover"};\n  background-position: ${repeating?"0 0":"center"};${repeating?"\n  background-repeat: repeat;":""}\n}\n`; }
export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob), a = document.createElement("a"); a.href=url; a.download=name; document.body.append(a); a.click(); a.remove(); window.setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function downloadText(text: string, name: string, type = "image/svg+xml") { downloadBlob(new Blob([text], { type }), name); }
export function pngWithNotice(png:Uint8Array,notice:string):Uint8Array<ArrayBuffer>{
  if(png.length<20||new DataView(png.buffer,png.byteOffset,png.byteLength).getUint32(png.length-8)!==0x49454e44)throw new Error("ملف PNG غير صالح");
  const payload=new TextEncoder().encode(`Source licenses\0\0\0\0\0${notice}`),chunk=new Uint8Array(payload.length+12),view=new DataView(chunk.buffer);
  view.setUint32(0,payload.length);view.setUint32(4,0x69545874);chunk.set(payload,8);view.setUint32(chunk.length-4,crc32(chunk.subarray(4,chunk.length-4)));
  const out=new Uint8Array(png.length+chunk.length);out.set(png.subarray(0,png.length-12));out.set(chunk,png.length-12);out.set(png.subarray(png.length-12),png.length-12+chunk.length);return out;
}
export async function downloadPng(svg: string, name: string, width: number, height: number) {
  const url = URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"}));
  try {
    const image = new Image(); image.src=url; await image.decode();
    const canvas = document.createElement("canvas"); canvas.width=width; canvas.height=height;
    const ctx=canvas.getContext("2d"); if(!ctx) throw new Error("تعذّر تجهيز الصورة"); ctx.drawImage(image,0,0,width,height);
    const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/png")); if(!blob) throw new Error("تعذّر تصدير الصورة");
    const notices=[...new Set([...svg.matchAll(/<!-- Naqsh license:\n([\s\S]*?)\n-->/g)].map(m=>m[1]))].join("\n\n");
    downloadBlob(notices?new Blob([pngWithNotice(new Uint8Array(await blob.arrayBuffer()),notices)],{type:"image/png"}):blob,name);
  } finally { URL.revokeObjectURL(url); }
}
export async function copyText(text: string) {
  if(navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
  const el=document.createElement("textarea"); el.value=text; el.style.position="fixed"; el.style.opacity="0"; document.body.append(el); el.select(); const success=document.execCommand("copy"); el.remove(); if(!success) throw new Error("استخدم تنزيل الكود بدل النسخ");
}
