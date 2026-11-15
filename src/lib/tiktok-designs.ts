import type { Asset } from "./catalog.ts";
import type { SvgOptions } from "./svg.ts";

export type TracedTikTokEntry = {
  accentMode: "casing" | "highlight" | "none";
  primaryPath: string;
  accentPath?: string;
};

const tiktokDataCache = new Map<string, TracedTikTokEntry>();
const tiktokRequests = new Map<string, Promise<TracedTikTokEntry>>();

function readTiktokEntrySync(id: string): TracedTikTokEntry | undefined {
  const cached = tiktokDataCache.get(id);
  if (cached) return cached;
  if (typeof process === "undefined") return undefined;
  const getBuiltin = (process as unknown as { getBuiltinModule?: (m: string) => unknown }).getBuiltinModule;
  if (typeof getBuiltin !== "function") return undefined;
  const fsMod = getBuiltin("node:fs") as typeof import("node:fs") | undefined;
  const pathMod = getBuiltin("node:path") as typeof import("node:path") | undefined;
  if (!fsMod || !pathMod) return undefined;
  const localPath = pathMod.resolve(process.cwd(), "public/assets/tiktok-data", `${id}.json`);
  const nestedPath = pathMod.resolve(process.cwd(), "svg-studio/public/assets/tiktok-data", `${id}.json`);
  const filePath = fsMod.existsSync(localPath) ? localPath : fsMod.existsSync(nestedPath) ? nestedPath : "";
  if (!filePath) return undefined;
  const entry = JSON.parse(fsMod.readFileSync(filePath, "utf8")) as TracedTikTokEntry;
  tiktokDataCache.set(id, entry);
  return entry;
}

/** Synchronously checks whether a TikTok vector payload is already available in memory or on disk (Node). */
export function hasTiktokData(id: string): boolean {
  return tiktokDataCache.has(id) || Boolean(readTiktokEntrySync(id));
}

