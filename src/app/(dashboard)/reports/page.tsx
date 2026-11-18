"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

export default function ReportsPage() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    salesInvoices: 0,
    purchaseInvoices: 0,
    employees: 0,
    productionRecords: 0,
    returns: 0,
  });

  useEffect(() => {
    setStats({
      products: JSON.parse(localStorage.getItem("products") || "[]").length,
      customers: JSON.parse(localStorage.getItem("customers") || "[]").length,
      salesInvoices: JSON.parse(localStorage.getItem("salesInvoices") || "[]").length,
      purchaseInvoices: JSON.parse(localStorage.getItem("purchaseInvoices") || "[]").length,
      employees: JSON.parse(localStorage.getItem("employees") || "[]").length,
      productionRecords: JSON.parse(localStorage.getItem("productionRecords") || "[]").length,
      returns: JSON.parse(localStorage.getItem("salesReturns") || "[]").length,
    });
  }, []);

  const cards = [
    { title: "المنتجات", value: stats.products, color: "bg-blue-50 text-blue-700" },
    { title: "العملاء", value: stats.customers, color: "bg-emerald-50 text-emerald-700" },
    { title: "فواتير البيع", value: stats.salesInvoices, color: "bg-violet-50 text-violet-700" },
    { title: "فواتير الشراء", value: stats.purchaseInvoices, color: "bg-amber-50 text-amber-700" },
    { title: "الموظفين", value: stats.employees, color: "bg-pink-50 text-pink-700" },
    { title: "سجلات الإنتاج", value: stats.productionRecords, color: "bg-cyan-50 text-cyan-700" },
    { title: "الترجيعات", value: stats.returns, color: "bg-orange-50 text-orange-700" },
  ];

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">التقارير</h2>
        <p className="text-slate-500 mt-1">ملخص سريع للنظام</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className={`rounded-2xl border p-5 ${c.color}`}>
            <div className="text-sm font-medium opacity-80">{c.title}</div>
            <div className="text-3xl font-bold mt-2">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-3">ملاحظات</h3>
        <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
          <li>التقارير حالياً تعتمد على البيانات المحلية (للتجربة).</li>
          <li>لاحقاً يمكن إضافة تقارير مفصلة (مبيعات يومية، أرباح، حركة مخزون...).</li>
          <li>يمكن تصدير التقارير إلى Excel أو PDF.</li>
        </ul>
      </div>
    </div>
  );
}
