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

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setUnit("قطعة");
    setCostPrice("");
    setSellingPrice("");
    setMinStock("10");
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name,
              sku,
              unit,
              costPrice: Number(costPrice) || 0,
              sellingPrice: Number(sellingPrice) || 0,
              minStock: Number(minStock) || 0,
            }
          : p
      );
      saveProducts(updated);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name,
        sku,
        unit,
        costPrice: Number(costPrice) || 0,
        sellingPrice: Number(sellingPrice) || 0,
        currentStock: 0,
        minStock: Number(minStock) || 0,
      };
      saveProducts([newProduct, ...products]);
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setSku(product.sku);
    setUnit(product.unit);
    setCostPrice(product.costPrice.toString());
    setSellingPrice(product.sellingPrice.toString());
    setMinStock(product.minStock.toString());
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف المنتج؟")) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <BackButton />

      <div>
        <h2 className="text-2xl font-bold text-slate-800">إدارة المنتجات</h2>
        <p className="text-slate-500 mt-1">إضافة وتعديل منتجات المصنع</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">
          {editingId ? "تعديل منتج" : "إضافة منتج جديد"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">اسم المنتج</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: أنبوب BVC 50mm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">كود المنتج (SKU)</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="BVC-50"
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
            <label className="block text-sm font-medium text-slate-700 mb-1">سعر التكلفة</label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">سعر البيع</label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">الحد الأدنى للمخزون</label>
            <input
              type="number"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              placeholder="10"
              min="0"
            />
          </div>
          <div className="md:col-span-3 flex gap-3">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              {editingId ? "حفظ التعديل" : "إضافة المنتج"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-medium transition"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">قائمة المنتجات ({products.length})</h3>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-12 text-slate-400">لا توجد منتجات بعد. أضف أول منتج.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-right font-medium">الاسم</th>
                  <th className="px-4 py-3 text-right font-medium">الكود</th>
                  <th className="px-4 py-3 text-right font-medium">الوحدة</th>
                  <th className="px-4 py-3 text-right font-medium">سعر التكلفة</th>
                  <th className="px-4 py-3 text-right font-medium">سعر البيع</th>
                  <th className="px-4 py-3 text-right font-medium">المخزون</th>
                  <th className="px-4 py-3 text-right font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-slate-500">{p.sku || "-"}</td>
                    <td className="px-4 py-3">{p.unit}</td>
                    <td className="px-4 py-3">{p.costPrice}</td>
                    <td className="px-4 py-3">{p.sellingPrice}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          p.currentStock <= p.minStock
                            ? "text-red-600 font-medium"
                            : "text-slate-700"
                        }
                      >
                        {p.currentStock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:text-red-800 text-xs font-medium"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
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
