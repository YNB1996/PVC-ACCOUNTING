"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface StockMovement {
  id: string;
  productName: string;
  type: string;
  quantity: number;
  notes: string;
  date: string;
}

export default function WarehousePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("in");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedP = localStorage.getItem("products");
    if (storedP) setProducts(JSON.parse(storedP));
    const storedM = localStorage.getItem("stockMovements");
    if (storedM) setMovements(JSON.parse(storedM));
  }, []);

  const handleAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity) return;

    const qty = Number(quantity);
    const movement: StockMovement = {
      id: Date.now().toString(),
      productName,
      type: type === "in" ? "وارد" : type === "out" ? "صادر" : "تسوية",
      quantity: qty,
      notes,
      date: new Date().toLocaleDateString("ar-EG"),
    };

    const updatedMov = [movement, ...movements];
    setMovements(updatedMov);
    localStorage.setItem("stockMovements", JSON.stringify(updatedMov));

    // Update product stock
    const updatedProducts = products.map(p => {
      if (p.name === productName) {
        let newStock = p.currentStock || 0;
        if (type === "in") newStock += qty;
        else if (type === "out") newStock -= qty;
        else newStock = qty;
        return { ...p, currentStock: newStock };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProductName(""); setQuantity(""); setNotes("");
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">المستودع</h2>
        <p className="text-slate-500 mt-1">حركة المخزون والتسويات</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">تسجيل حركة مخزون</h3>
        <form onSubmit={handleAdjust} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">المنتج</label>
            <select value={productName} onChange={e => setProductName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required>
              <option value="">اختر منتج</option>
              {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">النوع</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border">
              <option value="in">وارد</option>
              <option value="out">صادر</option>
              <option value="adjust">تسوية</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">الكمية</label>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" min="1" required />
          </div>
          <div>
            <label className="block text-sm mb-1">ملاحظات</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div className="md:col-span-4">
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl">تسجيل الحركة</button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">آخر حركات المخزون</h3></div>
        {movements.length === 0 ? <div className="text-center py-12 text-slate-400">لا توجد حركات</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">التاريخ</th>
              <th className="px-4 py-3 text-right">المنتج</th>
              <th className="px-4 py-3 text-right">النوع</th>
              <th className="px-4 py-3 text-right">الكمية</th>
              <th className="px-4 py-3 text-right">ملاحظات</th>
            </tr></thead>
            <tbody className="divide-y">
              {movements.slice(0, 20).map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{m.date}</td>
                  <td className="px-4 py-3 font-medium">{m.productName}</td>
                  <td className="px-4 py-3">{m.type}</td>
                  <td className="px-4 py-3">{m.quantity}</td>
                  <td className="px-4 py-3 text-slate-500">{m.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
