import {xmlTagParts} from "./xml.ts";
const tags=new Set("svg g path rect circle ellipse line polyline polygon defs linearGradient radialGradient stop clipPath mask pattern title desc text tspan".toLowerCase().split(" "));
const attrs=new Set("xmlns viewBox width height x y x1 y1 x2 y2 cx cy r rx ry d points fill stroke stroke-width stroke-linecap stroke-linejoin stroke-dasharray stroke-dashoffset fill-rule clip-rule clip-path fill-opacity stroke-opacity opacity transform id href xlink:href xmlns:xlink gradientUnits gradientTransform offset stop-color stop-opacity fx fy patternUnits patternTransform mask maskUnits preserveAspectRatio font-family font-size font-weight text-anchor dominant-baseline dx dy rotate role aria-label".toLowerCase().split(" "));
export function sanitizeSvg(source: string): string {
  if(source.length>2_000_000) throw new Error("الحد الأقصى لملف SVG هو 2 ميغابايت");
  if(/<!DOCTYPE|<!ENTITY/i.test(source)) throw new Error("الملف يحتوي على تعريفات غير مدعومة");
  const doc=new DOMParser().parseFromString(source,"image/svg+xml");
  if(doc.querySelector("parsererror") || doc.documentElement.localName!=="svg") throw new Error("ملف SVG غير صالح");
  const elements=[...doc.getElementsByTagName("*")]; if(elements.length>6000) throw new Error("الملف معقّد جدًا؛ جرّب نسخة مبسّطة");
  for(const el of elements) {
    for(const node of [...el.childNodes]) { if(node.nodeType===4)el.replaceChild(doc.createTextNode(node.textContent||""),node);else if(node.nodeType===7||node.nodeType===8)node.remove(); }
    if(!tags.has(el.localName.toLowerCase()) || (el.namespaceURI!=="http://www.w3.org/2000/svg" && el.namespaceURI!==null)) throw new Error(`عنصر غير مدعوم: ${el.localName}`);
    for(const attr of [...el.attributes]) {
      const name=attr.name.toLowerCase();
      if(!attrs.has(name) || name.startsWith("on")) throw new Error(`خاصية غير مدعومة: ${attr.name}`);
      if((name==="href"||name==="xlink:href") && !/^#[\w.-]+$/.test(attr.value)) throw new Error("الروابط الخارجية غير مدعومة");
      if(/url\s*\(/i.test(attr.value) && !/^url\(\s*#[\w.-]+\s*\)$/.test(attr.value)) throw new Error("المراجع الخارجية غير مدعومة");
      if(/javascript:|data:|https?:|\/\//i.test(attr.value) && name!=="xmlns" && name!=="xmlns:xlink") throw new Error("الملف يحتوي على مرجع خارجي");
    }
  }
  const root=doc.documentElement;
  root.setAttribute("xmlns","http://www.w3.org/2000/svg");
  if(!root.hasAttribute("viewBox")) {
    const w=parseFloat(root.getAttribute("width")||"640"),h=parseFloat(root.getAttribute("height")||"480");
    if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0||h<=0) throw new Error("أبعاد الملف غير صالحة"); root.setAttribute("viewBox",`0 0 ${w} ${h}`);
  }
  const box=(root.getAttribute("viewBox")||"").trim().split(/[\s,]+/).map(Number);
  if(box.length!==4 || box.some(n=>!Number.isFinite(n)) || box[2]<=0 || box[3]<=0) throw new Error("مساحة الرسم غير صالحة");
  for(const node of [...doc.childNodes]) if(node!==root) node.remove();
  return new XMLSerializer().serializeToString(root);
}
export function namespaceSvg(svg:string,prefix:string) {
  const map=new Map<string,string>();
  const parts=svg.split(xmlTagParts);
  for(const part of parts)if(part.startsWith("<"))part.replace(/\sid="([^"]+)"/g,(_,id:string)=>{map.set(id,`${prefix}-${id}`);return "";});
  return parts.map(part=>part.startsWith("<")?part.replace(/(\s)([\w:-]+)="([^"]*)"/g,(_,space:string,name:string,value:string)=>{
    let next=value;if(name==="id")next=map.get(value)||value;else if((name==="href"||name==="xlink:href")&&value.startsWith("#"))next=`#${map.get(value.slice(1))||value.slice(1)}`;else if(["fill","stroke","clip-path","mask"].includes(name))next=value.replace(/url\(\s*#([\w.-]+)\s*\)/g,(_,id:string)=>`url(#${map.get(id)||id})`);return `${space}${name}="${next}"`;
  }):part).join("");
}
