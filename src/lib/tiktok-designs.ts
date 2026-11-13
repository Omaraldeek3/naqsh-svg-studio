import type { Asset } from "./catalog.ts";
import type { SvgOptions } from "./svg.ts";
import { tracedTikTokData } from "./tiktok-traced-data.ts";

export const tiktokCategory = {
  id: "tiktok" as const,
  name: "تصاميم تيك توك",
  description: "بوابات ولوحات وزخارف قص ليزر وCNC مأخوذة مباشرة من حساب تيك توك (@hathanhcncvemau)",
  icon: "spark",
};

type TikTokSpec = {
  id: string;
  name: string;
  english: string;
  style: "هندسي" | "خطي";
  palette: number;
  tags: string[];
};

const specs: TikTokSpec[] = [
  {
    id: "tiktok-1",
    name: "بوابة الطبل البرونزي والشبكة النجمية",
    english: "Dong Son drum 4-panel gate with star lattice and transom",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "باب", "4 ضلف", "طبل برونزي", "شبكة نجمية", "مفاتيح إغريقية", "gate", "dong son", "lattice", "transom"],
  },
  {
    id: "tiktok-2",
    name: "بوابة الشرائح الأفقية وميدالية الشمس",
    english: "Horizontal louver 4-panel gate with split bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "باب", "شرائح أفقية", "ميدالية", "مضلع", "gate", "louver", "modern", "drum"],
  },
  {
    id: "tiktok-3",
    name: "لوحة الكوي والقمر · فنغ شوي",
    english: "Feng Shui Koi carp looking at the moon CNC panel",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "سمكة", "كوي", "قمر", "فنغ شوي", "جدارية", "koi", "carp", "moon", "feng shui", "panel"],
  },
  {
    id: "tiktok-4",
    name: "لوحة طيور الكركي وأغصان الصنوبر",
    english: "Cranes and pine branches CNC decorative screen",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "طيور", "كركي", "صنوبر", "شجرة", "قواطع", "cranes", "pine", "birds", "screen"],
  },
  {
    id: "tiktok-5",
    name: "بوابة الفصول الأربعة وأزهار الأقحوان",
    english: "Four seasons Chrysanthemum and Longevity 4-panel gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "أقحوان", "زهور", "إطار", "رمز", "4 ضلف", "chrysanthemum", "longevity", "meander", "gate"],
  },
  {
    id: "tiktok-6",
    name: "بوابة القصر الكلاسيكي المتوّجة",
    english: "Neo-classical royal crowned 2-leaf arched gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تاج", "كلاسيكي", "قوس", "ضلفين", "أكانتس", "royal", "crown", "arched", "classical", "gate"],
  },
  {
    id: "tiktok-7",
    name: "بوابة الموج الزخرفي والميدالية العلوية",
    english: "2-leaf laser gate with upper medallions, floral wave and diamond trellis",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "موج", "زهور", "شبكة معينات", "ميدالية", "ضلفين", "floral", "wave", "trellis", "gate"],
  },
  {
    id: "tiktok-8",
    name: "بوابة الأرابيسك الكلاسيكي والميدالية النجمية",
    english: "Neoclassical acanthus scroll and rosette medallion 4-panel gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "أرابيسك", "ميدالية", "أكانتس", "4 ضلف", "كلاسيكي", "neoclassical", "rosette", "medallion", "gate"],
  },
  {
    id: "tiktok-9",
    name: "بوابة القوس المزخرف والشبكة الماسية الرباعية",
    english: "4-panel Dong Son drum gate with diamond lattice and twin scroll pediment",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قوس", "طبل برونزي", "معينات", "4 ضلف", "تاج", "pediment", "diamond", "drum", "gate"],
  },
  {
    id: "tiktok-10",
    name: "بوابة الأغصان المتسلقة والشرائح الرباعية",
    english: "4-panel climbing leaf vine and louvered Dong Son drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "أغصان", "أوراق", "شرائح", "طبل برونزي", "4 ضلف", "vine", "leaves", "louver", "gate"],
  },
  {
    id: "tiktok-11",
    name: "بوابة الفصول الأربعة والخيزران واللوتس",
    english: "Four seasons calligraphy, bamboo moon, drum and lotus 4-panel gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فصول أربعة", "خيزران", "لوتس", "هلال", "4 ضلف", "bamboo", "lotus", "four seasons", "gate"],
  },
  {
    id: "tiktok-12",
    name: "بوابة الشبكة المكعبة ثلاثية الأبعاد والطبل البرونزي",
    english: "3D cube lattice and Dong Son bronze drum 4-panel gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مكعبات", "شبكة هندسية", "طبل برونزي", "4 ضلف", "زوايا", "cube", "lattice", "drum", "gate"],
  },
];

const sharedTags = ["تصاميم تيك توك", "تيك توك", "tiktok", "cnc", "ليزر", "قص ليزر", "laser", "hathanhcncvemau"];

export const tiktokAssets: Asset[] = specs.map((spec, variant) => ({
  id: spec.id,
  name: spec.name,
  english: spec.english,
  category: "tiktok",
  variant,
  ornament: true,
  style: spec.style,
  tags: [...sharedTags, ...spec.tags],
  palette: spec.palette,
  author: "نقش",
  license: "CC0-1.0",
}));

/** Render a cleaned, vectorized TikTok CNC design using the active palette options. */
export function renderTiktokDesign(asset: Asset, o: SvgOptions): string {
  const entry = tracedTikTokData[asset.id] || tracedTikTokData["tiktok-1"];
  const bg = o.transparent ? "" : `<rect x="0" y="0" width="1920" height="1440" fill="${o.background}"/>`;
  const primary = `<path d="${entry.primaryPath}" fill="${o.primary}" fill-rule="evenodd"/>`;
  let layers = primary;
  if (entry.accentPath) {
    if (entry.accentMode === "casing") {
      layers = `<path d="${entry.accentPath}" fill="${o.accent}" fill-opacity="0.38" fill-rule="evenodd"/>${primary}`;
    } else if (entry.accentMode === "highlight") {
      layers = `${primary}<path d="${entry.accentPath}" fill="${o.accent}" fill-rule="evenodd"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 1920 1440" preserveAspectRatio="xMidYMid meet" role="img"><title>${asset.name}</title><desc>Naqsh TikTok CNC &amp; laser-cut SVG vector vectorized from @hathanhcncvemau. CC0-1.0. ${asset.english}.</desc>${bg}${layers}</svg>`;
}
