export default function NotFound(){return <main className="empty-state"><h1>هذه الصفحة غير موجودة</h1><a href={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/`}>العودة إلى نقش</a></main>;}
