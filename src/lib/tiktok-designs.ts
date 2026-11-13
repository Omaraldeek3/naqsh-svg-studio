import type { Asset } from "./catalog.ts";
import type { SvgOptions } from "./svg.ts";

export const tiktokCategory = {
  id: "tiktok" as const,
  name: "تصاميم تيك توك",
  description: "بوابات ولوحات وزخارف قص ليزر وCNC مستوحاة من تصاميم تيك توك (@hathanhcncvemau)",
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
    name: "بوابة الدرع الذهبي الرباعية",
    english: "Royal 4-panel gate with top scroll crests and twin medallions",
    style: "هندسي",
    palette: 4,
    tags: ["بوابة", "درع", "ميدالية", "أرابيسك", "4 ضلف", "ذهبي", "royal", "crest", "medallion", "gate"],
  },
  {
    id: "tiktok-9",
    name: "بوابة الميدالية العملاقة والقضبان العمودية",
    english: "2-leaf vertical bar gate with giant split medallion and corner scrolls",
    style: "هندسي",
    palette: 3,
    tags: ["بوابة", "قضبان", "ميدالية عملاقة", "زوايا", "ضلفين", "bars", "medallion", "spandrel", "gate"],
  },
  {
    id: "tiktok-10",
    name: "بوابة التوريق النباتي الصاعد",
    english: "Symmetrical rising acanthus arabesque 2-leaf gate",
    style: "خطي",
    palette: 3,
    tags: ["بوابة", "توريق", "أرابيسك", "أكانتس", "نباتي", "ضلفين", "acanthus", "arabesque", "scrollwork", "gate"],
  },
  {
    id: "tiktok-11",
    name: "مجموعة أشرطة وإفريزات القَصّ",
    english: "CNC ornamental frieze and border strips collection",
    style: "هندسي",
    palette: 3,
    tags: ["شريط", "إفريز", "حواف", "فواصل", "مجموعة", "هندسي", "frieze", "border", "strips", "meander"],
  },
  {
    id: "tiktok-12",
    name: "ميدالية العام القمري والزهور الدائرية",
    english: "Circular floral ram laser-cut medallion",
    style: "خطي",
    palette: 3,
    tags: ["ميدالية", "دائرية", "زهور", "فانوس", "زخرفة", "ديكور", "medallion", "floral", "lantern", "cutout"],
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

const n = (v: number) => Number(v.toFixed(2));
const rep = (count: number, fn: (i: number) => string) => Array.from({ length: count }, (_, i) => fn(i)).join("");
const g = (transform: string, body: string, extra = "") => `<g transform="${transform}"${extra ? ` ${extra}` : ""}>${body}</g>`;
const pth = (d: string, fill: string, stroke = "none", sw = 0, extra = "") =>
  `<path d="${d}" fill="${fill}"${stroke !== "none" ? ` stroke="${stroke}" stroke-width="${n(sw)}" stroke-linecap="round" stroke-linejoin="round"` : ""}${extra ? ` ${extra}` : ""}/>`;
const rct = (x: number, y: number, w: number, h: number, fill: string, stroke = "none", sw = 0, rx = 0) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${n(rx)}"` : ""} fill="${fill}"${stroke !== "none" ? ` stroke="${stroke}" stroke-width="${n(sw)}"` : ""}/>`;
const cir = (cx: number, cy: number, r: number, fill: string, stroke = "none", sw = 0) =>
  `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${stroke !== "none" ? ` stroke="${stroke}" stroke-width="${n(sw)}"` : ""}/>`;
const ln = (x1: number, y1: number, x2: number, y2: number, stroke: string, sw: number) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${n(sw)}" stroke-linecap="round"/>`;

function starPoly(cx: number, cy: number, outer: number, inner: number, pts: number, fill: string, stroke = "none", sw = 0) {
  const coords = rep(pts * 2, (i) => {
    const ang = (i * Math.PI) / pts - Math.PI / 2;
    const r = i % 2 ? inner : outer;
    return `${n(cx + Math.cos(ang) * r)},${n(cy + Math.sin(ang) * r)} `;
  });
  return `<polygon points="${coords.trim()}" fill="${fill}"${stroke !== "none" ? ` stroke="${stroke}" stroke-width="${n(sw)}" stroke-linejoin="round"` : ""}/>`;
}

/** Concentric Dong Son bronze drum medallion with sun rays, geometric rings, and flying cranes. */
function dongSonDrum(cx: number, cy: number, r: number, p: string, a: string, sw: number, withMapCutout = false): string {
  const rays = 14;
  const sun = starPoly(cx, cy, r * 0.24, r * 0.1, rays, a, p, sw * 0.45);
  const rings = [0.98, 0.9, 0.78, 0.68, 0.5, 0.41, 0.27].map((k, idx) =>
    cir(cx, cy, r * k, "none", idx === 0 || idx === 2 ? a : p, sw * (idx === 0 ? 1.15 : 0.7))
  ).join("");
  const tickCount = 32;
  const ticks = rep(tickCount, (i) => {
    const ang = (i * Math.PI * 2) / tickCount;
    const r1 = r * 0.7, r2 = r * 0.76;
    return ln(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1, cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2, p, sw * 0.65);
  });
  const outerKeys = rep(24, (i) => {
    const deg = i * 15;
    return g(
      `translate(${n(cx)} ${n(cy)}) rotate(${deg})`,
      pth(`M${n(-r * 0.045)} ${n(-r * 0.87)}H${n(r * 0.045)}V${n(-r * 0.81)}H${n(-r * 0.015)}`, "none", p, sw * 0.55)
    );
  });
  const cranes = rep(10, (i) => {
    const deg = i * 36;
    const y = -r * 0.59;
    return g(
      `translate(${n(cx)} ${n(cy)}) rotate(${deg})`,
      pth(`M${n(-r * 0.06)} ${n(y)}Q0 ${n(y - r * 0.04)} ${n(r * 0.06)} ${n(y)}Q0 ${n(y + r * 0.025)} ${n(-r * 0.06)} ${n(y)}ZM0 ${n(y)}L${n(-r * 0.03)} ${n(y - r * 0.055)}L${n(r * 0.02)} ${n(y - r * 0.025)}Z`, p)
    );
  });
  const innerDots = rep(16, (i) => {
    const ang = (i * Math.PI * 2) / 16;
    return cir(cx + Math.cos(ang) * r * 0.34, cy + Math.sin(ang) * r * 0.34, Math.max(1.2, r * 0.022), a);
  });
  const mapRibbon = withMapCutout
    ? pth(
        `M${n(cx - r * 0.08)} ${n(cy - r * 0.65)}C${n(cx + r * 0.08)} ${n(cy - r * 0.55)} ${n(cx + r * 0.14)} ${n(cy - r * 0.32)} ${n(cx + r * 0.02)} ${n(cy - r * 0.1)}C${n(cx - r * 0.08)} ${n(cy + r * 0.12)} ${n(cx + r * 0.22)} ${n(cy + r * 0.28)} ${n(cx + r * 0.16)} ${n(cy + r * 0.58)}`,
        "none",
        a,
        sw * 2.2
      )
    : "";
  return rings + outerKeys + ticks + cranes + innerDots + sun + cir(cx, cy, r * 0.075, p) + mapRibbon;
}

/** Curved 4-petal star lattice pattern clipped cleanly inside a rectangle. */
function starLattice(clipId: string, x: number, y: number, w: number, h: number, cell: number, p: string, a: string, sw: number, variant: "petal" | "octagon" | "diamond" = "petal"): string {
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  let cells = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * cell;
      const cy = y + r * cell;
      const half = cell * 0.5;
      if (variant === "petal") {
        cells += pth(
          `M${n(cx)} ${n(cy - half)}Q${n(cx + half * 0.35)} ${n(cy - half * 0.35)} ${n(cx + half)} ${n(cy)}Q${n(cx + half * 0.35)} ${n(cy + half * 0.35)} ${n(cx)} ${n(cy + half)}Q${n(cx - half * 0.35)} ${n(cy + half * 0.35)} ${n(cx - half)} ${n(cy)}Q${n(cx - half * 0.35)} ${n(cy - half * 0.35)} ${n(cx)} ${n(cy - half)}Z`,
          "none",
          p,
          sw * 0.65
        );
        cells += cir(cx, cy, Math.max(1.2, cell * 0.07), a);
      } else if (variant === "octagon") {
        const d = cell * 0.26;
        cells += pth(
          `M${n(cx - half + d)} ${n(cy - half)}L${n(cx + half - d)} ${n(cy - half)}L${n(cx + half)} ${n(cy - half + d)}L${n(cx + half)} ${n(cy + half - d)}L${n(cx + half - d)} ${n(cy + half)}L${n(cx - half + d)} ${n(cy + half)}L${n(cx - half)} ${n(cy + half - d)}L${n(cx - half)} ${n(cy - half + d)}Z`,
          "none",
          p,
          sw * 0.6
        );
        cells += starPoly(cx, cy, cell * 0.22, cell * 0.09, 4, a);
      } else {
        cells += pth(`M${n(cx)} ${n(cy - half)}L${n(cx + half)} ${n(cy)}L${n(cx)} ${n(cy + half)}L${n(cx - half)} ${n(cy)}Z`, "none", p, sw * 0.72);
      }
    }
  }
  return `<defs><clipPath id="${clipId}"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"/></clipPath></defs><g clip-path="url(#${clipId})">${cells}</g>`;
}

