import type {Asset,CategoryId} from "./catalog.ts";
import {geometricAssets} from "./geometric-data.ts";

export const ornamentCategories: {id:CategoryId;name:string;description:string;icon:string}[] = [
  {id:"islamic",name:"هندسية إسلامية",description:"نجوم متشابكة، زليج ومشربيات في شبكات متكررة",icon:"grid"},
  {id:"arabesque",name:"أرابيسك عربي",description:"تفريعات ملتفة وتكوينات متناظرة مستوحاة من التوريق",icon:"pen"},
  {id:"botanical",name:"زخارف نباتية",description:"أغصان وأوراق وأكاليل من الزيتون والسعف والزهور",icon:"landscape"},
  {id:"rosettes",name:"وردات وميداليات",description:"وردات شعاعية ومراكز زخرفية للتكوينات والعناوين",icon:"spark"},
  {id:"ornate-frames",name:"إطارات مزخرفة",description:"إطارات وزوايا مزينة تترك مساحة واضحة للمحتوى",icon:"frame"},
  {id:"ornate-borders",name:"فواصل وحواف",description:"أشرطة وترويسات زخرفية للبطاقات والمطبوعات",icon:"wave"},
];
const families = {
  islamic:["نجمة ثمانية","نجمة اثنا عشرية","مشربية مربعة","نسيج معين","زليج متقاطع","شبكة سداسية","أقواس أندلسية","نجمة سداسية"],
  arabesque:["التفاف الأكانتس","براعم اللوتس","ورقة الرمان","تشابك الكرمة","نخلة متناظرة","زهرات التوريق","سعفة ملتفة","غصن أندلسي"],
  botanical:["أوراق الزيتون","سعف النخيل","أوراق السرخس","ورق الأكانتس","زهور اللوتس","أوراق الكرمة","ثمار الرمان","زهور التوليب"],
  rosettes:["وردة ثمانية","وردة اثنا عشرية","زهرة اللوتس","ميدالية متشابكة","شمس الأندلس","وردة مسننة","طوق الأوراق","وردة مضاعفة"],
  "ornate-frames":["إطار مشربية","إطار أرابيسك","إطار الزيتون","إطار النجوم","إطار اللوتس","إطار السعف","إطار الزليج","إطار الأكانتس"],
  "ornate-borders":["حافة النجوم","شريط الأرابيسك","غصن الزيتون","حافة الزليج","فاصل اللوتس","شريط السعف","حافة المعينات","فاصل الأكانتس"],
} satisfies Partial<Record<CategoryId,string[]>>;
const editions:Record<string,string[]>={
  islamic:["شبكة مفتوحة","حلقات متداخلة","مراكز مزينة","خطوط مزدوجة","عقد متشابكة","تفاصيل شعاعية"],
  arabesque:["ميدالية","قوس مزخرف","تكوين متناظر","نسيج التوريق","طوق ملتف","بوابة نباتية"],
  botanical:["غصن منفرد","إكليل دائري","باقة متناظرة","زاويتان","شريط نباتي","حديقة متكررة"],
  rosettes:["خطوط مفتوحة","بتلات مزدوجة","نجمة داخلية","طوق خارجي","حلقة مزهرة","تاج شعاعي"],
  "ornate-frames":["إطار كامل","زوايا مفتوحة","بوابة مقوسة","إطار بيضاوي","إطار مزدوج","إطار معين"],
  "ornate-borders":["فاصل مركزي","شريط متكرر","حافتان","فاصل متناظر","قوس علوي","حافة عمودية"],
};
const english = ["Islamic geometric tessellation","Arabic arabesque foliage","Botanical floral ornament","Radial rosette medallion","Decorative ornamental frame","Decorative border divider"];
const aliases = ["إسلامية اسلامي اسلامية هندسة زليج نجوم مشربية islamic geometric star tile seamless", "عربي عربية ارابيسك توريق أندلسي arabesque arabic scroll foliage", "نباتية نباتي نبات أوراق زهرة زهور أغصان اكليل botanical floral leaf flower wreath", "وردة وردات ميدالية وردية rosette medallion mandala radial", "إطار اطارات إطارات زوايا frame border corner", "فاصل فواصل حواف حافة شريط divider border trim"];

// Eight motif families × six different compositions, with the same palette.
// These are new vector constructions inspired by ornament, not historical reproductions.
const initialOrnaments:Asset[]=ornamentCategories.flatMap((category,index)=>{
  const names=families[category.id as keyof typeof families];
  return names.flatMap((family,f)=>editions[category.id].map((edition,e)=>({
    id:`${category.id}-${f+1}-${e+1}`,name:`${family} · ${edition}`,english:`${english[index]} ${f+1} composition ${e+1}`,
    category:category.id,variant:f*6+e,ornament:true,style:["islamic","rosettes"].includes(category.id)?"هندسي":"خطي",
    tags:[category.name,family,edition,"زخارف","زخرفة","ornament",...aliases[index].split(" ")],palette:0,author:"نقش",license:"CC0-1.0" as const,
  })));
});
export const ornamentAssets:Asset[]=[...geometricAssets,...initialOrnaments];
export const ornamentCategoryIds = new Set(ornamentCategories.map(c=>c.id));
