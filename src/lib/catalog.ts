import {iconCollections,iconRows} from "./icon-sources.ts";
import {ornamentAssets,ornamentCategories,ornamentCategoryIds} from "./ornament-data.ts";
import {tiktokAssets,tiktokCategory} from "./tiktok-designs.ts";
export {ornamentAssets,ornamentCategories,ornamentCategoryIds,tiktokAssets,tiktokCategory};
export type UtilityCategoryId = "backgrounds" | "patterns" | "illustrations" | "icons" | "dividers" | "states" | "badges" | "charts" | "frames" | "marks" | "motion" | "scenes";
export type CategoryId = UtilityCategoryId | "islamic" | "arabesque" | "botanical" | "rosettes" | "ornate-frames" | "ornate-borders" | "tiktok";
export type Asset = { id: string; name: string; english: string; category: CategoryId; variant: number; style: string; tags: string[]; palette: number; author: string; license: "CC0-1.0"|"MIT"|"Apache-2.0"; source?:string; ornament?:boolean; construction?:"network"|"ribbon" };
export const utilityCategories: { id: UtilityCategoryId; name: string; description: string; icon: string }[] = [
  { id: "backgrounds", name: "خلفيات", description: "مساحة جديدة لأفكارك", icon: "landscape" },
  { id: "patterns", name: "زخارف وأنماط", description: "إيقاع هندسي قابل للتكرار", icon: "grid" },
  { id: "illustrations", name: "رسومات توضيحية", description: "قصص صغيرة بلغة بصرية", icon: "pen" },
  { id: "icons", name: "أيقونات", description: "تفاصيل واضحة للواجهات", icon: "spark" },
  { id: "dividers", name: "فواصل", description: "انتقالات بين أقسام الصفحة", icon: "wave" },
  { id: "states", name: "حالات الواجهة", description: "حين يكون للواجهة ما تقوله", icon: "window" },
  { id: "badges", name: "شارات", description: "علامات تستحق الظهور", icon: "badge" },
  { id: "charts", name: "مخططات", description: "بيانات بشكل قابل للتعديل", icon: "chart" },
  { id: "frames", name: "إطارات", description: "حدود تحمل طابعك", icon: "frame" },
  { id: "marks", name: "أشكال وعلامات", description: "هندسة تفتح باب التكوين", icon: "shapes" },
  { id: "motion", name: "رسوم متحركة", description: "حركة خفيفة للواجهات", icon: "play" },
  { id: "scenes", name: "مشاهد تركيبية", description: "تكوينات لبداية صفحة جميلة", icon: "layers" },
];
export const categories=[...ornamentCategories,tiktokCategory,...utilityCategories];
const names: Record<UtilityCategoryId, [string, string][]> = {
  backgrounds: [["موجة هادئة", "Quiet wave"], ["مدارات", "Orbital rings"], ["تلال ناعمة", "Soft hills"], ["هندسة ملونة", "Color geometry"], ["شبكة ضوء", "Light grid"], ["قوس الشمس", "Sun arc"], ["تضاريس", "Contour landscape"], ["قصاصات", "Paper collage"]],
  patterns: [["نجمة شرقية", "Arabesque star"], ["أقواس متكررة", "Repeating arches"], ["نسيج نقطي", "Dot weave"], ["خطوط متموجة", "Wave lines"], ["بلاطات", "Terrazzo tiles"], ["أوراق متقابلة", "Botanical leaves"], ["رقعة هندسية", "Checker geometry"], ["شبكة ألماس", "Diamond lattice"]],
  illustrations: [["مساحة العمل", "Workspace"], ["فكرة جديدة", "New idea"], ["فريق متعاون", "Teamwork"], ["تعلم مستمر", "Learning"], ["تسوّق بسيط", "Shopping"], ["رحلة إبداع", "Creative journey"], ["تواصل", "Connection"], ["نمو المشروع", "Project growth"]],
  icons: [["الرئيسية", "Home"], ["بحث", "Search"], ["رسالة", "Message"], ["سلة التسوق", "Shopping bag"], ["إعدادات", "Settings"], ["ملف", "Document"], ["تقويم", "Calendar"], ["مفضلة", "Heart"]],
  dividers: [["موجة واحدة", "Single wave"], ["قمة", "Mountain peak"], ["سحاب", "Cloud edge"], ["خط مائل", "Diagonal cut"], ["موجتان", "Double waves"], ["درجات", "Steps"], ["تموّج عضوي", "Organic curve"], ["أسنان هندسية", "Zigzag edge"]],
  states: [["تم بنجاح", "Success"], ["لا توجد نتائج", "No search results"], ["سلة فارغة", "Empty basket"], ["انقطاع الاتصال", "Offline connection"], ["ملفاتك القادمة", "Empty files"], ["رسالة جديدة", "New message"], ["الوصول مقيّد", "Access locked"], ["حدث خطأ", "Error alert"]],
  badges: [["نجمة التميز", "Star award"], ["ختم الجودة", "Quality seal"], ["شارة موثوقة", "Verified shield"], ["وسام", "Medal"], ["تاج", "Crown"], ["بطاقة عضوية", "Member ticket"], ["جوهرة", "Gem badge"], ["شريط جديد", "New ribbon"]],
  charts: [["خطوات النمو", "Growth bars"], ["توزيع دائري", "Donut chart"], ["مسار صاعد", "Rising line"], ["مراحل العمل", "Workflow steps"], ["خط زمني", "Timeline"], ["روابط", "Network nodes"], ["ميزان", "Comparison"], ["مؤشر الأداء", "Gauge"]],
  frames: [["نافذة مقوّسة", "Arched frame"], ["زوايا دائرية", "Rounded frame"], ["طابع بريدي", "Postage frame"], ["إطار نباتي", "Botanical frame"], ["بطاقة صورة", "Polaroid frame"], ["نافذة متصفح", "Browser frame"], ["إطار مزدوج", "Double border"], ["زوايا هندسية", "Corner frame"]],
  marks: [["وردة هندسية", "Geometric flower"], ["حلقة مفتوحة", "Open loop"], ["توازن", "Balance mark"], ["شروق", "Sunrise mark"], ["نقطة اتصال", "Connection mark"], ["شريط مطوي", "Folded ribbon"], ["بوابة", "Gateway"], ["بوصلة", "Compass star"]],
  motion: [["مدار متحرك", "Orbit loader"], ["نبض", "Pulse"], ["نقاط الانتظار", "Bouncing dots"], ["حلقات متسعة", "Ripple rings"], ["دوران هندسي", "Spinning geometry"], ["موجة تحميل", "Loading wave"], ["قوس متحرك", "Arc spinner"], ["مربعات متبادلة", "Alternating squares"]],
  scenes: [["ركن إبداع", "Creative corner"], ["منتج رقمي", "Digital product"], ["منصة تعليم", "Learning platform"], ["متجر صغير", "Little shop"], ["مكتبة أفكار", "Idea library"], ["مساحة هادئة", "Quiet space"], ["إطلاق", "Launch scene"], ["مدينة هندسية", "Geometric city"]],
};
export const palettes = [
  { name: "حديقة", colors: ["#28634e", "#b9ce82", "#f3f0e6"] },
  { name: "خوخ", colors: ["#e7866b", "#ffd2a7", "#fff4e8"] },
  { name: "بحر", colors: ["#356fbc", "#91c9d3", "#eef4fc"] },
  { name: "حبر", colors: ["#363747", "#a5abc2", "#f2f1f6"] },
  { name: "شمس", colors: ["#be7b34", "#ecc76d", "#fbf2db"] },
  { name: "لافندر", colors: ["#7764a2", "#c4b6db", "#f3effa"] },
  { name: "وردي", colors: ["#b45274", "#e9a7bc", "#fff0f5"] },
  { name: "فيروز", colors: ["#277a78", "#91cbc0", "#eaf6ef"] },
];
export const legacyAssets: Asset[] = utilityCategories.flatMap((c, index) => names[c.id].map(([name, english], variant) => ({
  id: `${c.id}-${variant + 1}`, name, english, category: c.id, variant,
  style: ({backgrounds:["ناعم","خطي","ناعم","هندسي","خطي","هندسي","خطي","هندسي"],patterns:["خطي","هندسي","هندسي","خطي","مسطح","ناعم","هندسي","خطي"],illustrations:Array(8).fill("مسطح"),icons:Array(8).fill("خطي"),dividers:["ناعم","هندسي","ناعم","هندسي","ناعم","هندسي","ناعم","هندسي"],states:Array(8).fill("مسطح"),badges:["هندسي","هندسي","مسطح","مسطح","هندسي","مسطح","هندسي","مسطح"],charts:["مسطح","ناعم","خطي","خطي","خطي","خطي","مسطح","ناعم"],frames:["ناعم","ناعم","هندسي","ناعم","مسطح","خطي","خطي","خطي"],marks:["هندسي","ناعم","هندسي","هندسي","هندسي","هندسي","ناعم","هندسي"],motion:["خطي","ناعم","ناعم","خطي","هندسي","ناعم","خطي","هندسي"],scenes:Array(8).fill("مسطح")} as Record<UtilityCategoryId,string[]>)[c.id][variant],
  tags: [c.name, c.description, english.toLowerCase(), "واجهة", "web", "svg", variant % 2 === 0 ? "فاتح" : "داكن"],
  palette: (index + variant) % palettes.length, author: "نقش", license: "CC0-1.0",
})));
export const originalAssets:Asset[]=[...ornamentAssets,...tiktokAssets,...legacyAssets];
const translations:Record<string,string>={home:"منزل الرئيسية",search:"بحث",heart:"قلب مفضلة",account:"حساب مستخدم",user:"مستخدم",arrow:"سهم",calendar:"تقويم",mail:"بريد",message:"رسالة",shopping:"تسوق متجر",cart:"سلة",bag:"حقيبة",settings:"إعدادات",cog:"إعدادات",file:"ملف",folder:"مجلد",cloud:"سحابة",download:"تنزيل",upload:"رفع",phone:"هاتف",bell:"إشعار جرس",alert:"تنبيه",check:"نجاح صح",close:"إغلاق",menu:"قائمة",star:"نجمة",lock:"قفل",eye:"عين رؤية",camera:"كاميرا",photo:"صورة",image:"صورة",book:"كتاب",school:"تعليم مدرسة",brand:"علامة تجارية",code:"كود برمجة",device:"جهاز",wifi:"شبكة اتصال",dots:"نقاط",map:"خريطة",location:"موقع",music:"موسيقى",player:"مشغل",chart:"مخطط",circle:"دائرة",square:"مربع"};
export const importedAssets:Asset[]=iconRows.map(([prefix,name])=>{const c=iconCollections.find(c=>c.prefix===prefix)!;return {id:`${prefix}-${name}`,name:name.replaceAll("-"," "),english:name.replaceAll("-"," "),category:"icons",variant:0,style:prefix==="tabler"&&!name.includes("filled")?"خطي":"مسطح",tags:["أيقونات","icon",prefix,c.name,...name.split("-").map(word=>translations[word]||word)],palette:0,author:c.author,license:c.license,source:prefix};});
export const assets:Asset[]=[...originalAssets,...importedAssets];
export const assetById=new Map(assets.map(a=>[a.id,a]));
export const categoryCounts=Object.fromEntries(categories.map(c=>[c.id,assets.filter(a=>a.category===c.id).length])) as Record<CategoryId,number>;
export type GalleryScope="ornaments"|"tiktok"|"interface"|"all";
export function galleryAssets(list:Asset[],scope:GalleryScope){
  if(scope==="all")return list;
  if(scope==="tiktok")return list.filter(a=>a.category==="tiktok");
  if(scope==="ornaments")return list.filter(a=>a.ornament&&a.category!=="tiktok");
  return list.filter(a=>!a.ornament&&a.category!=="tiktok");
}
const normalize=(value:string)=>value.toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F]/g,"");
const searchIndex=new Map(assets.map(a=>[a.id,normalize([a.name,a.english,a.id,...a.tags].join(" "))]));
export function searchAssets(list: Asset[], query: string, category = "all", favorites?: string[], style = "all") {
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean),saved=favorites?new Set(favorites):null;
  return list.filter(a => (category === "all" || a.category === category) && (style === "all" || a.style === style) && (!saved || saved.has(a.id)) && terms.every(term => (searchIndex.get(a.id)||"").includes(term)));
}
