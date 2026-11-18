"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Product {
  id: string;
  name: string;
  sku: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  minStock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("قطعة");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [minStock, setMinStock] = useState("10");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lang, setLang] = useState<"ar" | "fa">("ar");

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const resetForm = () => {
    setName(""); setSku(""); setUnit("قطعة"); setCostPrice(""); setSellingPrice(""); setMinStock("10"); setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (editingId) {
      saveProducts(products.map(p => p.id === editingId ? { ...p, name, sku, unit, costPrice: Number(costPrice)||0, sellingPrice: Number(sellingPrice)||0, minStock: Number(minStock)||0 } : p));
    } else {
      saveProducts([{ id: Date.now().toString(), name, sku, unit, costPrice: Number(costPrice)||0, sellingPrice: Number(sellingPrice)||0, currentStock: 0, minStock: Number(minStock)||0 }, ...products]);
    }
    resetForm();
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t("إدارة المنتجات", "مدیریت محصولات")}</h2>
        <p className="text-slate-500 mt-1">{t("إضافة وتعديل منتجات المصنع", "افزودن و ویرایش محصولات کارخانه")}</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">{editingId ? t("تعديل منتج", "ویرایش محصول") : t("إضافة منتج جديد", "افزودن محصول جدید")}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("اسم المنتج", "نام محصول")}</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("كود المنتج", "کد محصول")}</label>
            <input value={sku} onChange={e => setSku(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("الوحدة", "واحد")}</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border">
              <option value="قطعة">{t("قطعة", "عدد")}</option>
              <option value="كرتون">{t("كرتون", "کارتن")}</option>
              <option value="كيلو">{t("كيلو", "کیلو")}</option>
              <option value="متر">{t("متر", "متر")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("سعر التكلفة", "قیمت تمام‌شده")}</label>
            <input type="number" value={costPrice} onChange={e => setCostPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("سعر البيع", "قیمت فروش")}</label>
            <input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("الحد الأدنى", "حداقل موجودی")}</label>
            <input type="number" value={minStock} onChange={e => setMinStock(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div className="md:col-span-3">
            <button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">
              {editingId ? t("حفظ", "ذخیره") : t("إضافة المنتج", "افزودن محصول")}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">{t("قائمة المنتجات", "لیست محصولات")} ({products.length})</h3></div>
        {products.length === 0 ? (
          <div className="text-center py-12 text-slate-400">{t("لا توجد منتجات", "محصولی وجود ندارد")}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">{t("الاسم", "نام")}</th>
              <th className="px-4 py-3 text-right">{t("الكود", "کد")}</th>
              <th className="px-4 py-3 text-right">{t("الوحدة", "واحد")}</th>
              <th className="px-4 py-3 text-right">{t("سعر البيع", "قیمت فروش")}</th>
              <th className="px-4 py-3 text-right">{t("المخزون", "موجودی")}</th>
            </tr></thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.sku || "-"}</td>
                  <td className="px-4 py-3">{p.unit}</td>
                  <td className="px-4 py-3">{p.sellingPrice}</td>
                  <td className="px-4 py-3">{p.currentStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
