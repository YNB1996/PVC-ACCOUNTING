"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";


const menuItems = [
  { href: "/dashboard", label: "اللوحة الرئيسية", labelFa: "داشبورد", icon: "📊", roles: ["admin", "accountant", "sales", "warehouse"] },
  { href: "/products", label: "المنتجات", labelFa: "محصولات", icon: "📦", roles: ["admin", "accountant"] },
  { href: "/warehouse", label: "المستودع", labelFa: "انبار", icon: "🏭", roles: ["admin", "accountant", "warehouse"] },
  { href: "/production", label: "تسجيل الإنتاج", labelFa: "ثبت تولید", icon: "⚙️", roles: ["warehouse", "admin"] },
  { href: "/sales", label: "فواتير البيع", labelFa: "فاکتور فروش", icon: "🧾", roles: ["admin", "accountant", "sales"] },
  { href: "/returns", label: "ترجيع المبيعات", labelFa: "مرجوعی فروش", icon: "↩️", roles: ["admin", "accountant", "sales"] },
  { href: "/purchases", label: "فواتير الشراء", labelFa: "فاکتور خرید", icon: "🛒", roles: ["admin", "accountant"] },
  { href: "/customers", label: "العملاء", labelFa: "مشتریان", icon: "👥", roles: ["admin", "accountant", "sales"] },
  { href: "/suppliers", label: "الموردين", labelFa: "تأمین‌کنندگان", icon: "🏢", roles: ["admin", "accountant"] },
  { href: "/sellers", label: "البائعين", labelFa: "فروشندگان", icon: "🧑‍💼", roles: ["admin", "accountant", "sales"] },
  { href: "/employees", label: "الموظفين", labelFa: "کارمندان", icon: "👷", roles: ["admin", "accountant"] },
  { href: "/payroll", label: "الرواتب", labelFa: "حقوق", icon: "💰", roles: ["admin", "accountant"] },
  { href: "/reports", label: "التقارير", labelFa: "گزارش‌ها", icon: "📈", roles: ["admin", "accountant"] },
  { href: "/settings", label: "الإعدادات", labelFa: "تنظیمات", icon: "⚙️", roles: ["admin"] },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {sidebarOpen && (
            <div className="font-bold text-lg tracking-wide">BVC Factory</div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-700 transition"
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems
            .filter((item) => user && item.roles.includes(user.role))
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg mb-1 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
        </nav>

        {/* User info */}
        <div className="border-t border-slate-700 p-4">
          {sidebarOpen && (
            <div className="mb-3">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-slate-400 capitalize">{user.role}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-sm bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white py-2 rounded-lg transition"
          >
            {sidebarOpen ? "تسجيل الخروج" : "⎋"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "mr-64" : "mr-20"
        }`}
      >
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-slate-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition"
            >
              <span>←</span>
              رجوع
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              نظام محاسبة المصنع
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">عربي | فارسی</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
