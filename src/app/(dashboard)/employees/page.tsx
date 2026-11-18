"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Employee {
  id: string;
  name: string;
  phone: string;
  jobTitle: string;
  salary: number;
  currency: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  const save = (data: Employee[]) => {
    setEmployees(data);
    localStorage.setItem("employees", JSON.stringify(data));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    save([{ id: Date.now().toString(), name, phone, jobTitle, salary: Number(salary) || 0, currency }, ...employees]);
    setName(""); setPhone(""); setJobTitle(""); setSalary("");
  };

  const handleDelete = (id: string) => {
    if (confirm("حذف الموظف؟")) save(employees.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">الموظفين</h2>
        <p className="text-slate-500 mt-1">إدارة بيانات الموظفين</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">إضافة موظف جديد</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm mb-1">الاسم</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required /></div>
          <div><label className="block text-sm mb-1">الهاتف</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div><label className="block text-sm mb-1">المسمى الوظيفي</label>
            <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div><label className="block text-sm mb-1">الراتب</label>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" /></div>
          <div><label className="block text-sm mb-1">العملة</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border">
              <option value="USD">دولار</option>
              <option value="AFN">أفغاني</option>
            </select></div>
          <div className="flex items-end"><button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-xl">إضافة</button></div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">قائمة الموظفين ({employees.length})</h3></div>
        {employees.length === 0 ? <div className="text-center py-12 text-slate-400">لا يوجد موظفين</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">المسمى</th>
              <th className="px-4 py-3 text-right">الراتب</th>
              <th className="px-4 py-3 text-right">الهاتف</th>
              <th className="px-4 py-3 text-right">إجراءات</th>
            </tr></thead>
            <tbody className="divide-y">
              {employees.map(e => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3">{e.jobTitle || "-"}</td>
                  <td className="px-4 py-3">{e.salary} {e.currency}</td>
                  <td className="px-4 py-3">{e.phone || "-"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(e.id)} className="text-red-600 text-xs">حذف</button>
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
