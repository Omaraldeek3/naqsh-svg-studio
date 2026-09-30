import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root=path.resolve("out"),port=Number(process.env.PORT||3015);
const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".json":"application/json",".svg":"image/svg+xml",".woff2":"font/woff2",".woff":"font/woff",".png":"image/png",".txt":"text/plain; charset=utf-8"};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url||"/","http://localhost"),decoded=decodeURIComponent(url.pathname),target=path.resolve(root,`.${decoded}`);if(path.relative(root,target).startsWith("..")){res.writeHead(403);res.end();return;}let file=target;const stat=await fs.stat(file);if(stat.isDirectory())file=path.join(file,"index.html");const data=await fs.readFile(file);res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","X-Content-Type-Options":"nosniff"});res.end(data);}catch{try{const data=await fs.readFile(path.join(root,"404.html"));res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});res.end(data);}catch{res.writeHead(404);res.end("Build first with npm run build.");}}});
server.listen(port,"127.0.0.1",()=>console.log(`Naqsh preview: http://127.0.0.1:${port}`));
