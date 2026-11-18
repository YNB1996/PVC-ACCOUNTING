"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const [companyNameAr, setCompanyNameAr] = useState("مصنع BVC");
  const [companyNameFa, setCompanyNameFa] = useState("کارخانه BVC");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem("companySettings");
    if (stored) {
      const s = JSON.parse(stored);
      setCompanyNameAr(s.companyNameAr || "");
      setCompanyNameFa(s.companyNameFa || "");
      setPhone(s.phone || "");
      setAddress(s.address || "");
      setDefaultCurrency(s.defaultCurrency || "USD");
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = { companyNameAr, companyNameFa, phone, address, defaultCurrency };
    localStorage.setItem("companySettings", JSON.stringify(settings));
    alert("تم حفظ الإعدادات");
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">الإعدادات</h2>
        <p className="text-slate-500 mt-1">إعدادات الشركة العامة</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium mb-1">اسم الشركة (عربي)</label>
            <input value={companyNameAr} onChange={e => setCompanyNameAr(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">اسم الشركة (فارسي)</label>
            <input value={companyNameFa} onChange={e => setCompanyNameFa(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">الهاتف</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">العملة الافتراضية</label>
            <select value={defaultCurrency} onChange={e => setDefaultCurrency(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border">
              <option value="USD">دولار أمريكي</option>
              <option value="AFN">أفغاني</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium">
            حفظ الإعدادات
          </button>
        </form>
      </div>

      <div className="bg-slate-50 rounded-2xl border p-6 text-sm text-slate-600">
        <p className="font-medium mb-2">ملاحظات:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>الشعار يمكن إضافته لاحقاً.</li>
          <li>الإعدادات محفوظة محلياً حالياً.</li>
          <li>يمكن إضافة المزيد من الإعدادات (ضريبة، طباعة، إلخ) حسب الحاجة.</li>
        </ul>
      </div>
    </div>
  );
}
