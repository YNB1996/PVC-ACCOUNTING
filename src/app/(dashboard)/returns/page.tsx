"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface ReturnRecord {
  id: string;
  invoiceNumber: string;
  productName: string;
  quantity: number;
  unit: string;
  reason: string;
  customer: string;
  seller: string;
  date: string;
  time: string;
  recordedBy: string;
}

export default function ReturnsPage() {
  const [returns, setReturns] = useState<ReturnRecord[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("قطعة");
  const [reason, setReason] = useState("");
  const [customer, setCustomer] = useState("");
  const [seller, setSeller] = useState("");
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const stored = localStorage.getItem("salesReturns");
    if (stored) setReturns(JSON.parse(stored));
  }, []);

  const saveReturns = (newReturns: ReturnRecord[]) => {
    setReturns(newReturns);
    localStorage.setItem("salesReturns", JSON.stringify(newReturns));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity) return;

    const now = new Date();
    const newReturn: ReturnRecord = {
      id: Date.now().toString(),
      invoiceNumber: invoiceNumber || "بدون فاتورة",
      productName,
      quantity: Number(quantity),
      unit,
      reason: reason || "بدون سبب",
      customer: customer || "-",
      seller: seller || "-",
      date: now.toLocaleDateString("ar-EG"),
      time: now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      recordedBy: user?.name || "مستخدم",
    };

    saveReturns([newReturn, ...returns]);

    // Reset form
    setInvoiceNumber("");
    setProductName("");
    setQuantity("");
    setReason("");
    setCustomer("");
    setSeller("");
  };

  return (
    <div className="space-y-6">
      <BackButton label="رجوع للقائمة" />

      <div>
        <h2 className="text-2xl font-bold text-slate-800">ترجيع المبيعات</h2>
        <p className="text-slate-500 mt-1">
          تسجيل ترجيع منتجات من العملاء (قطعة واحدة أو أكثر)
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">تسجيل ترجيع جديد</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">رقم الفاتورة (اختياري)</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="رقم فاتورة البيع"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">اسم المنتج</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="اسم المنتج المرتجع"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الكمية المرجعة</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الوحدة</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="قطعة">قطعة</option>
              <option value="كرتون">كرتون</option>
              <option value="كيلو">كيلو</option>
              <option value="متر">متر</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">اسم العميل</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="اسم العميل"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">البائع</label>
            <input
              type="text"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="اسم البائع"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">سبب الترجيع</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: عيب في المنتج، زائد عن الحاجة..."
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              تسجيل الترجيع
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">سجل الترجيعات</h3>
        </div>
        {returns.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            لا توجد ترجيعات مسجلة حتى الآن
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-right font-medium">التاريخ</th>
                  <th className="px-4 py-3 text-right font-medium">المنتج</th>
                  <th className="px-4 py-3 text-right font-medium">الكمية</th>
                  <th className="px-4 py-3 text-right font-medium">العميل</th>
                  <th className="px-4 py-3 text-right font-medium">البائع</th>
                  <th className="px-4 py-3 text-right font-medium">السبب</th>
                  <th className="px-4 py-3 text-right font-medium">سجله</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {returns.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      {r.date}
                      <div className="text-xs text-slate-400">{r.time}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{r.productName}</td>
                    <td className="px-4 py-3">
                      {r.quantity} {r.unit}
                    </td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.seller}</td>
                    <td className="px-4 py-3 text-slate-500">{r.reason}</td>
                    <td className="px-4 py-3 text-xs">{r.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
