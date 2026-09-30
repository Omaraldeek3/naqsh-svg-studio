import type {Asset} from "./catalog.ts";
import type {SvgOptions} from "./svg.ts";

export type Point=[number,number];
type Cell={width:number;height:number;body:string};
const num=(v:number)=>Number(v.toFixed(5));
const repeat=(count:number,fn:(i:number)=>string)=>Array.from({length:count},(_,i)=>fn(i)).join("");
const move=(body:string,x:number,y:number)=>`<g transform="translate(${num(x)} ${num(y)})">${body}</g>`;
const path=(d:string,o:SvgOptions,accent=false)=>`<path d="${d}" fill="none" stroke="${accent?o.accent:o.primary}" stroke-width="${num(o.stroke*.42)}" stroke-linejoin="miter" stroke-linecap="butt"/>`;
const regular=(cx:number,cy:number,r:number,count:number,phase=-Math.PI/2):Point[]=>Array.from({length:count},(_,i)=>[cx+r*Math.cos(phase+i*Math.PI*2/count),cy+r*Math.sin(phase+i*Math.PI*2/count)]);
const star=(cx:number,cy:number,r:number,inner:number,count:number,phase=-Math.PI/2):Point[]=>Array.from({length:count*2},(_,i)=>[cx+(i%2?inner:r)*Math.cos(phase+i*Math.PI/count),cy+(i%2?inner:r)*Math.sin(phase+i*Math.PI/count)]);
const polygonPath=(points:Point[])=>points.map(([x,y],i)=>`${i?"L":"M"}${num(x)} ${num(y)}`).join("")+"Z";

