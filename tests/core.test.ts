import test from "node:test";
import assert from "node:assert/strict";
import { assets,originalAssets,legacyAssets,ornamentAssets,ornamentCategories,tiktokAssets,importedAssets,categoryCounts, categories, searchAssets,galleryAssets } from "../src/lib/catalog.ts";
import {registerSource,iconCollections} from "../src/lib/icon-sources.ts";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import { renderAsset,renderRepeatTile,defaultOptions,assetOptions } from "../src/lib/svg.ts";
import {geometricAssets} from "../src/lib/geometric-data.ts";
import { crc32, makeZip, toReact,toCss,pngWithNotice } from "../src/lib/export.ts";
import {insetPolygon} from "../src/lib/geometric-ornaments.ts";
import { validateProject, newLayer, renderProject, emptyProject } from "../src/lib/project.ts";
import { namespaceSvg } from "../src/lib/sanitize.ts";

test("catalog retains legacy designs and adds six balanced ornament categories plus tiktok batch", () => {
  assert.equal(legacyAssets.length, 96);
  assert.equal(ornamentAssets.length,384);
  assert.equal(tiktokAssets.length, 12);
  assert.equal(originalAssets.length, 492);
  assert.ok(assets.length>10000);
  assert.equal(new Set(assets.map(a => a.id)).size, assets.length);
  assert.equal(categories.length, 19);
  for (const category of ornamentCategories) assert.equal(categoryCounts[category.id],["islamic","ornate-borders"].includes(category.id)?96:48);
  assert.equal(categoryCounts.tiktok, 12);
  assert.equal(new Set(originalAssets.map(a => renderAsset(a, defaultOptions))).size, 492);
});
test("ornaments are distinct geometry, not title or palette variants",()=>{
  const bodies=ornamentAssets.map(a=>renderAsset(a,defaultOptions).replace(/<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g,"").replace(/orn-[\w.-]+/g,"orn-id"));
  assert.equal(new Set(bodies).size,ornamentAssets.length);
  for(const asset of ornamentAssets){const svg=renderAsset(asset,{...defaultOptions,transparent:true});assert.doesNotMatch(svg,/NaN|Infinity|undefined/);assert.match(svg,/<path|<polygon|<circle/);assert.doesNotMatch(svg,/<rect width="640" height="480" fill="#/);}
});
test("default gallery prioritizes ornaments and secondary assets remain discoverable",()=>{
  assert.equal(galleryAssets(assets,"ornaments").length,384);
  assert.ok(galleryAssets(assets,"ornaments").every(a=>a.ornament));
  assert.equal(galleryAssets(assets,"tiktok").length,12);
  assert.equal(galleryAssets(assets,"interface").length,assets.length-396);
  assert.equal(galleryAssets(assets,"all").length,assets.length);
  assert.equal(searchAssets(galleryAssets(assets,"ornaments"),"زيتون").length,18);
  assert.equal(searchAssets(galleryAssets(assets,"ornaments"),"اسلامية").length,144);
});
test("tiktok CNC designs render valid unique SVGs and are discoverable in their scope",()=>{
  const bodies=tiktokAssets.map(a=>renderAsset(a,defaultOptions).replace(/<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g,"").replace(/tk-[\w.-]+/g,"tk-id"));
  assert.equal(new Set(bodies).size,12);
  assert.equal(searchAssets(assets,"تيك توك").length,12);
  for(const asset of tiktokAssets){
    const svg=renderAsset(asset,{...defaultOptions,transparent:true});
    assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
    assert.match(svg,/<path|<rect|<circle|<polygon|<line/);
    assert.doesNotMatch(svg,/<rect x="0" y="0" width="(640|1920)" height="(480|1440)"/);
  }
});
test("connected geometric patterns and ribbons export self-contained repeat tiles",()=>{
  assert.equal(geometricAssets.length,96);
  assert.equal(searchAssets(ornamentAssets,"شبكات متصلة").length,48);
  assert.equal(searchAssets(ornamentAssets,"أشرطة هندسية").length,48);
  for(const asset of geometricAssets){const tile=renderRepeatTile(asset,{...assetOptions(asset),primary:"#222222",stroke:3});assert.ok(tile);assert.match(tile,/viewBox="0 0 [\d.]+ [\d.]+"/);assert.match(tile,/#222222/);assert.doesNotMatch(tile,/NaN|Infinity|undefined|<image|<pattern|<script/);assert.match(tile,/<path/);}
  assert.throws(()=>renderRepeatTile(legacyAssets[0],defaultOptions));
});
test("repeat CSS retains the tile ratio and geometric offsets are consistent",()=>{
  assert.deepEqual(insetPolygon([[0,0],[10,0],[10,10],[0,10]],2),[[2,2],[8,2],[8,8],[2,8]]);
  const tile=renderRepeatTile(geometricAssets[0],assetOptions(geometricAssets[0]));
  const css=toCss(tile,[160,160]);assert.match(css,/background-size: 160px 160px/);assert.match(css,/background-repeat: repeat/);assert.doesNotMatch(css,/cover/);
  assert.match(toCss(tile),/background-size: cover/);
});
test("search supports Arabic, English, categories and favorites", () => {
  assert.ok(searchAssets(assets, "موجة").length > 0);
  assert.ok(searchAssets(assets, "wave").length > 0);
  assert.equal(searchAssets(assets, "", "icons").length,categoryCounts.icons);
  assert.equal(searchAssets(assets, "", "all", [assets[0].id]).length, 1);
  assert.equal(searchAssets(assets, "__does_not_exist__").length, 0);
});
test("every SVG is deterministic, self contained and accepts colors and dimensions", () => {
  for (const asset of originalAssets) {
    const svg = renderAsset(asset, { ...defaultOptions, primary: "#112233", width: 900, height: 600 });
    assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
    assert.match(svg, /width="900"/);
    assert.match(svg, /height="600"/);
    assert.doesNotMatch(svg, /<script|<foreignObject|https?:\/\/(?!www.w3.org)/);
    assert.equal(svg, renderAsset(asset, { ...defaultOptions, primary: "#112233", width: 900, height: 600 }));
  }
  assert.doesNotMatch(renderAsset(assets[0], { ...defaultOptions, primary: '" onload="alert(1)' }), /onload/);
});
test("all imported icons exist as distinct local SVGs with preserved source metadata",()=>{
  const hashes=new Set<string>();
  assert.equal(iconCollections.reduce((n,c)=>n+c.count,0),importedAssets.length);
  for(const asset of importedAssets){
    const svg=readFileSync(new URL(`../public/assets/icons/${asset.id}.svg`,import.meta.url),"utf8");
    assert.match(svg,/<path|<circle|<rect|<g/);
    assert.doesNotMatch(svg,/<script|<foreignObject|\bon\w+\s*=|\bhref\s*=/i);
    const shape=svg.replace(/<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g,"");
    const hash=createHash("sha256").update(shape).digest("hex");assert.ok(!hashes.has(hash),asset.id);hashes.add(hash);
    assert.ok(asset.source);assert.ok(["MIT","Apache-2.0"].includes(asset.license));
  }
});
test("imported SVG customization and React export retain provenance and license",()=>{
  const asset=importedAssets.find(a=>a.id==="tabler-home")!;
  registerSource(asset.id,readFileSync(new URL(`../public/assets/icons/${asset.id}.svg`,import.meta.url),"utf8"));
  const svg=renderAsset(asset,{...defaultOptions,primary:"#112233"});assert.match(svg,/#112233/);assert.match(svg,/SPDX-License-Identifier: MIT/);assert.doesNotMatch(svg,/CC0/);
  assert.match(toReact(svg),/Permission is hereby granted/);
  const layer=newLayer(asset);assert.ok(layer.sourceSvg);assert.match(renderProject({...emptyProject,layers:[layer]}),/#28634e/);
});
test("PNG metadata preserves source notices as UTF-8 with a valid checksum",()=>{
  const png=new Uint8Array(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6RxoAAAAASUVORK5CYII=","base64"));
  const out=pngWithNotice(png,"SPDX-License-Identifier: MIT\nPaweł Kuna");
  assert.equal(Buffer.from(out.subarray(0,8)).toString("hex"),"89504e470d0a1a0a");
  const view=new DataView(out.buffer);let offset=8,found=false;
  while(offset<out.length){const length=view.getUint32(offset),type=Buffer.from(out.subarray(offset+4,offset+8)).toString();if(type==="iTXt"){found=true;assert.match(new TextDecoder().decode(out.subarray(offset+8,offset+8+length)),/Paweł Kuna/);assert.equal(view.getUint32(offset+8+length),crc32(out.subarray(offset+4,offset+8+length)));}offset+=12+length;}
  assert.ok(found);assert.equal(offset,out.length);
});
test("exports preserve JSX syntax and ZIP checksums", () => {
  assert.equal(crc32(new TextEncoder().encode("123456789")), 0xcbf43926);
  const zip = makeZip([{ name: "asset.svg", content: "<svg/>" }]);
  assert.equal(new DataView(zip.buffer).getUint32(0, true), 0x04034b50);
  assert.equal(new DataView(zip.buffer).getUint32(zip.length - 22, true), 0x06054b50);
  const jsx = toReact('<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2"><path fill-rule="evenodd"/></svg>');
  assert.match(jsx, /strokeWidth/);
  assert.match(jsx, /fillRule/);
  assert.match(jsx, /SVGProps/);
});
test("project import validates limits and references instead of accepting arbitrary markup", () => {
  const layer = newLayer(assets[0]);
  const project = validateProject({ version: 1, width: 1200, height: 800, background: "#ffffff", layers: [layer] });
  assert.equal(project.layers.length, 1);
  assert.throws(() => validateProject({ version: 9 }));
  assert.throws(() => validateProject({ version: 1, width: -1, height: 800, background: "red", layers: [] }));
  assert.throws(() => validateProject({ version: 1, width: 1200, height: 800, background: "#ffffff", layers: [{ ...layer, assetId: "missing" }] }));
});
test("React export preserves imported literal braces without creating executable JSX expressions", () => {
  const jsx = toReact('<svg xmlns="http://www.w3.org/2000/svg"><title>{alert(1)}</title><text>Price {USD}</text></svg>');
  assert.doesNotMatch(jsx, /<title>\{alert\(1\)\}/);
  assert.match(jsx, /&#123;alert\(1\)&#125;/);
  assert.match(jsx, /Price &#123;USD&#125;/);
});
test("React export removes XML-only nodes and keeps CDATA as literal text", () => {
  const jsx=toReact('<svg xmlns="http://www.w3.org/2000/svg"><!-- art --><?source test?><text><![CDATA[Hello <world> {user}]]></text></svg>');
  assert.doesNotMatch(jsx,/<!--|<\?|<!\[CDATA\[/);
  assert.match(jsx,/Hello &lt;world&gt; &#123;user&#125;/);
});
test("composed SVG namespaces local references including permitted whitespace", () => {
  const svg=namespaceSvg('<svg><defs><linearGradient id="paint"/></defs><rect fill="url( #paint )"/><path stroke="url(#paint)"/></svg>',"layer-1");
  assert.match(svg,/id="layer-1-paint"/);
  assert.match(svg,/fill="url\(#layer-1-paint\)"/);
  assert.match(svg,/stroke="url\(#layer-1-paint\)"/);
});
test("composition root resizing preserves quoted greater-than attribute values", () => {
  const layer={...newLayer(assets[0]),assetId:"imported",customSvg:'<svg xmlns="http://www.w3.org/2000/svg" aria-label="A > B" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>'};
  const svg=renderProject({...emptyProject,layers:[layer]});
  assert.match(svg,/aria-label="A > B"/);
  assert.match(svg,/viewBox="0 0 10 10" x="0" y="0" width="560" height="420"/);
});
