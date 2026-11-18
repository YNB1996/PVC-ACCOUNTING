"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("customers");
    if (stored) setCustomers(JSON.parse(stored));
  }, []);

  const save = (data: Customer[]) => {
    setCustomers(data);
    localStorage.setItem("customers", JSON.stringify(data));
  };

  const reset = () => {
    setName(""); setPhone(""); setAddress(""); setNotes(""); setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (editingId) {
      save(customers.map(c => c.id === editingId ? { ...c, name, phone, address, notes } : c));
    } else {
      save([{ id: Date.now().toString(), name, phone, address, notes }, ...customers]);
    }
    reset();
  };

  const handleEdit = (c: Customer) => {
    setEditingId(c.id); setName(c.name); setPhone(c.phone); setAddress(c.address); setNotes(c.notes);
  };

  const handleDelete = (id: string) => {
    if (confirm("حذف العميل؟")) save(customers.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">العملاء</h2>
        <p className="text-slate-500 mt-1">إدارة بيانات العملاء</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">{editingId ? "تعديل عميل" : "إضافة عميل جديد"}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">الهاتف</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">ملاحظات</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">
              {editingId ? "حفظ" : "إضافة"}
            </button>
            {editingId && <button type="button" onClick={reset} className="bg-slate-200 px-6 py-2.5 rounded-xl">إلغاء</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">قائمة العملاء ({customers.length})</h3></div>
        {customers.length === 0 ? (
          <div className="text-center py-12 text-slate-400">لا يوجد عملاء</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">الهاتف</th>
              <th className="px-4 py-3 text-right">العنوان</th>
              <th className="px-4 py-3 text-right">إجراءات</th>
            </tr></thead>
            <tbody className="divide-y">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.phone || "-"}</td>
                  <td className="px-4 py-3">{c.address || "-"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 text-xs">تعديل</button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 text-xs">حذف</button>
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
