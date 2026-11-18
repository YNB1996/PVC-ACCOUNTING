"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Seller {
  id: string;
  name: string;
  phone: string;
  isActive: boolean;
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sellers");
    if (stored) setSellers(JSON.parse(stored));
  }, []);

  const save = (data: Seller[]) => {
    setSellers(data);
    localStorage.setItem("sellers", JSON.stringify(data));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    save([{ id: Date.now().toString(), name, phone, isActive: true }, ...sellers]);
    setName(""); setPhone("");
  };

  const toggleActive = (id: string) => {
    save(sellers.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleDelete = (id: string) => {
    if (confirm("حذف البائع؟")) save(sellers.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">البائعين</h2>
        <p className="text-slate-500 mt-1">إدارة أسماء البائعين</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">إضافة بائع جديد</h3>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="اسم البائع" className="px-4 py-2.5 rounded-xl border flex-1 min-w-[200px]" required />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="الهاتف" className="px-4 py-2.5 rounded-xl border w-40" />
          <button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">إضافة</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">قائمة البائعين ({sellers.length})</h3></div>
        {sellers.length === 0 ? <div className="text-center py-12 text-slate-400">لا يوجد بائعين</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">الهاتف</th>
              <th className="px-4 py-3 text-right">الحالة</th>
              <th className="px-4 py-3 text-right">إجراءات</th>
            </tr></thead>
            <tbody className="divide-y">
              {sellers.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">{s.phone || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={s.isActive ? "text-emerald-600" : "text-slate-400"}>{s.isActive ? "نشط" : "غير نشط"}</span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => toggleActive(s.id)} className="text-blue-600 text-xs">{s.isActive ? "تعطيل" : "تفعيل"}</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 text-xs">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
