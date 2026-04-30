import { sidebarItems } from "../data/mockData";

export default function Sidebar({ active, setActive, open }) {
  return (
    <aside
      className={`${open ? "w-60" : "w-16"} flex-shrink-0 bg-[#0F1B2D] flex flex-col transition-all duration-300 overflow-hidden`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          H
        </div>
        {open && (
          <div>
            <p className="text-white font-bold text-sm leading-tight">HMS Admin</p>
            <p className="text-blue-400 text-xs">Hospital Management</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-none">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
              active === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {open && <span className="font-medium truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Help */}
      {open && (
        <div className="p-3 border-t border-white/10">
          <div className="bg-blue-600/20 rounded-xl p-3 flex items-center gap-2">
            <span className="text-xl">🎧</span>
            <div>
              <p className="text-white text-xs font-bold">Need Help?</p>
              <p className="text-blue-400 text-xs">Contact Support</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