/** Greek key / meander decorative border along a rectangular perimeter. */
function greekKeyRect(x: number, y: number, w: number, h: number, step: number, p: string, sw: number): string {
  const seg = (len: number) => {
    const count = Math.max(2, Math.floor(len / step));
    const u = len / count;
    const t = u * 0.68;
    let d = "";
    for (let i = 0; i < count; i++) {
      const ox = i * u;
      d += `M${n(ox)} 0H${n(ox + t)}V${n(t)}H${n(ox + u * 0.3)}V${n(u * 0.35)}H${n(ox + u * 0.48)}M${n(ox + u * 0.84)} ${n(t)}H${n(ox + u)}V0`;
    }
    return d;
  };
  const top = g(`translate(${n(x)} ${n(y)})`, pth(seg(w), "none", p, sw));
  const bottom = g(`translate(${n(x + w)} ${n(y + h)}) rotate(180)`, pth(seg(w), "none", p, sw));
  const left = g(`translate(${n(x)} ${n(y + h)}) rotate(-90)`, pth(seg(h), "none", p, sw));
  const right = g(`translate(${n(x + w)} ${n(y)}) rotate(90)`, pth(seg(h), "none", p, sw));
  return top + bottom + left + right;
}

/** Graceful floral/acanthus scroll flourish at corners or panels. */
function scrollFlourish(x: number, y: number, sx: number, sy: number, p: string, a: string, sw: number): string {
  const motif =
    pth("M0 0C16-2 28-14 26-28C24-39 11-41 8-32C6-24 14-21 17-26", "none", p, sw * 0.9) +
    pth("M0 0C2-18 14-34 32-38C45-41 53-31 46-22C41-15 33-19 36-25", "none", p, sw * 0.85) +
    pth("M6-6C-2-18-6-32 4-44C12-52 22-46 17-37", "none", a, sw * 0.75) +
    pth("M18-12C28-12 38-8 44-16C36-20 26-18 18-12Z", a, p, sw * 0.45) +
    pth("M12-22C16-32 22-40 31-43C29-33 21-26 12-22Z", p);
  return g(`translate(${n(x)} ${n(y)}) scale(${n(sx)} ${n(sy)})`, motif);
}

/** 5-petal blossom for floral CNC designs. */
function blossom(cx: number, cy: number, r: number, p: string, a: string, sw: number): string {
  const petals = rep(5, (i) =>
    g(
      `translate(${n(cx)} ${n(cy)}) rotate(${i * 72})`,
      pth(`M0 ${n(-r * 0.18)}C${n(-r * 0.45)} ${n(-r * 0.55)} ${n(-r * 0.25)} ${n(-r)} 0 ${n(-r)}C${n(r * 0.25)} ${n(-r)} ${n(r * 0.45)} ${n(-r * 0.55)} 0 ${n(-r * 0.18)}Z`, a, p, sw * 0.55)
    )
  );
  return petals + cir(cx, cy, r * 0.22, p);
}

/** Split a design symmetrically across the center gap of 2 or 4 gate leaves. */
function splitMedallionInLeaves(clipPrefix: string, leaves: { x: number; y: number; w: number; h: number }[], draw: () => string): string {
  return leaves
    .map((leaf, i) => {
      const id = `${clipPrefix}-leaf-${i}`;
      return `<defs><clipPath id="${id}"><rect x="${n(leaf.x)}" y="${n(leaf.y)}" width="${n(leaf.w)}" height="${n(leaf.h)}"/></clipPath></defs><g clip-path="url(#${id})">${draw()}</g>`;
    })
    .join("");
}

