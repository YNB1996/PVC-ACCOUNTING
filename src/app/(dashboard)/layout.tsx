</Link>
          );
        })}
    </nav>

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

  <main
    className={`flex-1 transition-all duration-300 ${
      sidebarOpen ? "mr-64" : "mr-20"
    }`}
  >
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
          {lang === "ar" ? "نظام محاسبة المصنع" : "سیستم حسابداری کارخانه"}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-100 rounded-lg p-1 text-sm">
          <button
            onClick={() => changeLang("ar")}
            className={`px-3 py-1 rounded-md transition ${lang === "ar" ? "bg-white text-blue-700 shadow-sm font-medium" : "text-slate-500"}`}
          >
            عربي
          </button>
          <button
            onClick={() => changeLang("fa")}
            className={`px-3 py-1 rounded-md transition ${lang === "fa" ? "bg-white text-blue-700 shadow-sm font-medium" : "text-slate-500"}`}
          >
            فارسی
          </button>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>

    <div className="p-6">{children}</div>
  </main>
</div>
); }
