"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("قطعة");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => lang === "ar" ? ar : fa;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newP = { id: Date.now().toString(), name, sku, unit, costPrice: Number(costPrice)||0, sellingPrice: Number(sellingPrice)||0, currentStock: 0 };
    const updated = [newP, ...products];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setName(""); setSku(""); setCostPrice(""); setSellingPrice("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">{t("إدارة المنتجات", "مدیریت محصولات")}</h2>

      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">{t("إضافة منتج جديد", "افزودن محصول جدید")}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("اسم المنتج", "نام محصول")}</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-xl px-4 py-2" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t("الكود", "کد")}</label>
              <input value={sku} onChange={e => setSku(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">{t("الوحدة", "واحد")}</label>
              <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full border rounded-xl px-4 py-2">
                <option value="قطعة">{t("قطعة", "عدد")}</option>
                <option value="كرتون">{t("كرتون", "کارتن")}</option>
                <option value="كيلو">{t("كيلو", "کیلو")}</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{t("سعر التكلفة", "قیمت تمام‌شده")}</label>
              <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">{t("سعر البيع", "قیمت فروش")}</label>
              <input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
            </div>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-xl">
            {t("إضافة", "افزودن")}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b font-semibold">{t("المنتجات", "محصولات")} ({products.length})</div>
        {products.length === 0 ? (
          <div className="p-10 text-center text-slate-400">{t("لا توجد منتجات", "محصولی نیست")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-right">{t("الاسم", "نام")}</th>
                <th className="p-3 text-right">{t("الوحدة", "واحد")}</th>
                <th className="p-3 text-right">{t("سعر البيع", "قیمت")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.unit}</td>
                  <td className="p-3">{p.sellingPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
