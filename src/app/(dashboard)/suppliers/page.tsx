"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function SuppliersPage() {
  const [items, setItems] = useState<Supplier[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("suppliers");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const save = (data: Supplier[]) => {
    setItems(data);
    localStorage.setItem("suppliers", JSON.stringify(data));
  };

  const reset = () => { setName(""); setPhone(""); setAddress(""); setNotes(""); setEditingId(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (editingId) {
      save(items.map(i => i.id === editingId ? { ...i, name, phone, address, notes } : i));
    } else {
      save([{ id: Date.now().toString(), name, phone, address, notes }, ...items]);
    }
    reset();
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">الموردين</h2>
        <p className="text-slate-500 mt-1">إدارة بيانات الموردين</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">{editingId ? "تعديل مورد" : "إضافة مورد جديد"}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm mb-1">الاسم</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required /></div>
          <div><label className="block text-sm mb-1">الهاتف</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div className="md:col-span-2"><label className="block text-sm mb-1">العنوان</label>
            <input value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div className="md:col-span-2"><label className="block text-sm mb-1">ملاحظات</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">{editingId ? "حفظ" : "إضافة"}</button>
            {editingId && <button type="button" onClick={reset} className="bg-slate-200 px-6 py-2.5 rounded-xl">إلغاء</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">قائمة الموردين ({items.length})</h3></div>
        {items.length === 0 ? <div className="text-center py-12 text-slate-400">لا يوجد موردين</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">الهاتف</th>
              <th className="px-4 py-3 text-right">العنوان</th>
              <th className="px-4 py-3 text-right">إجراءات</th>
            </tr></thead>
            <tbody className="divide-y">
              {items.map(i => (
                <tr key={i.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{i.name}</td>
                  <td className="px-4 py-3">{i.phone || "-"}</td>
                  <td className="px-4 py-3">{i.address || "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setEditingId(i.id); setName(i.name); setPhone(i.phone); setAddress(i.address); setNotes(i.notes); }} className="text-blue-600 text-xs mr-2">تعديل</button>
                    <button onClick={() => { if (confirm("حذف؟")) save(items.filter(x => x.id !== i.id)); }} className="text-red-600 text-xs">حذف</button>
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
