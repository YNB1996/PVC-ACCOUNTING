"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { href: "/dashboard", label: "اللوحة الرئيسية", labelFa: "داشبورد", icon: "📊", roles: ["admin", "accountant", "sales", "warehouse"] },
  { href: "/products", label: "المنتجات", labelFa: "محصولات", icon: "📦", roles: ["admin", "accountant"] },
  { href: "/warehouse", label: "المستودع", labelFa: "انبار", icon: "🏭", roles: ["admin", "accountant", "warehouse"] },
  { href: "/production", label: "تسجيل الإنتاج", labelFa: "ثبت تولید", icon: "⚙️", roles: ["warehouse", "admin"] },
  { href: "/sales", label: "فواتير البيع", labelFa: "فاکتور فروش", icon: "🧾", roles: ["admin", "accountant", "sales"] },
  { href: "/returns", label: "ترجيع المبيعات", labelFa: "مرجوعی فروش", icon: "↩️", roles: ["admin", "accountant", "sales"] },
  { href: "/purchases", label: "فواتير الشراء", labelFa: "فاکتور خرید", icon: "🛒", roles: ["admin", "accountant"] },
  { href: "/customers", label: "العملاء", labelFa: "مشتریان", icon: "👥", roles: ["admin", "accountant", "sales"] },
  { href: "/suppliers", label: "الموردين", labelFa: "تأمین‌کنندگان", icon: "🏢", roles: ["admin", "accountant"] },
  { href: "/sellers", label: "البائعين", labelFa: "فروشندگان", icon: "🧑‍💼", roles: ["admin", "accountant", "sales"] },
  { href: "/employees", label: "الموظفين", labelFa: "کارمندان", icon: "👷", roles: ["admin", "accountant"] },
  { href: "/payroll", label: "الرواتب", labelFa: "حقوق", icon: "💰", roles: ["admin", "accountant"] },
  { href: "/reports", label: "التقارير", labelFa: "گزارش‌ها", icon: "📈", roles: ["admin", "accountant"] },
  { href: "/settings", label: "الإعدادات", labelFa: "تنظیمات", icon: "⚙️", roles: ["admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { router.push("/login"); return; }
    setUser(JSON.parse(u));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, [router]);

  if (!user) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen flex" dir={lang === "fa" ? "rtl" : "rtl"}>
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <div className="text-xl font-bold mb-6">BVC Factory</div>
        <nav className="flex-1 space-y-1">
          {menuItems.filter(i => i.roles.includes(user.role)).map(item => (
            <Link key={item.href} href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm ${pathname === item.href ? "bg-blue-600" : "hover:bg-slate-800"}`}>
              {item.icon} {lang === "ar" ? item.label : item.labelFa}
            </Link>
          ))}
        </nav>
        <button onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}
          className="mt-4 bg-red-600 py-2 rounded-lg text-sm">
          {lang === "ar" ? "تسجيل الخروج" : "خروج"}
        </button>
      </div>

      {/* Main */}
      <div className="flex-1">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="font-semibold">{lang === "ar" ? "نظام محاسبة المصنع" : "سیستم حسابداری کارخانه"}</h1>
          <div className="flex gap-2">
            <button onClick={() => { setLang("ar"); localStorage.setItem("lang", "ar"); }}
              className={`px-3 py-1 rounded ${lang === "ar" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}>عربي</button>
            <button onClick={() => { setLang("fa"); localStorage.setItem("lang", "fa"); }}
              className={`px-3 py-1 rounded ${lang === "fa" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}>فارسی</button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
