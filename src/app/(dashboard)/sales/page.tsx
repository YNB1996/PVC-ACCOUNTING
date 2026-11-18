"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  seller: string;
  date: string;
  currency: string;
  items: InvoiceItem[];
  total: number;
  status: string;
}

export default function SalesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [seller, setSeller] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    const storedInv = localStorage.getItem("salesInvoices");
    if (storedInv) setInvoices(JSON.parse(storedInv));

    const storedProd = localStorage.getItem("products");
    if (storedProd) setProducts(JSON.parse(storedProd));
  }, []);

  const addItem = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product || !quantity) return;

    const qty = Number(quantity);
    const newItem: InvoiceItem = {
      productId: product.id,
      productName: product.name,
      quantity: qty,
      unitPrice: product.sellingPrice,
      total: qty * product.sellingPrice,
    };
    setItems([...items, newItem]);
    setSelectedProduct("");
    setQuantity("1");
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const invoiceTotal = items.reduce((sum, item) => sum + item.total, 0);

  const handleSave = () => {
    if (!customer || items.length === 0) {
      alert("أدخل اسم العميل وأضف صنف واحد على الأقل");
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: "INV-" + Date.now().toString().slice(-6),
      customer,
      seller: seller || "-",
      date: new Date().toLocaleDateString("ar-EG"),
      currency,
      items,
      total: invoiceTotal,
      status: "مؤكدة",
    };

    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    localStorage.setItem("salesInvoices", JSON.stringify(updated));

    // Reset
    setCustomer("");
    setSeller("");
    setItems([]);
    setShowForm(false);
    alert("تم حفظ الفاتورة بنجاح");
  };

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">فواتير البيع</h2>
          <p className="text-slate-500 mt-1">إنشاء وإدارة فواتير البيع</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-medium transition"
        >
          {showForm ? "إلغاء" : "+ فاتورة جديدة"}
        </button>
      </div>

      {/* New Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-semibold text-slate-800">فاتورة بيع جديدة</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">العملة</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">دولار (USD)</option>
                <option value="AFN">أفغاني (AFN)</option>
              </select>
            </div>
          </div>

          {/* Add item */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-1">المنتج</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">اختر منتج</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sellingPrice})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-24">
                <label className="block text-sm font-medium text-slate-700 mb-1">الكمية</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              <button
                type="button"
                onClick={addItem}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium"
              >
                إضافة
              </button>
            </div>
          </div>

          {/* Items table */}
          {items.length > 0 && (
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-right">المنتج</th>
                    <th className="px-4 py-2 text-right">الكمية</th>
                    <th className="px-4 py-2 text-right">السعر</th>
                    <th className="px-4 py-2 text-right">الإجمالي</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{item.productName}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.unitPrice}</td>
                      <td className="px-4 py-2 font-medium">{item.total}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-red-500 text-xs"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-slate-50 px-4 py-3 text-left font-bold">
                الإجمالي: {invoiceTotal} {currency}
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl font-medium"
          >
            حفظ الفاتورة
          </button>
        </div>
      )}

      {/* Invoices list */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-slate-800">فواتير البيع ({invoices.length})</h3>
        </div>
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-slate-400">لا توجد فواتير بعد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-right">رقم الفاتورة</th>
                  <th className="px-4 py-3 text-right">التاريخ</th>
                  <th className="px-4 py-3 text-right">العميل</th>
                  <th className="px-4 py-3 text-right">البائع</th>
                  <th className="px-4 py-3 text-right">الإجمالي</th>
                  <th className="px-4 py-3 text-right">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3">{inv.date}</td>
                    <td className="px-4 py-3">{inv.customer}</td>
                    <td className="px-4 py-3">{inv.seller}</td>
                    <td className="px-4 py-3 font-medium">
                      {inv.total} {inv.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                        {inv.status}
                      </span>
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
