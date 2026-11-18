"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface SalaryPayment {
  id: string;
  employeeName: string;
  month: string;
  year: string;
  amount: number;
  currency: string;
  date: string;
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [payments, setPayments] = useState<SalaryPayment[]>([]);
  const [employeeName, setEmployeeName] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const emp = localStorage.getItem("employees");
    if (emp) setEmployees(JSON.parse(emp));
    const pay = localStorage.getItem("salaryPayments");
    if (pay) setPayments(JSON.parse(pay));
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !amount) return;

    const payment: SalaryPayment = {
      id: Date.now().toString(),
      employeeName,
      month: month.toString(),
      year: year.toString(),
      amount: Number(amount),
      currency,
      date: new Date().toLocaleDateString("ar-EG"),
    };

    const updated = [payment, ...payments];
    setPayments(updated);
    localStorage.setItem("salaryPayments", JSON.stringify(updated));
    setEmployeeName(""); setAmount("");
    alert("تم تسجيل صرف الراتب");
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div>
        <h2 className="text-2xl font-bold text-slate-800">الرواتب</h2>
        <p className="text-slate-500 mt-1">تسجيل صرف الرواتب الشهرية</p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h3 className="font-semibold mb-4">صرف راتب</h3>
        <form onSubmit={handlePay} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">الموظف</label>
            <select value={employeeName} onChange={e => setEmployeeName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required>
              <option value="">اختر موظف</option>
              {employees.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">الشهر</label>
            <input type="number" value={month} onChange={e => setMonth(Number(e.target.value))} min="1" max="12" className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm mb-1">السنة</label>
            <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm mb-1">المبلغ</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border" required />
          </div>
          <div className="md:col-span-4 flex gap-3 items-end">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="px-4 py-2.5 rounded-xl border">
              <option value="USD">دولار</option>
              <option value="AFN">أفغاني</option>
            </select>
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl">صرف الراتب</button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-6 py-4 border-b"><h3 className="font-semibold">سجل الرواتب المدفوعة</h3></div>
        {payments.length === 0 ? <div className="text-center py-12 text-slate-400">لا توجد رواتب مدفوعة</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="px-4 py-3 text-right">التاريخ</th>
              <th className="px-4 py-3 text-right">الموظف</th>
              <th className="px-4 py-3 text-right">الشهر</th>
              <th className="px-4 py-3 text-right">المبلغ</th>
            </tr></thead>
            <tbody className="divide-y">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{p.date}</td>
                  <td className="px-4 py-3 font-medium">{p.employeeName}</td>
                  <td className="px-4 py-3">{p.month}/{p.year}</td>
                  <td className="px-4 py-3">{p.amount} {p.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
