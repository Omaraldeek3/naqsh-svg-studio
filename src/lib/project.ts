import { assets,assetById, type Asset } from "./catalog.ts";
import { assetOptions, normalizeOptions, renderAsset,renderSourceAsset, color, limit, type SvgOptions } from "./svg.ts";
import {sourceSvg} from "./icon-sources.ts";
import { namespaceSvg, sanitizeSvg } from "./sanitize.ts";
import {svgOpeningTag} from "./xml.ts";
export type Layer = { id:string; assetId:string; name:string; x:number; y:number; width:number; height:number; rotation:number; opacity:number; options:SvgOptions; customSvg?:string; sourceSvg?:string; hidden?:boolean };
export type Project = { version:1; width:number; height:number; background:string; transparent?:boolean; layers:Layer[] };
export const emptyProject: Project = { version:1,width:1200,height:800,background:"#f3f0e6",layers:[] };
export function newLayer(asset:Asset):Layer {const source=asset.source?sourceSvg(asset.id):undefined;if(asset.source&&!source)throw new Error("الرسم لم يُحمّل بعد");return {id:crypto.randomUUID(),assetId:asset.id,name:asset.name,x:200,y:160,width:560,height:420,rotation:0,opacity:1,options:{...assetOptions(asset),transparent:true},...(source?{sourceSvg:source}:{})}; }
export function validateProject(raw:unknown):Project {
  if(!raw||typeof raw!=="object") throw new Error("ملف المشروع غير صالح");
  const p=raw as Project;
  if(p.version!==1||!Number.isFinite(p.width)||!Number.isFinite(p.height)||p.width<64||p.height<64||p.width>4096||p.height>4096||!Array.isArray(p.layers)||p.layers.length>60||!/^#[\da-f]{6}$/i.test(p.background)) throw new Error("أبعاد أو إصدار المشروع غير مدعومة");
  const ids=new Set<string>();
  const layers=p.layers.map(layer=>{
    if(!layer||typeof layer.id!=="string"||!/^[\w-]{1,80}$/.test(layer.id)||ids.has(layer.id)) throw new Error("معرّف طبقة غير صالح"); ids.add(layer.id);
    const isCustom=layer.assetId==="imported" && typeof layer.customSvg==="string";
    const asset=assetById.get(layer.assetId);
    if(!isCustom&&!asset) throw new Error("أصل غير موجود في المكتبة");
    const embedded=asset?.source&&typeof layer.sourceSvg==="string"?sanitizeSvg(layer.sourceSvg):undefined;
    if(asset?.source&&!embedded)throw new Error("بيانات الرسم غير موجودة في المشروع");
    for(const key of ["x","y","width","height","rotation","opacity"] as const) if(!Number.isFinite(layer[key])) throw new Error("خصائص طبقة غير صالحة");
    return {id:layer.id,assetId:layer.assetId,name:typeof layer.name==="string"?layer.name.slice(0,120):"طبقة",x:limit(layer.x,-4096,8192,0),y:limit(layer.y,-4096,8192,0),width:limit(layer.width,8,4096,320),height:limit(layer.height,8,4096,240),rotation:limit(layer.rotation,-360,360,0),opacity:limit(layer.opacity,0,1,1),hidden:layer.hidden===true,options:normalizeOptions(layer.options||{}),...(isCustom?{customSvg:sanitizeSvg(layer.customSvg!)}:{}),...(embedded?{sourceSvg:embedded}:{})};
  });
  return {version:1,width:p.width,height:p.height,background:color(p.background),transparent:p.transparent===true,layers};
}
export function layerSvg(layer:Layer) { const asset=assetById.get(layer.assetId);return layer.customSvg||(asset&&layer.sourceSvg?renderSourceAsset(asset,layer.sourceSvg,layer.options):asset?renderAsset(asset,layer.options):""); }
export function renderProject(project:Project):string {
  const layers=project.layers.filter(l=>!l.hidden).map(layer=>{
    const svg=namespaceSvg(layerSvg(layer),`l-${layer.id}`);
    const nested=svg.replace(svgOpeningTag,root=>root.replace(/\s(?:width|height|x|y)="[^"]*"/g,"").replace(/>$/,` x="0" y="0" width="${layer.width}" height="${layer.height}">`));
    return `<g transform="translate(${layer.x} ${layer.y}) rotate(${layer.rotation} ${layer.width/2} ${layer.height/2})" opacity="${layer.opacity}">${nested}</g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${project.width}" height="${project.height}" viewBox="0 0 ${project.width} ${project.height}"><title>Naqsh composition</title>${project.transparent?"":`<rect width="100%" height="100%" fill="${color(project.background)}"/>`}${layers}</svg>`;
}
