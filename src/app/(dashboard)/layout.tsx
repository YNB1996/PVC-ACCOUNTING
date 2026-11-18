"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    const storedLang = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (storedLang) setLang(storedLang);
  }, []);

  const stats = [
    {
      title: "إجمالي المبيعات (هذا الشهر)",
      titleFa: "مجموع فروش این ماه",
      value: "$ 0",
      valueAf: "۰ افغانی",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "إجمالي المشتريات (هذا الشهر)",
      titleFa: "مجموع خرید این ماه",
      value: "$ 0",
      valueAf: "۰ افغانی",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "فواتير اليوم",
      titleFa: "فاکتورهای امروز",
      value: "0",
      color: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      title: "منتجات منخفضة المخزون",
      titleFa: "محصولات کم موجودی",
      value: "0",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {lang === "ar" ? `مرحباً${user ? `، ${user.name}` : ""}` : `خوش آمدید${user ? `، ${user.name}` : ""}`}
        </h2>
        <p className="text-slate-500 mt-1">
          {lang === "ar"
            ? "هذه لوحة التحكم الرئيسية لنظام محاسبة المصنع"
            : "این داشبورد اصلی سیستم حسابداری کارخانه است"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`rounded-2xl border p-5 ${stat.color}`}>
            <div className="text-sm font-medium opacity-80">
              {lang === "ar" ? stat.title : stat.titleFa}
            </div>
            <div className="text-2xl font-bold mt-3">{stat.value}</div>
            {stat.valueAf && <div className="text-sm mt-1 opacity-70">{stat.valueAf}</div>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">
          {lang === "ar" ? "إجراءات سريعة" : "اقدامات سریع"}
        </h3>
        <div className="flex flex-wrap gap-3">
          <a href="/sales" className="px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition">
            + {lang === "ar" ? "إنشاء فاتورة بيع" : "ایجاد فاکتور فروش"}
          </a>
          <a href="/purchases" className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition">
            + {lang === "ar" ? "إنشاء فاتورة شراء" : "ایجاد فاکتور خرید"}
          </a>
          <a href="/products" className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition">
            {lang === "ar" ? "إدارة المنتجات" : "مدیریت محصولات"}
          </a>
          <a href="/warehouse" className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition">
            {lang === "ar" ? "حركة المستودع" : "حرکت انبار"}
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">
          {lang === "ar" ? "آخر الفواتير" : "آخرین فاکتورها"}
        </h3>
        <div className="text-center py-10 text-slate-400">
          {lang === "ar"
            ? "لا توجد فواتير بعد. ابدأ بإنشاء أول فاتورة بيع."
            : "هنوز فاکتوری وجود ندارد. با ایجاد اولین فاکتور فروش شروع کنید."}
        </div>
      </div>
    </div>
  );
}