/** Render 1: 4-panel Dong Son drum & star lattice gate + 3-part transom (Post 1). */
function renderDesign1(uid: string, p: string, a: string, sw: number): string {
  const outer = rct(28, 22, 584, 436, "none", p, sw * 1.3);
  // Top 3 transom frames
  const transoms = [
    { x: 40, w: 126 },
    { x: 174, w: 292 },
    { x: 474, w: 126 },
  ];
  const transomSvg = transoms
    .map(
      (t, i) =>
        rct(t.x, 34, t.w, 56, "none", p, sw) +
        rct(t.x + 5, 39, t.w - 10, 46, "none", a, sw * 0.65) +
        starLattice(`${uid}-tr-${i}`, t.x + 6, 40, t.w - 12, 44, 22, p, a, sw, "petal")
    )
    .join("");
  // 4 gate leaves below
  const leaves = [
    { x: 40, y: 102, w: 120, h: 344 },
    { x: 168, y: 102, w: 146, h: 344 },
    { x: 326, y: 102, w: 146, h: 344 },
    { x: 480, y: 102, w: 120, h: 344 },
  ];
  const outerLeaves = [0, 3]
    .map((idx) => {
      const l = leaves[idx];
      return (
        rct(l.x, l.y, l.w, l.h, "none", p, sw) +
        rct(l.x + 6, l.y + 6, l.w - 12, l.h - 12, "none", a, sw * 0.65) +
        starLattice(`${uid}-ol-${idx}`, l.x + 8, l.y + 8, l.w - 16, l.h - 16, 22, p, a, sw, "petal")
      );
    })
    .join("");
  const innerLeaves = [1, 2]
    .map((idx) => {
      const l = leaves[idx];
      const isLeft = idx === 1;
      const sx = isLeft ? 1 : -1;
      const cxCorner = isLeft ? l.x + 16 : l.x + l.w - 16;
      return (
        rct(l.x, l.y, l.w, l.h, "none", p, sw) +
        greekKeyRect(l.x + 7, l.y + 7, l.w - 14, l.h - 14, 14, a, sw * 0.6) +
        scrollFlourish(cxCorner, l.y + 62, sx * 0.8, 0.8, p, a, sw) +
        scrollFlourish(cxCorner, l.y + l.h - 62, sx * 0.8, -0.8, p, a, sw) +
        starPoly(isLeft ? l.x + 42 : l.x + l.w - 42, l.y + 115, 7, 2.2, 4, a) +
        starPoly(isLeft ? l.x + 42 : l.x + l.w - 42, l.y + l.h - 115, 7, 2.2, 4, a)
      );
    })
    .join("");
  const drum = splitMedallionInLeaves(`${uid}-d1`, [leaves[1], leaves[2]], () =>
    dongSonDrum(320, 274, 108, p, a, sw * 0.85) + cir(300, 304, 8, a, p, sw * 0.6) + cir(340, 304, 8, a, p, sw * 0.6)
  );
  return outer + transomSvg + outerLeaves + innerLeaves + drum;
}

/** Render 2: 4-panel horizontal louver gate with split Dong Son drum (Post 2). */
function renderDesign2(uid: string, p: string, a: string, sw: number): string {
  const outer = rct(46, 20, 548, 440, "none", p, sw * 1.25);
  const leaves = [
    { x: 58, y: 32, w: 94, h: 416 },
    { x: 162, y: 32, w: 150, h: 416 },
    { x: 328, y: 32, w: 150, h: 416 },
    { x: 488, y: 32, w: 94, h: 416 },
  ];
  const sidePanels = [0, 3]
    .map((idx) => {
      const l = leaves[idx];
      return (
        rct(l.x, l.y, l.w, l.h, "none", p, sw) +
        rct(l.x + 6, l.y + 6, l.w - 12, l.h - 12, "none", a, sw * 0.6) +
        starLattice(`${uid}-s-${idx}`, l.x + 8, l.y + 8, l.w - 16, l.h - 16, 26, p, a, sw, "octagon")
      );
    })
    .join("");
  // Horizontal louvers on inner leaves outside drum radius (r=118)
  const drumCx = 320, drumCy = 240, drumR = 122;
  const louvers = [1, 2]
    .map((idx) => {
      const l = leaves[idx];
      let slats = rct(l.x, l.y, l.w, l.h, "none", p, sw);
      const pad = 16;
      for (let y = l.y + 22; y <= l.y + l.h - 18; y += 21) {
        const dy = Math.abs(y - drumCy);
        if (dy >= drumR + 8) {
          slats += ln(l.x + pad, y, l.x + l.w - pad, y, p, sw * 1.45);
        } else {
          const dx = Math.sqrt(Math.max(0, (drumR + 8) ** 2 - dy ** 2));
          if (idx === 1 && l.x + pad < drumCx - dx - 6) {
            slats += ln(l.x + pad, y, Math.min(l.x + l.w - 8, drumCx - dx - 6), y, p, sw * 1.45);
          }
          if (idx === 2 && l.x + l.w - pad > drumCx + dx + 6) {
            slats += ln(Math.max(l.x + 8, drumCx + dx + 6), y, l.x + l.w - pad, y, p, sw * 1.45);
          }
        }
      }
      return slats;
    })
    .join("");
  const coinRim = rep(32, (i) => {
    const ang = (i * Math.PI * 2) / 32;
    return cir(drumCx + Math.cos(ang) * (drumR - 7), drumCy + Math.sin(ang) * (drumR - 7), 6.5, "none", a, sw * 0.65);
  });
  const drum = splitMedallionInLeaves(`${uid}-d2`, [leaves[1], leaves[2]], () =>
    dongSonDrum(drumCx, drumCy, drumR - 14, p, a, sw * 0.8) + coinRim + cir(drumCx - 20, drumCy + 28, 12, a, p, sw * 0.7) + cir(drumCx + 20, drumCy + 28, 12, a, p, sw * 0.7)
  );
  return outer + sidePanels + louvers + drum;
}

