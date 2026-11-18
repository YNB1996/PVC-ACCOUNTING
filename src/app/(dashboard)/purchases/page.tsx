"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

export default function PurchasesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [supplier, setSupplier] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem("purchaseInvoices");
    if (stored) setInvoices(JSON.parse(stored));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier || !productName || !quantity) return;

    const inv = {
      id: Date.now().toString(),
      invoiceNumber: "PUR-" + Date.now().toString().slice(-6),
      supplier,
      productName,
      quantity: Number(quantity),
      price: Number(price) || 0,
      total: Number(quantity) * (Number(price) || 0),
      currency,
      date: new Date().toLocaleDateString("ar-EG"),
    };

    const updated = [inv, ...invoices];
    setInvoices(updated);
    localStorage.setItem("purchaseInvoices", JSON.stringify(updated));
    setSupplier(""); setProductName(""); setQuantity(""); setPrice("");
    alert("تم حفظ فاتورة الشراء");
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">فواتير الشراء</h2>
        <p className="text-slate-500 mt-1">تسجيل فواتير الشراء من الموردين</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">فاتورة شراء جديدة</h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm mb-1">المورد</label>
            <input value={supplier} onChange={e => setSupplier(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required /></div>
          <div><label className="block text-sm mb-1">المنتج</label>
            <input value={productName} onChange={e => setProductName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required /></div>
          <div><label className="block text-sm mb-1">الكمية</label>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" min="1" required /></div>
          <div><label className="block text-sm mb-1">سعر الوحدة</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div><label className="block text-sm mb-1">العملة</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border">
              <option value="USD">دولار</option>
              <option value="AFN">أفغاني</option>
            </select></div>
          <div className="flex items-end"><button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">حفظ الفاتورة</button></div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">فواتير الشراء ({invoices.length})</h3></div>
        {invoices.length === 0 ? <div className="text-center py-12 text-slate-400">لا توجد فواتير شراء</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">رقم الفاتورة</th>
              <th className="px-4 py-3 text-right">التاريخ</th>
              <th className="px-4 py-3 text-right">المورد</th>
              <th className="px-4 py-3 text-right">المنتج</th>
              <th className="px-4 py-3 text-right">الكمية</th>
              <th className="px-4 py-3 text-right">الإجمالي</th>
            </tr></thead>
            <tbody className="divide-y">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3">{inv.supplier}</td>
                  <td className="px-4 py-3">{inv.productName}</td>
                  <td className="px-4 py-3">{inv.quantity}</td>
                  <td className="px-4 py-3">{inv.total} {inv.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
