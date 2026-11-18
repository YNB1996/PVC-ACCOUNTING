"use client";

import { useEffect, useState } from "react";

export default function SalesPage() {
  const [lang, setLang] = useState<"ar" | "fa">("ar");
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ name: "", qty: "", price: "" }]);

  useEffect(() => {
    const l = localStorage.getItem("lang") as "ar" | "fa" | null;
    if (l) setLang(l);
  }, []);

  const t = (ar: string, fa: string) => (lang === "ar" ? ar : fa);

  const addItem = () => setItems([...items, { name: "", qty: "", price: "" }]);

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.price) || 0), 0);

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-print");
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html dir="rtl">
        <head>
          <title>فاتورة</title>
          <style>
            @page { size: A5; margin: 8mm; }
            body { font-family: Tahoma, Arial; margin: 0; padding: 8px; font-size: 11px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #333; padding: 5px; text-align: center; }
            .header { background: #d6e6f2; padding: 8px; text-align: center; margin-bottom: 6px; }
            .logo { height: 45px; }
            h2 { margin: 4px 0; font-size: 14px; }
            .footer { margin-top: 12px; text-align: center; font-size: 10px; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 300);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("فواتير البيع", "فاکتور فروش")}</h2>

      <div className="bg-white p-6 rounded-2xl border">
        <div className="mb-4">
          <label className="block text-sm mb-1">{t("اسم العميل", "نام مشتری")}</label>
          <input value={customer} onChange={e => setCustomer(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <input placeholder={t("اسم المنتج", "نام محصول")} value={item.name} onChange={e => updateItem(i, "name", e.target.value)} className="border rounded-xl px-3 py-2" />
              <input type="number" placeholder={t("الكمية", "تعداد")} value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} className="border rounded-xl px-3 py-2" />
              <input type="number" placeholder={t("السعر", "قیمت")} value={item.price} onChange={e => updateItem(i, "price", e.target.value)} className="border rounded-xl px-3 py-2" />
            </div>
          ))}
        </div>

        <button type="button" onClick={addItem} className="mt-3 text-blue-600 text-sm">+ {t("إضافة منتج", "افزودن محصول")}</button>

        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold">{t("المجموع", "مجموع")}: {total}</div>
          <button onClick={handlePrint} className="bg-blue-700 text-white px-6 py-2 rounded-xl">
            {t("طباعة الفاتورة", "چاپ فاکتور")}
          </button>
        </div>
      </div>

      <div id="invoice-print" className="hidden">
        <div className="header">
          <img src="/logo.png" className="logo" alt="Logo" />
          <h2>شرکت تولیدی پی وی سی انادولو افغان</h2>
          <div>ANADOLU AFGHAN PVC manufacturing co.</div>
          <div>تولید کننده بهترین وال پنل و تایل پنل</div>
          <div>شعبه مرکزی مزارشریف</div>
        </div>
        <table>
          <tr><th>تاریخ</th><th colSpan={4}>دارنده حساب : {customer}</th></tr>
          <tr><th>شماره</th><th>اسم / کود جنس</th><th>تعداد</th><th>قیات</th><th>مجموعه</th></tr>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{(Number(item.qty) || 0) * (Number(item.price) || 0)}</td>
            </tr>
          ))}
          <tr><td colSpan={4}>مجموعه</td><td>{total}</td></tr>
        </table>
        <div className="footer">
          <div>تماس با مسئولین : 0700600245</div>
          <div>نوت: جنس سالم فروخته شده واپس نمیشود</div>
        </div>
      </div>
    </div>
  );
}