/** Render 3: Feng Shui Koi carp looking at the moon CNC panel (Post 3). */
function renderDesign3(_uid: string, p: string, a: string, sw: number): string {
  const frame = rct(165, 22, 310, 436, "none", p, sw * 1.25) + rct(174, 31, 292, 418, "none", a, sw * 0.65);
  // Moons: upper right moon & lower left water reflection
  const moons = cir(412, 86, 36, a, p, sw * 0.9) + cir(224, 386, 26, a, p, sw * 0.8);
  // Aquatic fan-weed tufts
  const tuft = (x: number, y: number, sc = 1) =>
    g(
      `translate(${n(x)} ${n(y)}) scale(${n(sc)})`,
      pth("M0 0L-12-16M0 0L-6-20M0 0L0-22M0 0L6-20M0 0L12-16M-11-4Q0 4 11-4", "none", a, sw * 0.65)
    );
  const weeds = [
    [206, 86, 0.85], [228, 114, 0.85], [202, 134, 0.8], [204, 240, 0.85], [224, 270, 0.85],
    [206, 300, 0.8], [434, 178, 0.9], [412, 204, 0.85], [438, 232, 0.9], [428, 286, 0.9], [434, 418, 0.9],
  ].map(([x, y, s]) => tuft(x, y, s)).join("");
  // Main S-curved Koi body + fins + scales
  const koiBody = pth(
    "M278 338C252 315 248 268 274 236C296 208 334 188 338 150C342 124 328 106 310 92C338 82 358 96 364 126C370 162 344 202 336 244C328 286 332 326 306 346C296 353 285 346 278 338Z",
    p
  );
  // Flowing dorsal & tail fins
  const tailFin = pth(
    "M322 104C295 72 288 46 316 40C305 64 316 84 334 94C352 74 374 68 386 82C366 90 356 106 348 118Z",
    a,
    p,
    sw * 0.7
  );
  const pectoralL = pth("M260 282C232 270 218 286 226 304C244 302 254 294 264 294Z", a, p, sw * 0.65);
  const pectoralR = pth("M328 310C358 320 392 346 398 372C374 366 350 350 326 334Z", a, p, sw * 0.65);
  const dorsal = pth("M272 224C248 214 238 190 250 174C272 178 292 188 308 202Z", a, p, sw * 0.65);
  // Scales grid arcs across koi torso
  const scales = rep(8, (r) =>
    rep(3, (c) => {
      const sx = 286 + c * 14 + (r % 2) * 6 + Math.sin(r * 0.5) * 8;
      const sy = 166 + r * 18;
      return pth(`M${n(sx - 6)} ${n(sy)}Q${n(sx)} ${n(sy + 8)} ${n(sx + 6)} ${n(sy)}`, "none", a, sw * 0.55);
    })
  );
  // Whiskers, eyes & bubbles
  const face =
    cir(282, 326, 3.2, a) +
    cir(306, 330, 3.2, a) +
    pth("M282 346Q268 358 258 352M302 348Q316 360 324 352", "none", p, sw * 0.75);
  const bubbles = cir(246, 322, 4.5, "none", p, sw * 0.7) + cir(240, 306, 3.5, "none", p, sw * 0.7) + cir(252, 294, 2.8, "none", a, sw * 0.7);
  // Small companion fish at bottom
  const smallFish = (fx: number, fy: number, dir: number) =>
    g(
      `translate(${n(fx)} ${n(fy)}) scale(${dir} 1)`,
      pth("M-24 0Q-8-12 12-4L24-11L20 0L24 11L12 4Q-8 12-24 0Z", p) + cir(-14, -2, 1.8, a)
    );
  return frame + moons + weeds + dorsal + tailFin + pectoralL + pectoralR + koiBody + scales + face + bubbles + smallFish(312, 392, 1) + smallFish(374, 396, -1);
}

/** Render 4: Cranes & pine branches CNC decorative panel (Post 3 cover). */
function renderDesign4(_uid: string, p: string, a: string, sw: number): string {
  const frame = rct(165, 22, 310, 436, "none", p, sw * 1.25) + rct(174, 31, 292, 418, "none", a, sw * 0.65);
  // Gnarled pine branch at top
  const branch = pth("M178 134Q245 124 304 102Q366 78 446 90Q392 98 334 116Q262 138 178 152Z", p);
  const needleCluster = (cx: number, cy: number, rx: number) =>
    rep(11, (i) => {
      const ang = -Math.PI + (i * Math.PI) / 10;
      return ln(cx, cy, cx + Math.cos(ang) * rx, cy + Math.sin(ang) * rx * 0.65, i % 2 ? p : a, sw * 0.75);
    });
  const pine =
    branch +
    needleCluster(248, 92, 40) +
    needleCluster(325, 76, 46) +
    needleCluster(404, 82, 38) +
    needleCluster(292, 114, 32);
  // Large standing crane
  const craneMain =
    pth("M332 232C358 214 398 220 426 248C440 264 446 286 432 296C404 300 364 288 334 268C320 258 318 242 332 232Z", p) +
    // Extended wings & tail plume
    pth("M358 236C386 198 424 196 448 218C430 228 416 238 408 248ZM416 286L450 326L424 316L442 342L408 308Z", a, p, sw * 0.7) +
    // Neck & head
    pth("M332 246C312 230 302 204 314 186C322 174 336 176 338 184L362 188L334 194C320 206 322 228 340 244", p) +
    cir(328, 183, 2.5, a) +
    // Long legs
    pth("M362 284L348 344L332 414M378 286L396 352L376 414", "none", p, sw * 1.15);
  // Second crane bending gracefully on left
  const craneLeft =
    pth("M202 296C228 282 272 286 296 312C306 326 298 344 278 346C248 346 218 332 198 314Z", p) +
    pth("M212 296C236 268 272 266 292 288C272 292 256 300 244 306Z", a, p, sw * 0.65) +
    pth("M282 316C300 326 306 346 294 362L312 374L286 368C276 352 276 336 268 326", p) +
    pth("M238 336L232 414M254 338L264 414", "none", p, sw * 1.05);
  // Base reeds & water ripples
  const reeds =
    pth("M184 418Q250 404 318 416T456 414", "none", a, sw * 0.85) +
    rep(9, (i) => {
      const rx = 194 + i * 32;
      const rh = 38 + (i % 3) * 18;
      return pth(`M${n(rx)} 440Q${n(rx + (i % 2 ? 10 : -10))} ${n(440 - rh * 0.5)} ${n(rx + (i % 2 ? 4 : -4))} ${n(440 - rh)}`, "none", p, sw * 0.7);
    });
  return frame + pine + craneMain + craneLeft + reeds;
}

