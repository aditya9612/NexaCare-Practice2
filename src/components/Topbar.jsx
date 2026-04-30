export default function Topbar({ onToggleSidebar, currentUser, onLogout, time }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 flex-shrink-0 z-10">
      <button
        onClick={onToggleSidebar}
        className="text-gray-500 hover:text-gray-700 p-1 rounded text-lg"
      >
        ☰
      </button>

      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search patients, appointments, doctors, modules..."
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hidden md:block">⌘ K</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Date/Time */}
        <div className="text-right hidden lg:block">
          <p className="text-xs font-semibold text-gray-700">
            {time.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", weekday: "short" })}
          </p>
          <p className="text-xs text-gray-500">{time.toLocaleTimeString("en-IN")}</p>
        </div>

        {/* Notification */}
        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            🔔
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            12
          </span>
        </div>

        {/* Mail */}
        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            ✉️
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            5
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {currentUser?.name?.[0] || "A"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">{currentUser?.name || "Admin User"}</p>
            <p className="text-xs text-gray-500">{currentUser?.role || "Super Admin"}</p>
          </div>
          <span className="text-gray-400 text-xs hidden md:block">▼</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
}
