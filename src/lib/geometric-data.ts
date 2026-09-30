import type {Asset} from "./catalog.ts";

const networks=["مثمنات ونجوم متصلة","سداسيات ونجوم متشابكة","نسيج المثلثات والسداسيات","مشربية النجوم الثمانية","شبكة النجوم الاثنا عشرية","معينات متداخلة","خلايا سداسية مزدوجة","نسيج مربعات مشطوفة","عقد مربعة متصلة","شبكة مثلثات متناظرة","زليج المثمن والمعين","نجوم عشرية مترابطة"];
const ribbons=["شريط النجمة والمستطيل","شريط السداسيات المتصلة","حزام الخلايا السداسية","شريط المثمن والمعين","جديلة هندسية متقاطعة","شريط مفاتيح متصل","شريط النجوم السداسية","حافة المعينات المسننة","شريط النجمة الاثنا عشرية","شريط العقد المربعة","حافتان من المعينات","شريط العقد المثمنة"];
const networkEditions=["خطوط مزدوجة","نجوم داخلية","عقد صغيرة","توريق هندسي"];
const ribbonEditions=["شريط مركزي","شريطان متقابلان","ثلاثة أشرطة","شريط وميدالية"];

export const geometricAssets:Asset[]=[...networks.flatMap((name,f)=>networkEditions.map((edition,e)=>({
  id:`geometric-weave-${f+1}-${e+1}`,name:`${name} · ${edition}`,english:`Connected geometric tessellation ${f+1} construction ${e+1}`,
  category:"islamic" as const,construction:"network" as const,variant:f*4+e,ornament:true,style:"هندسي",
  tags:["شبكات متصلة","شبكة","نجوم","متشابكة","مضلعات","زخرفة","زخارف","إسلامية","اسلامية","زليج","girih","tessellation","seamless","geometric","tile",name,edition],
  palette:3,author:"نقش",license:"CC0-1.0" as const,
}))),...ribbons.flatMap((name,f)=>ribbonEditions.map((edition,e)=>({
  id:`geometric-ribbon-${f+1}-${e+1}`,name:`${name} · ${edition}`,english:`Connected geometric ornamental ribbon ${f+1} composition ${e+1}`,
  category:"ornate-borders" as const,construction:"ribbon" as const,variant:f*4+e,ornament:true,style:"هندسي",
  tags:["أشرطة هندسية","شريط","حواف","متصلة","فواصل","زخرفة","زخارف","إسلامية","اسلامية","ribbon","border","frieze","geometric",name,edition],
  palette:3,author:"نقش",license:"CC0-1.0" as const,
})))];