/** Render 5: Four seasons Chrysanthemum & Longevity 4-panel gate (Post 4). */
function renderDesign5(_uid: string, p: string, a: string, sw: number): string {
  const outer = rct(26, 22, 588, 436, "none", p, sw * 1.2);
  const leaves = [
    { x: 38, y: 34, w: 146, h: 412 },
    { x: 192, y: 34, w: 120, h: 412 },
    { x: 328, y: 34, w: 120, h: 412 },
    { x: 456, y: 34, w: 146, h: 412 },
  ];
  const borders = leaves.map((l) => rct(l.x, l.y, l.w, l.h, "none", p, sw) + greekKeyRect(l.x + 8, l.y + 8, l.w - 16, l.h - 16, 16, p, sw * 0.65)).join("");
  // Outer Chrysanthemum + rockery panels
  const drawFlowerPanel = (l: { x: number; y: number; w: number; h: number }, flip: number) => {
    const cx = l.x + l.w / 2;
    const base = l.y + l.h - 26;
    const rocks = pth(
      `M${n(cx - 42)} ${n(base)}Q${n(cx - 26)} ${n(base - 52)} ${n(cx - 4)} ${n(base - 48)}Q${n(cx + 12)} ${n(base - 72)} ${n(cx + 28)} ${n(base - 36)}Q${n(cx + 42)} ${n(base - 42)} ${n(cx + 44)} ${n(base)}Z`,
      p
    );
    const stem = pth(
      `M${n(cx)} ${n(base - 44)}Q${n(cx + 14 * flip)} ${n(base - 150)} ${n(cx - 8 * flip)} ${n(base - 245)}T${n(cx + 4 * flip)} ${n(l.y + 62)}`,
      "none",
      p,
      sw * 1.15
    );
    const mum = (fx: number, fy: number, r: number) =>
      rep(12, (i) =>
        g(`translate(${n(fx)} ${n(fy)}) rotate(${i * 30})`, pth(`M0 0C${n(-r * 0.22)} ${n(-r * 0.6)} 0 ${n(-r)} 0 ${n(-r)}C0 ${n(-r)} ${n(r * 0.22)} ${n(-r * 0.6)} 0 0Z`, a, p, sw * 0.45))
      ) + cir(fx, fy, r * 0.24, p);
    const leavesPts = [
      [cx - 18 * flip, base - 110, -35 * flip],
      [cx + 22 * flip, base - 165, 38 * flip],
      [cx - 20 * flip, base - 220, -40 * flip],
      [cx + 18 * flip, base - 275, 32 * flip],
    ];
    const foliage = leavesPts
      .map(([lx, ly, rot]) => g(`translate(${n(lx)} ${n(ly)}) rotate(${rot})`, pth("M0 0C-18-8-22-24 0-34C22-24 18-8 0 0Z", p)))
      .join("");
    return rocks + stem + foliage + mum(cx + 4 * flip, l.y + 72, 22) + mum(cx - 16 * flip, l.y + 150, 26) + mum(cx + 12 * flip, l.y + 230, 30);
  };
  const outerArt = drawFlowerPanel(leaves[0], 1) + drawFlowerPanel(leaves[3], -1);
  // Inner Longevity (Chu Tho) split medallion + cloud swirls
  const innerArt = [1, 2]
    .map((idx) => {
      const l = leaves[idx];
      const isLeft = idx === 1;
      const sx = isLeft ? 1 : -1;
      const edgeX = isLeft ? l.x + l.w - 14 : l.x + 14;
      const cy = l.y + l.h / 2;
      const halfTho = g(
        `translate(${n(edgeX)} ${n(cy)}) scale(${sx} 1)`,
        pth("M-6 -64A64 64 0 0 0 -6 64M-6 -48A48 48 0 0 0 -6 48M-6 -32H-34V-12H-12V12H-34V32H-6M-48 0H-18", "none", p, sw * 1.45)
      );
      return (
        halfTho +
        scrollFlourish(l.x + l.w / 2, l.y + 92, sx * 0.85, 0.85, p, a, sw) +
        scrollFlourish(l.x + l.w / 2, l.y + l.h - 92, sx * 0.85, -0.85, p, a, sw) +
        scrollFlourish(isLeft ? l.x + 22 : l.x + l.w - 22, l.y + 34, sx * 0.5, 0.5, a, p, sw) +
        scrollFlourish(isLeft ? l.x + 22 : l.x + l.w - 22, l.y + l.h - 34, sx * 0.5, -0.5, a, p, sw)
      );
    })
    .join("");
  return outer + borders + outerArt + innerArt;
}

