import type { Asset } from "./catalog.ts";
import { palettes } from "./catalog.ts";
import {sourceSvg,sourceLicense} from "./icon-sources.ts";
import {svgOpeningTag} from "./xml.ts";
import {renderOrnament} from "./ornaments.ts";
import {renderGeometricOrnament,renderGeometricTile} from "./geometric-ornaments.ts";
import {renderTiktokDesign} from "./tiktok-designs.ts";
export type SvgOptions = { primary: string; accent: string; background: string; width: number; height: number; density: number; stroke: number; transparent: boolean; animate: boolean };
export const defaultOptions: SvgOptions = { primary: "#28634e", accent: "#b9ce82", background: "#f3f0e6", width: 640, height: 480, density: 6, stroke: 5, transparent: false, animate: true };
export function assetOptions(asset: Asset): SvgOptions { const colors = palettes[asset.palette].colors; return { ...defaultOptions, primary: colors[0], accent: colors[1], background: colors[2],transparent:asset.ornament===true,...(asset.construction?{density:4,stroke:2.5}:{} ) }; }
export function renderRepeatTile(asset:Asset,raw:SvgOptions=assetOptions(asset)):string{return renderGeometricTile(asset,normalizeOptions(raw));}
export const color = (value: unknown, fallback = "#28634e") => typeof value === "string" && /^#[\da-f]{6}$/i.test(value) ? value : fallback;
export const limit = (value: unknown, min: number, max: number, fallback: number) => typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
export function normalizeOptions(o: Partial<SvgOptions>): SvgOptions {
  return { primary: color(o.primary), accent: color(o.accent, "#b9ce82"), background: color(o.background, "#f3f0e6"), width: Math.round(limit(o.width, 64, 4096, 640)), height: Math.round(limit(o.height, 64, 4096, 480)), density: Math.round(limit(o.density, 2, 12, 6)), stroke: limit(o.stroke, 1, 12, 5), transparent: o.transparent === true, animate: o.animate !== false };
}
const circle = (x: number, y: number, r: number, fill: string, extra = "") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const rect = (x: number, y: number, w: number, h: number, fill: string, radius = 0, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" ${extra}/>`;
const path = (d: string, fill: string, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
const line = (x: number, y: number, x2: number, y2: number, stroke: string, width = 5) => `<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`;
const star = (x: number, y: number, outer: number, inner: number, n = 8) => Array.from({ length: n * 2 }, (_, i) => { const a = Math.PI * i / n - Math.PI / 2; const r = i % 2 ? inner : outer; return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`; }).join(" ");
function leaf(x: number, y: number, p: string, rotation = 0) { return `<path d="M${x} ${y}q-45 -65 0 -115q45 55 0 115" fill="${p}" transform="rotate(${rotation} ${x} ${y})"/>`; }
function person(x: number, y: number, p: string, a: string, flip = false) {
  return `<g transform="translate(${x} ${y})${flip ? " scale(-1 1)" : ""}">${path("M-25 60L-38 137L-3 137L7 78L22 137L55 137L38 56", p)}${rect(-39, -38, 83, 108, a, 29)}${circle(1, -74, 28, "#e8ad83")}${path("M-28 -76Q-31 -117 9 -107Q42 -104 28 -70L11 -86L-10 -86L-10 -62Z", p)}${path("M-32 -18Q-65 -5 -75 28L-57 37L-23 12M35 -17L79 12L68 31L20 7", a)}${rect(-41, 132, 42, 12, p, 5)}${rect(20, 132, 44, 12, p, 5)}</g>`;
}
function symbol(v: number, p: string, a: string, sw: number) {
  const common = `fill="none" stroke="${p}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = ["M220 245L320 158L420 245M244 225V350H296V286H344V350H396V225", "M352 269L414 331M371 221A69 69 0 1 1 233 221A69 69 0 1 1 371 221", "M214 176H426V304H306L249 349V304H214Z M258 220H381M258 259H344", "M235 207H405L419 350H221Z M279 211V190A41 41 0 0 1 361 190V211", "M320 155L342 173L371 169L383 197L410 211L404 240L417 267L397 290L395 321L365 326L343 348L316 336L287 348L268 325L237 320L239 290L222 268L235 241L232 212L260 197L271 172L300 176Z M359 249A39 39 0 1 1 281 249A39 39 0 1 1 359 249", "M254 151H347L394 198V351H254Z M345 154V202H392M282 248H365M282 285H349", "M235 183H405V347H235Z M235 231H405M272 159V202M367 159V202M270 268H291M319 268H340M368 268H380M270 307H291M319 307H340", "M320 335L237 254C190 207 253 142 299 183L320 204L341 183C387 142 450 207 403 254Z"];
  return circle(320, 248, 137, a, 'opacity=".22"') + `<path d="${paths[v]}" ${common}/>`;
}
export function renderAsset(asset: Asset, raw: SvgOptions = assetOptions(asset)): string {
  if(asset.source){const svg=sourceSvg(asset.id);if(!svg)throw new Error("الرسم لم يُحمّل بعد");return renderSourceAsset(asset,svg,raw);}
  if(asset.category==="tiktok")return renderTiktokDesign(asset,normalizeOptions(raw));
  if(asset.construction)return renderGeometricOrnament(asset,normalizeOptions(raw));
  if(asset.ornament)return renderOrnament(asset,normalizeOptions(raw));
  const o = normalizeOptions(raw), p = o.primary, a = o.accent, b = o.background, v = asset.variant;
  const key = `${asset.id}-${p.slice(1)}-${a.slice(1)}-${o.density}-${o.stroke}`;
  let content = "";
  switch (asset.category) {
    case "backgrounds": {
      if (v === 0) content = [0, 1, 2].map(i => path(`M0 ${180 + i * 90}C180 ${30 + i * 100} 350 ${430 - i * 30} 640 ${180 + i * 90}V480H0Z`, i === 1 ? a : p, `opacity="${i === 0 ? ".22" : i === 1 ? ".8" : "1"}"`)).join("");
      if (v === 1) content = circle(450, 320, 200, a) + Array.from({ length: o.density }, (_, i) => `<ellipse cx="450" cy="320" rx="${80 + i * 48}" ry="${50 + i * 30}" transform="rotate(-32 450 320)" fill="none" stroke="${p}" stroke-width="${o.stroke}"/>`).join("");
      if (v === 2) content = circle(510, 105, 58, a) + path("M0 300Q140 150 280 300T640 245V480H0Z", a) + path("M0 370Q170 200 340 370T640 330V480H0Z", p);
      if (v === 3) content = rect(40, 40, 230, 230, p, 115) + rect(330, 40, 270, 175, a, 0) + path("M320 440V255H590Z", p) + circle(150, 372, 72, a);
      if (v === 4) content = Array.from({ length: o.density * 4 }, (_, i) => line(i * 32, 0, i * 32, 480, p, 1) + line(0, i * 32, 640, i * 32, p, 1)).join("") + rect(160, 96, 192, 192, a, 96) + rect(352, 288, 128, 128, p, 0);
      if (v === 5) content = circle(320, 320, 190, p) + circle(320, 320, 140, a) + rect(0, 320, 640, 160, b) + Array.from({ length: o.density }, (_, i) => line(90, 342 + i * 19, 550, 342 + i * 19, p, 3)).join("");
      if (v === 6) content = Array.from({ length: o.density * 2 }, (_, i) => path(`M-40 ${70 + i * 31}Q120 ${-80 + i * 31} 310 ${120 + i * 31}T700 ${50 + i * 31}`, "none", `stroke="${i % 3 ? p : a}" stroke-width="${o.stroke}"`)).join("");
      if (v === 7) content = `<g transform="rotate(-15 320 240)">${rect(55, 40, 270, 380, a, 135)}${rect(294, 40, 240, 220, p, 24)}${circle(456, 354, 83, p)}${circle(196, 125, 48, b)}</g>`;
      break;
    }
    case "patterns": {
      const size = 640 / o.density; let tile = "";
      if (v === 0) tile = `<polygon points="${star(size / 2, size / 2, size * .46, size * .22)}" fill="none" stroke="${p}" stroke-width="${o.stroke}"/>` + circle(size / 2, size / 2, size * .11, a);
      if (v === 1) tile = path(`M0 ${size}V${size / 2}A${size / 2} ${size / 2} 0 0 1 ${size} ${size / 2}V${size}`, "none", `stroke="${p}" stroke-width="${o.stroke * 2}"`) + circle(size / 2, size / 2, size / 8, a);
      if (v === 2) tile = circle(size * .25, size * .25, size * .1, p) + circle(size * .75, size * .75, size * .16, a);
      if (v === 3) tile = path(`M0 ${size / 2}Q${size / 4} 0 ${size / 2} ${size / 2}T${size} ${size / 2}`, "none", `stroke="${p}" stroke-width="${o.stroke}"`);
      if (v === 4) tile = path(`M${size * .2} ${size * .13}L${size * .4} ${size * .3}L${size * .12} ${size * .45}Z`, p) + rect(size * .62, size * .53, size * .22, size * .35, a, size * .1) + circle(size * .75, size * .18, size * .06, p);
      if (v === 5) tile = `<g transform="translate(${size / 2} ${size * .85}) scale(${size / 140})">${leaf(0, 0, p, -35)}${leaf(0, 0, a, 35)}</g>`;
      if (v === 6) tile = rect(0, 0, size / 2, size / 2, p) + rect(size / 2, size / 2, size / 2, size / 2, a);
      if (v === 7) tile = path(`M${size / 2} 0L${size} ${size / 2}L${size / 2} ${size}L0 ${size / 2}Z`, "none", `stroke="${p}" stroke-width="${o.stroke}"`) + circle(size / 2, size / 2, size / 12, a);
      content = `<defs><pattern id="${key}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">${tile}</pattern></defs>${rect(0, 0, 640, 480, `url(#${key})`)}`;
      break;
    }
    case "icons": content = symbol(v, p, a, o.stroke * 2); break;
    case "illustrations": {
      content = circle(325, 230, 159, a, 'opacity=".2"') + line(75, 396, 565, 396, p, 3);
      if (v === 0) content += rect(220, 215, 213, 13, p, 4) + line(240, 230, 240, 390, p, 8) + line(410, 230, 410, 390, p, 8) + rect(290, 153, 95, 61, a, 6) + line(330, 217, 344, 188, p, 4) + person(167, 248, p, a);
      if (v === 1) content += person(295, 249, p, a) + circle(398, 135, 39, a) + line(398, 168, 398, 188, p) + line(384, 188, 412, 188, p) + [0, 1, 2, 3, 4].map(i => { const t = i * 1.1 - 2.8; return line(398 + Math.cos(t) * 58, 135 + Math.sin(t) * 58, 398 + Math.cos(t) * 72, 135 + Math.sin(t) * 72, p, 4); }).join("");
      if (v === 2) content += person(220, 246, p, a) + person(425, 246, p, a, true) + rect(275, 205, 97, 55, b, 5, `stroke="${p}" stroke-width="4"`) + line(296, 225, 351, 225, p, 4) + line(296, 240, 336, 240, p, 4);
      if (v === 3) content += person(207, 249, p, a) + rect(310, 134, 131, 188, p, 9) + rect(326, 150, 100, 155, b, 3) + [0, 1, 2, 3].map(i => line(342, 182 + i * 28, 407, 182 + i * 28, a, 7)).join("");
      if (v === 4) content += person(244, 249, p, a) + rect(374, 258, 90, 102, a, 10) + path("M397 260V240A23 23 0 0 1 443 240V260", "none", `stroke="${p}" stroke-width="6"`) + circle(464, 169, 27, p) + line(454, 169, 474, 169, b, 3);
      if (v === 5) content += person(229, 249, p, a) + path("M380 334L402 182L433 129L464 182L482 334L431 310Z", p) + circle(433, 205, 22, b) + path("M410 328L434 391L455 328Z", a) + circle(503, 121, 8, a);
      if (v === 6) content += person(231, 249, p, a) + rect(349, 134, 154, 111, p, 24) + path("M366 233L358 270L403 237", p) + [0, 1, 2].map(i => circle(389 + i * 36, 188, 8, b)).join("");
      if (v === 7) content += person(218, 249, p, a) + rect(338, 320, 37, 75, a, 5) + rect(391, 268, 37, 127, a, 5) + rect(444, 214, 37, 181, p, 5) + path("M343 260L460 142M424 145L460 142L461 179", "none", `stroke="${p}" stroke-width="7" stroke-linecap="round"`);
      content += leaf(525, 393, a, 15) + rect(505, 363, 42, 33, p, 6); break;
    }
    case "dividers": {
      const d = ["M0 260C160 70 420 430 640 200", "M0 320L140 240L250 300L420 120L640 310", "M0 300Q30 185 110 260Q150 150 240 240Q320 115 410 230Q500 130 550 250Q620 185 640 300", "M0 345L640 125", "M0 240Q160 100 320 240T640 240", "M0 350H128V290H256V230H384V170H512V110H640", "M0 300C70 300 90 90 220 195S360 390 450 260S590 160 640 220", "M0 250L80 170L160 250L240 170L320 250L400 170L480 250L560 170L640 250"][v];
      if (v === 4) content = path(`${d}V480H0Z`, a, 'transform="translate(0 -45)"');
      content += path(`${d}V480H0Z`, p); break;
    }
    case "states": {
      content = `<ellipse cx="320" cy="377" rx="150" ry="19" fill="${a}" opacity=".4"/>` + circle(320, 235, 130, a, 'opacity=".18"');
      if (v === 0) content += circle(320, 232, 88, p) + path("M271 232L307 267L371 199", "none", `stroke="${b}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"`);
      if (v === 1) content += `<g transform="translate(18 22) scale(.9)">${symbol(1, p, a, o.stroke * 2)}</g>` + line(267, 218, 312, 218, p, 6);
      if (v === 2) content += path("M222 219H420L396 333H246Z", a) + path("M261 225L291 164M378 225L347 164M279 249V303M320 249V303M361 249V303", "none", `stroke="${p}" stroke-width="8" stroke-linecap="round"`);
      if (v === 3) content += path("M224 217Q320 126 416 217M254 254Q320 191 386 254M288 287Q320 254 352 287", "none", `stroke="${p}" stroke-width="12" stroke-linecap="round"`) + circle(320, 322, 11, p) + line(235, 157, 409, 332, a, 14);
      if (v === 4) content += path("M216 190H293L312 213H424V331H216Z", a) + path("M215 226H424V332H215Z", p) + circle(435, 188, 27, b, `stroke="${p}" stroke-width="4"`) + line(422, 188, 448, 188, p, 4) + line(435, 175, 435, 201, p, 4);
      if (v === 5) content += rect(214, 169, 211, 145, p, 18) + path("M215 182L320 259L424 182", "none", `stroke="${a}" stroke-width="9"`) + circle(427, 166, 24, a);
      if (v === 6) content += rect(252, 223, 136, 115, p, 22) + path("M278 221V182A42 42 0 0 1 362 182V221", "none", `stroke="${p}" stroke-width="13"`) + circle(320, 268, 11, b) + line(320, 270, 320, 294, b, 8);
      if (v === 7) content += path("M320 134L425 322H215Z", p, 'stroke-linejoin="round"') + line(320, 208, 320, 265, b, 12) + circle(320, 294, 7, b);
      content += circle(161, 188, 6, p) + circle(474, 271, 9, a) + line(442, 111, 454, 111, p, 3) + line(448, 105, 448, 117, p, 3); break;
    }
    case "badges": {
      if (v === 0) content = `<polygon points="${star(320, 225, 125, 59, 5)}" fill="${p}"/>` + circle(320, 225, 31, a);
      if (v === 1) content = `<polygon points="${star(320, 235, 129, 110, 16)}" fill="${p}"/>` + circle(320, 235, 85, a) + path("M279 236L307 264L363 207", "none", `stroke="${p}" stroke-width="12" stroke-linecap="round"`);
      if (v === 2) content = path("M320 114L431 157V248Q431 322 320 378Q209 322 209 248V157Z", p) + path("M270 237L304 271L375 200", "none", `stroke="${a}" stroke-width="15" stroke-linecap="round"`);
      if (v === 3) content = path("M242 248L231 390L310 351L365 389L385 240", p) + circle(320, 208, 97, a) + `<polygon points="${star(320, 208, 48, 22, 5)}" fill="${p}"/>`;
      if (v === 4) content = path("M211 311L191 163L272 227L320 129L368 227L449 163L429 311Z", p) + rect(211, 330, 218, 25, a, 8) + circle(320, 265, 18, a);
      if (v === 5) content = path("M177 171H463V208Q420 239 463 270V307H177V270Q220 239 177 208Z", p) + line(383, 186, 383, 292, a, 3) + `<polygon points="${star(273, 239, 41, 20, 5)}" fill="${a}"/>`;
      if (v === 6) content = path("M240 145H400L456 222L320 368L184 222Z", p) + path("M240 145L278 222L320 368L362 222L400 145M184 222H456", "none", `stroke="${a}" stroke-width="5"`);
      if (v === 7) content = path("M171 196H469L431 239L469 281H171L209 239Z", a) + rect(229, 153, 182, 173, p, 5) + `<polygon points="${star(320, 239, 47, 22, 5)}" fill="${a}"/>`; break;
    }
    case "charts": {
      if (v === 0) content = [110, 170, 95, 225, 285].map((h, i) => rect(117 + i * 84, 390 - h, 52, h, i === 4 ? p : a, 7)).join("") + line(97, 392, 539, 392, p, 3);
      if (v === 1) content = `<circle cx="320" cy="240" r="113" fill="none" stroke="${a}" stroke-width="58"/><circle cx="320" cy="240" r="113" fill="none" stroke="${p}" stroke-width="58" stroke-dasharray="430 711" transform="rotate(-90 320 240)"/>`;
      if (v === 2) content = path("M92 360L180 299L259 320L344 206L429 241L538 109V386H92Z", a, 'opacity=".35"') + path("M92 360L180 299L259 320L344 206L429 241L538 109", "none", `stroke="${p}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`) + [[92, 360], [180, 299], [259, 320], [344, 206], [429, 241], [538, 109]].map(([x,y]) => circle(x,y,10,p)).join("");
      if (v === 3) content = line(113, 240, 527, 240, a, 9) + [0,1,2,3].map(i => circle(125+i*130,240,38,i===3?p:a) + circle(125+i*130,240,10,b)).join("");
      if (v === 4) content = line(92,240,548,240,p,4) + [0,1,2,3].map(i => circle(130+i*125,240,11,p) + line(130+i*125,240,130+i*125,i%2?330:150,p,3) + rect(88+i*125,i%2?328:100,84,44,a,9)).join("");
      if (v === 5) content = [[210,140],[425,150],[165,329],[465,320]].map(([x,y]) => line(320,240,x,y,p,4)+circle(x,y,29,a)).join("")+circle(320,240,47,p);
      if (v === 6) content = Array.from({length:4},(_,i)=>rect(136,113+i*72,195+i*30,22,p,5)+rect(136,140+i*72,245-i*35,14,a,5)).join("");
      if (v === 7) content = path("M160 305A160 160 0 0 1 480 305","none",`stroke="${a}" stroke-width="45" stroke-linecap="round"`)+path("M160 305A160 160 0 0 1 399 166","none",`stroke="${p}" stroke-width="45" stroke-linecap="round"`)+line(320,305,404,208,p,10)+circle(320,305,19,p); break;
    }
    case "frames": {
      const edge = `stroke="${p}" stroke-width="${o.stroke}"`;
      if(v===0) content=path("M185 393V210A135 135 0 0 1 455 210V393Z","none",edge)+path("M200 393V210A120 120 0 0 1 440 210V393", "none",`stroke="${a}" stroke-width="3"`);
      if(v===1) content=rect(128,80,384,320,"none",44,edge)+rect(146,98,348,284,"none",33,`stroke="${a}" stroke-width="3"`);
      if(v===2) content=rect(135,78,370,324,a,0)+rect(159,102,322,276,b,0)+Array.from({length:11},(_,i)=>circle(135,88+i*29,9,b)+circle(505,88+i*29,9,b)).join("")+Array.from({length:12},(_,i)=>circle(150+i*30,78,9,b)+circle(150+i*30,402,9,b)).join("");
      if(v===3) content=rect(155,86,330,310,"none",6,edge)+leaf(164,372,a,-15)+leaf(164,318,p,-50)+leaf(476,225,a,165)+leaf(476,180,p,130);
      if(v===4) content=`<g transform="rotate(-8 320 240)">${rect(168,66,304,356,p,5)}${rect(188,86,264,256,b,2)}${circle(320,383,9,a)}</g>`;
      if(v===5) content=rect(100,83,440,314,"none",15,edge)+line(100,129,540,129,p,3)+circle(124,107,6,p)+circle(145,107,6,a)+circle(166,107,6,p);
      if(v===6) content=rect(145,70,350,340,"none",0,edge)+rect(168,93,304,294,"none",0,`stroke="${a}" stroke-width="${o.stroke*2}"`);
      if(v===7) content=path("M128 167V85H214M426 85H512V167M512 313V395H426M214 395H128V313","none",`stroke="${p}" stroke-width="${o.stroke*2}"`)+circle(320,85,7,a)+circle(320,395,7,a); break;
    }
    case "marks": {
      if(v===0) content=Array.from({length:8},(_,i)=>`<ellipse cx="320" cy="167" rx="39" ry="88" fill="${i%2?a:p}" transform="rotate(${i*45} 320 240)"/>`).join("")+circle(320,240,35,b);
      if(v===1) content=path("M422 141A140 140 0 1 0 422 339","none",`stroke="${p}" stroke-width="57" stroke-linecap="round"`)+circle(429,141,28,a);
      if(v===2) content=path("M180 348L320 112L460 348Z",p)+circle(320,275,55,b)+circle(440,145,35,a);
      if(v===3) content=path("M180 298A140 140 0 0 1 460 298Z",p)+Array.from({length:6},(_,i)=>line(177,321+i*14,463,321+i*14,i%2?a:p,7)).join("");
      if(v===4) content=path("M220 145L420 335M420 145L220 335","none",`stroke="${p}" stroke-width="57" stroke-linecap="round"`)+circle(320,240,39,a);
      if(v===5) content=path("M170 157H470L385 240H255L170 323H470L385 240",p)+path("M255 240H385L470 323H170Z",a);
      if(v===6) content=path("M201 357V231A119 119 0 0 1 439 231V357H380V231A60 60 0 0 0 260 231V357Z",p)+circle(320,300,35,a);
      if(v===7) content=`<polygon points="${star(320,240,153,45,4)}" fill="${p}"/>`+`<polygon points="${star(320,240,103,27,4)}" fill="${a}" transform="rotate(45 320 240)"/>`+circle(320,240,19,b); break;
    }
    case "motion": {
      const animate=(attribute:string,values:string,dur="2s",delay="0s")=>o.animate?`<animate attributeName="${attribute}" values="${values}" dur="${dur}" begin="${delay}" repeatCount="indefinite"/>`:"";
      const rotate=o.animate?'<animateTransform attributeName="transform" type="rotate" from="0 320 240" to="360 320 240" dur="4s" repeatCount="indefinite"/>':"";
      if(v===0) content=`<g>${circle(320,240,95,"none",`stroke="${a}" stroke-width="5"`)}${circle(320,145,19,p)}${rotate}</g>`;
      if(v===1) content=`<circle cx="320" cy="240" r="78" fill="${p}">${animate("r","65;90;65")}${animate("opacity","1;.4;1")}</circle>`+circle(320,240,32,a);
      if(v===2) content=[0,1,2].map(i=>`<circle cx="${230+i*90}" cy="240" r="22" fill="${i===1?a:p}">${animate("cy","240;210;240","1.3s",`${i*.2}s`)}</circle>`).join("");
      if(v===3) content=[0,1,2].map(i=>`<circle cx="320" cy="240" r="${35+i*40}" fill="none" stroke="${p}" stroke-width="6">${animate("r","30;135","2.5s",`${i*.8}s`)}${animate("opacity","1;0","2.5s",`${i*.8}s`)}</circle>`).join("");
      if(v===4) content=`<g>${rect(237,157,166,166,"none",18,`stroke="${p}" stroke-width="18"`)}${rotate}</g>`+circle(320,240,25,a);
      if(v===5) content=[0,1,2,3,4].map(i=>`<rect x="${212+i*45}" y="190" width="25" height="100" rx="12" fill="${i%2?a:p}">${animate("height","40;100;40","1.2s",`${i*.15}s`)}${animate("y","220;190;220","1.2s",`${i*.15}s`)}</rect>`).join("");
      if(v===6) content=`<g>${circle(320,240,84,"none",`stroke="${a}" stroke-width="16"`)}${path("M320 156A84 84 0 0 1 404 240","none",`stroke="${p}" stroke-width="16" stroke-linecap="round"`)}${rotate}</g>`;
      if(v===7) content=[0,1,2,3].map(i=>`<rect x="${252+(i%2)*77}" y="${172+Math.floor(i/2)*77}" width="60" height="60" rx="12" fill="${i%2?a:p}">${animate("opacity","1;.2;1","1.8s",`${i*.3}s`)}</rect>`).join(""); break;
    }
    case "scenes": {
      content=rect(72,390,496,5,p,2)+circle(490,112,45,a,'opacity=".65"')+leaf(533,390,a,15)+rect(511,355,42,35,p,5);
      if(v===0) content+=rect(155,175,260,158,p,12)+rect(168,188,234,131,b,5)+rect(181,208,79,96,a,5)+rect(278,210,101,10,p,4)+rect(278,237,80,8,a,4)+rect(278,264,62,28,p,8)+path("M266 332L250 380H318L302 332",p)+person(455,245,p,a,true);
      if(v===1) content+=rect(126,151,290,199,a,16)+rect(143,169,257,162,b,8)+rect(164,194,78,98,p,9)+rect(262,198,118,13,p,4)+rect(262,228,91,9,a,4)+rect(262,258,103,30,a,9)+rect(370,214,102,174,p,17)+rect(381,230,80,132,b,9)+circle(421,371,5,b);
      if(v===2) content+=rect(151,140,329,225,p,12)+rect(166,155,299,181,b,6)+path("M285 193L353 231L285 269Z",a)+rect(176,351,91,11,a,3)+person(105,245,p,a);
      if(v===3) content+=rect(183,206,267,183,a,6)+rect(220,269,60,120,p,4)+rect(303,254,110,80,b,6)+path("M165 207L198 151H435L469 207Z",p)+[0,1,2,3,4].map(i=>rect(165+i*61,207,61,25,i%2?a:p,11)).join("")+person(115,245,p,a);
      if(v===4) content+=rect(166,117,299,274,p,9)+[0,1,2].map(i=>rect(185,190+i*78,260,7,a,2)).join("")+Array.from({length:12},(_,i)=>rect(190+(i%4)*64,130+Math.floor(i/4)*78,31+(i%3)*7,60,i%2?a:b,3)).join("");
      if(v===5) content+=path("M159 390V206A108 108 0 0 1 375 206V390Z",a)+circle(267,211,60,b)+rect(343,293,136,14,p,5)+line(362,309,351,390,p,7)+line(461,309,476,390,p,7)+leaf(435,289,p,-20)+rect(414,268,42,25,a,4);
      if(v===6) content+=path("M287 323L290 173L340 112L389 173L392 323L341 299Z",p)+circle(340,193,27,b)+path("M316 318L341 394L367 318Z",a)+path("M289 261L251 332L289 315M391 261L429 332L391 315",a)+[0,1,2].map(i=>circle(175+i*150,139+i%2*160,7,p)).join("");
      if(v===7) content+=[0,1,2,3,4].map(i=>{const h=[123,211,162,266,137][i];return rect(108+i*88,390-h,69,h,i%2?a:p,5)+[0,1,2].map(j=>rect(123+i*88,405-h+j*34,13,16,b,2)+rect(147+i*88,405-h+j*34,13,16,b,2)).join("");}).join(""); break;
    }
  }
  const fullBleed=["backgrounds","patterns","dividers"].includes(asset.category);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 640 480" preserveAspectRatio="${fullBleed ? "none" : "xMidYMid meet"}" role="img"><title>${asset.name}</title><desc>Original Naqsh vector. CC0-1.0. ${asset.english}.</desc>${o.transparent ? "" : rect(0,0,640,480,b)}${content}</svg>`;
}
export function renderSourceAsset(asset:Asset,svg:string,raw:SvgOptions):string{
  const o=normalizeOptions(raw),box=/\bviewBox="([^"]+)"/.exec(svg)?.[1]||"0 0 24 24";
  let body=svg.replace(svgOpeningTag,"").replace(/<\/svg>\s*$/,"");
  body=body.replace(/currentColor/g,o.primary).replace(/stroke-width="([\d.]+)"/g,(_,width:string)=>`stroke-width="${Number(width)*o.stroke/5}"`);
  const notice=sourceLicense(asset.source||"").replace(/--/g,"- -");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 640 480" role="img"><!-- Naqsh license:\n${notice}\n--><title>${asset.name}</title><desc>${asset.author}. ${asset.license}. Modified color and layout by Naqsh.</desc>${o.transparent?"":`<rect width="640" height="480" fill="${o.background}"/>`}<svg x="160" y="80" width="320" height="320" viewBox="${box}">${body}</svg></svg>`;
}
