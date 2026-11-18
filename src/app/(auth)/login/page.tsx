"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = [
      { username: "admin", password: "123456", name: "المدير", role: "admin" },
      { username: "accountant", password: "123456", name: "المحاسب", role: "accountant" },
      { username: "sales", password: "123456", name: "المبيعات", role: "sales" },
      { username: "warehouse", password: "123456", name: "المستودع", role: "warehouse" },
    ];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-700">Anadolu Afghan</div>
          <p className="text-slate-500 mt-1">نظام محاسبة المصنع</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
            <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-xl px-4 py-2.5" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">كلمة المرور</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-2.5" required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-700 text-white py-2.5 rounded-xl font-medium">دخول</button>
        </form>
        <div className="mt-6 text-xs text-slate-400 text-center space-y-1">
          <div>admin / 123456</div>
          <div>accountant / 123456</div>
          <div>sales / 123456</div>
          <div>warehouse / 123456</div>
        </div>
      </div>
    </div>
  );
}