/** Lazily loads and caches per-design TikTok vector path JSON in the browser or Node. */
export async function loadTiktokData(id: string): Promise<TracedTikTokEntry> {
  const sync = readTiktokEntrySync(id);
  if (sync) return sync;
  const pending = tiktokRequests.get(id);
  if (pending) return pending;
  const request = (async () => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const response = await fetch(`${base}/assets/tiktok-data/${encodeURIComponent(id)}.json`);
    if (!response.ok) throw new Error("تعذّر تحميل تصميم تيك توك؛ حاول مجددًا");
    const entry = (await response.json()) as TracedTikTokEntry;
    tiktokDataCache.set(id, entry);
    return entry;
  })();
  tiktokRequests.set(id, request);
  try {
    return await request;
  } finally {
    tiktokRequests.delete(id);
  }
}

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



  {
    id: "tiktok-13",
    name: "طنف قوسي بالمعبد والصنوبر والجبال",
    english: "Arched CNC transom with pavilion, pine and mountain landscape",
    style: "خطي",
    palette: 3,
    tags: ["طنف", "قوس", "معبد", "صنوبر", "جبال", "transom", "arch", "pavilion", "landscape"],
  },



  {
    id: "tiktok-14",
    name: "تاج إفريز أوراق النخيل والأزهار",
    english: "Palm frond and floral filigree architectural eave bracket",
    style: "خطي",
    palette: 3,
    tags: ["تاج", "إفريز", "نخيل", "أزهار", "زوايا", "eave", "bracket", "palm", "floral"],
  },



  {
    id: "tiktok-15",
    name: "زاوية نباتية متفرعة فاخرة",
    english: "Lush botanical scroll L-corner bracket fillet",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "نباتي", "توريق", "كلاسيكي", "corner", "scroll", "botanical", "bracket"],
  },



  {
    id: "tiktok-16",
    name: "زاوية اللوتس والحلزون الهندسي",
    english: "Lotus petals and geometric spiral corner bracket",
    style: "هندسي",
    palette: 3,
    tags: ["زاوية", "لوتس", "حلزون", "هندسي", "lotus", "spiral", "corner", "bracket"],
  },



  {
    id: "tiktok-17",
    name: "زاوية الوردة الحلزونية المتماثلة",
    english: "Swirling floral rosette architectural corner fill",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "وردة", "حلزوني", "زخرفي", "rosette", "swirl", "corner"],
  },



  {
    id: "tiktok-18",
    name: "زاوية المفاتيح الإغريقية والخيزران",
    english: "Greek meander key and bamboo stylized L-corner",
    style: "هندسي",
    palette: 3,
    tags: ["زاوية", "خيزران", "مفتاح إغريقي", "إطار", "meander", "bamboo", "corner"],
  },



  {
    id: "tiktok-19",
    name: "طقم زاوية وإفريز حلزوني مزدوج",
    english: "Paired architectural double-scroll frieze and corner bracket",
    style: "خطي",
    palette: 3,
    tags: ["إفريز", "زاوية", "حلزوني", "بوابة", "frieze", "corner", "scroll"],
  },



  {
    id: "tiktok-20",
    name: "زاوية أكانتس باروكية كبيرة",
    english: "Baroque acanthus leaf filigree grand corner bracket",
    style: "خطي",
    palette: 4,
    tags: ["زاوية", "أكانتس", "باروك", "فاخر", "acanthus", "baroque", "filigree", "corner"],
  },



  {
    id: "tiktok-21",
    name: "مجموعة ثلاث زوايا باروكية متكاملة",
    english: "Trio set of baroque openwork scroll corner ornaments",
    style: "خطي",
    palette: 4,
    tags: ["زوايا", "طقم", "باروك", "أوراق", "baroque", "corners", "filigree", "set"],
  },



  {
    id: "tiktok-22",
    name: "إفريز عصافير الحب وزاوية كلاسيكية",
    english: "Lovebirds perched on blossom branch with matching L-bracket",
    style: "خطي",
    palette: 3,
    tags: ["طائر", "عصافير", "زاوية", "غصن", "birds", "blossom", "bracket"],
  },



  {
    id: "tiktok-23",
    name: "زاوية أفقية بالتوريق الكلاسيكي",
    english: "Horizontal flowing botanical scroll bracket trim",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "أفقي", "توريق", "باب", "scroll", "trim", "bracket"],
  },



  {
    id: "tiktok-24",
    name: "زاوية النجمة النباتية المتفتحة",
    english: "Blooming starburst floral architectural corner ornament",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "نجمة", "أزهار", "نباتي", "starburst", "floral", "corner"],
  },



  {
    id: "tiktok-25",
    name: "زاوية الأوراق الملتفة الإنسيابية",
    english: "Sweeping classical acanthus scroll corner silhouette",
    style: "خطي",
    palette: 4,
    tags: ["زاوية", "أكانتس", "أوراق", "منحنيات", "acanthus", "scroll", "corner"],
  },



  {
    id: "tiktok-26",
    name: "طقم تيجان قوسية بالكركي والغصون",
    english: "Twin arched CNC gate transoms with flying cranes and scroll filigree",
    style: "خطي",
    palette: 3,
    tags: ["تاج", "قوس", "كركي", "غصون", "بوابة", "arch", "transom", "cranes"],
  },



  {
    id: "tiktok-27",
    name: "ميدالية السيدة الكلاسيكية والمروحة والزهور",
    english: "Circular openwork medallion of classical maiden holding round fan",
    style: "خطي",
    palette: 4,
    tags: ["ميدالية", "دائرة", "أزهار", "كلاسيكي", "medallion", "maiden", "floral", "roundel"],
  },



  {
    id: "tiktok-28",
    name: "ميدالية الصنوبر والبحيرة وشروق الشمس",
    english: "Circular sunset lake and gnarled pine tree CNC roundel",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "صنوبر", "بحيرة", "شمس", "pine", "lake", "sunrise", "roundel"],
  },



  {
    id: "tiktok-29",
    name: "ميدالية الداماسك الملكي المتناظرة",
    english: "Symmetrical damask botanical rosette circular medallion",
    style: "هندسي",
    palette: 4,
    tags: ["ميدالية", "وردة", "داماسك", "تناظر", "damask", "rosette", "medallion"],
  },



  {
    id: "tiktok-30",
    name: "إطار بيضاوي بأكاليل الأقحوان المترابطة",
    english: "Oval daisy blossom ring CNC mirror & gate border",
    style: "خطي",
    palette: 3,
    tags: ["إطار", "بيضاوي", "أقحوان", "مرآة", "oval", "daisy", "border", "frame"],
  },



  {
    id: "tiktok-31",
    name: "شعار الجدي الاحتفالي وفانوس الحظ الدائري",
    english: "Festive Paper-cut Goat crest with lanterns and flowers roundel",
    style: "خطي",
    palette: 3,
    tags: ["جدي", "فانوس", "ميدالية", "أزهار", "goat", "lantern", "roundel"],
  },



  {
    id: "tiktok-32",
    name: "ميدالية الماعز والأزهار والفوانيس المتناظرة",
    english: "Ornamental leaping goat with dual lanterns circular filigree",
    style: "خطي",
    palette: 3,
    tags: ["ماعز", "فوانيس", "ميدالية", "زخرفي", "goat", "lanterns", "medallion"],
  },



  {
    id: "tiktok-33",
    name: "ماندالا زهرة اللوتس الهندسية الدقيقة",
    english: "Intricate radial lotus geometric mandala openwork medallion",
    style: "هندسي",
    palette: 4,
    tags: ["ماندالا", "لوتس", "دائرة", "هندسي", "mandala", "lotus", "medallion", "radial"],
  },



  {
    id: "tiktok-34",
    name: "قرص برج الماعز المزخرف بالأزهار",
    english: "Zodiac Goat floral paper-cut circular plaque",
    style: "خطي",
    palette: 3,
    tags: ["برج", "ماعز", "زهور", "دائرة", "zodiac", "goat", "medallion"],
  },



  {
    id: "tiktok-35",
    name: "قرص سمكتي الكوي ورمز البركة الدائري",
    english: "Twin Koi fish swimming around Blessing seal circular medallion",
    style: "خطي",
    palette: 3,
    tags: ["كوي", "سمك", "بركة", "دائرة", "koi", "blessing", "medallion"],
  },



  {
    id: "tiktok-36",
    name: "قرص المحارب المتأمل · فن قص ليزر",
    english: "Meditating spiky-haired warrior in clouds laser-cut medallion",
    style: "خطي",
    palette: 3,
    tags: ["شخصية", "أنمي", "غوكو", "ميدالية", "goku", "medallion", "character"],
  },



  {
    id: "tiktok-37",
    name: "ميدالية الكوي المزدوج والتموجات الدائرية",
    english: "Dual ornate Koi carp circling Blessing emblem with cloud waves",
    style: "خطي",
    palette: 3,
    tags: ["كوي", "أمواج", "ميدالية", "فنغ شوي", "koi", "waves", "medallion"],
  },



  {
    id: "tiktok-38",
    name: "جدارية بركة اللوتس والمفاتيح الإغريقية الواسعة",
    english: "Wide panoramic lotus pond and meander frame horizontal partition",
    style: "خطي",
    palette: 3,
    tags: ["جدارية", "لوتس", "بركة", "إطار", "أفقي", "lotus", "pond", "panoramic", "screen"],
  },



  {
    id: "tiktok-39",
    name: "لوحة الكركي والأيل وبحيرة اللوتس البانورامية",
    english: "Panoramic mountain pines, soaring cranes and resting stag screen",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "كركي", "أيل", "غزال", "لوتس", "cranes", "deer", "landscape", "screen"],
  },



  {
    id: "tiktok-40",
    name: "لوحة رأسية للأيل والطيور وشجرة الصنوبر",
    english: "Vertical monumental ancient pine, flying crane and standing stag panel",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "عمودي", "أيل", "صنوبر", "كركي", "vertical", "stag", "pine", "panel"],
  },



  {
    id: "tiktok-41",
    name: "قاطع رباعي بأمواج اللوتس والأمواج المنسابة",
    english: "4-panel interlocking wave-crest lotus pond room divider",
    style: "هندسي",
    palette: 3,
    tags: ["قاطع", "أربع لوحات", "لوتس", "أمواج", "4-panel", "lotus", "waves", "divider"],
  },



  {
    id: "tiktok-42",
    name: "فرع البرقوق والفوانيس الصينية المعلقة",
    english: "Blossoming plum branch with hanging tasseled lantern CNC pair",
    style: "خطي",
    palette: 3,
    tags: ["فانوس", "أغصان", "أزهار", "ديكور", "plum", "lantern", "blossom", "panel"],
  },



  {
    id: "tiktok-43",
    name: "رباعية لوحات التمنيات الطيبة والكوي واللوتس",
    english: "4-panel calligraphy Blessing scrolls, Koi carp and lotus screen",
    style: "خطي",
    palette: 3,
    tags: ["خط", "لوحات", "كوي", "لوتس", "أربع لوحات", "calligraphy", "koi", "lotus", "screen"],
  },



  {
    id: "tiktok-44",
    name: "شاشة آرت ديكو ثلاثية بالأقواس والنافورة",
    english: "3-panel Art Deco stylized sunburst fountain and arches divider",
    style: "هندسي",
    palette: 4,
    tags: ["آرت ديكو", "أقواس", "شاشة", "هندسي", "art deco", "arches", "fountain", "screen"],
  },



  {
    id: "tiktok-45",
    name: "ثلاثية أقراص الديك والصنوبر والبونساي",
    english: "Trio of circular bonsai pine, rooster & plum blossom cutouts",
    style: "خطي",
    palette: 3,
    tags: ["ديك", "بونساي", "صنوبر", "ثلاثية", "rooster", "bonsai", "pine", "trio"],
  },



  {
    id: "tiktok-46",
    name: "قاطع أوراق المونستيرا والنخيل الاستوائي الرباعي",
    english: "4-panel tropical monstera and palm leaf laser-cut screen",
    style: "خطي",
    palette: 2,
    tags: ["مونستيرا", "أوراق", "استوائي", "قاطع", "monstera", "palm", "tropical", "screen"],
  },



  {
    id: "tiktok-47",
    name: "لوحة القطيع من الأيائل تحت الشجرة العتيقة",
    english: "Trio of slender deer silhouettes beneath giant spreading tree",
    style: "خطي",
    palette: 3,
    tags: ["أيل", "غزلان", "شجرة", "بوابة", "deer", "tree", "silhouette", "screen"],
  },



  {
    id: "tiktok-48",
    name: "لوحة مفتاح الصول والنوتات الموسيقية بالنجوم",
    english: "Vertical glowing treble clef and floating musical score starry panel",
    style: "خطي",
    palette: 3,
    tags: ["موسيقى", "نوتة", "صول", "نجوم", "music", "treble", "notes", "panel"],
  },



  {
    id: "tiktok-49",
    name: "ثنائية الخيزران وبراعم البرقوق المؤطرة",
    english: "2-panel twin bamboo stalks and plum blossom minimalist screen",
    style: "خطي",
    palette: 3,
    tags: ["خيزران", "أغصان", "ثنائي", "قاطع", "bamboo", "plum", "2-panel", "screen"],
  },



  {
    id: "tiktok-50",
    name: "شريط إفريز اللوتس والمفاتيح المتصل الواسع",
    english: "Wide symmetrical blossoming lotus & Greek-key transom border",
    style: "هندسي",
    palette: 3,
    tags: ["شريط", "إفريز", "لوتس", "أفقي", "frieze", "lotus", "meander", "border"],
  },



  {
    id: "tiktok-51",
    name: "لوحة النسر المحلّق والنمر · لقاء الأبطال",
    english: "Vertical Eagle perched above snarling Tiger heroic screen",
    style: "خطي",
    palette: 3,
    tags: ["نسر", "نمر", "صقر", "شاشة", "eagle", "tiger", "vertical", "panel"],
  },



  {
    id: "tiktok-52",
    name: "قصّة الماعز الجبلي بين اللوتس والعود",
    english: "Freestanding zodiac goat beside peony & lotus garden silhouette",
    style: "خطي",
    palette: 3,
    tags: ["ماعز", "جبل", "لوتس", "زهور", "goat", "peony", "lotus", "silhouette"],
  },



  {
    id: "tiktok-53",
    name: "ثنائية التنين المهيب والنمر الجسور",
    english: "Twin vertical Dragon and roaring Tiger guardian CNC panels",
    style: "خطي",
    palette: 3,
    tags: ["تنين", "نمر", "ثنائي", "عمودي", "dragon", "tiger", "guardian", "panels"],
  },



  {
    id: "tiktok-54",
    name: "شاشة الصنوبر والشلال وطيور الكركي العائلية",
    english: "Square rocky waterfall, gnarled pine & soaring cranes mural panel",
    style: "خطي",
    palette: 3,
    tags: ["شلال", "صنوبر", "كركي", "جدارية", "waterfall", "pine", "cranes", "mural"],
  },



  {
    id: "tiktok-55",
    name: "بانوراما المعبد الجبلي والطيور المحلقة",
    english: "Wide panoramic pine pavilion beside water and flying cranes",
    style: "خطي",
    palette: 3,
    tags: ["معبد", "بانوراما", "كركي", "صنوبر", "pavilion", "cranes", "panoramic"],
  },



  {
    id: "tiktok-56",
    name: "لوحة الحسناء في شرفة اللوتس والصفصاف",
    english: "Vertical classical beauty framed inside circular lotus window",
    style: "خطي",
    palette: 3,
    tags: ["حسناء", "نافذة", "لوتس", "عمودي", "maiden", "lotus", "window", "panel"],
  },



  {
    id: "tiktok-57",
    name: "بوابة الغزلان والغابة المورقة الواسعة",
    english: "Wide panoramic silhouette gate of deer beneath ancient canopy",
    style: "خطي",
    palette: 3,
    tags: ["غزلان", "شجرة", "بوابة", "طبيعة", "deer", "forest", "panoramic", "gate"],
  },



  {
    id: "tiktok-58",
    name: "شاشة النجوم والمضلع الإسلامي الجريء",
    english: "Bold architectural Islamic geometric star lattice vertical screen",
    style: "هندسي",
    palette: 4,
    tags: ["إسلامي", "هندسي", "نجمة", "قاطع", "islamic", "geometric", "star", "screen"],
  },



  {
    id: "tiktok-59",
    name: "شاشة أوراق الزيتون والصفصاف العضوية",
    english: "Tall organic olive & willow leaf silhouette divider panel",
    style: "خطي",
    palette: 2,
    tags: ["زيتون", "صفصاف", "أوراق", "قاطع", "olive", "willow", "leaves", "screen"],
  },



  {
    id: "tiktok-60",
    name: "لوحة مالك الحزين واللوتس وأسماك الكوي",
    english: "Vertical heron standing over blooming lotus and swimming carp",
    style: "خطي",
    palette: 3,
    tags: ["طائر", "لوتس", "كوي", "عمودي", "heron", "lotus", "koi", "panel"],
  },



  {
    id: "tiktok-61",
    name: "ثنائية أوراق المونستيرا الجدارية الحديثة",
    english: "Wide dual modern monstera & tropical fern wall panels",
    style: "خطي",
    palette: 2,
    tags: ["مونستيرا", "أوراق", "حديث", "جدارية", "monstera", "tropical", "panels"],
  },



  {
    id: "tiktok-62",
    name: "لوحة الحارس الأسطوري والعواصف",
    english: "Vertical heroic martial Guardian standing amid billowing clouds",
    style: "خطي",
    palette: 4,
    tags: ["محارب", "حارس", "سحاب", "عمودي", "guardian", "warrior", "clouds", "panel"],
  },



  {
    id: "tiktok-63",
    name: "طقم ثمانية أشرطة مفاتيح إغريقية وزهور",
    english: "8-piece modular Greek-key, wave scroll & rosette gate border strips",
    style: "هندسي",
    palette: 3,
    tags: ["أشرطة", "حواف", "مفاتيح", "طقم", "borders", "strips", "meander", "modular"],
  },



  {
    id: "tiktok-64",
    name: "لوحة الشبك السداسي المفرّغ المزدوج",
    english: "Tall Moroccan hexagonal geometric lattice CNC door screen",
    style: "هندسي",
    palette: 4,
    tags: ["سداسي", "مغربي", "شبكة", "باب", "hexagonal", "moroccan", "lattice", "door"],
  },



  {
    id: "tiktok-65",
    name: "شريط الجدي الاحتفالي بالزهور والفوانيس",
    english: "Festive hornblower Goat amid lanterns and peonies horizontal panel",
    style: "خطي",
    palette: 3,
    tags: ["جدي", "فوانيس", "أزهار", "لوحة", "goat", "lanterns", "peonies", "panel"],
  },



  {
    id: "tiktok-66",
    name: "واجهة الثقوب المعمارية لظل الشجرة الرباعية",
    english: "4-panel perforated circular-hole architectural forest canopy screen",
    style: "هندسي",
    palette: 3,
    tags: ["مثقّب", "شجرة", "واجهة", "نقاط", "perforated", "dots", "canopy", "facade"],
  },



  {
    id: "tiktok-67",
    name: "بوابة الألواح الخماسية والشريط العلوي بالحيوانات",
    english: "5-panel Four Gentlemen screens beneath Zodiac animal transom",
    style: "خطي",
    palette: 3,
    tags: ["خماسي", "ألواح", "فصول", "طنف", "5-panel", "transom", "animals", "screen"],
  },



  {
    id: "tiktok-68",
    name: "شاشة الست لوحات بالنباتات والمناظر الطبيعية",
    english: "6-panel continuous bamboo, orchids, birds and flora partition",
    style: "خطي",
    palette: 3,
    tags: ["ست لوحات", "نباتات", "طيور", "قاطع", "6-panel", "botanical", "screen"],
  },



  {
    id: "tiktok-69",
    name: "ثنائية ألواح النمر والنسر المنسجمة",
    english: "Dual scenic horizontal CNC transom plates with Eagle & Tiger",
    style: "خطي",
    palette: 3,
    tags: ["نسر", "نمر", "ثنائي", "طنف", "eagle", "tiger", "pair", "panels"],
  },



  {
    id: "tiktok-70",
    name: "بوابة الضلفتين بشرائح الصنوبر والطبل البرونزي",
    english: "Twin square slatted 2-leaf gate with grand central Dong Son drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "ضلفتين", "شرائح", "طبل برونزي", "2-leaf", "slatted", "drum", "gate"],
  },



  {
    id: "tiktok-71",
    name: "بوابة الشرائح الموجية المتدرجة العمودية",
    english: "Sculptural rippled vertical wave cutout architectural 2-leaf gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "أمواج", "خطوط", "عصري", "rippled", "wave", "modern", "gate"],
  },



  {
    id: "tiktok-72",
    name: "بوابة جذوع الغابة المثقّبة بنقاط الضوء",
    english: "Architectural 2-leaf gate with tree silhouettes and graduated perforations",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "أشجار", "ثقوب", "عصري", "trees", "perforated", "modern", "gate"],
  },



  {
    id: "tiktok-73",
    name: "بوابة المربعات وطيور العنقاء والطبل المركزي",
    english: "4-panel square-grid gate flanking phoenixes and Dong Son drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مربعات", "عنقاء", "طبل", "grid", "phoenix", "drum", "gate"],
  },



  {
    id: "tiktok-74",
    name: "بوابة المفاتيح الهندسية العريضة والطبل البرونزي",
    english: "Wide square 2-leaf gate with stepped meander edges and bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مفاتيح", "طبل برونزي", "عريضة", "meander", "drum", "wide", "gate"],
  },



  {
    id: "tiktok-75",
    name: "بوابة القوس الكلاسيكي بالطبل والأكانتس",
    english: "Arched 2-leaf CNC gate combining Dong Son drum and acanthus corners",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "أكانتس", "طبل", "arched", "acanthus", "drum", "gate"],
  },



  {
    id: "tiktok-76",
    name: "بوابة القصر المقوسة بالعنقاء وتاج اللوتس",
    english: "Grand arched 2-leaf palace gate crowned with twin phoenixes and scroll crest",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قصر", "عنقاء", "قوس", "لوتس", "palace", "phoenix", "arched", "gate"],
  },



  {
    id: "tiktok-77",
    name: "بوابة غابة الأشجار المظللة الرباعية",
    english: "4-panel architectural forest tree-trunk branching canopy gate",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "غابة", "أشجار", "4 ضلف", "forest", "trees", "4-panel", "gate"],
  },



  {
    id: "tiktok-78",
    name: "بوابة القوس بالفقاعات الهندسية الدائرية",
    english: "Arched 2-leaf polka-circle modern geometric perforation gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قوس", "دوائر", "عصري", "arched", "dots", "modern", "gate"],
  },



  {
    id: "tiktok-79",
    name: "بوابة الضلفتين بالخطوط الملتوية والطبل",
    english: "2-leaf square gate with wavy horizontal slats & spiral bamboo",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "موج", "طبل", "slats", "wave", "drum", "gate"],
  },



  {
    id: "tiktok-80",
    name: "بوابة الخيزران والكركي والألواح الرباعية",
    english: "4-panel gate with bamboo wings, crane filigree & central drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "كركي", "4 ضلف", "bamboo", "crane", "drum", "gate"],
  },



  {
    id: "tiktok-81",
    name: "بوابة الست ضلف المذهبة بالطبل والطنف",
    english: "6-section luxury black & gold gate with bamboo, louver slats & transom",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "6 ضلف", "طنف", "gold", "6-panel", "bamboo", "gate"],
  },



  {
    id: "tiktok-82",
    name: "بوابة الشرائح الأفقية والطبل البرونزي المذهّب",
    english: "4-panel black & gold-ringed Dong Son drum & moon bamboo gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "طبل برونزي", "خيزران", "gold", "drum", "louver", "gate"],
  },



  {
    id: "tiktok-83",
    name: "بوابة اللوتس النقي والطبل البرونزي الرباعية",
    english: "4-panel blooming lotus side sprays and crisp central bronze drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "لوتس", "طبل", "4 ضلف", "lotus", "drum", "4-panel", "gate"],
  },



  {
    id: "tiktok-84",
    name: "بوابة النجوم والطبل وطنف الميداليات الثلاث",
    english: "4-panel black & gold star lattice gate topped by 3-part lattice transom",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "نجوم", "طنف", "gold", "star", "transom", "gate"],
  },



  {
    id: "tiktok-85",
    name: "بوابة الفصول الأربعة والطيور والشلال",
    english: "4-panel Four Seasons poetic gate with calligraphy seals & florals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فصول أربعة", "طيور", "خط", "four seasons", "birds", "calligraphy", "gate"],
  },



  {
    id: "tiktok-86",
    name: "بوابة التوريق الجريء والشرائح الأفقية",
    english: "4-panel bold floral scroll center leaf flanked by clean louver wings",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "توريق", "شرائح", "4 ضلف", "scroll", "louver", "4-panel", "gate"],
  },



  {
    id: "tiktok-87",
    name: "بوابة الضلفتين المذهّبة بالطنف المروحي",
    english: "Twin bronze-trimmed 2-leaf gate with semi-circle sun drum & lintel",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "ضلفتين", "طنف", "gold", "2-leaf", "lintel", "gate"],
  },



  {
    id: "tiktok-88",
    name: "بوابة المعينات القطرية والزوايا المذهبة",
    english: "4-panel diagonal chevron lattice gate with gold filigree diamond",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "معينات", "مذهب", "قطري", "chevron", "diamond", "gold", "gate"],
  },



  {
    id: "tiktok-89",
    name: "بوابة الشبكة المعينية بطنف البركة",
    english: "Tall 2-leaf dark diamond-mesh gate crowned with Fortune transom",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "معينات", "شبكة", "بركة", "diamond", "mesh", "fortune", "gate"],
  },



  {
    id: "tiktok-90",
    name: "بوابة الخيزران الملكي والطبل الفسيح",
    english: "4-panel gate with lush bamboo stalks and full bronze drum centerpiece",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "طبل برونزي", "4 ضلف", "bamboo", "drum", "4-panel", "gate"],
  },



  {
    id: "tiktok-91",
    name: "بوابة الضلفتين بالكركي والخط العربي/الصيني",
    english: "Ornate 2-leaf gate with four calligraphic corner medallions and drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كركي", "ضلفتين", "طبل", "crane", "medallions", "2-leaf", "gate"],
  },



  {
    id: "tiktok-92",
    name: "بوابة الأقواس النقية والطيور واللوتس",
    english: "Stately white-framed 4-panel arched lattice, lotus & crane gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "أقواس", "لوتس", "أبيض", "white", "arched", "lotus", "gate"],
  },



  {
    id: "tiktok-93",
    name: "بوابة التيجان الحديدية والطبل البرونزي المربع",
    english: "Wrought-iron scroll topped 2-leaf gate with dense bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تاج", "حديد", "طبل", "wrought iron", "scroll", "drum", "gate"],
  },



  {
    id: "tiktok-94",
    name: "بوابة الخيزران والشبكة الماسية والطنف الثلاثي",
    english: "4-panel gate with bamboo wings, diamond trellis, gold ring & 3-part lintel",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "طنف", "gold", "bamboo", "trellis", "gate"],
  },



  {
    id: "tiktok-95",
    name: "بوابة الصنوبر والكركي المثقّبة والحلقة الذهبية",
    english: "4-panel dotted trellis, Pine/Crane flanks & gold-ringed drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "صنوبر", "كركي", "مذهب", "pine", "crane", "gold", "gate"],
  },



  {
    id: "tiktok-96",
    name: "بوابة القصر القوسي بالكائنات الأسطورية",
    english: "Arched palace 2-leaf gate with carved phoenix/dragon spandrels",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قصر", "قوس", "أسطوري", "palace", "arched", "phoenix", "gate"],
  },



  {
    id: "tiktok-97",
    name: "بوابة الصنوبر البانورامي والغيوم والطبل المركزي",
    english: "4-panel dramatic gnarled pine cranes flanking crisp Dong Son drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "صنوبر", "سحاب", "كركي", "pine", "clouds", "drum", "gate"],
  },



  {
    id: "tiktok-98",
    name: "بوابة الصخور والزهور والطبل البيضاوي الفضي",
    english: "4-panel bright Dong Son drum center flanked by rocky floral sprays",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "زهور", "صخور", "طبل", "floral", "rockery", "drum", "gate"],
  },



  {
    id: "tiktok-99",
    name: "بوابة مزهريات اللوتس واللوتس المتفتّح",
    english: "4-panel lotus-filled porcelain vases with diamond lattice accents",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مزهرية", "لوتس", "معينات", "vase", "lotus", "diamond", "gate"],
  },



  {
    id: "tiktok-100",
    name: "بوابة الزهور الدقيقة والطبل وزوايا التوريق",
    english: "4-panel crisp delicate lotus vase flanks & ornate filigree corners",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "زهور", "توريق", "طبل", "floral", "filigree", "drum", "gate"],
  },



  {
    id: "tiktok-101",
    name: "بوابة القوس المزخرف بالكوي والبقعة الدائرية",
    english: "Scroll-crested 2-leaf gate with leaping Koi carp and bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تاج", "كوي", "طبل", "crest", "koi", "drum", "gate"],
  },



  {
    id: "tiktok-102",
    name: "بوابة الكركي البانورامية الأربعة المتصلة",
    english: "4-panel continuous misty pine & flying cranes gate without drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كركي", "صنوبر", "بانوراما", "cranes", "pine", "panoramic", "gate"],
  },



  {
    id: "tiktok-103",
    name: "بوابة بركة اللوتس والأقحوان والخيزران البسيطة",
    english: "4-panel minimalist bold botanical lotus and bamboo silhouettes",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "لوتس", "خيزران", "بسيط", "lotus", "bamboo", "minimal", "gate"],
  },



  {
    id: "tiktok-104",
    name: "بوابة الشرائح الرأسية والطيور وطنف الخط",
    english: "4-panel vertical slat trellis with corner plum birds & lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "شرائح رأسية", "طيور", "طنف", "vertical slats", "birds", "lintel", "gate"],
  },



  {
    id: "tiktok-105",
    name: "بوابة الشرائح العصرية بشبك الواي والطبل",
    english: "4-panel horizontal louver & Y-trellis wings around solid bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "هندسي", "طبل", "louver", "lattice", "drum", "gate"],
  },



  {
    id: "tiktok-106",
    name: "بوابة الزوايا المفرّغة والطبل الأسود",
    english: "4-panel sleek black slate gate with geometric trellis outer leaves",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "هندسي", "زوايا", "طبل", "minimal", "trellis", "drum", "gate"],
  },



  {
    id: "tiktok-107",
    name: "بوابة الفصول الأربعة والطيور وطنف الخط",
    english: "4-panel Spring-Summer-Autumn-Winter calligraphy & floral gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فصول أربعة", "أزهار", "لوتس", "four seasons", "floral", "lotus", "gate"],
  },



  {
    id: "tiktok-108",
    name: "بوابة الأسماك السباحة وتوريق الزوايا الأبيض",
    english: "4-panel underwater carp & lotus flanking crescent-scroll drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "لوتس", "توريق", "koi", "lotus", "scroll", "gate"],
  },



  {
    id: "tiktok-109",
    name: "بوابة الكوي المزدوج والحلقة الذهبية المشرقة",
    english: "4-panel gold-ringed drum gate flanked by jumping Koi & hex mesh",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "مذهب", "سداسي", "koi", "gold", "hex", "gate"],
  },



  {
    id: "tiktok-110",
    name: "بوابة خط الرزق واللوتس والخيزران الرباعية",
    english: "4-panel bold calligraphic scrolls framed by lotus and bamboo leaves",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خط", "لوتس", "خيزران", "calligraphy", "lotus", "bamboo", "gate"],
  },



  {
    id: "tiktok-111",
    name: "بوابة الإطار الذهبي وتوريق الزوايا النقي",
    english: "4-panel gold-trimmed jet black panels with corner scrolls & drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "توريق", "أسود", "gold trim", "scroll", "drum", "gate"],
  },



  {
    id: "tiktok-112",
    name: "بوابة الضلفتين المذهب بالشرائح وطنف المفاتيح",
    english: "Clean 2-leaf horizontal louver, Y-mesh & gold drum with meander lintel",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "شرائح", "مفاتيح", "gold", "louver", "meander", "gate"],
  },



  {
    id: "tiktok-113",
    name: "بوابة الخيزران الذهبي والشرائح والطبل",
    english: "4-panel bamboo-framed wings with louver center & gold drum ring",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "شرائح", "gold", "bamboo", "louver", "gate"],
  },



  {
    id: "tiktok-114",
    name: "بوابة الضلفتين بشبك الواي والطبل والمثقّب العلوي",
    english: "Tall 2-leaf geometric gate with gold drum & triangle transom bar",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "هندسي", "طنف", "gold", "geometric", "transom", "gate"],
  },



  {
    id: "tiktok-115",
    name: "بوابة الحصانين المتقابلين وتاج الزخرفة",
    english: "2-leaf heraldic rearing horses in roundel topped with ornate scroll crest",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "خيول", "حصان", "تاج", "horses", "crest", "medallion", "gate"],
  },



  {
    id: "tiktok-116",
    name: "بوابة الطيور والخيزران العريضة المربعة",
    english: "Square 2-leaf gate of cranes perched amidst bamboo beside drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "طيور", "خيزران", "ضلفتين", "cranes", "bamboo", "2-leaf", "gate"],
  },



  {
    id: "tiktok-117",
    name: "بوابة الصنوبر والكركي وطنف المفاتيح الداكن",
    english: "4-panel pine crane wings, dark bronze drum & red-brown fretwork lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "صنوبر", "كركي", "طنف", "pine", "crane", "lintel", "gate"],
  },



  {
    id: "tiktok-118",
    name: "بوابة اللوتس المتفتح والشرائح العمودية",
    english: "4-panel bold lotus corners over wavy vertical striped center",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "لوتس", "شرائح", "أزهار", "lotus", "stripes", "4-panel", "gate"],
  },



  {
    id: "tiktok-119",
    name: "بوابة السفن الشراعية والشمس المشرقة",
    english: "Twin classic sailing ships facing rising sun — Arched 2-leaf prosperity gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "سفينة", "شراع", "شمس", "قوس", "ship", "sail", "sun", "arched", "gate"],
  },



  {
    id: "tiktok-120",
    name: "بوابة القصر العريضة بست ضلف والمفاتيح الذهبية",
    english: "Grand 6-panel estate gate with central gold-dotted drum & twin lintels",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "6 ضلف", "قصر", "مذهب", "estate", "6-panel", "gold", "gate"],
  },



  {
    id: "tiktok-121",
    name: "بوابة الخطوط المتموجة والكركي والصنوبر",
    english: "4-panel kinetic wavy slat center flanked by soaring cranes & pines",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "موج", "كركي", "صنوبر", "wave", "cranes", "pine", "gate"],
  },



  {
    id: "tiktok-122",
    name: "بوابة الأقواس المثقبة بالشرائح العصرية",
    english: "Clean 4-panel arched gate filled with crisp uniform CNC lattice dots",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قوس", "ثقوب", "عصري", "arched", "perforated", "clean", "gate"],
  },



  {
    id: "tiktok-123",
    name: "بوابة التنينين الصاعدين والطبل البرونزي",
    english: "4-panel ascending heraldic dragons flanking central Dong Son drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تنين", "طبل برونزي", "4 ضلف", "dragons", "drum", "4-panel", "gate"],
  },



  {
    id: "tiktok-124",
    name: "بوابة الكوي القافز وزوايا الورود الرباعية",
    english: "4-panel leaping koi carp wings, bold meander scrolls & center drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "توريق", "طبل", "koi", "scroll", "drum", "gate"],
  },


  {
    id: "tiktok-125",
    name: "لوحة النمر الأبيض والصنوبر والقمر الجبلي",
    english: "Vertical crouching white tiger beneath mountain pine and full moon",
    style: "خطي",
    palette: 3,
    tags: ["نمر", "صنوبر", "قمر", "جبال", "tiger", "pine", "moon", "panel"],
  },


  {
    id: "tiktok-126",
    name: "ميدالية البوابة اليابانية والصنوبر والبحيرة",
    english: "Circular Japanese Torii gate beside pine silhouette over tranquil lake",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "توري", "صنوبر", "بحيرة", "torii", "pine", "japan", "roundel"],
  },


  {
    id: "tiktok-127",
    name: "زاوية القلب النباتي واللآلئ الهندسية",
    english: "Openwork beaded border and blooming floral heart L-corner",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "قلب", "لؤلؤ", "نباتي", "corner", "floral", "heart", "bracket"],
  },


  {
    id: "tiktok-128",
    name: "زاوية كوربل كلاسيكية بالتوريق الحلزوني",
    english: "Ornate curved classical architectural C-scroll corbel corner bracket",
    style: "خطي",
    palette: 4,
    tags: ["زاوية", "كوربل", "حلزوني", "كلاسيكي", "corbel", "scroll", "bracket"],
  },


  {
    id: "tiktok-129",
    name: "زوايا البوابة الملكية الكلاسيكية المتناظرة",
    english: "Pair of ornate symmetrically curved neoclassical gate corner brackets",
    style: "خطي",
    palette: 4,
    tags: ["زوايا", "كلاسيكي", "بوابة", "توريق", "brackets", "classical", "gate"],
  },


  {
    id: "tiktok-130",
    name: "ميدالية الفراشات وأزهار البرقوق الدائرية",
    english: "Circular floral medallion featuring dual butterflies and plum blossoms",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "فراشة", "أزهار", "برقوق", "butterfly", "blossoms", "roundel"],
  },


  {
    id: "tiktok-131",
    name: "طنف قوسي حلزوني كلاسيكي متماثل",
    english: "Curved arched metal gate transom crest with running spiral scrollwork",
    style: "هندسي",
    palette: 3,
    tags: ["طنف", "قوس", "حلزون", "تاج", "transom", "arch", "spiral"],
  },


  {
    id: "tiktok-132",
    name: "قرص سمكتي الكوي وأزهار اللوتس المتفتح",
    english: "Circular pond relief with twin Koi carp amid floating lotus pads",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "كوي", "لوتس", "سمك", "koi", "lotus", "roundel"],
  },


  {
    id: "tiktok-133",
    name: "بوابة الطبل وطيور الفينيق الرباعية الأفقية",
    english: "Wide 4-panel Dong Son bronze drum gate with phoenix wing sprays",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فينيق", "طبل برونزي", "4 ضلف", "phoenix", "drum", "4-panel"],
  },


  {
    id: "tiktok-134",
    name: "ميدالية الطبل البرونزي الفيتنامي التراثية",
    english: "Pure circular Dong Son heritage bronze drum radial CNC medallion",
    style: "هندسي",
    palette: 3,
    tags: ["طبل برونزي", "ميدالية", "تراث", "شمس", "dong son", "drum", "medallion"],
  },


  {
    id: "tiktok-135",
    name: "زاوية القوس الشبكي والتوريق الحلزوني",
    english: "Architectural mesh-framed floral spiral gate & rail bracket",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "شبكة", "حلزون", "توريق", "corner", "spiral", "mesh"],
  },


  {
    id: "tiktok-136",
    name: "إفريز الخيول الجامحة في غابة الصنوبر",
    english: "Architectural gate crest featuring galloping wild horses among pines",
    style: "خطي",
    palette: 3,
    tags: ["خيول", "غابة", "صنوبر", "إفريز", "horses", "forest", "crest"],
  },


  {
    id: "tiktok-137",
    name: "زاوية الفراشة وزهور الربيع الصباحية",
    english: "Whimsical butterfly fluttering beside botanical scroll L-bracket",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "فراشة", "زهور", "نباتي", "butterfly", "floral", "corner"],
  },


  {
    id: "tiktok-138",
    name: "لوحة عمودية لزهور اللوتس والأوراق المتشابكة",
    english: "Tall narrow openwork vertical screen panel filled with blooming lotus",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "لوتس", "عمودي", "أزهار", "lotus", "vertical", "panel"],
  },


  {
    id: "tiktok-139",
    name: "ميدالية الشعاع النجمي والبتلات المتفتحة",
    english: "Radial blooming lotus starburst geometric ceiling/gate medallion",
    style: "هندسي",
    palette: 4,
    tags: ["ميدالية", "شعاع", "نجمي", "بتلات", "starburst", "radial", "medallion"],
  },


  {
    id: "tiktok-140",
    name: "قرص شجرة الحياة بين الأيدي والقلب",
    english: "Circular Tree of Life cradled by cupped hands and heart motif",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "شجرة الحياة", "قلب", "أيدي", "tree of life", "hands", "roundel"],
  },


  {
    id: "tiktok-141",
    name: "زاوية الأرابيسك الكلاسيكي الهندسية",
    english: "Compact neoclassical openwork rosette and scroll corner fill",
    style: "خطي",
    palette: 3,
    tags: ["زاوية", "أرابيسك", "كلاسيكي", "وردة", "arabesque", "rosette", "corner"],
  },


  {
    id: "tiktok-142",
    name: "بوابة الازدهار والخط وزوايا التوريق",
    english: "4-panel prosperity calligraphy scrolls and lattice medallion gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خط", "ازدهار", "4 ضلف", "calligraphy", "scroll", "gate"],
  },


  {
    id: "tiktok-143",
    name: "تاج إفريز الورود والأوراق المتدلية",
    english: "Sweeping floral blossom and acanthus leaf horizontal gate corner",
    style: "خطي",
    palette: 3,
    tags: ["تاج", "ورود", "أوراق", "أفقي", "floral", "acanthus", "bracket"],
  },


  {
    id: "tiktok-144",
    name: "ميدالية وزاوية اللوتس والتوريق المزدوجة",
    english: "Paired openwork peony-cloud roundel and lotus corner scroll set",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "زاوية", "لوتس", "أزهار", "roundel", "lotus", "corner"],
  },


  {
    id: "tiktok-145",
    name: "بوابة طيور الكركي والصنوبر والطبل الفسيح",
    english: "4-panel graceful crane & pine flanking radiant central bronze drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كركي", "صنوبر", "طبل", "cranes", "pine", "drum", "gate"],
  },


  {
    id: "tiktok-146",
    name: "شاشة أشجار البتولا الخماسية المتناغمة",
    english: "5-panel continuous branching birch woodland privacy partition screen",
    style: "خطي",
    palette: 2,
    tags: ["شاشة", "أشجار", "خماسية", "غابة", "5-panel", "trees", "forest", "screen"],
  },


  {
    id: "tiktok-147",
    name: "بوابة الخيزران ورمز الحياة الطويلة الرباعية",
    english: "4-panel stately bamboo thickets flanking Longevity seal center",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "طول العمر", "4 ضلف", "bamboo", "longevity", "gate"],
  },


  {
    id: "tiktok-148",
    name: "ثنائية لوحات النسر والصقر والنمر الجبلي",
    english: "Dual dramatic Eagle soaring over cliffs & crouching Tiger gate inserts",
    style: "خطي",
    palette: 3,
    tags: ["نسر", "نمر", "ثنائية", "بوابة", "eagle", "tiger", "pair", "panels"],
  },


  {
    id: "tiktok-149",
    name: "بوابة الألواح المائلة والخيزران والطبل",
    english: "Clean 4-panel bamboo stalks & diagonal filigree flanking bronze drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "توريق", "طبل", "bamboo", "filigree", "drum", "gate"],
  },


  {
    id: "tiktok-150",
    name: "لوحة الكوي المزدوج وزهر اللوتس بالإطار",
    english: "Horizontal scenic dual Koi carp amidst lotus inside Greek-key frame",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "كوي", "لوتس", "مفتاح إغريقي", "koi", "lotus", "meander"],
  },


  {
    id: "tiktok-151",
    name: "قرص الطبل البرونزي بإطار المفاتيح الدائري",
    english: "Warm bronze-toned concentric radial Dong Son drum medallion",
    style: "هندسي",
    palette: 3,
    tags: ["طبل برونزي", "قرص", "هندسي", "برونز", "dong son", "drum", "medallion"],
  },


  {
    id: "tiktok-152",
    name: "بوابة الشبك المربّع والخيزران وطنف الطول",
    english: "Symmetric 4-panel square lattice gate with bamboo wings & drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "خيزران", "شبكة", "مربعات", "bamboo", "lattice", "drum", "gate"],
  },


  {
    id: "tiktok-153",
    name: "لوحة الشجرة والأوراق المتطايرة الخماسية",
    english: "5-panel poetic silhouette of ancient tree shedding leaves in wind",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "شجرة", "أوراق", "خماسية", "tree", "leaves", "5-panel", "screen"],
  },


  {
    id: "tiktok-154",
    name: "بوابة التيجان المنحنية بالطاووس وطنف السماء",
    english: "Scroll-crested 2-leaf gate with peacocks flanking bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تاج", "طاووس", "طبل", "peacock", "crest", "drum", "gate"],
  },


  {
    id: "tiktok-155",
    name: "شاشة الست لوحات بالنباتات والمناظر الستة",
    english: "6-panel tall botanical gallery screen with plum, orchid & bamboo",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "ست لوحات", "نباتات", "خيزران", "6-panel", "botanical", "screen"],
  },


  {
    id: "tiktok-156",
    name: "قرص الطبل الأسود النقّي والرموز الشمسية",
    english: "High-contrast jet black circular Dong Son radial sunburst drum",
    style: "هندسي",
    palette: 3,
    tags: ["طبل برونزي", "أسود", "ميدالية", "شمس", "dong son", "drum", "sunburst"],
  },


  {
    id: "tiktok-157",
    name: "بوابة الزهور والأختام السفلية الرباعية",
    english: "4-panel flourishing pines, floral sprays and four lower calligraphy seals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "زهور", "أختام", "طبل", "floral", "seals", "drum", "gate"],
  },


  {
    id: "tiktok-158",
    name: "إفريز الأرابيسك الكلاسيكي المتماثل العريض",
    english: "Wide openwork baroque scrollwork horizontal architectural transom",
    style: "خطي",
    palette: 4,
    tags: ["إفريز", "أرابيسك", "باروك", "طنف", "baroque", "scrollwork", "transom"],
  },


  {
    id: "tiktok-159",
    name: "رباعية ألواح الطبيعة والطاووس العمودية",
    english: "4 tall slender scenic CNC panels featuring cranes, lotus and bamboo",
    style: "خطي",
    palette: 3,
    tags: ["رباعية", "طيور", "لوتس", "خيزران", "4-panel", "cranes", "lotus"],
  },


  {
    id: "tiktok-160",
    name: "بوابة الثروة والحظ وطيور الكركي والطبل",
    english: "4-panel cranes & pine wings with calligraphic fortune roundels & drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "ثروة", "كركي", "طبل", "fortune", "cranes", "drum", "gate"],
  },


  {
    id: "tiktok-161",
    name: "بوابة الشجرة العملاقة والطيور المحلقة الرباعية",
    english: "Wide 4-panel sprawling tree canopy with soaring birds gate screen",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "شجرة", "طيور", "ظل", "tree", "canopy", "birds", "gate"],
  },


  {
    id: "tiktok-162",
    name: "بوابة شبك المفاتيح وشجرة الوسط البيضاوية",
    english: "Modern 4-panel geometric fretwork flanking central cameo tree oval",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شبكة", "شجرة", "بيضاوي", "fretwork", "tree", "oval", "gate"],
  },


  {
    id: "tiktok-163",
    name: "بوابة الفصول الأربعة والشجرة والطبل المركزي",
    english: "4-panel seasonal foliage, cranes and central drum architectural gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فصول", "كركي", "طبل", "seasons", "cranes", "drum", "gate"],
  },


  {
    id: "tiktok-164",
    name: "بوابة الضلفتين بأوراق الموز الاستوائية",
    english: "Contemporary 2-panel sleek black tropical banana & palm leaf gate",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "أوراق", "استوائي", "ضلفتين", "tropical", "leaves", "2-panel", "gate"],
  },


  {
    id: "tiktok-165",
    name: "شاشة الماندالا الزهرية الإسلامية الرباعية",
    english: "4-panel delicate floral starburst lattice privacy screen",
    style: "هندسي",
    palette: 4,
    tags: ["شاشة", "ماندالا", "إسلامي", "هندسي", "mandala", "islamic", "lattice", "screen"],
  },


  {
    id: "tiktok-166",
    name: "بوابة الأقواس المذهبة بطنف المعينات الستة",
    english: "2-leaf gold-trimmed arched filigree gate crowned by 6 diamond lintels",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "مذهب", "أقواس", "معينات", "gold", "arched", "lintel", "gate"],
  },


  {
    id: "tiktok-167",
    name: "بوابة الشبكة الماسية والزوايا الفضية المذهبة",
    english: "4-panel diamond trellis wings with gold-framed scroll & bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "معينات", "طبل", "gold", "diamond", "drum", "gate"],
  },


  {
    id: "tiktok-168",
    name: "بوابة الخيزران الهلالي والطيور والأطر الذهبية",
    english: "4-panel gold-bordered moonlit bamboo, crane & peony luxury gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "مذهب", "قمر", "gold", "bamboo", "moon", "gate"],
  },


  {
    id: "tiktok-169",
    name: "بوابة التوريق المنحني والطبل البرونزي والمفاتيح",
    english: "Clean 4-panel baroque scrollwork flanking classic Dong Son drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "توريق", "طبل", "باروك", "scroll", "baroque", "drum", "gate"],
  },


  {
    id: "tiktok-170",
    name: "بوابة الأشرطة القطرية المزدوجة بطنف المثقّب",
    english: "Modern 4-panel bold diagonal chevron louvers under twin perforated lintels",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قطري", "عصري", "طنف", "chevron", "modern", "louver", "gate"],
  },


  {
    id: "tiktok-171",
    name: "بوابة المتاهة الهندسية والطبل المركزي",
    english: "4-panel stepped labyrinth Greek-key lattice surrounding Dong Son drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "متاهة", "مفاتيح", "طبل", "maze", "meander", "lattice", "gate"],
  },


  {
    id: "tiktok-172",
    name: "بوابة المكعبات ثلاثية الأبعاد وختم العمر المديد",
    english: "All-over 3D isometric tumbling block gate centered on Longevity emblem",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مكعبات", "هندسي", "ثلاثي الأبعاد", "3d", "cubes", "isometric", "gate"],
  },


  {
    id: "tiktok-173",
    name: "بوابة الباروك الواسع والطبل المركزي الأنيق",
    english: "Stately 4-panel curved acanthus side corners and crisp center drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "باروك", "طبل", "4 ضلف", "baroque", "acanthus", "drum", "gate"],
  },


  {
    id: "tiktok-174",
    name: "بوابة الخطوط المعمارية القطرية المتقاطعة",
    english: "Contemporary 4-panel crisp geometric prism & diagonal slat gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "معاصر", "قطري", "شرائح", "prism", "diagonal", "modern", "gate"],
  },


  {
    id: "tiktok-175",
    name: "بوابة الشرائح العريضة وزهرة المركز البيضاء",
    english: "Ultra-clean 4-panel horizontal louver gate with diamond floral core",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "أفقي", "بسيط", "louver", "horizontal", "clean", "gate"],
  },


  {
    id: "tiktok-176",
    name: "بوابة انفجار الأوراق المينيمالية السوداء",
    english: "Minimalist high-contrast jet black 4-panel negative-space radial leaves",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "أوراق", "مينيمال", "أسود", "minimalist", "leaves", "modern", "gate"],
  },


  {
    id: "tiktok-177",
    name: "بوابة الخيزران الهلالي والحلقة الذهبية الصافية",
    english: "4-panel jet-black moon bamboo flanking clean gold-ringed drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "مذهب", "طبل", "bamboo", "gold", "moon", "gate"],
  },


  {
    id: "tiktok-178",
    name: "بوابة شبك الواي والشرائح الأفقية والطبل الداكن",
    english: "Clean 4-panel Y-lattice side wings, horizontal louvers & solid drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "هندسي", "طبل", "y-lattice", "louver", "drum", "gate"],
  },


  {
    id: "tiktok-179",
    name: "بوابة الكاتدرائية الذهبية والشعاع المقوّس",
    english: "Grand arched gold-accented sunburst & chalice filigree gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "كاتدرائية", "شعاع", "مذهب", "arched", "sunburst", "gold", "gate"],
  },


  {
    id: "tiktok-180",
    name: "بانوراما الأعمدة المنظورية والقباب الرباعية",
    english: "4-panel dramatic 3D checkered floor & perspective arched colonnade",
    style: "هندسي",
    palette: 4,
    tags: ["بانوراما", "أعمدة", "أقواس", "منظور", "colonnade", "perspective", "arches"],
  },


  {
    id: "tiktok-181",
    name: "بوابة الملائكة المبشّرين والطبل والتاج القوسي",
    english: "Twin trumpeting angels crown arched 2-leaf gate with radiant drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "تاج", "ملائكة", "angels", "arched", "crown", "gate"],
  },


  {
    id: "tiktok-182",
    name: "بوابة السواد الأنيق والمثقّب المذهب",
    english: "Ultra-sleek 4-panel matte black & gold micro-perforated upper grid gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "أسود", "مذهب", "مثقب", "matte black", "gold", "minimal", "gate"],
  },


  {
    id: "tiktok-183",
    name: "بوابة القصر الأربعينية بأوراق الأكانتس والتيجان",
    english: "Majestic 4-panel floral urns & sweeping wrought scroll top pediment",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "أكانتس", "تاج", "4 ضلف", "acanthus", "urns", "crest", "gate"],
  },


  {
    id: "tiktok-184",
    name: "بوابة الوردة القوطية والأقواس المزدوجة",
    english: "Architectural Gothic rose wheel & fluted arched colonnade 2-leaf gate",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "قوطي", "وردة", "أقواس", "gothic", "rose window", "arches", "gate"],
  },


  {
    id: "tiktok-185",
    name: "لوحة قفزة الكوي عبر بوابة الخيزران والصنوبر",
    english: "Dynamic Koi carp leaping through dragon gate surrounded by pine & bamboo",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "كوي", "خيزران", "صنوبر", "koi", "bamboo", "dragon gate", "panel"],
  },


  {
    id: "tiktok-186",
    name: "بوابة الشبكة المربعة الدقيقة والطبل الأفقي",
    english: "Fine micro-square lattice 4-panel gate with louvered central drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شبكة", "مربعات", "طبل", "grid", "louver", "drum", "gate"],
  },


  {
    id: "tiktok-187",
    name: "بوابة النمرين الحارسين والشرائح الأفقية",
    english: "Twin roaring tigers flank horizontal slatted 4-panel Dong Son drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نمر", "شرائح", "طبل", "tigers", "louver", "drum", "gate"],
  },


  {
    id: "tiktok-188",
    name: "بوابة القوس الدائري الذهبي والتيجان الملفوفة",
    english: "Wide arched scroll-crested 2-leaf gate with central circular emblem",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "تاج", "مذهب", "arched", "crest", "gold", "gate"],
  },


  {
    id: "tiktok-189",
    name: "بوابة الميداليات الزهرية الثلاثية المتراصة",
    english: "4-panel triple cascading floral rosette medallions & diamond fretwork",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "ميداليات", "زهور", "هندسي", "rosettes", "medallions", "trellis", "gate"],
  },


  {
    id: "tiktok-190",
    name: "بوابة الأبراج الاثني عشر والطبل النحاسي",
    english: "Copper-toned 2-leaf gate bordered by 12 Zodiac animal medallions",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "أبراج", "طبل", "نحاسي", "zodiac", "animals", "drum", "gate"],
  },


  {
    id: "tiktok-191",
    name: "قاطع الأمواج الزهرية المتموّجة الرباعي",
    english: "4-panel fluid S-wave botanical dandelion & starburst room divider",
    style: "خطي",
    palette: 3,
    tags: ["قاطع", "أمواج", "زهور", "عصري", "wave", "floral", "divider", "4-panel"],
  },


  {
    id: "tiktok-192",
    name: "سياج البوابة القزمي المنخفض بالتاج القوسي",
    english: "Wide horizontal courtyard balustrade gate with filigree crest",
    style: "خطي",
    palette: 4,
    tags: ["سياج", "بوابة", "تاج", "أفقي", "balustrade", "courtyard", "crest", "gate"],
  },


  {
    id: "tiktok-193",
    name: "بوابة المعينات الدقيقة والأطر الذهبية النقية",
    english: "Minimalist 4-panel obsidian gates veined with delicate gold borders",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "معينات", "أسود", "minimal", "gold", "diamond", "gate"],
  },


  {
    id: "tiktok-194",
    name: "بوابة الملائكة الراكعين والعرش القوسي الذهبي",
    english: "Arched filigree sanctuary gate showcasing twin golden kneeling angels",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "ملائكة", "قوس", "مذهب", "angels", "golden", "arched", "gate"],
  },


  {
    id: "tiktok-195",
    name: "بوابة الكوي المزدوج والأختام المستديرة واللوتس",
    english: "Wide 4-panel leaping koi carp, blessing medallions & crisp bronze drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "أختام", "لوتس", "koi", "seals", "drum", "gate"],
  },


  {
    id: "tiktok-196",
    name: "بوابة الضلفتين بالزهور والطبل الكبير والطيور",
    english: "Clean wide 2-leaf gate with floral sprays surrounding bold Dong Son drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "ضلفتين", "زهور", "طبل", "2-leaf", "floral", "drum", "gate"],
  },


  {
    id: "tiktok-197",
    name: "بوابة المزهريات والخيزران والطبل العريض",
    english: "4-panel wide gate pairing lotus vases & bamboo with bronze drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مزهرية", "خيزران", "طبل", "vase", "bamboo", "drum", "gate"],
  },


  {
    id: "tiktok-198",
    name: "بوابة المفاتيح الهندسية المائلة والطبل الأوسط",
    english: "4-panel diagonal key fret lattice surrounding central bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مفاتيح", "هندسي", "طبل", "fretwork", "lattice", "drum", "gate"],
  },


  {
    id: "tiktok-199",
    name: "بوابة الشرائح الرأسية والكوي والأختام الرباعية",
    english: "2-leaf vertical ribbed gate framed by leaping koi & top seal medallions",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "شرائح رأسية", "أختام", "koi", "vertical", "seals", "gate"],
  },


  {
    id: "tiktok-200",
    name: "قاطع السداسيات المتداخلة وأزهار الأقحوان الرباعي",
    english: "4-panel 3D interwoven hexagonal ribbons flanked by daisy blossoms",
    style: "هندسي",
    palette: 4,
    tags: ["قاطع", "سداسي", "أقحوان", "هندسي", "hexagonal", "3d ribbon", "daisy", "screen"],
  },


  {
    id: "tiktok-201",
    name: "بوابة المستقبل بالثقوب المتدرجة الهندسية",
    english: "Futuristic 4-panel architectural chevron & gradient dot-matrix gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مستقبلي", "ثقوب", "هندسي", "futuristic", "gradient", "dots", "gate"],
  },


  {
    id: "tiktok-202",
    name: "بوابة السواد الصافي والشبك السداسي وطنف الشبكة",
    english: "2-leaf minimalist jet black gate with hexagonal lace wings & top transom",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "أسود", "سداسي", "طنف", "minimal", "hex", "transom", "gate"],
  },

  {
    id: "tiktok-203",
    name: "بوابة الخيزران الذهبي والطبل المشرق الرباعية",
    english: "4-panel black and gold radial Dong Son drum and bamboo gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "طبل", "gold", "bamboo", "drum", "gate"],
  },

  {
    id: "tiktok-204",
    name: "طقم إطار الباب والأشرطة الشبكية المموجة",
    english: "Arched door filigree frame and four geometric weave strip panels",
    style: "هندسي",
    palette: 3,
    tags: ["إطار", "أشرطة", "شبكة", "باب", "frame", "strips", "lattice", "arch"],
  },

  {
    id: "tiktok-205",
    name: "قصّة الثعلب الأم وصغيرها الظلية",
    english: "Silhouetted mother fox and playful kit botanical cutout",
    style: "خطي",
    palette: 2,
    tags: ["ثعلب", "حيوان", "ظل", "قص", "fox", "kit", "animal", "silhouette"],
  },

  {
    id: "tiktok-206",
    name: "بوابة الضلفتين المذهّبة بشبك معيّن وطبل",
    english: "2-leaf horizontal louver and hex trellis gate with gold drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "معينات", "طبل", "gold", "louver", "drum", "2-leaf"],
  },

  {
    id: "tiktok-207",
    name: "شاشة الأشرطة الورقية والأمواج الرباعية",
    english: "4-panel flowing botanical leaf-scroll architectural partition",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "أوراق", "أربع لوحات", "موج", "4-panel", "leaves", "scroll", "screen"],
  },

  {
    id: "tiktok-208",
    name: "بوابة أزهار البرقوق ورمز العمر المديد",
    english: "4-panel Longevity medallion gate with blossom boughs and songbirds",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "عمر مديد", "أزهار", "طيور", "longevity", "blossom", "birds", "gate"],
  },

  {
    id: "tiktok-209",
    name: "بوابة الزهور الهندسية والشبك السداسي",
    english: "4-panel hexagonal lattice gate inlaid with chrysanthemum rosettes",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "سداسي", "زهور", "هندسي", "hexagonal", "floral", "rosette", "gate"],
  },

  {
    id: "tiktok-210",
    name: "شاشة المراوح النباتية المنسابة الرباعية",
    english: "4-panel sweeping botanical palm-fan lattice divider screen",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "نباتي", "أربع لوحات", "نخيل", "4-panel", "palm", "botanical", "screen"],
  },

  {
    id: "tiktok-211",
    name: "لوحة اللوتس المتسامي والسيقان العمودية",
    english: "Tall vertical blooming lotus pond and vertical rib laser screen",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "لوتس", "عمودي", "أزهار", "lotus", "vertical", "screen"],
  },

  {
    id: "tiktok-212",
    name: "بوابة العنقاء المتحلقة وأزهار الفاوانيا",
    english: "4-panel heraldic phoenix wings and peony rosette filigree gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "عنقاء", "فاوانيا", "توريق", "phoenix", "peony", "filigree", "gate"],
  },

  {
    id: "tiktok-213",
    name: "بوابة الطبل المزدوج بطنف المعينات الستة",
    english: "4-panel diamond mesh wings, radial drum and six-section transom",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "طبل", "معينات", "طنف", "drum", "diamond", "transom", "gate"],
  },

  {
    id: "tiktok-214",
    name: "بوابة الأجنحة السداسية والميداليات الدائرية",
    english: "4-panel diagonal honeycomb wing gate centered with floral emblems",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "سداسي", "ميدالية", "4 ضلف", "honeycomb", "medallions", "4-panel", "gate"],
  },

  {
    id: "tiktok-215",
    name: "طقم البوابة القوسية الباروكية والتاج الملوكي",
    english: "Ornate 4-panel and wicket gate topped by grand baroque scroll pediment",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "باروك", "تاج", "طقم", "baroque", "crest", "scrollwork", "gate"],
  },

  {
    id: "tiktok-216",
    name: "طقم خمسة أشرطة مفاتيح وحلزون كلاسيكية",
    english: "Five modular CNC scroll, coin and Greek-key meander rail borders",
    style: "هندسي",
    palette: 3,
    tags: ["أشرطة", "مفاتيح", "حلزون", "حواف", "borders", "meander", "scroll", "strips"],
  },

  {
    id: "tiktok-217",
    name: "طقم الألواح المستديرة والتوريق والأفريز",
    english: "Six-piece oval rosette, radial drum and baroque corner scroll doors",
    style: "خطي",
    palette: 4,
    tags: ["ألواح", "وردة", "أفريز", "توريق", "rosette", "drum", "frieze", "panels"],
  },

  {
    id: "tiktok-218",
    name: "بوابة الصنوبر والكركي النحاسية الدافئة",
    english: "Warm bronze 4-panel pine, soaring cranes and Dong Son drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "صنوبر", "كركي", "bronze", "pine", "cranes", "gate"],
  },

  {
    id: "tiktok-219",
    name: "بوابة الكوي المزدوج والوردات المربعة",
    english: "2-leaf leaping Koi carp wings flanking four circular floral medallions",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "ضلفتين", "وردة", "koi", "medallions", "2-leaf", "gate"],
  },

  {
    id: "tiktok-220",
    name: "طقم قرص العملة التراثية والأشرطة النباتية",
    english: "Round floral prosperity coin emblem paired with modular border strips",
    style: "هندسي",
    palette: 3,
    tags: ["ميدالية", "قرص", "أشرطة", "طقم", "medallion", "borders", "coin", "set"],
  },

  {
    id: "tiktok-221",
    name: "لوحة أوراق الصفصاف المتدلية الكثيفة",
    english: "Tall cascading willow and tropical leaf negative-space partition",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "صفصاف", "أوراق", "عمودي", "willow", "leaves", "vertical", "panel"],
  },

  {
    id: "tiktok-222",
    name: "بوابة الخيزران والصنوبر البرونزية والأختام",
    english: "Copper-toned 4-panel bamboo, pine, drum and upper round seals gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "برونز", "خيزران", "أختام", "copper", "bamboo", "seals", "gate"],
  },

  {
    id: "tiktok-223",
    name: "بوابة طقم التوريق الحلزوني والأفريز العلوي",
    english: "4-panel vertical scroll gate paired with upper floral fretwork lintels",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "توريق", "أفريز", "طقم", "scroll", "lintels", "4-panel", "gate"],
  },

  {
    id: "tiktok-224",
    name: "بوابة الطبل المذهب والمفاتيح والزهور",
    english: "4-panel obsidian and gold floral bamboo and Dong Son drum gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "طبل", "gold", "bamboo", "drum", "gate"],
  },

  {
    id: "tiktok-225",
    name: "بوابة البركة المربعة والتوريق المفتوح",
    english: "Wide 2-leaf central Happiness calligraphy ringed by lotus tendrils",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "بركة", "ضلفتين", "لوتس", "blessing", "lotus", "2-leaf", "gate"],
  },

  {
    id: "tiktok-226",
    name: "بوابة الشرائح والشبك السداسي بالمقابض الذهبية",
    english: "4-panel louvered gate with honeycomb wings, gold pulls and top frieze",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "مذهب", "سداسي", "louver", "gold", "honeycomb", "gate"],
  },

  {
    id: "tiktok-227",
    name: "بوابة الكوي الذهبي والطبل وطنف المعينات",
    english: "4-panel golden-ringed Dong Son drum flanked by Koi carp and lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "مذهب", "طبل", "koi", "gold", "drum", "gate"],
  },

  {
    id: "tiktok-228",
    name: "بوابة الضلفتين والكوي وشرائح الطبل",
    english: "4-panel horizontal slatted center drum with twin jumping Koi carp wings",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "شرائح", "طبل", "koi", "slats", "drum", "gate"],
  },

  {
    id: "tiktok-229",
    name: "بوابة الضلفتين بالطبل البرونزي وإطار المفاتيح",
    english: "Square 2-leaf dense Dong Son drum framed inside double key frets",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "طبل", "مفاتيح", "ضلفتين", "drum", "meander", "2-leaf", "gate"],
  },

  {
    id: "tiktok-230",
    name: "بوابة القوس الذهبي المنحني وتوريق الباروك",
    english: "Warm bronze curved-crest arched 2-leaf filigree acanthus gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "برونز", "باروك", "arched", "bronze", "baroque", "gate"],
  },

  {
    id: "tiktok-231",
    name: "شاشة الأقحوان الهندسي والتساقط الزهري",
    english: "Slender architectural daisy blossom geometric lattice divider panel",
    style: "هندسي",
    palette: 3,
    tags: ["شاشة", "أقحوان", "هندسي", "عمودي", "daisy", "geometric", "panel"],
  },

  {
    id: "tiktok-232",
    name: "ثنائية أفاريز التوريق الحلزوني النحاسية",
    english: "Pair of crisp horizontal copper-toned baroque scroll frieze strips",
    style: "خطي",
    palette: 4,
    tags: ["أفاريز", "نحاسي", "حلزوني", "شريط", "frieze", "copper", "scroll", "pair"],
  },

  {
    id: "tiktok-233",
    name: "لوحة أزهار الماغنوليا وأوراق الخريف المربعة",
    english: "Square silhouette cutout of blooming magnolia flowers and foliage",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "ماغنوليا", "مربع", "أزهار", "magnolia", "floral", "square", "panel"],
  },

  {
    id: "tiktok-234",
    name: "لوحة السنجاب البري على غصن السنديان",
    english: "Vertical woodland silhouette of perched squirrel on leafy oak bough",
    style: "خطي",
    palette: 3,
    tags: ["سنجاب", "غصن", "لوحة", "طبيعة", "squirrel", "woodland", "vertical", "panel"],
  },

  {
    id: "tiktok-235",
    name: "طقم إفريز الباروك المتناظر والأركان الأربعة",
    english: "Grand horizontal neoclassical scroll crest with four matching corner pieces",
    style: "خطي",
    palette: 4,
    tags: ["إفريز", "باروك", "زوايا", "طقم", "baroque", "corners", "crest", "set"],
  },

  {
    id: "tiktok-236",
    name: "ثنائية نافذة القوس الباروكي وميدالية الوردة",
    english: "Architectural arched baroque filigree window paired with circular rosette",
    style: "خطي",
    palette: 4,
    tags: ["نافذة", "قوس", "ميدالية", "باروك", "arch", "rosette", "baroque", "pair"],
  },

  {
    id: "tiktok-237",
    name: "لوحة الشبكة النباتية والزهور الدائرية العمودية",
    english: "Tall narrow openwork floral rosette lattice divider screen",
    style: "هندسي",
    palette: 3,
    tags: ["لوحة", "عمودي", "شبكة", "أزهار", "vertical", "lattice", "rosette", "panel"],
  },

  {
    id: "tiktok-238",
    name: "رباعية أوراق الشجر المتراقصة للبوابات",
    english: "Four modular botanical swirl openwork infill panels",
    style: "خطي",
    palette: 3,
    tags: ["رباعية", "أوراق", "توريق", "بوابة", "botanical", "swirl", "4-panel", "infill"],
  },

  {
    id: "tiktok-239",
    name: "طقم ست وحدات شبكية هندسية للدرابزين",
    english: "Six modular Islamic-inspired star geometric railing squares",
    style: "هندسي",
    palette: 4,
    tags: ["طقم", "درابزين", "هندسي", "نجوم", "railing", "geometric", "modular", "set"],
  },

  {
    id: "tiktok-240",
    name: "بوابة الضلفتين العملاقة بالطبل التراثي الدقيق",
    english: "Monumental full-bleed 2-leaf fine-detail Dong Son bronze drum gate",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "طبل برونزي", "تراثي", "ضخم", "dong son", "drum", "monumental", "gate"],
  },

  {
    id: "tiktok-241",
    name: "ميدالية طول العمر واللوتس المتفتح الدائرية",
    english: "Circular Longevity script plaque nestled among lotus petals and reeds",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "طول العمر", "لوتس", "دائرة", "longevity", "lotus", "medallion"],
  },

  {
    id: "tiktok-242",
    name: "بوابة النسر المحلق والنمر الجبلي والخيزران",
    english: "4-panel heroic Eagle and crouching Tiger flanking Longevity center seal",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نسر", "نمر", "عمر مديد", "eagle", "tiger", "longevity", "gate"],
  },

  {
    id: "tiktok-243",
    name: "ثنائية شاشات الماندالا الوردية النحاسية",
    english: "Pair of warm copper rosette mandala filigree partition panels",
    style: "هندسي",
    palette: 4,
    tags: ["ثنائية", "ماندالا", "نحاسي", "وردة", "mandala", "copper", "rosette", "pair"],
  },

  {
    id: "tiktok-244",
    name: "بوابة الماس الذهبي والحلقة المضيئة والخيزران",
    english: "4-panel black and gold lotus-bamboo gate framed in diamond mesh",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "معينات", "gold", "bamboo", "diamond", "gate"],
  },

  {
    id: "tiktok-245",
    name: "بوابة العصافير والأقحوان والطبل الأوسط",
    english: "4-panel songbirds perched above lush chrysanthemums flanking radial drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "عصافير", "أقحوان", "طبل", "birds", "chrysanthemum", "drum", "gate"],
  },

  {
    id: "tiktok-246",
    name: "شعار الأسد الزائر بالإطار المربع الجريء",
    english: "Dramatic roaring Lion mascot stencil bursting from dark square frame",
    style: "خطي",
    palette: 3,
    tags: ["أسد", "شعار", "مربع", "جريء", "lion", "emblem", "square", "roaring"],
  },

  {
    id: "tiktok-247",
    name: "بوابة القوس العلوي ببركة اللوتس الواسعة",
    english: "Gently arched 2-leaf courtyard gate overflowing with blooming lotus",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "قوس", "لوتس", "ضلفتين", "arched", "lotus", "courtyard", "gate"],
  },

  {
    id: "tiktok-248",
    name: "لوحة ركنية بأزهار اللوتس المتفتحة",
    english: "Compact rectangular lotus blossom and curled stem railing cutout",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "لوتس", "درابزين", "أزهار", "lotus", "railing", "compact", "panel"],
  },

  {
    id: "tiktok-249",
    name: "درابزين زهرة الشمس والزوايا الهندسية",
    english: "Horizontal architectural sunburst rosette framed in key fretwork",
    style: "هندسي",
    palette: 3,
    tags: ["درابزين", "زهرة", "مفاتيح", "أفقي", "railing", "sunburst", "meander", "panel"],
  },

  {
    id: "tiktok-250",
    name: "بوابة الهلال والنجوم الذهبية والطبل وتاج اللوتس",
    english: "Luxury black and gold crescent bamboo gate crowned by ornate transom",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "هلال", "طنف", "gold", "crescent", "bamboo", "gate"],
  },

  {
    id: "tiktok-251",
    name: "بوابة الشرائح الطولية والطبل الهندسي وطنف المعينات",
    english: "4-panel vertical-fluted grille surrounding crisp Dong Son drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "طبل", "طنف", "fluted", "drum", "transom", "gate"],
  },

  {
    id: "tiktok-252",
    name: "بوابة القوس الباروكي بالمزهريات والتوريق",
    english: "Arched 2-leaf French neoclassical scroll and finial palace gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "باروك", "كلاسيكي", "arched", "classical", "palace", "gate"],
  },

  {
    id: "tiktok-253",
    name: "قصّة اليعسوب المفصّل بالأجنحة الشبكية",
    english: "Clean five-part Dragonfly body and veined wings CNC cutting sheet",
    style: "خطي",
    palette: 3,
    tags: ["يعسوب", "أجنحة", "حشرة", "قص", "dragonfly", "wings", "veins", "cutout"],
  },

  {
    id: "tiktok-254",
    name: "لوحة المتاهة الهندسية الإغريقية الممدودة",
    english: "Tall interlocked rectangular Greek-key labyrinth lattice screen",
    style: "هندسي",
    palette: 3,
    tags: ["لوحة", "متاهة", "مفاتيح إغريقية", "شبكة", "labyrinth", "meander", "lattice", "panel"],
  },

  {
    id: "tiktok-255",
    name: "بوابة الخيزران المائل والطبل المركزي الواسع",
    english: "4-panel clean Dong Son drum gate flanked by rustling bamboo",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "طبل", "4 ضلف", "bamboo", "drum", "4-panel", "gate"],
  },

  {
    id: "tiktok-256",
    name: "بوابة السداسيات والزوايا الكلاسيكية المذهبة",
    english: "4-panel hexagonal filigree wings and central gold-ringed drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "سداسي", "مذهب", "طبل", "hex", "gold", "drum", "gate"],
  },

  {
    id: "tiktok-257",
    name: "بوابة التوريق القطري وطبل المركز وتيجان الأختام",
    english: "Luxury 4-panel gold-edged corner filigree, drum and four round crests",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "مذهب", "تاج", "طبل", "gold", "corner", "crests", "gate"],
  },

  {
    id: "tiktok-258",
    name: "بوابة الشرائح الأفقية والحلقة الدقيقة والطبل",
    english: "4-panel fine Dong Son drum inside vertical slat border and diamond wings",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "معينات", "طبل", "slats", "diamond", "drum", "gate"],
  },

  {
    id: "tiktok-259",
    name: "ثنائية أفاريز الكركي والكوي النهرية العريضة",
    english: "Twin wide horizontal river reliefs featuring flying cranes and swimming koi",
    style: "خطي",
    palette: 3,
    tags: ["ثنائية", "أفاريز", "كركي", "كوي", "friezes", "cranes", "koi", "panoramic"],
  },

  {
    id: "tiktok-260",
    name: "شاشة اللوتس البرعم وإطار المفاتيح العمودية",
    english: "Tall vertical keyhole-framed lotus pond screen panel",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "لوتس", "عمودي", "إطار", "lotus", "vertical", "meander", "screen"],
  },

  {
    id: "tiktok-261",
    name: "بوابة الأسماك السباحة والأختام الدائرية الأربع",
    english: "4-panel underwater Koi and reeds gate crowned with four seals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "أختام", "لوتس", "koi", "seals", "lotus", "gate"],
  },

  {
    id: "tiktok-262",
    name: "بوابة التطريز الهندسي النحاسي وطنف الألماس",
    english: "Copper-toned 4-panel woven step-diamond trellis gate with upper frieze",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "معينات", "طنف", "copper", "diamond", "trellis", "gate"],
  },

  {
    id: "tiktok-263",
    name: "بوابة القضبان العمودية وميداليات الشمس",
    english: "Grand vertical bar balustrade 4-panel gate with sunburst rosettes",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قضبان", "شمس", "وردة", "baluster", "sunburst", "rosette", "gate"],
  },

  {
    id: "tiktok-264",
    name: "شاشة أزهار الكوزموس الخشبية العمودية",
    english: "Tall warm terracotta botanical cosmos blossom openwork divider",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "أزهار", "خشبي", "عمودي", "floral", "cosmos", "vertical", "screen"],
  },

  {
    id: "tiktok-265",
    name: "شريط التوريق الهندسي الخشبي النحيف",
    english: "Slender vertical warm oak geometric scroll and medallion partition",
    style: "هندسي",
    palette: 3,
    tags: ["شريط", "خشبي", "هندسي", "عمودي", "slender", "oak", "geometric", "strip"],
  },

  {
    id: "tiktok-266",
    name: "لوحة الأيائل المرقطة في غابة الخيزران",
    english: "Vertical silhouette of twin spotted deer stepping through bamboo grove",
    style: "خطي",
    palette: 3,
    tags: ["أيائل", "خيزران", "لوحة", "طبيعة", "deer", "bamboo", "forest", "panel"],
  },

  {
    id: "tiktok-267",
    name: "ثنائية الألواح النباتية وتقسيم ختم العمر المديد",
    english: "Symmetrical twin narrow split-medallion foliage laser panels",
    style: "خطي",
    palette: 3,
    tags: ["ثنائية", "أوراق", "عمر مديد", "عمودي", "twin", "foliage", "longevity", "panels"],
  },

  {
    id: "tiktok-268",
    name: "لوحة سيقان الخيزران والطيور المحلقة تحت القمر",
    english: "Tall dramatic midnight silhouette of bamboo blades and flying cranes",
    style: "خطي",
    palette: 2,
    tags: ["خيزران", "طيور", "قمر", "لوحة", "bamboo", "cranes", "moon", "panel"],
  },

  {
    id: "tiktok-269",
    name: "حامل النملات الساعية الممتع للديكور",
    english: "Whimsical horizontal silhouette bracket of marching ants with tools",
    style: "خطي",
    palette: 2,
    tags: ["نمل", "ديكور", "حامل", "طريف", "ants", "bracket", "whimsical", "decor"],
  },

  {
    id: "tiktok-270",
    name: "ثنائية ألواح أوراق المونستيرا والموز المربعة",
    english: "Wide pair of lush layered tropical palm and monstera doors",
    style: "خطي",
    palette: 2,
    tags: ["ثنائية", "مونستيرا", "أوراق", "مربع", "monstera", "tropical", "pair", "doors"],
  },

  {
    id: "tiktok-271",
    name: "بوابة الضلفتين الطويلة بالشرائح والطبل البرونزي",
    english: "Tall slim 2-leaf horizontal slotted gate centered with fine bronze drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "طبل", "ضلفتين", "tall", "slats", "drum", "gate"],
  },

  {
    id: "tiktok-272",
    name: "طقم إفريز الورود الكلاسيكي وبلاطتي الوسط",
    english: "Openwork rococo horizontal gate frieze with matching square centerpiece",
    style: "خطي",
    palette: 4,
    tags: ["إفريز", "ورود", "طقم", "باروك", "frieze", "rococo", "floral", "set"],
  },

  {
    id: "tiktok-273",
    name: "ثنائية بوابات القصر المذهب الأربع والضلفين",
    english: "Paired 4-panel and 2-leaf black & gold scroll-corner drum gates",
    style: "خطي",
    palette: 4,
    tags: ["ثنائية", "بوابة", "مذهب", "طبل", "pair", "gold", "drum", "gates"],
  },

  {
    id: "tiktok-274",
    name: "بوابة الضلفتين بالمفاتيح الذهبية والحلقة المضيئة",
    english: "Clean 2-leaf horizontal louver gate framed by gold diamond filigree",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "ضلفتين", "شرائح", "gold", "louver", "2-leaf", "gate"],
  },

  {
    id: "tiktok-275",
    name: "بوابة القصر العنابية بالخيزران القمري والطبل",
    english: "Grand maroon-framed 4-panel gate with crescent bamboo and key transom",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "عنابي", "خيزران", "طبل", "maroon", "bamboo", "drum", "gate"],
  },

  {
    id: "tiktok-276",
    name: "درابزين الزهرة الهندسية والتوريق الحلزوني العريض",
    english: "Horizontal openwork lotus-compass medallion framed by scroll tendrils",
    style: "هندسي",
    palette: 4,
    tags: ["درابزين", "وردة", "حلزوني", "أفقي", "balustrade", "compass", "scroll", "rail"],
  },

  {
    id: "tiktok-277",
    name: "بوابة الميداليات الأربع والأختام الدائرية المربعة",
    english: "Square 2-leaf honeycomb filigree gate with four corner crane roundels",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مربع", "أختام", "ضلفتين", "honeycomb", "cranes", "2-leaf", "gate"],
  },

  {
    id: "tiktok-278",
    name: "لوحة الثقوب الفقاعية العشوائية الحديثة",
    english: "Contemporary architectural organic graduated polka-circle panel",
    style: "هندسي",
    palette: 2,
    tags: ["لوحة", "دوائر", "ثقوب", "حديث", "bubbles", "dots", "modern", "panel"],
  },

  {
    id: "tiktok-279",
    name: "بوابة القوس العلوي والأشعة والتنينين",
    english: "4-panel arched lattice top gate with ascending dragons flanking drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "تنين", "طبل", "arched", "dragons", "drum", "gate"],
  },

  {
    id: "tiktok-280",
    name: "لوحة اللوتس المتفتح في الإطار المتدرج",
    english: "Clean rectangular blooming lotus panel inside stepped geometric frame",
    style: "خطي",
    palette: 3,
    tags: ["لوحة", "لوتس", "إطار", "نباتي", "lotus", "stepped", "frame", "panel"],
  },

  {
    id: "tiktok-281",
    name: "بوابة التاج الباروكي باللوتس الشاهق والطبل",
    english: "Scroll-topped 2-leaf gate combining tall lotus stems and bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تاج", "لوتس", "طبل", "crest", "lotus", "drum", "gate"],
  },

  {
    id: "tiktok-282",
    name: "إفريز زهرة اللوتس وأمواج المفاتيح العريض",
    english: "Wide symmetrical floral lotus centerpiece bordered by Greek meander waves",
    style: "هندسي",
    palette: 3,
    tags: ["إفريز", "لوتس", "أمواج", "مفاتيح", "frieze", "lotus", "meander", "border"],
  },

  {
    id: "tiktok-283",
    name: "شريط التوريق الزهري الكثيف الممتد",
    english: "Long architectural scroll-and-blossom lacy horizontal gate cornice",
    style: "خطي",
    palette: 4,
    tags: ["شريط", "توريق", "أفقي", "زخرفي", "cornice", "floral", "scroll", "strip"],
  },

  {
    id: "tiktok-284",
    name: "لوحة أوراق المونستيرا والنخيل المربعة المظللة",
    english: "Dense layered square tropical monstera foliage laser facade panel",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "مونستيرا", "نخيل", "مربع", "monstera", "palm", "foliage", "square"],
  },

  {
    id: "tiktok-285",
    name: "حاجز الدرج المائل بأوراق الخيزران المظللة",
    english: "Angled stair-banister triangular CNC infill with crisp bamboo silhouettes",
    style: "خطي",
    palette: 2,
    tags: ["درج", "خيزران", "مثلث", "درابزين", "stair", "bamboo", "banister", "angled"],
  },

  {
    id: "tiktok-286",
    name: "بوابة النخيل الساحلي وطبل المركز وتاج الكركي",
    english: "4-panel tropical coastal palm wings surrounding radial drum & crane lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نخيل", "كركي", "طبل", "palms", "cranes", "drum", "gate"],
  },

  {
    id: "tiktok-287",
    name: "بوابة أربع ضلف بالزنبق المائي وبلاطات الألماس",
    english: "4-panel vertical pond lily and moonlit diamond-tile base gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "زنبق", "لوتس", "معينات", "lily", "diamond", "4-panel", "gate"],
  },

  {
    id: "tiktok-288",
    name: "لوحة غابة السرخس وأوراق النخيل المتداخلة",
    english: "Tall vertical overlapping fern fronds and botanical leaves silhouette",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "سرخس", "أوراق", "عمودي", "fern", "leaves", "vertical", "panel"],
  },

  {
    id: "tiktok-289",
    name: "درابزين الدرع الكلاسيكي والإفريز النحاسي",
    english: "Warm copper horizontal baroque heraldic wreath balcony grille",
    style: "خطي",
    palette: 4,
    tags: ["درابزين", "نحاسي", "درع", "باروك", "copper", "balcony", "baroque", "rail"],
  },

  {
    id: "tiktok-290",
    name: "بوابة الخيزران الهلالي والشرائح العمودية والطبل",
    english: "4-panel fine Dong Son drum gate with moonlit bamboo and vertical ribs",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "هلال", "طبل", "bamboo", "moon", "drum", "gate"],
  },

  {
    id: "tiktok-291",
    name: "شاشة اللوتس المنحني وإطار المفاتيح المتقطع",
    english: "Vertical openwork lotus blooms nested inside stepped geometric fret border",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "لوتس", "مفاتيح", "عمودي", "lotus", "fretwork", "vertical", "screen"],
  },

  {
    id: "tiktok-292",
    name: "طقم بوابة التوريق الكلاسيكية وأسوار الحديقة",
    english: "Complete 4-panel scroll gate set paired with matching matching fence grilles",
    style: "خطي",
    palette: 4,
    tags: ["طقم", "بوابة", "سور", "توريق", "gate", "fence", "scroll", "set"],
  },

  {
    id: "tiktok-293",
    name: "بوابة القوس الملوكي بالشرائح القطرية والطبل المذهب",
    english: "Arched maroon-and-gold 4-panel chevron louver and radial drum gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قوس", "مذهب", "قطري", "arched", "gold", "chevron", "gate"],
  },

  {
    id: "tiktok-294",
    name: "بوابة الطبل الكثيف وأغصان الخيزران المزدوجة",
    english: "4-panel dense radial Dong Son drum flanked by slim leafy bamboo sprigs",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "طبل", "كثيف", "bamboo", "drum", "dense", "gate"],
  },

  {
    id: "tiktok-295",
    name: "بوابة الخيزران الذهبي والشبك الماسي والطبل",
    english: "4-panel gold-bordered radial drum, lattice leaves and corner flourishes",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "شبكة", "gold", "bamboo", "lattice", "gate"],
  },

  {
    id: "tiktok-296",
    name: "بوابة الألواح المستقيمة والشبك الذهبي وطنف المعينات",
    english: "4-panel horizontal louver, honeycomb filigree & triple gold transom lintel",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "شرائح", "طنف", "gold", "louver", "transom", "gate"],
  },

  {
    id: "tiktok-297",
    name: "بوابة المربعات الهندسية والخطوط الذهبية الحديثة",
    english: "Contemporary 4-panel jet-black dot matrix accented by nested gold borders",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "مربعات", "عصري", "gold", "modern", "squares", "gate"],
  },

  {
    id: "tiktok-298",
    name: "بوابة الفينيق المذهب والقمر وطنف التاج الباروكي",
    english: "4-panel soaring phoenix wings beneath baroque scroll transom & dual gold moons",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "فينيق", "مذهب", "تاج", "phoenix", "gold", "crest", "gate"],
  },

  {
    id: "tiktok-299",
    name: "لوحة أوراق الجنكة المتراكبة الهندسية المربعة",
    english: "Square architectural ginkgo leaf fan pattern CNC divider panel",
    style: "هندسي",
    palette: 3,
    tags: ["لوحة", "جنكة", "مربع", "نباتي", "ginkgo", "leaves", "square", "panel"],
  },

  {
    id: "tiktok-300",
    name: "لوحة الأرنب البري بين الأزهار والقصب",
    english: "Vertical wild Rabbit seated amongst blooming peonies and meadow reeds",
    style: "خطي",
    palette: 3,
    tags: ["أرنب", "زهور", "لوحة", "طبيعة", "rabbit", "florals", "vertical", "panel"],
  },

  {
    id: "tiktok-301",
    name: "بوابة النحاس المزخرفة بالتوريق والطبل الأوسط",
    english: "Warm copper 4-panel sweeping acanthus scroll wings and large bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "نحاسي", "أكانتس", "طبل", "copper", "acanthus", "drum", "gate"],
  },

  {
    id: "tiktok-302",
    name: "بوابة الضلفتين بالأقحوان الكثيف والفواصل الوردية",
    english: "Wide 2-leaf openwork blooming daisy and stylized sunburst panels",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "أقحوان", "زهور", "ضلفتين", "daisy", "floral", "2-leaf", "gate"],
  },

  {
    id: "tiktok-303",
    name: "بوابة أسماك الكوي والأمواج والخطوط المتموجة",
    english: "4-panel kinetic wavy slats framed by leaping Koi carp and central rosette",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "موج", "شرائح", "koi", "waves", "slats", "gate"],
  },

  {
    id: "tiktok-304",
    name: "بوابة المربعات المائلة والشرائح والطبل البرونزي",
    english: "4-panel herringbone chevron lattice flanking Dong Son center drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مربعات", "طبل", "4 ضلف", "herringbone", "chevron", "drum", "gate"],
  },

  {
    id: "tiktok-305",
    name: "بوابة القوس الدائري بتاج التوريق وميدالية الشمس",
    english: "Square scroll-crested 2-leaf sunburst medallion inside dense cross fret",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "تاج", "ميدالية", "شمس", "crest", "sunburst", "fretwork", "gate"],
  },

  {
    id: "tiktok-306",
    name: "بوابة الشرائح المينيمالية والإطار المذهّب السداسي",
    english: "Minimalist 4-panel horizontal louver center bordered by gold-ringed rosettes",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "شرائح", "عصري", "gold", "minimalist", "louver", "gate"],
  },

  {
    id: "tiktok-307",
    name: "طقم نافذة التوريق القوسي والزوايا المثلثية",
    english: "Arched neoclassical botanical window filigree paired with corner spandrels",
    style: "خطي",
    palette: 4,
    tags: ["طقم", "نافذة", "قوس", "زوايا", "arch", "spandrels", "filigree", "window"],
  },

  {
    id: "tiktok-308",
    name: "بوابة الثقوب المتدرجة لظلال الغابة الحديثة",
    english: "Architectural 4-panel halftone dot-perforated forest silhouette gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "ثقوب", "غابة", "عصري", "halftone", "dots", "forest", "gate"],
  },

  {
    id: "tiktok-309",
    name: "بوابة النحاس الإغريقية بالمعينات والزوايا",
    english: "Warm copper 4-panel Greek meander border and lattice center panel",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "مفاتيح", "معينات", "copper", "meander", "lattice", "gate"],
  },

  {
    id: "tiktok-310",
    name: "لوحة الكركي المزدوج تحت الصنوبر والشمس",
    english: "Vertical scenic silhouette of twin cranes beneath gnarled pine & setting sun",
    style: "خطي",
    palette: 3,
    tags: ["كركي", "صنوبر", "شمس", "لوحة", "cranes", "pine", "sun", "panel"],
  },

  {
    id: "tiktok-311",
    name: "بوابة الأزهار الملكية والطيور وأختام الكركي",
    english: "4-panel lush peony filigree gate crowned with twin circular crane crests",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "أزهار", "كركي", "أختام", "floral", "cranes", "seals", "gate"],
  },

  {
    id: "tiktok-312",
    name: "بوابة الفناء القوسية بالصنوبر والكركي والطبل",
    english: "Courtyard curved-top 2-leaf pine/crane wings and multi-section plinths",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "فناء", "كركي", "طبل", "courtyard", "cranes", "drum", "gate"],
  },

  {
    id: "tiktok-313",
    name: "بوابة النحاس الهندسية بالطبل والأختام الدائرية",
    english: "Warm copper 4-panel diamond mesh wings surrounding sunlit radial drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "معينات", "طبل", "copper", "diamond", "drum", "gate"],
  },

  {
    id: "tiktok-314",
    name: "بوابة الحراب العلوية والطبل التراثي والأزهار",
    english: "Spear-picket crowned 4-panel lattice & dense bronze drum estate gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "حراب", "طبل", "قصر", "spear", "picket", "drum", "gate"],
  },

  {
    id: "tiktok-315",
    name: "لوحة الديك الشامخ تحت أوراق الغصون",
    english: "Vertical crowing rooster cutout amidst garden blossoms and overhanging foliage",
    style: "خطي",
    palette: 3,
    tags: ["ديك", "أغصان", "لوحة", "حيوان", "rooster", "foliage", "vertical", "panel"],
  },

  {
    id: "tiktok-316",
    name: "بوابة الضلفتين بالثقوب الموشورية الحديثة",
    english: "Modern 2-leaf tall perforated bevel-triangle geometric stencil gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "ثقوب", "مثلثات", "عصري", "modern", "perforated", "triangles", "gate"],
  },

  {
    id: "tiktok-317",
    name: "لوحة بذور الهندباء الطائرة فوق الشبكة الهندسية",
    english: "Whimsical tall floating dandelion clocks against crisp trellis lattice",
    style: "خطي",
    palette: 3,
    tags: ["هندباء", "شبكة", "لوحة", "أزهار", "dandelion", "lattice", "vertical", "panel"],
  },

  {
    id: "tiktok-318",
    name: "طقم درابزين الشبكة المربّعة المتدرج الثلاثي",
    english: "Trio of graduated square-grid architectural stair guardrail panels",
    style: "هندسي",
    palette: 2,
    tags: ["درابزين", "مربعات", "طقم", "درج", "guardrail", "grid", "stepped", "trio"],
  },

  {
    id: "tiktok-319",
    name: "ميدالية بركة اللوتس الثلاثية الدائرية الدقيقة",
    english: "Intricate circular filigree medallion packed with three blooming lotus flowers",
    style: "خطي",
    palette: 4,
    tags: ["ميدالية", "لوتس", "دائرة", "زخرفي", "medallion", "lotus", "filigree", "roundel"],
  },

  {
    id: "tiktok-320",
    name: "ميدالية الفصول الأربعة والشريط الحلزوني المصاحبة",
    english: "Quadrant circle botanical seasons plaque paired with running scroll strip",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "فصول", "شريط", "دائرة", "quadrant", "seasons", "scroll", "medallion"],
  },

  {
    id: "tiktok-321",
    name: "بوابة الكوي واللوتس البرونزية الدافئة",
    english: "Warm bronze 4-panel swimming Koi carp & lotus wings surrounding drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "كوي", "لوتس", "bronze", "koi", "lotus", "gate"],
  },

  {
    id: "tiktok-322",
    name: "سياج الأشجار المتشابكة الرباعي للحدائق",
    english: "4-panel continuous branching woodland silhouette privacy screen fence",
    style: "خطي",
    palette: 2,
    tags: ["سياج", "أشجار", "غابة", "4 لوحات", "trees", "forest", "fence", "screen"],
  },

  {
    id: "tiktok-323",
    name: "بوابة القصر القوسي بالكركي وطبل المركز الكبير",
    english: "Curved scroll pediment 4-panel soaring crane and bronze drum mansion gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قصر", "كركي", "تاج", "pediment", "cranes", "drum", "gate"],
  },

  {
    id: "tiktok-324",
    name: "لوحة الثعلب النائم بين الزهور الغابية",
    english: "Vertical sleeping fox curled gracefully amongst blossoms and curling leaves",
    style: "خطي",
    palette: 3,
    tags: ["ثعلب", "زهور", "لوحة", "عمودي", "fox", "blossoms", "vertical", "panel"],
  },

  {
    id: "tiktok-325",
    name: "بوابة السوسن وختم العمر المديد الواسعة",
    english: "4-panel bold iris blossoms flanking split Longevity emblem with key trim",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "سوسن", "عمر مديد", "أزهار", "iris", "longevity", "4-panel", "gate"],
  },

  {
    id: "tiktok-326",
    name: "بوابة الطاووسين المتقابلين في إطار اللوتس",
    english: "4-panel twin framed peacocks & clouds beside open geometric grid center",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "طاووس", "لوتس", "4 ضلف", "peacocks", "framed", "4-panel", "gate"],
  },

  {
    id: "tiktok-327",
    name: "ميدالية البونساي والطائر المغرد الدائرية",
    english: "Circular twisting ancient bonsai pine with perched bird silhouette",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "بونساي", "طائر", "دائرة", "bonsai", "bird", "roundel", "pine"],
  },

  {
    id: "tiktok-328",
    name: "بوابة الشرائح القطرية والطبل الشعاعي الحديث",
    english: "Contemporary 4-panel directional louver chevron gate around dark radial drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "قطري", "عصري", "chevron", "louver", "modern", "gate"],
  },

  {
    id: "tiktok-329",
    name: "بوابة بركة اللوتس والميداليات الدائرية المزدوجة",
    english: "Low arched 2-leaf lush lotus pond gate over four spoked dharma rounds",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "لوتس", "قوس", "بركة", "lotus", "arched", "pond", "gate"],
  },

  {
    id: "tiktok-330",
    name: "بوابة المراوح الشعاعية النحاسية الأربعة",
    english: "Warm copper 4-panel sweeping sunburst rays geometric modern gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "شعاع", "عصري", "copper", "sunburst", "rays", "gate"],
  },

  {
    id: "tiktok-331",
    name: "بوابة الخيزران الذهبي وطنف المعينات المربع",
    english: "4-panel black & gold bamboo wings with central Dong Son drum and diamond top",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "طنف", "gold", "bamboo", "transom", "gate"],
  },

  {
    id: "tiktok-332",
    name: "بوابة مفاتيح الحظ والأختام الدائرية السماوية",
    english: "4-panel peony & key-fretwork lotus gate crowned with four symbol seals",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "مفاتيح", "لوتس", "أختام", "meander", "lotus", "seals", "gate"],
  },

  {
    id: "tiktok-333",
    name: "بوابة القبة الرباعية بطيور الفينيق والأزهار",
    english: "Cathedral arched 4-panel heraldic phoenix and plum tree relief gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قبة", "فينيق", "أزهار", "arched", "phoenix", "relief", "gate"],
  },

  {
    id: "tiktok-334",
    name: "درابزين زهرة اللوتس المتناظرة بالمفاتيح",
    english: "Clean horizontal centered lotus bloom railing bordered with meander keys",
    style: "خطي",
    palette: 3,
    tags: ["درابزين", "لوتس", "مفاتيح", "أفقي", "railing", "lotus", "meander", "panel"],
  },

  {
    id: "tiktok-335",
    name: "بوابة الشرائح الهادئة وزهور الزوايا الأربع",
    english: "Minimalist 4-panel dark louver wings framed with small floral corner sprays",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "زهور", "عصري", "louver", "minimal", "floral", "gate"],
  },

  {
    id: "tiktok-336",
    name: "شعار الفراشة المفصلة المفتوحة الجناحين",
    english: "Bold clean monarch butterfly line-cutout silhouette template",
    style: "خطي",
    palette: 2,
    tags: ["فراشة", "شعار", "طبيعة", "قص", "butterfly", "monarch", "silhouette", "cutout"],
  },

  {
    id: "tiktok-337",
    name: "طقم خماسي متدرج بشبكة أزهار الخبازى",
    english: "Five stepped graduated widths of blooming hibiscus geometric grille",
    style: "خطي",
    palette: 3,
    tags: ["طقم", "خماسي", "أزهار", "شبكة", "5-panel", "hibiscus", "stepped", "grille"],
  },

  {
    id: "tiktok-338",
    name: "بوابة الشرائح السداسية المذهبة الصافية",
    english: "Ultra-sleek 4-panel gold honeycomb outer wings & slatted central drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "سداسي", "شرائح", "gold", "honeycomb", "slats", "gate"],
  },

  {
    id: "tiktok-339",
    name: "بوابة زهور الهندباء الطويلة الأربعة",
    english: "Minimalist 4-panel modern tall slender dandelion puff partition doors",
    style: "خطي",
    palette: 2,
    tags: ["بوابة", "هندباء", "حديث", "4 ضلف", "dandelion", "minimal", "modern", "gate"],
  },

  {
    id: "tiktok-340",
    name: "لوحة أوراق الأدغال الاستوائية الكثيفة الأفقية",
    english: "Wide horizontal jungle canopy tropical leaf architectural cutout grille",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "أوراق", "أدغال", "استوائي", "jungle", "leaves", "horizontal", "grille"],
  },

  {
    id: "tiktok-341",
    name: "لوحة البلشون الرشيق تحت الأغصان المتدلية",
    english: "Vertical elegant heron standing in pond under weeping branches",
    style: "خطي",
    palette: 3,
    tags: ["طائر", "بلشون", "لوحة", "عمودي", "heron", "pond", "vertical", "panel"],
  },

  {
    id: "tiktok-342",
    name: "بوابة الألماس الكثيف وأختام الحظ السماوية",
    english: "4-panel symmetrical floral diamond mesh flanked by upper round seals",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "ألماس", "أختام", "زهور", "diamond", "seals", "floral", "gate"],
  },

  {
    id: "tiktok-343",
    name: "إفريز الغصن النحاسي المتدفق الزخرفي",
    english: "Compact horizontal warm copper botanical acanthus corner frieze",
    style: "خطي",
    palette: 3,
    tags: ["إفريز", "نحاسي", "أفقي", "غصن", "copper", "botanical", "frieze", "strip"],
  },

  {
    id: "tiktok-344",
    name: "بوابة الخيزران والأختام السفلية والشرائح",
    english: "4-panel sunlit Dong Son drum with lush bamboo & four corner seals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "أختام", "طبل", "bamboo", "seals", "drum", "gate"],
  },

  {
    id: "tiktok-345",
    name: "بوابة السلة الهندسية النحاسية المترابطة",
    english: "Warm copper 4-panel interlocking fretwork basketweave center gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "هندسي", "سلة", "copper", "basketweave", "fretwork", "gate"],
  },

  {
    id: "tiktok-346",
    name: "بوابة الكوي الذهبي المتقافز ورمز البركة",
    english: "Grand 4-panel glowing golden twin Koi circling lotus & Blessing seal",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "مذهب", "بركة", "koi", "gold", "blessing", "gate"],
  },

  {
    id: "tiktok-347",
    name: "لوحة الكوي المتموج وسط توريق اللوتس",
    english: "Vertical bold swimming Koi carp surrounded by curled acanthus lotus tendrils",
    style: "خطي",
    palette: 3,
    tags: ["كوي", "لوتس", "لوحة", "عمودي", "koi", "lotus", "vertical", "panel"],
  },

  {
    id: "tiktok-348",
    name: "ميدالية الطبل البرونزي التراثية الخالصة",
    english: "Pure circular bronze-toned Dong Son heritage sunburst medallion",
    style: "هندسي",
    palette: 4,
    tags: ["ميدالية", "طبل برونزي", "شمس", "دائرة", "dong son", "drum", "bronze", "medallion"],
  },

  {
    id: "tiktok-349",
    name: "لوحة النمر الخارج من غابة الخيزران الكثيفة",
    english: "Vertical dramatic striped tiger prowling forward through wild bamboo",
    style: "خطي",
    palette: 3,
    tags: ["نمر", "خيزران", "لوحة", "عمودي", "tiger", "bamboo", "vertical", "panel"],
  },

  {
    id: "tiktok-350",
    name: "بوابة الضلفتين المذهبة بالشرائح والشبك السداسي",
    english: "Clean 4-panel gold honeycomb outer wings & horizontal slat drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "سداسي", "شرائح", "gold", "hex", "slats", "gate"],
  },

  {
    id: "tiktok-351",
    name: "بوابة الأقواس الأربعة بالنقش الباروكي الكثيف",
    english: "Arched 4-panel lacy baroque botanical vine grille courtyard doors",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قوس", "باروك", "4 ضلف", "arched", "baroque", "filigree", "doors"],
  },

  {
    id: "tiktok-352",
    name: "بوابة المزهريات الزهرية والطبل النقي وطنف الزاوية",
    english: "4-panel floral branch urn wings flanking radial drum and high lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مزهريات", "طبل", "طنف", "urns", "floral", "drum", "gate"],
  },

  {
    id: "tiktok-353",
    name: "بوابة الهلال والنجوم الذهبية والزهور الوردية",
    english: "Black & gold moonlit bamboo 4-panel gate with rose drum accent",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "هلال", "خيزران", "gold", "moon", "bamboo", "gate"],
  },

  {
    id: "tiktok-354",
    name: "بوابة ختم العمر الشبك السداسي والشرائح",
    english: "4-panel slatted honeycomb grille gate centered with bold Longevity mark",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "عمر مديد", "سداسي", "شرائح", "longevity", "hex", "slats", "gate"],
  },

  {
    id: "tiktok-355",
    name: "بوابة الأقواس والحراب بحديقة اللوتس والطيور",
    english: "Spear-picket arched 2-leaf courtyard gate packed with cranes & lotus",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "حراب", "لوتس", "طيور", "picket", "lotus", "birds", "gate"],
  },

  {
    id: "tiktok-356",
    name: "طقم إفريز الباروك وزخارف الأعمدة والأركان",
    english: "Multi-piece ornate baroque gate scroll cornice, strips & square plaque",
    style: "خطي",
    palette: 4,
    tags: ["طقم", "إفريز", "باروك", "أركان", "frieze", "baroque", "cornice", "set"],
  },

  {
    id: "tiktok-357",
    name: "ثنائية أبواب أوراق المونستيرا والنخيل المدمجة",
    english: "Asymmetric twin botanical tropical monstera & palm door cutout panels",
    style: "خطي",
    palette: 2,
    tags: ["ثنائية", "مونستيرا", "نخيل", "أبواب", "monstera", "palm", "twin", "doors"],
  },

  {
    id: "tiktok-358",
    name: "ثنائية تيجان الأقواس الباروكية واللوتس العريضة",
    english: "Twin curved baroque scroll & blooming lotus symmetrical balustrade lintels",
    style: "خطي",
    palette: 4,
    tags: ["ثنائية", "تيجان", "باروك", "لوتس", "lintels", "baroque", "lotus", "pair"],
  },

  {
    id: "tiktok-359",
    name: "بوابة المعينات الكثيفة والشرائح والطبل التراثي",
    english: "High-contrast 4-panel diagonal rhombus fretwork & Dong Son drum gate",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "معينات", "طبل", "شرائح", "rhombus", "drum", "slats", "gate"],
  },

  {
    id: "tiktok-360",
    name: "بوابة التضفير النحاسي والطبل الشعاعي الواسع",
    english: "Warm copper 4-panel perforated weave wings around central sunburst drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "طبل", "تضفير", "copper", "weave", "drum", "gate"],
  },

  {
    id: "tiktok-361",
    name: "بوابة الخيزران المزدهر والطبل الأوسط المشرق",
    english: "4-panel sunlit bamboo grove leaves around detailed Dong Son drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "خيزران", "طبل", "4 ضلف", "bamboo", "drum", "4-panel", "gate"],
  },

  {
    id: "tiktok-362",
    name: "بوابة الشبكة الذهبية العريضة بالشرائح والطبل",
    english: "4-panel gold-bordered honeycomb & horizontal slats around clear radial drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "سداسي", "طبل", "gold", "hex", "drum", "gate"],
  },

  {
    id: "tiktok-363",
    name: "لوحة البومة الحكيمة على غصن الماغنوليا",
    english: "Vertical cute big-eyed Owl perched amongst blooming magnolia flowers",
    style: "خطي",
    palette: 3,
    tags: ["بومة", "ماغنوليا", "لوحة", "طيور", "owl", "magnolia", "vertical", "panel"],
  },

  {
    id: "tiktok-364",
    name: "بوابة المفاتيح الكلاسيكية والطبل والخلية السداسية",
    english: "4-panel meander key-bordered Dong Son drum & dense hexagonal trellis",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مفاتيح", "سداسي", "طبل", "meander", "hex", "drum", "gate"],
  },

  {
    id: "tiktok-365",
    name: "لوحة الجواد الجامح في غابة الصنوبر الجبلية",
    english: "Vertical rearing stallion silhouette surrounded by billowing forest foliage",
    style: "خطي",
    palette: 3,
    tags: ["حصان", "جواد", "غابة", "لوحة", "horse", "stallion", "forest", "panel"],
  },

  {
    id: "tiktok-366",
    name: "بوابة النحاس بالأختام العلوية والزهر والطبل",
    english: "Copper-toned 4-panel scroll gate topped with four lotus/blessing seals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نحاسي", "أختام", "لوتس", "copper", "seals", "lotus", "gate"],
  },

  {
    id: "tiktok-367",
    name: "بوابة الكوي المزدوج والشرائح وحلقة الطبل الذهبية",
    english: "4-panel golden-trimmed horizontal slat drum gate flanked by Koi carp wings",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "مذهب", "طبل", "koi", "gold", "drum", "gate"],
  },

  {
    id: "tiktok-368",
    name: "بوابة الصنوبر الذهبي والكركي وطنف المعينات",
    english: "Luxury black & gold crescent pine crane wings with radial drum & lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "صنوبر", "كركي", "مذهب", "pine", "cranes", "gold", "gate"],
  },

  {
    id: "tiktok-369",
    name: "بوابة القصر العريضة بحراب السور والطبل المزدوج",
    english: "Sprawling 4-panel picket fence crest & crane filigree mansion gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "قصر", "حراب", "طبل", "palace", "picket", "drum", "gate"],
  },

  {
    id: "tiktok-370",
    name: "شباك الدرابزين المربع بالتوريق والزهور الهندسية",
    english: "Architectural square openwork wrought scroll and daisy rosette grille",
    style: "هندسي",
    palette: 3,
    tags: ["شباك", "درابزين", "مربع", "وردة", "window", "railing", "square", "rosette"],
  },

  {
    id: "tiktok-371",
    name: "شاشة غابة الخيزران المتقاطعة الرباعية الكثيفة",
    english: "4-panel dynamic dense criss-crossing wild bamboo forest divider",
    style: "خطي",
    palette: 2,
    tags: ["شاشة", "خيزران", "غابة", "4 لوحات", "bamboo", "forest", "4-panel", "screen"],
  },

  {
    id: "tiktok-372",
    name: "ثنائية ألواح الأقحوان الشعاعي المزدوجة",
    english: "Pair of bold geometric sunburst floral petals architectural fence leaves",
    style: "هندسي",
    palette: 3,
    tags: ["ثنائية", "أقحوان", "شعاع", "هندسي", "sunburst", "daisy", "pair", "panels"],
  },

  {
    id: "tiktok-373",
    name: "شاشة أزهار الكوزموس الخفيفة العمودية",
    english: "Tall vertical delicate cosmos blossom openwork screen partition",
    style: "خطي",
    palette: 3,
    tags: ["شاشة", "أزهار", "كوزموس", "عمودي", "cosmos", "floral", "vertical", "screen"],
  },

  {
    id: "tiktok-374",
    name: "إفريز الباروك العريض بمزهرية الوسط والأكانتس",
    english: "Wide symmetrical baroque acanthus scroll balcony frieze centerpiece",
    style: "خطي",
    palette: 4,
    tags: ["إفريز", "باروك", "أكانتس", "أفقي", "frieze", "baroque", "acanthus", "balcony"],
  },

  {
    id: "tiktok-375",
    name: "لوحة النمر الأم والشبل بين أوراق الخيزران",
    english: "Detailed line art portrait of gentle Tiger & cub amidst bamboo foliage",
    style: "خطي",
    palette: 4,
    tags: ["نمر", "شبل", "خيزران", "لوحة", "tiger", "cub", "bamboo", "lineart"],
  },

  {
    id: "tiktok-376",
    name: "شاشة أوراق النخيل المروحي والمونستيرا المربعة",
    english: "Square architectural cutout densely packed with fan palms & leaves",
    style: "خطي",
    palette: 2,
    tags: ["شاشة", "نخيل", "مونستيرا", "مربع", "palm", "fan", "monstera", "square"],
  },

  {
    id: "tiktok-377",
    name: "بوابة الضلفتين المكللة بالسفن الشراعية والزهور",
    english: "Twin sailing ships over ocean waves beneath baroque crest 2-leaf gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "سفينة", "شراع", "باروك", "ships", "sail", "baroque", "gate"],
  },

  {
    id: "tiktok-378",
    name: "بوابة الألواح الطولية والماسة الجانبية والطبل",
    english: "4-panel striped vertical slat wings flanking dense honeycomb & drum",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "طبل", "سداسي", "slats", "drum", "hex", "gate"],
  },

  {
    id: "tiktok-379",
    name: "ثنائية لوحات الأختام المربعة والمفاتيح الصينية",
    english: "Twin slim rectangular Blessing calligraphy screens in oval-lattice frames",
    style: "هندسي",
    palette: 3,
    tags: ["ثنائية", "أختام", "مفاتيح", "عمودي", "blessing", "lattice", "twin", "screens"],
  },

  {
    id: "tiktok-380",
    name: "شاشة أوراق المونستيرا والأناناس الاستوائية الأفقية",
    english: "Wide horizontal lush overlapping tropical fern & monstera foliage panel",
    style: "خطي",
    palette: 2,
    tags: ["شاشة", "مونستيرا", "أفقي", "استوائي", "monstera", "tropical", "horizontal", "screen"],
  },

  {
    id: "tiktok-381",
    name: "بوابة التنين والفينيق وإطار الأختام الأربعة",
    english: "4-panel ascending Dragon & Phoenix wings around radial drum & four seals",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "تنين", "فينيق", "أختام", "dragon", "phoenix", "seals", "gate"],
  },

  {
    id: "tiktok-382",
    name: "بوابة الكركي واللوتس والشعاع السماوي الواسعة",
    english: "4-panel vertical heron & lotus borders flanking dense starburst center",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كركي", "لوتس", "شعاع", "heron", "lotus", "starburst", "gate"],
  },

  {
    id: "tiktok-383",
    name: "بوابة الأشرطة الأفقية والخلية السداسية النقية",
    english: "Clean minimalist 4-panel horizontal louver slats & hex lattice wings",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "سداسي", "عصري", "louver", "hex", "minimal", "gate"],
  },

  {
    id: "tiktok-384",
    name: "بوابة الضلفتين بالشبكة السداسية والأقحوان الأوسط",
    english: "4-panel uniform slat louvers framed by delicate daisy-circle core",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "سداسي", "شرائح", "أقحوان", "hex", "slats", "daisy", "gate"],
  },

  {
    id: "tiktok-385",
    name: "درابزين الأقواس المورقة والزهور الباروكية العريض",
    english: "Wide openwork scalloped archway and rose balustrade gallery rail",
    style: "خطي",
    palette: 4,
    tags: ["درابزين", "أقواس", "ورود", "أفقي", "balustrade", "arches", "rose", "rail"],
  },

  {
    id: "tiktok-386",
    name: "بوابة الخيول الجامحة والخيزران بتاج الأرابيسك",
    english: "Scroll-crested 4-panel galloping horses & bamboo silhouettes courtyard gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "خيول", "خيزران", "تاج", "horses", "bamboo", "crest", "gate"],
  },

  {
    id: "tiktok-387",
    name: "بوابة القمر والنجوم الذهبية وطبل المركز الصافي",
    english: "4-panel pure jet-black gate with gold-dotted Dong Son drum & moon bamboo",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "قمر", "خيزران", "gold", "moon", "drum", "gate"],
  },

  {
    id: "tiktok-388",
    name: "بوابة الضلفتين بالشرائح وحلقة الطبل المذهبة",
    english: "4-panel striped louvered center drum framed in black & gold honeycomb",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "مذهب", "شرائح", "سداسي", "gold", "louver", "hex", "gate"],
  },

  {
    id: "tiktok-389",
    name: "بوابة الشرائح الطولية وطنف الألماس الداكن",
    english: "4-panel crisp honeycomb wings, fluted slats & diamond upper bar",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "شرائح", "طنف", "سداسي", "fluted", "diamond", "transom", "gate"],
  },

  {
    id: "tiktok-390",
    name: "لوحة برعم اللوتس وأوراق الماء النظيفة",
    english: "Vertical clean bold lotus bud and water-lily pad cutout panel",
    style: "خطي",
    palette: 2,
    tags: ["لوحة", "لوتس", "أوراق", "بسيط", "lotus", "lily", "clean", "panel"],
  },

  {
    id: "tiktok-391",
    name: "بوابة الكوي المزدوج والأختام الأربع المشرقة",
    english: "4-panel openwork jumping Koi carp beneath four upper floral medallions",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "أختام", "أزهار", "koi", "medallions", "4-panel", "gate"],
  },

  {
    id: "tiktok-392",
    name: "بوابة القصر المذهّبة بالأربع ضلف وطنف الشبكة",
    english: "Black & gold moonlit bamboo 4-panel gate crowned by 4 diamond transoms",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "خيزران", "طنف", "gold", "bamboo", "transom", "gate"],
  },

  {
    id: "tiktok-393",
    name: "قصّة الأطفال والقراءة تحت شجرة الظل",
    english: "Heartwarming children reading & playing beneath leafy silhouette tree",
    style: "خطي",
    palette: 2,
    tags: ["أطفال", "شجرة", "قصة", "ظل", "children", "tree", "reading", "silhouette"],
  },

  {
    id: "tiktok-394",
    name: "ورقة البوذي المخرّمة بنقوش الأزهار الدقيقة",
    english: "Large sacred Bodhi leaf cutout filled with fine filigree vines & florets",
    style: "خطي",
    palette: 4,
    tags: ["ورقة", "زهور", "زخرفي", "دقيق", "bodhi", "leaf", "filigree", "floral"],
  },

  {
    id: "tiktok-395",
    name: "بوابة الأسود الصافي بحواف الشبكة الماسية النحيفة",
    english: "Ultra-modern sleek obsidian 2-leaf gate with narrow diamond mesh trim",
    style: "هندسي",
    palette: 2,
    tags: ["بوابة", "أسود", "عصري", "معينات", "obsidian", "minimal", "modern", "gate"],
  },

  {
    id: "tiktok-396",
    name: "بوابة الطبل الكبير وزهور اللوتس والخيزران السماوي",
    english: "Tall 4-panel clean black Dong Son drum gate with cloud-lotus & bamboo",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "طبل", "لوتس", "خيزران", "drum", "lotus", "bamboo", "gate"],
  },

  {
    id: "tiktok-397",
    name: "شعار الفارس الأسطوري على الجواد الصاهل",
    english: "Heroic bannerman warrior riding rearing stallion dynamic CNC silhouette",
    style: "خطي",
    palette: 3,
    tags: ["فارس", "حصان", "شعار", "أسطوري", "warrior", "stallion", "heroic", "silhouette"],
  },

  {
    id: "tiktok-398",
    name: "طقم أسوار الحراب الثلاثية والأعمدة المتدرجة",
    english: "Three architectural gothic spearhead finial fence cresting borders",
    style: "هندسي",
    palette: 3,
    tags: ["أسوار", "حراب", "أفقي", "طقم", "spearhead", "finial", "fence", "crests"],
  },

  {
    id: "tiktok-399",
    name: "لوحة الكوي الملتف وسط تيجان اللوتس العمودية",
    english: "Vertical full-bleed leaping Koi carp surrounded by open lotus blossoms",
    style: "خطي",
    palette: 3,
    tags: ["كوي", "لوتس", "لوحة", "عمودي", "koi", "lotus", "vertical", "panel"],
  },

  {
    id: "tiktok-400",
    name: "بوابة الفيلة المرحة وتاج العقود الزهرية",
    english: "Playful 4-panel joyful tropical elephants under floral rosette arches",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "فيلة", "أزهار", "أقواس", "elephants", "arches", "floral", "gate"],
  },

  {
    id: "tiktok-401",
    name: "طقم درابزين الشبك المثلثي للدرج والأعمدة",
    english: "Architectural geometric triangle-trellis balcony rail and matching column",
    style: "هندسي",
    palette: 3,
    tags: ["درابزين", "مثلثات", "درج", "طقم", "triangle", "trellis", "railing", "stair"],
  },

  {
    id: "tiktok-402",
    name: "لوحة الغزالة الأم والخشف بين أوراق الغابة",
    english: "Vertical mother Doe & standing Fawn beneath woodland canopy vines",
    style: "خطي",
    palette: 3,
    tags: ["غزال", "خشف", "غابة", "لوحة", "doe", "fawn", "forest", "panel"],
  },

  {
    id: "tiktok-403",
    name: "لوحة الأيل المتوثب داخل التوريق المتماثل",
    english: "Vertical leaping Stag encircled by lush symmetrical botanical scrollwork",
    style: "خطي",
    palette: 4,
    tags: ["أيل", "توريق", "غزال", "عمودي", "stag", "scrollwork", "botanical", "panel"],
  },

  {
    id: "tiktok-404",
    name: "بوابة اللوتس والتوريق الواسعة مع إفريز علوي",
    english: "4-panel floral scroll and Dong Son drum gate beneath lacy blossom lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "لوتس", "إفريز", "طبل", "lotus", "lintel", "drum", "gate"],
  },
  {
    id: "tiktok-405",
    name: "بوابة الأساطير والبحار وطيور الفينيق الرباعية",
    english: "4-panel mythic ocean phoenix relief gate with oval filigree wings",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "فينيق", "أسطوري", "بحر", "phoenix", "mythic", "4-panel", "gate"],
  },
  {
    id: "tiktok-406",
    name: "بوابة جوز الهند الاستوائي وطنف الشبك المائل",
    english: "4-panel coastal coconut palm wings, Longevity drum & diagonal lintel",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نخيل", "طنف", "استوائي", "palm", "coastal", "lintel", "gate"],
  },
  {
    id: "tiktok-407",
    name: "بوابة التوريق النحاسي والزوايا الهندسية والمعينات",
    english: "Warm copper 4-panel baroque scrollwork and diamond chevron gate",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "نحاسي", "باروك", "معينات", "copper", "baroque", "diamond", "gate"],
  },
  {
    id: "tiktok-408",
    name: "بوابة اللوتس الطولي والشرائح وحلقة الطبل المذهبة",
    english: "4-panel glowing gold-ringed Dong Son drum & slatted lotus flank gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "مذهب", "لوتس", "طبل", "gold", "lotus", "drum", "gate"],
  },
  {
    id: "tiktok-409",
    name: "بوابة الماندالا الدائرية والنجوم السماوية الداكنة",
    english: "Dramatic obsidian 4-panel celestial rosette wing & micro-dotted drum",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "ماندالا", "نجوم", "داكن", "mandala", "celestial", "rosette", "gate"],
  },
  {
    id: "tiktok-410",
    name: "بوابة الفينيق الصاعد والزهور المتشابكة الرباعية",
    english: "4-panel grand rising heraldic phoenixes amidst dense peony scrollwork",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "فينيق", "زهور", "فاخر", "phoenix", "peony", "grand", "gate"],
  },
  {
    id: "tiktok-411",
    name: "بوابة اللوتس المتناغم والثمانية أختام الملكية",
    english: "4-panel blooming lotus gate accented with eight circular blessing medallions",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "لوتس", "أختام", "ثنائية", "lotus", "seals", "4-panel", "gate"],
  },
  {
    id: "tiktok-412",
    name: "بوابة الخيزران والأجنحة والأفاريز الرباعية",
    english: "4-panel ornate bamboo leaf wings flanking double floral wing scrollwork",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "خيزران", "أفاريز", "توريق", "bamboo", "scrollwork", "4-panel", "gate"],
  },
  {
    id: "tiktok-413",
    name: "بوابة الزهور والأوراق الدائرية والطبل الجريء",
    english: "Bold 4-panel openwork spiral leaf scrollwork & full radial bronze drum",
    style: "خطي",
    palette: 4,
    tags: ["بوابة", "أوراق", "طبل", "توريق", "scrollwork", "drum", "4-panel", "gate"],
  },
  {
    id: "tiktok-414",
    name: "بوابة النمر الجبار وثمانية أختام العمر والشرائح",
    english: "4-panel prowling striped tiger wings, ribbed bars & eight corner seals",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "نمر", "أختام", "شرائح", "tiger", "seals", "slats", "gate"],
  },
  {
    id: "tiktok-415",
    name: "بوابة سمكتي الكوي واللوتس والتوريق السريع",
    english: "4-panel swimming Koi carp & lotus wings around sweeping radial drum",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "كوي", "لوتس", "طبل", "koi", "lotus", "drum", "gate"],
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

const escXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Render a cleaned, vectorized TikTok CNC design using the active palette options. */
export function renderTiktokDesign(asset: Asset, o: SvgOptions): string {
  const entry = readTiktokEntrySync(asset.id);
  const title = escXml(asset.name);
  const desc = `Naqsh TikTok CNC &amp; laser-cut SVG vector vectorized from @hathanhcncvemau. CC0-1.0. ${escXml(asset.english)}.`;
  const bg = o.transparent ? "" : `<rect x="0" y="0" width="1920" height="1440" fill="${o.background}"/>`;
  if (!entry) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 1920 1440" preserveAspectRatio="xMidYMid meet" role="img"><title>${title}</title><desc>${desc}</desc>${bg}</svg>`;
  }
  const primary = `<path d="${entry.primaryPath}" fill="${o.primary}" fill-rule="evenodd"/>`;
  let layers = primary;
  if (entry.accentPath) {
    if (entry.accentMode === "casing") {
      layers = `<path d="${entry.accentPath}" fill="${o.accent}" fill-opacity="0.38" fill-rule="evenodd"/>${primary}`;
    } else if (entry.accentMode === "highlight") {
      layers = `${primary}<path d="${entry.accentPath}" fill="${o.accent}" fill-rule="evenodd"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 1920 1440" preserveAspectRatio="xMidYMid meet" role="img"><title>${title}</title><desc>${desc}</desc>${bg}${layers}</svg>`;
}
