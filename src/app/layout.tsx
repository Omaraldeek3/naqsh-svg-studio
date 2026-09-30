import type { Metadata } from "next";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "./globals.css";
import "../styles/responsive.css";
import "../styles/catalog-scale.css";
import "../styles/ornaments.css";
export const metadata:Metadata={title:"نقش — زخارف عربية وإسلامية ونباتية SVG",description:"مكتبة زخارف متجهية: هندسة إسلامية، أرابيسك، نباتات، وردات وإطارات. خصّص ألوانك، وصدّر SVG وPNG وكود React.",applicationName:"Naqsh",robots:{index:true,follow:true}};
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="ar" dir="rtl"><body>{children}</body></html>; }