/** Render 6: Neo-classical royal crowned 2-leaf arched gate (Post 5). */
function renderDesign6(uid: string, p: string, a: string, sw: number): string {
  // Crown apex at center top
  const crown =
    pth("M300 48L306 24L320 34L334 24L340 48Z", a, p, sw * 0.9) +
    cir(320, 20, 4.5, a, p, sw * 0.6) +
    scrollFlourish(308, 60, -0.95, 0.85, p, a, sw) +
    scrollFlourish(332, 60, 0.95, 0.85, p, a, sw);
  // Two arched gate leaves
  const leaves = [0, 1].map((idx) => {
    const isLeft = idx === 0;
    const x0 = isLeft ? 84 : 326;
    const w = 230;
    const x1 = x0 + w;
    const highY = 74, lowY = 128, midY = 200, kickY = 382, botY = 456;
    const stepX = isLeft ? x0 + 68 : x1 - 68;
    const leafFrame = isLeft
      ? pth(`M${x0} ${botY}V${lowY}H${stepX}V${highY}Q${x1 - 50} ${highY} ${x1} ${highY + 18}V${botY}Z`, "none", p, sw * 1.45)
      : pth(`M${x0} ${botY}V${highY + 18}Q${x0 + 50} ${highY} ${stepX} ${highY}V${lowY}H${x1}V${botY}Z`, "none", p, sw * 1.45);
    const dividers =
      ln(x0 + 6, midY, x1 - 6, midY, p, sw * 1.2) +
      ln(x0 + 6, kickY, x1 - 6, kickY, p, sw * 1.2) +
      ln(stepX, lowY, stepX, midY, p, sw);
    // Upper crest filigree
    const fanCx = isLeft ? (stepX + x1) / 2 : (x0 + stepX) / 2;
    const sideCx = isLeft ? (x0 + stepX) / 2 : (stepX + x1) / 2;
    const upperArt =
      scrollFlourish(fanCx, midY - 12, isLeft ? 1.15 : -1.15, 1.3, p, a, sw) +
      scrollFlourish(fanCx, midY - 12, isLeft ? -0.95 : 0.95, 1.15, a, p, sw) +
      scrollFlourish(sideCx, midY - 12, isLeft ? 0.65 : -0.65, 0.9, p, a, sw);
    // Middle window: vertical pickets + central floral medallion
    const winX = x0 + 10, winW = w - 20, winY = midY + 10, winH = kickY - midY - 20;
    const medCx = x0 + w / 2, medCy = midY + (kickY - midY) / 2;
    const bars = rep(11, (i) => {
      const bx = winX + 10 + (i * (winW - 20)) / 10;
      if (Math.abs(bx - medCx) < 42) return "";
      return ln(bx, winY, bx, winY + winH, p, sw * 0.75);
    });
    const rosette =
      cir(medCx, medCy, 44, "none", a, sw * 1.05) +
      cir(medCx, medCy, 36, "none", p, sw * 0.75) +
      rep(12, (i) => g(`translate(${n(medCx)} ${n(medCy)}) rotate(${i * 30})`, pth("M0-10C-8-22-4-34 0-34C4-34 8-22 0-10Z", a, p, sw * 0.45))) +
      cir(medCx, medCy, 9, p) +
      scrollFlourish(winX + 12, winY + 12, 0.75, -0.75, p, a, sw) +
      scrollFlourish(winX + winW - 12, winY + 12, -0.75, -0.75, p, a, sw) +
      scrollFlourish(winX + 12, winY + winH - 12, 0.75, 0.75, p, a, sw) +
      scrollFlourish(winX + winW - 12, winY + winH - 12, -0.75, 0.75, p, a, sw);
    // Bottom kickplate rosettes + center shield
    const kickCy = kickY + (botY - kickY) / 2;
    const wheel = (wx: number) =>
      cir(wx, kickCy, 20, "none", a, sw * 0.85) +
      rep(8, (i) => {
        const ang = (i * Math.PI) / 4;
        return ln(wx, kickCy, wx + Math.cos(ang) * 18, kickCy + Math.sin(ang) * 18, p, sw * 0.6);
      }) +
      cir(wx, kickCy, 5, p);
    const kick =
      rct(x0 + 10, kickY + 8, w - 20, botY - kickY - 16, "none", p, sw * 0.75) +
      wheel(x0 + 44) +
      wheel(x1 - 44) +
      pth(`M${n(medCx)} ${n(kickCy - 18)}Q${n(medCx + 24)} ${n(kickCy - 10)} ${n(medCx + 18)} ${n(kickCy + 14)}Q${n(medCx)} ${n(kickCy + 24)} ${n(medCx)} ${n(kickCy + 24)}Q${n(medCx - 18)} ${n(kickCy + 14)} ${n(medCx - 18)} ${n(kickCy - 10)}Z`, a, p, sw * 0.65);
    return leafFrame + dividers + upperArt + rct(winX, winY, winW, winH, "none", a, sw * 0.6) + bars + rosette + kick;
  }).join("");
  return `<g id="${uid}-royal">${crown}${leaves}</g>`;
}

/** Render 7: 2-leaf gate with upper drum medallions, floral wave & diamond trellis (Post 6). */
function renderDesign7(uid: string, p: string, a: string, sw: number): string {
  const leaves = [0, 1].map((idx) => {
    const x = idx === 0 ? 78 : 330;
    const y = 24, w = 232, h = 432;
    const cx = x + w / 2;
    const frame = rct(x, y, w, h, "none", p, sw * 1.25) + rct(x + 8, y + 8, w - 16, h - 16, "none", a, sw * 0.65);
    // Upper vertical bars behind drum
    const drumCy = y + 114, drumR = 74;
    const bars = rep(13, (i) => {
      const bx = x + 18 + (i * (w - 36)) / 12;
      const dx = Math.abs(bx - cx);
      const topY = y + 14;
      const botY = y + 235;
      if (dx >= drumR + 4) return ln(bx, topY, bx, botY, p, sw * 0.85);
      const dy = Math.sqrt(Math.max(0, (drumR + 4) ** 2 - dx ** 2));
      return ln(bx, topY, bx, drumCy - dy, p, sw * 0.85) + ln(bx, drumCy + dy, bx, botY, p, sw * 0.85);
    });
    const drum = dongSonDrum(cx, drumCy, drumR, p, a, sw * 0.72, true);
    // Middle lush floral wave band
    const wave =
      pth(`M${n(x + 12)} ${n(y + 275)}C${n(x + 75)} ${n(y + 215)} ${n(x + 160)} ${n(y + 305)} ${n(x + w - 12)} ${n(y + 245)}`, "none", p, sw * 1.25) +
      pth(`M${n(x + 12)} ${n(y + 308)}C${n(x + 85)} ${n(y + 248)} ${n(x + 150)} ${n(y + 336)} ${n(x + w - 12)} ${n(y + 278)}`, "none", a, sw * 0.9) +
      blossom(x + 56, y + 258, 16, p, a, sw) +
      blossom(cx, y + 266, 20, p, a, sw) +
      blossom(x + w - 52, y + 254, 16, p, a, sw) +
      scrollFlourish(x + 26, y + 32, 0.7, -0.7, p, a, sw) +
      scrollFlourish(x + w - 26, y + 32, -0.7, -0.7, p, a, sw);
    // Lower diamond trellis
    const trellisY = y + 318, trellisH = h - 332;
    const trellis = starLattice(`${uid}-tr-${idx}`, x + 36, trellisY, w - 72, trellisH, 24, p, a, sw, "diamond") +
      scrollFlourish(x + 16, y + h - 16, 0.65, 0.65, p, a, sw) +
      scrollFlourish(x + w - 16, y + h - 16, -0.65, 0.65, p, a, sw);
    return frame + bars + drum + wave + trellis;
  });
  return leaves.join("");
}

