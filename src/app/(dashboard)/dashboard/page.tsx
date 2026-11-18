"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
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
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          مرحباً{user ? `، ${user.name}` : ""}
        </h2>
        <p className="text-slate-500 mt-1">
          خوش آمدید — هذه لوحة التحكم الرئيسية لنظام محاسبة المصنع
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-5 ${stat.color}`}
          >
            <div className="text-sm font-medium opacity-80">{stat.title}</div>
            <div className="text-xs opacity-60 mt-0.5">{stat.titleFa}</div>
            <div className="text-2xl font-bold mt-3">{stat.value}</div>
            {stat.valueAf && (
              <div className="text-sm mt-1 opacity-70">{stat.valueAf}</div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">إجراءات سريعة</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/sales/new"
            className="px-4 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition"
          >
            + إنشاء فاتورة بيع
          </a>
          <a
            href="/purchases/new"
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition"
          >
            + إنشاء فاتورة شراء
          </a>
          <a
            href="/products"
            className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
          >
            إدارة المنتجات
          </a>
          <a
            href="/warehouse"
            className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
          >
            حركة المستودع
          </a>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">آخر الفواتير</h3>
        <div className="text-center py-10 text-slate-400">
          لا توجد فواتير بعد. ابدأ بإنشاء أول فاتورة بيع.
        </div>
      </div>
    </div>
  );
}
