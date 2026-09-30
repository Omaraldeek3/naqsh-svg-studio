import type {Asset} from "./catalog.ts";
import type {SvgOptions} from "./svg.ts";

const n=(v:number)=>Number(v.toFixed(3));
const repeat=(count:number,draw:(i:number)=>string)=>Array.from({length:count},(_,i)=>draw(i)).join("");
const group=(transform:string,body:string)=>`<g transform="${transform}">${body}</g>`;
const path=(d:string,stroke:string,width:number,fill="none")=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${n(width)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle=(x:number,y:number,r:number,stroke:string,width:number,fill="none")=>`<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${n(width)}"/>`;
const points=(count:number,r:number,inner?:number)=>repeat(inner?count*2:count,i=>{
  const angle=i*Math.PI*2/(inner?count*2:count)-Math.PI/2,rad=inner&&i%2?inner:r;
  return `${n(Math.cos(angle)*rad)},${n(Math.sin(angle)*rad)} `;
});
const polygon=(count:number,r:number,stroke:string,width:number,inner?:number)=>`<polygon points="${points(count,r,inner)}" fill="none" stroke="${stroke}" stroke-width="${n(width)}" stroke-linejoin="round"/>`;

function leaf(f:number,p:string,a:string,sw:number):string {
  const shapes=[
    "M0 0C-25-12-23-39 0-58C16-29 20-9 0 0Z",
    "M0 0Q-35-25-9-61Q7-33 0 0Z",
    "M0 0L-20-11L-10-20L-27-27L-9-35L-18-46L0-63L12-40L5-29L18-20L6-12Z",
    "M0 0C-31-2-27-12-17-20C-38-24-25-38-14-32C-27-49-9-45 0-63C8-37 27-49 16-32C32-33 33-18 15-19C24-4 17 2 0 0Z",
    "M0 0C-38-8-30-35-10-25C-15-45-3-58 0-69C3-58 15-45 10-25C30-35 38-8 0 0Z",
    "M0 0Q-27-1-36-22L-21-25L-30-42L-13-39L0-66L13-39L30-42L21-25L36-22Q27-1 0 0Z",
    "M0 0C-24-5-27-39-7-45L-10-54L0-49L10-54L7-45C27-39 24-5 0 0Z",
    "M0 0Q-30-15-25-52L-9-40L0-67L9-40L25-52Q30-15 0 0Z",
  ];
  return path(shapes[f%8],p,sw,a)+path(f===6?"M-12-30Q0-39 12-30":"M0-5Q-3-25 0-48",p,sw*.65);
}
function sprig(f:number,p:string,a:string,sw:number):string {
  const count=4+(f%3),bend=(f%2?1:-1)*18;
  return path(`M0 8Q${bend} -45 0 -131`,p,sw)+repeat(count,i=>{
    const y=-18-i*23,x=n(Math.sin(i*.8)*bend*.4),scale=.42+(i%2)*.08;
    return group(`translate(${x} ${y}) rotate(-${45+i*4}) scale(${scale})`,leaf(f,p,a,sw))+
      group(`translate(${x} ${y-5}) rotate(${45+i*4}) scale(${-scale} ${scale})`,leaf(f,p,a,sw));
  })+group("translate(0 -109) scale(.45)",leaf(f,p,a,sw));
}
function scroll(f:number,p:string,a:string,sw:number):string {
  const curl=28+(f%4)*4,reach=93+(f%3)*5;
  return path(`M0 0C-4-23 ${curl+25}-27 ${curl+21}-58C${curl+17}-${reach} 7-${reach+7} 6-${reach-16}C5-${reach-2} 23-${reach-1} 25-${reach-10}`,p,sw)+
    repeat(3+(f%3),i=>group(`translate(${13+i*7} ${-20-i*15}) rotate(${35+i*14}) scale(${.36+i*.025})`,leaf(f,p,a,sw)))+
    group(`translate(${curl+17} -59) rotate(115) scale(.48)`,leaf((f+3)%8,p,a,sw));
}
function mirroredScroll(f:number,p:string,a:string,sw:number):string {
  const motif=scroll(f,p,a,sw);
  return motif+group("scale(-1 1)",motif);
}
function rose(f:number,e:number,p:string,a:string,sw:number):string {
  const count=[8,12,10,8,16,12,10,16][f],length=128+e*4,width=27+(f%3)*7;
  const petal=f===5?`M0-30L-${width}-84L-14-${length-15}L0-${length}L14-${length-15}L${width}-84Z`:f===4?`M-8-40L-18-89L0-${length}L18-89L8-40Z`:f===3?`M0-23L-42-78L0-${length}L42-78Z`:f===7?`M0-37C-49-69-21-${length+8} 0-${length}C21-${length+8} 49-69 0-37Z`:
    `M0-26C-${width+18}-57 -${width}-${length-8} 0-${length}C${width}-${length-8} ${width+18}-57 0-26Z`;
  let body=repeat(count,i=>group(`rotate(${n(i*360/count)})`,path(petal,p,sw,i%2?a:"none")));
  if(f===3)body+=polygon(8,105,a,sw,70)+group("rotate(22.5)",polygon(8,87,p,sw,48));
  if(f===7)body+=group("rotate(11.25) scale(.54)",repeat(16,i=>group(`rotate(${i*22.5})`,path(petal,p,sw,a))));
  if(e===1||e===5)body+=group(`rotate(${180/count}) scale(.7)`,repeat(count,i=>group(`rotate(${n(i*360/count)})`,path(petal,p,sw,"none"))));
  if(e===2)body+=polygon(count,83,p,sw,40);
  if(e===3)body+=circle(0,0,length+13,p,sw)+circle(0,0,length+21,a,sw*.8);
  if(e===4)body+=repeat(count,i=>group(`rotate(${n(i*360/count+180/count)}) translate(0 -169) scale(.37)`,leaf(f,p,a,sw)));
  if(e===5)body+=repeat(count,i=>group(`rotate(${n(i*360/count)})`,path(`M-7-${length+9}L0-${length+26}L7-${length+9}`,p,sw,a)));
  return body+circle(0,0,23+f%3*3,p,sw,a)+circle(0,0,9,p,sw);
}

function geometricTile(f:number,e:number,p:string,a:string,sw:number):string {
  const starCount=f===1?12:f===7?6:8,core=43-e*1.1;
  let body="";
  if([0,1,7].includes(f))body=group("translate(50 50)",polygon(starCount,core,p,sw,core*.48)+polygon(starCount,19+e,p,sw,10));
  if(f===2)body=path("M0 25L25 0L50 25L75 0L100 25L75 50L100 75L75 100L50 75L25 100L0 75L25 50Z M25 25H75V75H25Z",p,sw)+group("translate(50 50)",polygon(4,16,a,sw));
  if(f===3)body=path("M0 50L50 0L100 50L50 100Z M0 0L100 100M100 0L0 100",p,sw)+group("translate(50 50)",polygon(4,25+e,p,sw));
  if(f===4)body=path("M0 35H35V0M65 0V35H100M100 65H65V100M35 100V65H0 M35 35H65V65H35Z",p,sw)+group("translate(50 50)",polygon(8,36,p,sw,20));
  if(f===5)body=group("translate(50 50)",polygon(6,46,p,sw)+polygon(6,29,a,sw)+polygon(6,15,p,sw,7))+path("M7 25L0 25M7 75H0M93 25H100M93 75H100M50 4V0M50 96V100",p,sw);
  if(f===6)body=path("M0 100V50Q0 13 25 0Q50 13 50 50V100 M50 100V50Q50 13 75 0Q100 13 100 50V100",p,sw)+path("M10 100V53Q10 27 25 17Q40 27 40 53V100M60 100V53Q60 27 75 17Q90 27 90 53V100",a,sw);
  if(e===1)body+=group("translate(50 50)",polygon(8,48,a,sw*.7));
  if(e===2)body+=group("translate(50 50) scale(.15)",rose(2,0,p,a,sw*3));
  if(e===3)body+=group("translate(50 50)",polygon(starCount,core-5,a,sw*.7,core*.43));
  if(e===4)body+=repeat(4,i=>group(`translate(${i%2?100:0} ${i<2?0:100})`,polygon(4,14+f%3,p,sw)));
  if(e===5)body+=group("translate(50 50)",repeat(starCount,i=>group(`rotate(${n(i*360/starCount)})`,path("M0-25L0-35M-3-30H3",a,sw*.8))));
  return body;
}
function tiled(id:string,body:string,size:number):string {
  return `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="${n(size)}" height="${n(size)}" viewBox="0 0 100 100">${body}</pattern></defs><rect width="640" height="480" fill="url(#${id})"/>`;
}
function botanical(e:number,f:number,p:string,a:string,sw:number):string {
  const stem=sprig(f,p,a,sw);
  if(e===0)return group("translate(320 386) scale(2.25)",stem);
  if(e===1)return group("translate(320 240)",circle(0,0,143,p,sw*.7)+repeat(10,i=>group(`rotate(${i*36}) translate(0 -96) rotate(65) scale(.72)`,stem)));
  if(e===2)return group("translate(320 410)",repeat(5,i=>group(`rotate(${-48+i*24}) scale(${1.65+(i===2?.25:0)})`,stem)));
  if(e===3)return group("translate(112 365) rotate(18) scale(1.7)",stem)+group("translate(528 115) rotate(198) scale(1.7)",stem);
  if(e===4)return group("translate(103 285) rotate(90) scale(1.65)",stem)+group("translate(537 195) rotate(-90) scale(1.65)",stem)+group("translate(320 240) scale(.35)",rose(2,0,p,a,sw));
  return repeat(4,x=>repeat(3,y=>group(`translate(${86+x*156} ${130+y*145}) rotate(${(x+y)%2?18:-18}) scale(.8)`,stem)));
}
function arabesque(e:number,f:number,p:string,a:string,sw:number):string {
  const motif=mirroredScroll(f,p,a,sw);
  if(e===0)return group("translate(320 240)",repeat(8,i=>group(`rotate(${i*45}) translate(0 -21) scale(1.35)`,motif))+circle(0,0,19,p,sw,a));
  if(e===1)return path("M115 400V225Q115 130 320 66Q525 130 525 225V400",p,sw)+repeat(5,i=>group(`translate(${140+i*90} ${i===2?166:i===1||i===3?218:315}) rotate(${(i-2)*28}) scale(.9)`,motif));
  if(e===2)return group("translate(320 358) scale(2.1)",motif)+group("translate(320 122) rotate(180) scale(.9)",motif);
  if(e===3)return repeat(5,x=>repeat(4,y=>group(`translate(${65+x*128} ${102+y*117}) rotate(${(x+y)%2?180:0}) scale(.83)`,motif)));
  if(e===4)return group("translate(320 240)",circle(0,0,164,p,sw)+repeat(12,i=>group(`rotate(${i*30}) translate(0 -116) rotate(70) scale(.63)`,motif)));
  return group("translate(158 395) scale(1.65)",motif)+group("translate(482 395) scale(1.65)",motif)+group("translate(320 166) scale(1.15)",motif)+path("M152 392V213Q165 124 320 74Q475 124 488 213V392",a,sw*.8);
}
function frame(e:number,f:number,p:string,a:string,sw:number):string {
  const botanicalFamily=[1,3,0,1,4,1,5,3][f];
  const motif=f===2||f===5?sprig(botanicalFamily,p,a,sw):f===6?geometricTile(4,2,p,a,sw):f%3===0?rose(f%8,0,p,a,sw):mirroredScroll(f===7?7:botanicalFamily,p,a,sw);
  const corner=(x:number,y:number,rotation:number,scale=.5)=>group(`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`,motif);
  let body="";
  if(e===0||e===4){body=path("M92 78H548V402H92Z",p,sw)+[corner(110,106,-45,.4),corner(530,106,45,.4),corner(110,374,-135,.4),corner(530,374,135,.4)].join("");if(e===4)body+=path("M116 97H524V383H116Z",a,sw*.65);}
  if(e===1)body=path("M90 155V80H179M461 80H550V155M550 325V400H461M179 400H90V325",p,sw)+corner(139,130,-45,.52)+corner(501,130,45,.52)+corner(139,350,-135,.52)+corner(501,350,135,.52);
  if(e===2)body=path("M130 408V233Q130 125 320 63Q510 125 510 233V408Z",p,sw)+corner(320,112,180,.32)+corner(154,346,-45,.47)+corner(486,346,45,.47);
  if(e===3)body=`<ellipse cx="320" cy="240" rx="244" ry="162" fill="none" stroke="${p}" stroke-width="${sw}"/>`+repeat(8,i=>{const t=i*Math.PI/4;return corner(n(320+Math.cos(t)*230),n(240+Math.sin(t)*153),n(i*45+90),.32);});
  if(e===5)body=path("M320 58L573 240L320 422L67 240Z",p,sw)+corner(320,89,180,.35)+corner(320,391,0,.35)+corner(107,240,-90,.35)+corner(533,240,90,.35);
  return body;
}
function border(e:number,f:number,p:string,a:string,sw:number):string {
  const motif=[rose(0,0,p,a,sw),mirroredScroll(1,p,a,sw),sprig(0,p,a,sw),polygon(12,100,p,sw,53),rose(2,0,p,a,sw),sprig(1,p,a,sw),polygon(4,110,p,sw)+polygon(4,68,a,sw),mirroredScroll(3,p,a,sw)][f];
  const stamp=(x:number,y:number,angle:number,scale:number)=>group(`translate(${x} ${y}) rotate(${angle}) scale(${scale})`,motif);
  if(e===0)return path("M71 240H247M393 240H569",p,sw)+stamp(320,240,0,.5)+circle(65,240,4,p,sw,a)+circle(575,240,4,p,sw,a);
  if(e===1)return path("M30 171H610M30 309H610",a,sw*.6)+repeat(7,i=>stamp(62+i*86,245,0,.42));
  if(e===2)return path("M45 137H595M45 343H595",p,sw*.7)+repeat(6,i=>stamp(75+i*98,132,180,.34)+stamp(75+i*98,348,0,.34));
  if(e===3)return path("M80 242Q193 218 263 242M377 242Q447 218 560 242",p,sw)+stamp(244,248,-90,.83)+stamp(396,248,90,.83)+stamp(320,240,0,.27);
  if(e===4)return path("M65 326Q160 143 320 119Q480 143 575 326",p,sw)+repeat(7,i=>stamp(91+i*76,320-Math.sin(i*Math.PI/6)*168,n((i-3)*22),.38));
  return path("M251 50V430M389 50V430",a,sw*.7)+repeat(5,i=>stamp(320,75+i*82,90,.38));
}

export function renderOrnament(asset:Asset,o:SvgOptions):string {
  const f=Math.floor(asset.variant/6),e=asset.variant%6,p=o.primary,a=o.accent,sw=o.stroke*.62;
  const id=`orn-${asset.id}-${p.slice(1)}-${a.slice(1)}-${o.density}-${o.stroke}`;
  let content="";
  if(asset.category==="islamic")content=tiled(id,geometricTile(f,e,p,a,o.stroke*.34),640/o.density);
  if(asset.category==="arabesque")content=arabesque(e,f,p,a,sw);
  if(asset.category==="botanical")content=botanical(e,f,p,a,sw);
  if(asset.category==="rosettes")content=group("translate(320 240)",rose(f,e,p,a,sw));
  if(asset.category==="ornate-frames")content=frame(e,f,p,a,sw);
  if(asset.category==="ornate-borders")content=border(e,f,p,a,sw);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 640 480" preserveAspectRatio="xMidYMid meet" role="img"><title>${asset.name}</title><desc>Original Naqsh ornament construction inspired by geometric and botanical ornament. CC0-1.0. ${asset.english}.</desc>${o.transparent?"":`<rect width="640" height="480" fill="${o.background}"/>`}${content}</svg>`;
}