/** Render 8: Royal 4-panel gold & iron gate with crests & twin medallions (Profile Row 1 Col 6). */
function renderDesign8(uid: string, p: string, a: string, sw: number): string {
  const outer = rct(28, 36, 584, 422, "none", p, sw * 1.15);
  const leaves = [
    { x: 38, y: 46, w: 136, h: 402 },
    { x: 180, y: 46, w: 136, h: 402 },
    { x: 324, y: 46, w: 136, h: 402 },
    { x: 466, y: 46, w: 136, h: 402 },
  ];
  const panels = leaves
    .map((l, idx) => {
      const cx = l.x + l.w / 2;
      const flip = idx % 2 === 0 ? 1 : -1;
      const crest =
        scrollFlourish(cx, l.y + 4, flip * 0.8, 0.7, a, p, sw) +
        scrollFlourish(cx, l.y + 4, -flip * 0.8, 0.7, a, p, sw);
      const topCartouche =
        rct(l.x + 12, l.y + 14, l.w - 24, 42, "none", a, sw * 0.8) +
        scrollFlourish(cx, l.y + 50, 0.55, 0.45, p, a, sw) +
        scrollFlourish(cx, l.y + 50, -0.55, 0.45, p, a, sw);
      const cornerScrolls =
        scrollFlourish(l.x + 14, l.y + l.h - 14, 0.65, 0.65, a, p, sw) +
        scrollFlourish(l.x + l.w - 14, l.y + l.h - 14, -0.65, 0.65, a, p, sw);
      return rct(l.x, l.y, l.w, l.h, "none", p, sw) + crest + topCartouche + cornerScrolls;
    })
    .join("");
  // Outer split drum medallions & inner diamond cartouches
  const centerDrum = splitMedallionInLeaves(`${uid}-d8c`, [leaves[1], leaves[2]], () => dongSonDrum(320, 272, 92, a, p, sw * 0.8));
  const leftDrum = splitMedallionInLeaves(`${uid}-d8l`, [leaves[0]], () => dongSonDrum(leaves[0].x, 272, 78, a, p, sw * 0.75));
  const rightDrum = splitMedallionInLeaves(`${uid}-d8r`, [leaves[3]], () => dongSonDrum(leaves[3].x + leaves[3].w, 272, 78, a, p, sw * 0.75));
  const centerAccents =
    blossom(248, 174, 16, p, a, sw) +
    blossom(392, 174, 16, p, a, sw) +
    blossom(106, 174, 15, p, a, sw) +
    blossom(534, 174, 15, p, a, sw);
  return outer + panels + centerDrum + leftDrum + rightDrum + centerAccents;
}

/** Render 9: 2-leaf vertical bar gate with giant split medallion & corner spandrels (Profile Row 2 Col 1). */
function renderDesign9(uid: string, p: string, a: string, sw: number): string {
  const leaves = [
    { x: 76, y: 22, w: 236, h: 436 },
    { x: 328, y: 22, w: 236, h: 436 },
  ];
  const cx = 320, cy = 240, drumR = 172;
  const frames = leaves.map((l) => rct(l.x, l.y, l.w, l.h, "none", p, sw * 1.25) + rct(l.x + 8, l.y + 8, l.w - 16, l.h - 16, "none", a, sw * 0.6)).join("");
  const bars = leaves
    .map((l) =>
      rep(12, (i) => {
        const bx = l.x + 18 + (i * (l.w - 36)) / 11;
        const dx = Math.abs(bx - cx);
        if (dx >= drumR + 4) return ln(bx, l.y + 12, bx, l.y + l.h - 12, p, sw * 0.9);
        const dy = Math.sqrt(Math.max(0, (drumR + 4) ** 2 - dx ** 2));
        return ln(bx, l.y + 12, bx, cy - dy, p, sw * 0.9) + ln(bx, cy + dy, bx, l.y + l.h - 12, p, sw * 0.9);
      })
    )
    .join("");
  const drum = splitMedallionInLeaves(`${uid}-d9`, leaves, () => dongSonDrum(cx, cy, drumR, p, a, sw * 0.85));
  const corners =
    scrollFlourish(92, 42, 1.15, -1.15, p, a, sw) +
    scrollFlourish(548, 42, -1.15, -1.15, p, a, sw) +
    scrollFlourish(92, 438, 1.15, 1.15, p, a, sw) +
    scrollFlourish(548, 438, -1.15, 1.15, p, a, sw);
  return frames + bars + drum + corners;
}

/** Render 10: Symmetrical rising acanthus arabesque 2-leaf gate (Profile Row 2 Col 2). */
function renderDesign10(_uid: string, p: string, a: string, sw: number): string {
  const leaves = [0, 1].map((idx) => {
    const x = idx === 0 ? 84 : 328;
    const w = 228, y = 22, h = 436;
    const cx = x + w / 2;
    const frame = rct(x, y, w, h, "none", p, sw * 1.25) + rct(x + 8, y + 8, w - 16, h - 16, "none", a, sw * 0.6);
    const treeHalf = (sx: number) =>
      g(
        `translate(${n(cx)} ${n(y + h - 22)}) scale(${sx} 1)`,
        pth("M0 0C6-62 34-94 32-148C30-192-12-206 10-248C26-278 68-262 62-222C58-196 34-194 34-214", "none", p, sw * 1.45) +
          pth("M8-42C44-52 84-86 82-136C80-172 48-184 36-162C28-146 42-132 54-142", "none", p, sw * 1.25) +
          pth("M18-115C56-135 92-178 82-226C74-262 38-266 30-242", "none", a, sw * 1.05) +
          pth("M10-200C-18-226-14-276 22-304C44-322 68-308 58-286", "none", p, sw * 1.1) +
          pth("M26-52C52-42 66-16 86-14C70-26 52-38 26-52Z", a, p, sw * 0.6) +
          pth("M44-130C68-124 88-102 98-112C82-128 64-134 44-130Z", a, p, sw * 0.6) +
          pth("M14-225C40-238 52-264 66-268C48-256 32-246 14-225Z", p)
      );
    const topChandelier =
      scrollFlourish(x + 28, y + 26, 1.1, -1.1, p, a, sw) +
      scrollFlourish(x + w - 28, y + 26, -1.1, -1.1, p, a, sw) +
      blossom(cx, y + 58, 16, p, a, sw);
    return frame + treeHalf(1) + treeHalf(-1) + topChandelier;
  });
  return leaves.join("");
}

