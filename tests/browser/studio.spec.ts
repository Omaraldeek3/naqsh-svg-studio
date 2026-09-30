import {test,expect} from "@playwright/test";
import fs from "node:fs/promises";
test.beforeEach(async({page})=>{await page.goto("/");await expect(page.getByRole("heading",{name:"الزخرفة تبدأ من هنا."})).toBeVisible();await expect(page.locator(".app-shell")).toHaveAttribute("data-ready","true");});
test("connected geometric references are discoverable and export tiles, repeat CSS and PNG",async({page})=>{
  await page.getByRole("button",{name:/شبكات متشابكة 48 نمطًا/}).click();await expect(page.locator(".results-line strong")).toHaveText("48");
  await page.getByRole("button",{name:"تخصيص مثمنات ونجوم متصلة · خطوط مزدوجة",exact:true}).click();const dialog=page.getByRole("dialog");
  await dialog.getByLabel("الأساسي",{exact:true}).fill("#212121");await dialog.getByRole("slider",{name:"الكثافة",exact:true}).fill("6");await dialog.getByRole("slider",{name:"سماكة الخط",exact:true}).fill("5");
  await expect(dialog.locator(".asset-preview path").first()).toHaveAttribute("stroke-width","2.1");await dialog.locator(".asset-preview").screenshot({path:"test-results/geometric-pattern-preview.png"});
  await dialog.getByRole("combobox").selectOption("png");let download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();let file=await download;expect((await fs.readFile((await file.path())!)).subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  await dialog.getByRole("combobox").selectOption("tile");await expect(dialog.locator(".repeat-tile-art svg")).toHaveAttribute("viewBox","0 0 100 100");await expect(dialog.getByRole("slider",{name:"الكثافة",exact:true})).toHaveCount(0);
  download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل وحدة التكرار",exact:true}).click();file=await download;expect(file.suggestedFilename()).toBe("geometric-weave-1-1-tile.svg");const tile=await fs.readFile((await file.path())!,"utf8");expect(tile).toContain("#212121");expect(tile).not.toContain("<pattern");
  await dialog.getByRole("combobox").selectOption("css");download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();file=await download;expect(await fs.readFile((await file.path())!,"utf8")).toContain("background-repeat: repeat");
  await dialog.getByRole("button",{name:"إغلاق",exact:true}).click();await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"مكتبة الزخارف",exact:true}).click();
  await page.getByRole("button",{name:/أشرطة هندسية 48 تكوينًا/}).click();await expect(page.locator(".results-line strong")).toHaveText("48");await page.screenshot({path:"test-results/geometric-ribbons.png",fullPage:false});
});
test("geometric network and ribbon repeat cells meet at their opposite raster edges",async({page})=>{
  const failures=await page.evaluate(async()=>{
    const manifest=await(await fetch("/assets/manifest.json")).json() as {id:string;category:string;construction?:string}[];
    const bad:{id:string;x:number;y:number}[]=[];
    for(const asset of manifest.filter(a=>a.construction)){
      const xml=new DOMParser().parseFromString(await(await fetch(`/assets/${asset.category}/${asset.id}.svg`)).text(),"image/svg+xml"),pattern=xml.querySelector("pattern")!;
      const box=pattern.getAttribute("viewBox")!.split(" ").map(Number),w=400,h=Math.round(w*box[3]/box[2]);
      const body=[...pattern.childNodes].map(n=>new XMLSerializer().serializeToString(n)).join("");
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${pattern.getAttribute("viewBox")}">${body}</svg>`;
      const img=new Image();img.src=`data:image/svg+xml,${encodeURIComponent(svg)}`;await img.decode();const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d")!;ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,w,h).data;
      let x=0,y=0;for(let row=0;row<h;row++)x+=Math.abs(pixels[(row*w)*4+3]-pixels[(row*w+w-1)*4+3]);for(let col=0;col<w;col++)y+=Math.abs(pixels[col*4+3]-pixels[((h-1)*w+col)*4+3]);x/=h;y/=w;if(x>12||(asset.construction==="network"&&y>12))bad.push({id:asset.id,x,y});
    }return bad;
  });expect(failures).toEqual([]);
});
test("ornaments lead the library with clear sections and separate secondary assets",async({page})=>{
  await expect(page.locator(".results-line strong")).toHaveText("384");
  await expect(page.locator(".asset-card [data-ornament=true]")).toHaveCount(24);
  await expect(page.locator(".secondary-categories")).not.toHaveAttribute("open","");
  await page.getByRole("navigation",{name:"أقسام الزخارف",exact:true}).getByRole("button",{name:/زخارف نباتية/}).click();
  await expect(page.locator(".results-line strong")).toHaveText("48");await expect(page.getByRole("heading",{name:"زخارف نباتية",exact:true})).toBeVisible();
  await page.getByRole("textbox",{name:"البحث في الأصول",exact:true}).fill("زيتون");await expect(page.locator(".asset-card")).toHaveCount(6);
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"مكتبة الزخارف",exact:true}).click();
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المجموعات",exact:true}).click();await expect(page.locator(".collection-card")).toHaveCount(6);
  const download=page.waitForEvent("download");await page.getByRole("button",{name:"تنزيل مجموعة هندسية إسلامية",exact:true}).click();const bytes=await fs.readFile((await(await download).path())!);expect(bytes.readUInt32LE(0)).toBe(0x04034b50);
});
test("Islamic patterns customize, export and compose with botanical ornaments",async({page})=>{
  await page.getByRole("button",{name:"تخصيص نجمة ثمانية · خطوط مزدوجة",exact:true}).click();
  const dialog=page.getByRole("dialog");await expect(dialog.getByRole("checkbox",{name:"خلفية شفافة",exact:true})).toBeChecked();
  await dialog.getByLabel("الأساسي",{exact:true}).fill("#884422");await dialog.getByRole("slider",{name:"الكثافة",exact:true}).fill("8");
  await expect(dialog.locator(".asset-preview pattern")).toHaveAttribute("width","80");await expect(dialog.locator(".asset-preview polygon").first()).toHaveAttribute("stroke","#884422");
  const download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();const file=await download;expect(file.suggestedFilename()).toBe("islamic-1-4.svg");const svg=await fs.readFile((await file.path())!,"utf8");expect(svg).toContain("CC0-1.0");expect(svg).toContain("patternUnits");
  await dialog.getByRole("button",{name:"أضف إلى الاستوديو",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(1);
  await page.getByRole("combobox",{name:"نوع أصول الاستوديو",exact:true}).selectOption("botanical");await page.getByRole("button",{name:"إضافة أوراق الزيتون · غصن منفرد",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(2);
  await page.reload();await expect(page.locator(".canvas-layer")).toHaveCount(2);
});
test("favorites category filters cannot leave the library in an incompatible scope",async({page})=>{
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المفضلة",exact:true}).click();
  await page.locator(".category-chips").getByRole("button",{name:"أشكال وعلامات",exact:true}).click();
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المكتبة",exact:true}).click();
  await expect(page.getByRole("heading",{name:"أشكال وعلامات",exact:true})).toBeVisible();await expect(page.locator(".asset-card")).toHaveCount(8);
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المفضلة",exact:true}).click();
  await page.locator(".category-chips").getByRole("button",{name:"زخارف نباتية",exact:true}).click();
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المكتبة",exact:true}).click();
  await expect(page.locator(".results-line strong")).toHaveText("48");await expect(page.locator(".asset-card [data-ornament=true]")).toHaveCount(24);
});
test("Arabic library search, empty state, categories, collections and theme",async({page})=>{
  await expect(page.locator("html")).toHaveAttribute("dir","rtl");
  await expect(page.locator(".asset-card")).toHaveCount(24);
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"أصول الواجهات",exact:true}).click();
  await page.keyboard.press("/");await expect(page.getByRole("textbox",{name:"البحث في الأصول"})).toBeFocused();
  await page.getByRole("textbox",{name:"البحث في الأصول"}).fill("موجة");await expect(page.locator(".asset-card")).toHaveCount(4);
  await page.getByRole("textbox",{name:"البحث في الأصول"}).fill("a_nonexistent_asset");await expect(page.getByText("لم نجد أصلًا بهذا الوصف")).toBeVisible();
  await page.getByRole("button",{name:"تصفّح جميع الأصول",exact:true}).click();
  await page.locator(".secondary-categories summary").click();await page.getByRole("navigation",{name:"أصول الواجهات",exact:true}).getByRole("button",{name:/أيقونات/}).click();await expect(page.locator(".asset-card")).toHaveCount(24);
  await page.getByRole("button",{name:"الوضع الداكن",exact:true}).click();await expect(page.locator(".app-shell")).toHaveAttribute("data-theme","dark");
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"المجموعات"}).click();await expect(page.locator(".collection-card")).toHaveCount(14);
  const download=page.waitForEvent("download");await page.getByRole("button",{name:"تنزيل مجموعة خلفيات",exact:true}).click();const file=await download;expect(file.suggestedFilename()).toBe("naqsh-backgrounds.zip");const bytes=await fs.readFile((await file.path())!);expect(bytes.readUInt32LE(0)).toBe(0x04034b50);
});
test("favorites survive reload and filters remain useful",async({page})=>{
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"أصول الواجهات",exact:true}).click();
  await page.getByRole("button",{name:"حفظ موجة هادئة في المفضلة",exact:true}).click();
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:/المفضلة/}).click();await expect(page.locator(".asset-card")).toHaveCount(1);
  await page.reload();await expect(page.locator(".asset-card")).toHaveCount(1);
  await page.getByRole("button",{name:"إزالة موجة هادئة من المفضلة",exact:true}).click();await expect(page.getByText("اختياراتك تبدأ من هنا")).toBeVisible();
});
test("live customization exports real SVG, PNG, React and adds to composition",async({page})=>{
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"أصول الواجهات",exact:true}).click();
  await page.getByRole("button",{name:"تخصيص موجة هادئة",exact:true}).click();
  const dialog=page.getByRole("dialog");await expect(dialog).toBeVisible();
  await dialog.getByLabel("الأساسي",{exact:true}).fill("#123456");await expect(dialog.locator(".asset-preview svg path").first()).toHaveAttribute("fill","#123456");
  await dialog.getByRole("checkbox",{name:"خلفية شفافة",exact:true}).check();
  let download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();let file=await download;expect(file.suggestedFilename()).toBe("backgrounds-1.svg");const svg=await fs.readFile((await file.path())!,"utf8");expect(svg).toContain("#123456");expect(svg).not.toContain('<rect x="0" y="0"');
  await dialog.getByRole("combobox").selectOption("png");download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();file=await download;const png=await fs.readFile((await file.path())!);expect(png.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  await dialog.getByRole("combobox").selectOption("react");download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();file=await download;expect(await fs.readFile((await file.path())!,"utf8")).toContain("SVGProps");
  await dialog.getByRole("button",{name:"أضف إلى الاستوديو",exact:true}).click();await expect(page.getByRole("heading",{name:"استوديو نقش"})).toBeVisible();await expect(page.locator(".canvas-layer")).toHaveCount(1);
});
test("composition placement, duplicate, history, persisted project and export",async({page})=>{
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"الاستوديو"}).click();
  await page.getByRole("combobox",{name:"نوع أصول الاستوديو",exact:true}).selectOption("marks");
  await page.getByRole("button",{name:"إضافة وردة هندسية",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(1);
  const canvasLayer=page.locator(".canvas-layer").first();const startX=Number(await page.getByRole("spinbutton",{name:"الموضع X",exact:true}).inputValue());await canvasLayer.focus();await page.keyboard.press("ArrowRight");await expect(page.getByRole("spinbutton",{name:"الموضع X",exact:true})).toHaveValue(String(startX+10));
  const box=await canvasLayer.boundingBox();expect(box).not.toBeNull();if(box){await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+35,box.y+box.height/2+20);await page.mouse.up();}expect(Number(await page.getByRole("spinbutton",{name:"الموضع X",exact:true}).inputValue())).toBeGreaterThan(startX+10);
  await page.getByRole("button",{name:"تكرار",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(2);
  await page.getByRole("button",{name:"تراجع",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(1);
  await page.getByRole("button",{name:"إعادة",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(2);
  const saved=page.waitForEvent("download");await page.getByRole("button",{name:"حفظ نسخة",exact:true}).click();const project=JSON.parse(await fs.readFile((await (await saved).path())!,"utf8"));expect(project.layers).toHaveLength(2);
  await page.reload();await expect(page.locator(".canvas-layer")).toHaveCount(2);
  const exported=page.waitForEvent("download");await page.getByRole("button",{name:"تنزيل المشهد",exact:true}).click();const svg=await fs.readFile((await (await exported).path())!,"utf8");expect(svg).toContain("Naqsh composition");expect(svg).toContain('width="1200"');
});
test("local SVG import rejects executable content and accepts safe vectors",async({page})=>{
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"الاستوديو"}).click();
  const input=page.getByLabel("ملف SVG للاستيراد",{exact:true});
  await input.setInputFiles({name:"bad.svg",mimeType:"image/svg+xml",buffer:Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')});
  await expect(page.getByRole("status")).toContainText("عنصر غير مدعوم");await expect(page.locator(".canvas-layer")).toHaveCount(0);
  await input.setInputFiles({name:"safe.svg",mimeType:"image/svg+xml",buffer:Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#ff0000"/></svg>')});await expect(page.locator(".canvas-layer")).toHaveCount(1);
});
test("brand palette applies to previews and persists",async({page})=>{
  await page.getByRole("button",{name:"طبّق ألوان هويتك",exact:true}).click();await page.getByLabel("هوية: اللون الأساسي",{exact:true}).fill("#2255cc");await page.getByRole("button",{name:"تطبيق",exact:true}).click();await expect(page.locator(".asset-card").first().locator("[stroke]").first()).toHaveAttribute("stroke","#2255cc");await page.reload();await expect(page.getByRole("button",{name:"ألوان هويتي مفعّلة",exact:true})).toBeVisible();
});
test("mobile and desktop render without overflow or runtime errors",async({page})=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));await page.reload();await expect(page.locator(".app-shell")).toHaveAttribute("data-ready","true");
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:"test-results/library-desktop.png",fullPage:false});
  await page.setViewportSize({width:390,height:844});await expect(page.getByRole("button",{name:"فتح القائمة",exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);await page.screenshot({path:"test-results/library-mobile.png",fullPage:true});
  await page.getByRole("button",{name:"فتح القائمة",exact:true}).click();await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"الاستوديو"}).click();await page.getByRole("combobox",{name:"نوع أصول الاستوديو",exact:true}).selectOption("marks");await page.getByRole("button",{name:"إضافة وردة هندسية",exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);await page.screenshot({path:"test-results/studio-mobile.png",fullPage:true});expect(errors).toEqual([]);
});
test("all original SVG files are valid XML and exported React is parseable",async({page})=>{
  const failures=await page.evaluate(async()=>{
    const manifest=await(await fetch("/assets/manifest.json")).json() as {id:string;category:string;source?:string}[];
    const sample=[...manifest.filter(a=>!a.source),...manifest.filter(a=>a.source==="tabler").slice(0,10),...manifest.filter(a=>a.source==="mdi").slice(-10)];
    const results=await Promise.all(sample.map(async a=>{const response=await fetch(`/assets/${a.category}/${a.id}.svg`);if(!response.ok)return `${a.id}: HTTP ${response.status}`;const source=await response.text();const xml=new DOMParser().parseFromString(source,"image/svg+xml");return xml.querySelector("parsererror")?a.id:null;}));return results.filter(Boolean);
  });expect(failures).toEqual([]);
});
test("large catalog pagination keeps only 24 cards and filters sources",async({page})=>{
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"كل المكتبة",exact:true}).click();
  const total=Number((await page.locator(".results-line strong").innerText()).replaceAll(",",""));expect(total).toBeGreaterThan(10000);
  await page.getByRole("button",{name:"التالي",exact:true}).click();await expect(page.getByRole("spinbutton",{name:"رقم الصفحة",exact:true})).toHaveValue("2");await expect(page.locator(".asset-card")).toHaveCount(24);
  const input=page.getByRole("spinbutton",{name:"رقم الصفحة",exact:true}),max=await input.getAttribute("max");await input.fill(max!);expect(await page.locator(".asset-card").count()).toBeLessThanOrEqual(24);
  await page.getByRole("combobox",{name:"مصدر الأصول",exact:true}).selectOption("mdi");await expect(page.getByRole("spinbutton",{name:"رقم الصفحة",exact:true})).toHaveValue("1");await expect(page.locator(".asset-card")).toHaveCount(24);
  await expect(page.locator(".asset-card").first().locator(".svg-art > svg")).toBeVisible();
  await page.getByRole("textbox",{name:"البحث في الأصول",exact:true}).fill("منزل");await expect.poll(async()=>Number((await page.locator(".results-line strong").innerText()).replaceAll(",",""))).toBeLessThan(500);
});
test("source icons customize, retain their license, export and survive project reload",async({page})=>{
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"أصول الواجهات",exact:true}).click();
  await page.getByRole("combobox",{name:"مصدر الأصول",exact:true}).selectOption("tabler");await page.getByRole("textbox",{name:"البحث في الأصول",exact:true}).fill("tabler-home");await page.getByRole("button",{name:"تخصيص home",exact:true}).click();
  const dialog=page.getByRole("dialog");await expect(dialog.locator(".asset-meta")).toContainText("MIT");await dialog.getByLabel("الأساسي",{exact:true}).fill("#123456");await expect.poll(()=>dialog.locator(".asset-preview path").first().evaluate(el=>getComputedStyle(el).stroke)).toBe("rgb(18, 52, 86)");
  await dialog.getByRole("combobox").selectOption("react");const download=page.waitForEvent("download");await dialog.getByRole("button",{name:"تنزيل التصميم",exact:true}).click();const code=await fs.readFile((await(await download).path())!,"utf8");expect(code).toContain("Permission is hereby granted");expect(code).not.toContain("CC0");
  await dialog.getByRole("button",{name:"أضف إلى الاستوديو",exact:true}).click();await expect(page.locator(".canvas-layer")).toHaveCount(1);await page.reload();await expect(page.locator(".canvas-layer")).toHaveCount(1);await expect.poll(()=>page.locator(".canvas-layer path").first().evaluate(el=>getComputedStyle(el).stroke)).toBe("rgb(18, 52, 86)");
  await page.getByRole("combobox",{name:"صيغة تصدير المشهد",exact:true}).selectOption("png");const image=page.waitForEvent("download");await page.getByRole("button",{name:"تنزيل المشهد",exact:true}).click();expect((await fs.readFile((await(await image).path())!)).subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
});
test("pending icon addition cannot overwrite edits made after leaving the studio",async({page})=>{
  let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.route("**/assets/icons/tabler-home.svg",async route=>{await gate;await route.continue();});
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"الاستوديو"}).click();
  await page.getByRole("combobox",{name:"نوع أصول الاستوديو",exact:true}).selectOption("icons");await page.getByRole("textbox",{name:"بحث أصول الاستوديو",exact:true}).fill("tabler-home");
  await page.getByRole("button",{name:"إضافة home",exact:true}).click();await page.getByRole("button",{name:"تصفّح المكتبة كاملة",exact:true}).click();
  await page.getByRole("navigation",{name:"نطاق المكتبة"}).getByRole("button",{name:"أصول الواجهات",exact:true}).click();
  await page.getByRole("button",{name:"تخصيص موجة هادئة",exact:true}).click();await page.getByRole("dialog").getByRole("button",{name:"أضف إلى الاستوديو",exact:true}).click();
  const completed=page.waitForResponse("**/assets/icons/tabler-home.svg");release();await(await completed).finished();await page.waitForTimeout(300);
  await expect(page.locator(".canvas-layer")).toHaveCount(1);await expect(page.locator(".canvas-layer")).toHaveAttribute("aria-label","طبقة موجة هادئة");
});
test("imported layers isolate gradient IDs and round-trip safe project files",async({page})=>{
  await page.getByRole("navigation",{name:"التنقل الرئيسي"}).getByRole("button",{name:"الاستوديو"}).click();
  const input=page.getByLabel("ملف SVG للاستيراد",{exact:true});
  for(const color of ["#ff0000","#0000ff"])await input.setInputFiles({name:`gradient-${color.slice(1)}.svg`,mimeType:"image/svg+xml",buffer:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" aria-label="A > B" viewBox="0 0 100 100"><!-- note --><defs><linearGradient id="paint"><stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="100" height="100" fill="url( #paint )"/><text y="30"><![CDATA[Hi {user}]]></text></svg>`)});
  await expect(page.locator(".canvas-layer")).toHaveCount(2);
  const gradientIds=await page.locator(".canvas-layer linearGradient").evaluateAll(nodes=>nodes.map(n=>n.id));expect(new Set(gradientIds).size).toBe(2);
  const downloaded=page.waitForEvent("download");await page.getByRole("button",{name:"حفظ نسخة",exact:true}).click();const json=await fs.readFile((await(await downloaded).path())!,"utf8");
  await page.getByLabel("ملف مشروع للاستيراد",{exact:true}).setInputFiles({name:"project.json",mimeType:"application/json",buffer:Buffer.from(json)});await expect(page.locator(".canvas-layer")).toHaveCount(2);
  await page.getByRole("combobox",{name:"صيغة تصدير المشهد",exact:true}).selectOption("png");const image=page.waitForEvent("download");await page.getByRole("button",{name:"تنزيل المشهد",exact:true}).click();const png=await fs.readFile((await(await image).path())!);expect(png.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
});