// Intersect adjacent parallel edges to make real inset outlines, including concave stars.
// Scaling a polygon around its center would not keep an even distance between its lines.
export function insetPolygon(points:Point[],distance:number):Point[]{
  const area=points.reduce((sum,[x,y],i)=>{const q=points[(i+1)%points.length];return sum+x*q[1]-q[0]*y;},0),sign=area>=0?1:-1;
  return points.map((current,i)=>{
    const prev=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
    const u:Point=[current[0]-prev[0],current[1]-prev[1]],v:Point=[next[0]-current[0],next[1]-current[1]],ul=Math.hypot(...u),vl=Math.hypot(...v);
    const a:Point=[current[0]-sign*u[1]/ul*distance,current[1]+sign*u[0]/ul*distance],b:Point=[current[0]-sign*v[1]/vl*distance,current[1]+sign*v[0]/vl*distance];
    const cross=u[0]*v[1]-u[1]*v[0];if(Math.abs(cross)<1e-9)return a;
    const t=((b[0]-a[0])*v[1]-(b[1]-a[1])*v[0])/cross;
    return [a[0]+t*u[0],a[1]+t*u[1]];
  });
}
function outlined(points:Point[],o:SvgOptions,edition=0,decorate=true):string{
  let body=path(polygonPath(insetPolygon(points,1.4)),o)+path(polygonPath(insetPolygon(points,4.1)),o);
  if(!decorate||edition===0)return body;
  const cx=points.reduce((sum,p)=>sum+p[0],0)/points.length,cy=points.reduce((sum,p)=>sum+p[1],0)/points.length,r=Math.min(...points.map(p=>Math.hypot(p[0]-cx,p[1]-cy)));
  if(edition===1)body+=path(polygonPath(star(cx,cy,r*.53,r*.26,points.length===8?8:6)),o,true);
  if(edition===2)body+=path(polygonPath(regular(cx,cy,r*.34,4)),o)+repeat(points.length,i=>{const p=points[i],x=cx+(p[0]-cx)*.63,y=cy+(p[1]-cy)*.63;return path(polygonPath(regular(x,y,2.2,4)),o,true);});
  if(edition===3)body+=path(polygonPath(points.map(p=>[cx+(p[0]-cx)*.66,cy+(p[1]-cy)*.66])),o,true)+path(polygonPath(star(cx,cy,r*.32,r*.17,8)),o);
  return body;
}
const octagon=(x:number,y:number,cut:number):Point[]=>[[x-50,y-cut],[x-cut,y-50],[x+cut,y-50],[x+50,y-cut],[x+50,y+cut],[x+cut,y+50],[x-cut,y+50],[x-50,y+cut]];
function truncate(points:Point[]):Point[]{return points.flatMap((p,i)=>{const q=points[(i+1)%points.length];return [[p[0]+(q[0]-p[0])/3,p[1]+(q[1]-p[1])/3],[p[0]+(q[0]-p[0])*2/3,p[1]+(q[1]-p[1])*2/3]] as Point[];});}
function networkCell(f:number,e:number,o:SvgOptions):Cell{
  let width=100,height=100,body="";
  if([0,7,10].includes(f)){
    const cut=f===0?50/(1+Math.SQRT2):f===7?35:15,r=50-cut;
    body=outlined(octagon(50,50,cut),o,e)+[[0,0],[100,0],[0,100],[100,100]].map(([x,y])=>outlined(regular(x,y,r,4),o,0,false)+(f===7?"":path(polygonPath(star(x,y,r*.61,r*.28,f===0?6:8)),o))).join("");
    if(f===7)body+=outlined(regular(50,50,33,4,Math.PI/4),o,0,false);
  }
  if([1,4,6].includes(f)){
    width=120;height=40*Math.sqrt(3);
    const centers=[[0,0],[120,0],[0,height],[120,height],[60,height/2]];
    body=centers.map(([x,y])=>outlined(regular(x,y,40,6,0),o,e,false)+outlined(f===6?regular(x,y,28,6,0):star(x,y,f===4?30:32,f===4?21:17,f===4?12:6,0),o,e)).join("");
    if(f===6)body+=centers.map(([x,y])=>path(polygonPath(star(x,y,18,10,6,0)),o,true)).join("");
  }
  if(f===2||f===9){
    width=100;height=100*Math.sqrt(3);const h=height/2;
    for(let row=0;row<2;row++)for(let col=-1;col<2;col++){
      const x=col*100+row*50,y=row*h;
      const triangles:Point[][]=[[[x,y],[x+100,y],[x+50,y+h]],[[x+100,y],[x+150,y+h],[x+50,y+h]]];
      for(const triangle of triangles)body+=outlined(f===2?truncate(triangle):triangle,o,e);
      if(f===2)body+=outlined(regular(x,y,100/3,6,0),o,e);
    }
    if(f===2)body+=repeat(3,i=>outlined(regular((i-1)*100,height,100/3,6,0),o,e));
  }
  if(f===3){
    body=outlined(star(50,50,50,32,8),o,e)+[[0,0],[100,0],[0,100],[100,100]].map(([x,y])=>outlined(regular(x,y,20,8),o,0,false)).join("")+
      path("M47 0V9M53 0V9M47 91V100M53 91V100M0 47H9M0 53H9M91 47H100M91 53H100",o);
  }
  if(f===5){body=[[50,50],[0,0],[100,0],[0,100],[100,100]].map(([x,y])=>outlined(regular(x,y,50,4),o,e)+path(polygonPath(star(x,y,30,12,4)),o)).join("");}
  if(f===8){
    body=outlined([[35,0],[65,0],[65,35],[100,35],[100,65],[65,65],[65,100],[35,100],[35,65],[0,65],[0,35],[35,35]],o,e)+
      [[0,0],[65,0],[0,65],[65,65]].map(([x,y])=>outlined([[x,y],[x+35,y],[x+35,y+35],[x,y+35]],o,0,false)).join("");
  }
  if(f===11){width=160;height=160;body=outlined(star(80,80,73,42,10,0),o,e)+[[0,0],[160,0],[0,160],[160,160]].map(([x,y])=>outlined(regular(x,y,34,4),o,0,false)).join("")+path("M0 76H10M0 84H10M150 76H160M150 84H160M76 0V10M84 0V10M76 150V160M84 150V160",o);}
  return {width,height,body};
}
function ribbonCell(f:number,o:SvgOptions):Cell{
  const width=[160,160,120,160,100,120,160,120,200,120,100,160][f],height=100;
  let body="";
  if(f===0||f===8){
    const count=f===8?12:8,r=f===8?34:30;
    body=outlined(star(0,50,r,r*.58,count),o,0,false)+outlined(star(width,50,r,r*.58,count),o,0,false)+outlined([[r+7,23],[width-r-7,23],[width-r-7,35],[width-r-1,50],[width-r-7,65],[width-r-7,77],[r+7,77],[r+7,65],[r+1,50],[r+7,35]],o,0,false)+path(`M${r-2} 47H${r+7}M${r-2} 53H${r+7}M${width-r-7} 47H${width-r+2}M${width-r-7} 53H${width-r+2}`,o);
  }
  if(f===1){
    body=repeat(3,i=>outlined(regular(i*80,27,25,6,0),o,0,false)+outlined(regular(40+i*80,73,25,6,0),o,0,false))+
      repeat(4,index=>{const i=index-1;return outlined([[i*80+27,7],[i*80+53,7],[i*80+43,27],[i*80+53,47],[i*80+27,47],[i*80+37,27]],o,0,false)+outlined([[i*80+67,53],[i*80+93,53],[i*80+83,73],[i*80+93,93],[i*80+67,93],[i*80+77,73]],o,0,false);});
  }
  if(f===2){
    body=repeat(3,row=>repeat(3,col=>outlined(regular(col*60+(row%2)*30,15+row*35,20,6,0),o,0,false)))+path("M0 33H15M45 33H75M105 33H120M15 68H45M75 68H105",o);
  }
  if(f===3||f===11){
    body=[40,120].map(x=>outlined(regular(x,50,35,8,Math.PI/8),o,0,false)+(f===11?outlined(star(x,50,25,14,8),o,0,false):"")).join("")+[0,80,160].map(x=>outlined(regular(x,50,16,4),o,0,false)).join("");
  }
  if(f===4){body=path("M-10 20L40 80L90 20L140 80L190 20M-10 27L40 87L90 27L140 87L190 27M-10 80L40 20L90 80L140 20L190 80M-10 73L40 13L90 73L140 13L190 73",o);}
  if(f===5){body=path("M0 20H90V80H30V40H70V60H50M0 27H83V73H37V47H63V53H50M90 20H120M90 27H120M0 80H30M0 73H30M90 80H120M90 73H120",o);}
  if(f===6){body=[0,80,160].map(x=>outlined(star(x,50,39,22,6,0),o,0,false)).join("")+outlined(regular(40,50,18,4),o,0,false)+outlined(regular(120,50,18,4),o,0,false);}
  if(f===7){body=repeat(3,i=>outlined([[i*40,50],[i*40+20,14],[i*40+40,50],[i*40+20,86]],o,0,false)+path(`M${i*40+13} 50L${i*40+20} 37L${i*40+27} 50L${i*40+20} 63Z`,o));}
  if(f===9){body=outlined([[0,20],[40,20],[40,40],[80,40],[80,20],[120,20],[120,80],[80,80],[80,60],[40,60],[40,80],[0,80]],o,0,false)+outlined([[48,10],[72,10],[72,90],[48,90]],o,0,false);}
  if(f===10){body=outlined(regular(25,28,24,4),o,0,false)+outlined(regular(75,28,24,4),o,0,false)+outlined(regular(0,72,24,4),o,0,false)+outlined(regular(50,72,24,4),o,0,false)+outlined(regular(100,72,24,4),o,0,false)+path("M0 48H100M0 52H100",o);}
  body+=path(`M0 3H${width}M0 8H${width}M0 92H${width}M0 97H${width}`,o);
  return {width,height,body};
}
export function repeatCell(asset:Asset,o:SvgOptions):Cell{
  if(!asset.construction)throw new Error("هذا التصميم لا يحتوي على وحدة تكرار هندسية");
  const f=Math.floor(asset.variant/4),e=asset.variant%4;
  return asset.construction==="network"?networkCell(f,e,o):ribbonCell(f,o);
}
function pattern(id:string,cell:Cell,size:number):string{
  return `<defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="${num(size)}" height="${num(size*cell.height/cell.width)}" viewBox="0 0 ${num(cell.width)} ${num(cell.height)}">${cell.body}</pattern></defs>`;
}
function description(asset:Asset){return `<title>${asset.name}</title><desc>Original Naqsh geometric construction inspired by connected ornament. CC0-1.0. ${asset.english}.</desc>`;}
export function renderGeometricOrnament(asset:Asset,o:SvgOptions):string{
  const cell=repeatCell(asset,o),e=asset.variant%4,id=`orn-${asset.id}-${o.primary.slice(1)}-${o.accent.slice(1)}-${o.density}-${o.stroke}`;
  let body="",canvasHeight=480;
  if(asset.construction==="network")body=pattern(id,cell,640/o.density)+`<rect width="640" height="480" fill="url(#${id})"/>`;
  else{
    const scale=640/o.density/cell.width,h=cell.height*scale,count=e===1?2:e===2?3:1;
    // Each band repeats horizontally only; the complete cell includes its framing rails.
    canvasHeight=Math.max(480,count*h+(count+1)*24);
    const gap=(canvasHeight-count*h)/(count+1),ys=Array.from({length:count},(_,i)=>gap+i*(h+gap));
    const strips=e===3?`<rect width="244" height="${num(h)}" fill="url(#${id})"/><rect x="396" width="244" height="${num(h)}" fill="url(#${id})"/>`:`<rect width="640" height="${num(h)}" fill="url(#${id})"/>`;
    body=pattern(id,cell,640/o.density)+ys.map(y=>move(strips,0,y)).join("");
    if(e===3)body+=move(outlined(star(0,0,61,34,8),o,0,false)+path(polygonPath(regular(0,0,18,8)),o,true)+path("M-78-3H-56M-78 3H-56M56-3H78M56 3H78",o),320,canvasHeight/2);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 640 ${num(canvasHeight)}" preserveAspectRatio="xMidYMid meet" role="img">${description(asset)}${o.transparent?"":`<rect width="640" height="${num(canvasHeight)}" fill="${o.background}"/>`}${body}</svg>`;
}
export function renderGeometricTile(asset:Asset,o:SvgOptions):string{
  const cell=repeatCell(asset,o);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${num(cell.width)}" height="${num(cell.height)}" viewBox="0 0 ${num(cell.width)} ${num(cell.height)}" role="img">${description(asset)}${o.transparent?"":`<rect width="${num(cell.width)}" height="${num(cell.height)}" fill="${o.background}"/>`}${cell.body}</svg>`;
}