/** Render 11: CNC ornamental frieze & border strips collection (Profile Row 2 Col 5). */
function renderDesign11(_uid: string, p: string, a: string, sw: number): string {
  const x = 44, w = 552;
  const bandFrame = (y: number, h: number) => rct(x, y, w, h, "none", p, sw * 0.75) + ln(x, y + 4, x + w, y + 4, a, sw * 0.45) + ln(x, y + h - 4, x + w, y + h - 4, a, sw * 0.45);
  // Strip 1: Linked coins
  const s1 = bandFrame(26, 44) + rep(15, (i) => {
    const cx = x + 22 + i * 36;
    return cir(cx, 48, 14, "none", p, sw * 0.85) + rct(cx - 4.5, 43.5, 9, 9, "none", a, sw * 0.7);
  });
  // Strip 2: Double Greek key meander
  const s2 = bandFrame(86, 44) + g(`translate(${x + 12} 96)`, pth(rep(14, (i) => `M${i * 38} 0H${i * 38 + 26}V24H${i * 38 + 10}V10H${i * 38 + 18}M${i * 38 + 32} 24H${i * 38 + 38}V0`), "none", p, sw * 0.95));
  // Strip 3: Interlocking 4-petal fretwork
  const s3 = bandFrame(146, 48) + rep(14, (i) => {
    const cx = x + 24 + i * 38, cy = 170;
    return pth(`M${cx} ${cy - 16}Q${cx + 8} ${cy - 8} ${cx + 18} ${cy}Q${cx + 8} ${cy + 8} ${cx} ${cy + 16}Q${cx - 8} ${cy + 8} ${cx - 18} ${cy}Q${cx - 8} ${cy - 8} ${cx} ${cy - 16}Z`, "none", p, sw * 0.8) + cir(cx, cy, 3.2, a);
  });
  // Strip 4: Flowing S-wave cloud scrolls
  const s4 = bandFrame(210, 46) + rep(11, (i) => {
    const ox = x + 26 + i * 48;
    return pth(`M${ox - 18} 233C${ox - 8} 215 ${ox + 8} 215 ${ox} 233C${ox - 8} 251 ${ox + 8} 251 ${ox + 18} 233`, "none", p, sw * 1.05) + cir(ox, 224, 2.5, a) + cir(ox, 242, 2.5, a);
  });
  // Strip 5: Floral & leafy vine frieze
  const s5 = bandFrame(272, 50) + pth(`M${x + 12} 297` + rep(11, (i) => `Q${x + 36 + i * 48} ${i % 2 ? 278 : 316} ${x + 60 + i * 48} 297`), "none", p, sw * 0.9) + rep(11, (i) => blossom(x + 36 + i * 48, i % 2 ? 290 : 304, 9, p, a, sw));
  // Strip 6: Hexagon honeycomb fretwork
  const s6 = bandFrame(338, 46) + rep(17, (i) => {
    const cx = x + 20 + i * 32, cy = 361;
    return starPoly(cx, cy, 13, 13, 6, "none", p, sw * 0.75) + cir(cx, cy, 3, a);
  });
  // Strip 7: Scalloped arch border
  const s7 = bandFrame(400, 48) + rep(13, (i) => {
    const ox = x + 16 + i * 40;
    return pth(`M${ox} 440V422A20 18 0 0 1 ${ox + 40} 422V440`, "none", p, sw * 0.95) + cir(ox + 20, 424, 4, a);
  });
  return s1 + s2 + s3 + s4 + s5 + s6 + s7;
}

/** Render 12: Circular floral ram laser-cut medallion (Profile Row 2 Col 6). */
function renderDesign12(_uid: string, p: string, a: string, sw: number): string {
  const cx = 320, cy = 240, r = 198;
  // Scalloped outer ring
  const scallops = rep(24, (i) => {
    const deg = i * 15;
    return g(
      `translate(${n(cx)} ${n(cy)}) rotate(${deg})`,
      pth(`M-22 ${n(-r + 6)}Q0 ${n(-r - 18)} 22 ${n(-r + 6)}`, "none", p, sw * 1.05) + cir(0, -r + 8, 3.2, a)
    );
  });
  const outerRings = cir(cx, cy, r - 6, "none", p, sw * 1.25) + cir(cx, cy, r - 18, "none", a, sw * 0.75);
  // Hanging festival lantern at upper right
  const lantern =
    ln(402, 86, 402, 114, p, sw * 0.85) +
    pth("M386 116H418C426 130 426 154 418 168H386C378 154 378 130 386 116Z", a, p, sw * 0.85) +
    ln(402, 116, 402, 168, p, sw * 0.55) +
    ln(392, 168, 392, 188, a, sw * 0.7) +
    ln(402, 168, 402, 194, p, sw * 0.8) +
    ln(412, 168, 412, 188, a, sw * 0.7);
  // Auspicious stylized ram silhouette with plum blossoms
  const ram =
    // Body & legs
    pth("M244 268C240 228 286 218 338 228C374 234 398 258 394 294C392 318 380 338 382 362L364 364L356 324C328 328 298 326 274 322L262 364L244 362L254 316C240 304 244 286 244 268Z", p) +
    // Neck, head & curling horn
    pth("M262 246C244 224 238 192 252 174C266 156 292 162 296 180C284 192 278 214 282 238Z", p) +
    pth("M268 172C264 140 296 130 314 152C326 168 312 192 294 186", "none", a, sw * 1.45) +
    cir(262, 178, 3, a) +
    // Floral decorations on body
    blossom(326, 272, 22, p, a, sw) +
    blossom(286, 286, 15, p, a, sw) +
    blossom(364, 282, 14, p, a, sw);
  // Surrounding plum blossoms & auspicious clouds
  const surround =
    blossom(208, 178, 20, p, a, sw) +
    blossom(196, 268, 17, p, a, sw) +
    blossom(446, 248, 22, p, a, sw) +
    blossom(422, 336, 18, p, a, sw) +
    scrollFlourish(305, 118, 1.05, 0.9, p, a, sw) +
    scrollFlourish(320, 386, -1.1, -0.7, p, a, sw);
  return scallops + outerRings + lantern + ram + surround;
}

const renderers = [
  renderDesign1,
  renderDesign2,
  renderDesign3,
  renderDesign4,
  renderDesign5,
  renderDesign6,
  renderDesign7,
  renderDesign8,
  renderDesign9,
  renderDesign10,
  renderDesign11,
  renderDesign12,
];

export function renderTiktokDesign(asset: Asset, o: SvgOptions): string {
  const p = o.primary, a = o.accent, b = o.background, sw = Math.max(0.8, o.stroke * 0.45);
  const uid = `tk-${asset.id}-${p.slice(1)}-${a.slice(1)}-${Math.round(o.stroke * 10)}`;
  const draw = renderers[asset.variant] || renderDesign1;
  const content = draw(uid, p, a, sw);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${o.width}" height="${o.height}" viewBox="0 0 640 480" preserveAspectRatio="xMidYMid meet" role="img"><title>${asset.name}</title><desc>Naqsh TikTok CNC &amp; laser-cut SVG vector inspired by @hathanhcncvemau. CC0-1.0. ${asset.english}.</desc>${o.transparent ? "" : rct(0, 0, 640, 480, b)}${content}</svg>`;
}
