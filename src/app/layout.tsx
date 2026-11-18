"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menu = [
  { href: "/dashboard", ar: "اللوحة الرئيسية", fa: "داشبورد", icon: "📊", roles: ["admin","accountant","sales","warehouse"] },
  { href: "/products", ar: "المنتجات", fa: "محصولات", icon: "📦", roles: ["admin","accountant"] },
  { href: "/warehouse", ar: "المستودع", fa: "انبار", icon: "🏭", roles: ["admin","accountant","warehouse"] },
  { href: "/production", ar: "تسجيل الإنتاج", fa: "ثبت تولید", icon: "⚙️", roles: ["warehouse","admin"] },
  { href: "/sales", ar: "فواتير البيع", fa: "فاکتور فروش", icon: "🧾", roles: ["admin","accountant","sales"] },
  { href: "/returns", ar: "ترجيع المبيعات", fa: "مرجوعی", icon: "↩️", roles: ["admin","accountant","sales"] },
  { href: "/purchases", ar: "فواتير الشراء", fa: "فاکتور خرید", icon: "🛒", roles: ["admin","accountant"] },
  { href: "/customers", ar: "العملاء", fa: "مشتریان", icon: "👥", roles: ["admin","accountant","sales"] },
  { href: "/suppliers", ar: "الموردين", fa: "تأمین‌کنندگان", icon: "🏢", roles: ["admin","accountant"] },
  { href: "/sellers", ar: "البائعين", fa: "فروشندگان", icon: "🧑‍💼", roles: ["admin","accountant","sales"] },
  { href: "/employees", ar: "الموظفين", fa: "کارمندان", icon: "👷", roles: ["admin","accountant"] },
  { href: "/payroll", ar: "الرواتب", fa: "حقوق", icon: "💰", roles: ["admin","accountant"] },
  { href: "/reports", ar: "التقارير", fa: "گزارش‌ها", icon: "📈", roles: ["admin","accountant"] },
  { href: "/settings", ar: "الإعدادات", fa: "تنظیمات", icon: "⚙️", roles: ["admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { router.push("/login"); return; }
    setUser(JSON.parse(u));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, [router]);

  const changeLang = (l: "ar" | "fa") => {
    setLang(l);
    localStorage.setItem("lang", l);
    window.location.reload();
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">...</div>;

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <header className="bg-white border-b h-14 flex items-center justify-between px-4 sticky top-0 z-20">
        <button onClick={() => setOpen(!open)} className="text-2xl px-2">☰</button>
        <span className="font-semibold">{lang === "ar" ? "نظام المحاسبة" : "سیستم حسابداری"}</span>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 text-sm">
          <button onClick={() => changeLang("ar")} className={`px-3 py-1 rounded ${lang === "ar" ? "bg-white shadow" : ""}`}>عربي</button>
          <button onClick={() => changeLang("fa")} className={`px-3 py-1 rounded ${lang === "fa" ? "bg-white shadow" : ""}`}>فارسی</button>
        </div>
      </header>

      {open && <div className="fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-14 bottom-0 w-64 bg-slate-900 text-white z-40 overflow-y-auto transition-all ${open ? "right-0" : "-right-64"}`}>
        <div className="p-4 border-b border-slate-700 flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-8" />
          <span className="font-bold">Anadolu Afghan</span>
        </div>
        <nav className="p-2">
          {menu.filter(m => m.roles.includes(user.role)).map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg mb-1 text-sm ${pathname === item.href ? "bg-blue-600" : "hover:bg-slate-800"}`}>
              <span>{item.icon}</span>
              <span>{lang === "ar" ? item.ar : item.fa}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 mt-4">
          <div className="text-sm mb-2">{user.name}</div>
          <button onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}
            className="w-full bg-red-600 py-2 rounded-lg text-sm">خروج</button>
        </div>
      </aside>

      <main className="p-4">{children}</main>
    </div>
  );
}
