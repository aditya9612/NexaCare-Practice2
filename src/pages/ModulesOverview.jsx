import { useState } from "react";
import { allModules, alerts } from "../data/mockData";

const topPerforming = [
  { name: "Pharmacy", value: "₹3,25,470", pct: 26, color: "bg-green-500" },
  { name: "Lab", value: "₹2,45,230", pct: 20, color: "bg-blue-500" },
  { name: "Billing", value: "₹8,45,230", pct: 68, color: "bg-indigo-500" },
];

const quickStats = [
  { icon: "👥", label: "Total Patients", value: "12,458", color: "text-blue-600" },
  { icon: "🆕", label: "New Patients", value: "128", color: "text-green-600" },
  { icon: "🏠", label: "Discharged Today", value: "25", color: "text-orange-500" },
  { icon: "💔", label: "Deaths", value: "2", color: "text-red-500" },
  { icon: "💰", label: "Total Revenue", value: "₹12,45,230", color: "text-green-700" },
];

export default function ModulesOverview() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Modules");

  const filtered = allModules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Modules Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Real-time overview of all hospital modules and their activities.</p>
      </div>

      {/* Top KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: "Total Modules", value: "24", sub: "Active Modules", icon: "🗂️", color: "text-blue-600" },
          { label: "Active Today", value: "23", sub: "+95.8% vs yesterday", icon: "✅", color: "text-green-600" },
          { label: "Total Transactions", value: "8,247", sub: "Today", icon: "🔄", color: "text-purple-600" },
          { label: "Total Revenue", value: "₹ 12,45,230", sub: "Today", icon: "💰", color: "text-orange-500" },
          { label: "Alerts", value: "18", sub: "Requires Attention", icon: "🔔", color: "text-red-500" },
          { label: "System Status", value: "Healthy", sub: "All systems operational", icon: "🟢", color: "text-green-600" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">{k.icon}</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium truncate">{k.label}</p>
              <p className={`text-base font-bold truncate ${k.color}`}>{k.value}</p>
              <p className="text-xs text-gray-400 truncate">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Left: All Modules Grid */}
        <div className="xl:col-span-3 space-y-4">
          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-800 text-lg">All Modules</h3>
            <div className="flex-1" />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                placeholder="Search module..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>All Modules</option>
                <option>Clinical</option>
                <option>Finance</option>
                <option>Admin</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</span>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtered.map((mod, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${mod.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    <span className={mod.iconColor}>{mod.icon}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-700 leading-tight">{mod.name}</p>
                </div>
                <p className="text-xl font-black text-gray-900">{mod.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{mod.label}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                  {mod.trend ? (
                    <span className="text-xs font-semibold text-green-600">{mod.trend}</span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                  <button className="text-xs text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          {/* System Alerts */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800">System Alerts</h4>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-base mt-0.5">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{a.title.split(":")[0]}</p>
                    <p className="text-xs text-gray-500 truncate">{a.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">{a.time}</p>
                    <span className={`inline-block w-2 h-2 rounded-full mt-1 ${i === 0 || i === 2 ? "bg-red-500" : "bg-orange-400"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Quick Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">Today's Quick Stats</h4>
            <div className="space-y-2.5">
              {quickStats.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{s.icon}</span>
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                  <span className={`text-xs font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800">Top Performing Modules</h4>
              <span className="text-xs text-gray-400">Today ▼</span>
            </div>
            <div className="space-y-3">
              {topPerforming.map((t, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">{t.name}</span>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-800">{t.value}</span>
                      <span className="text-xs text-gray-400 ml-1">{t.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              {[["➕","Add Patient"],["📅","Book Appt."],["📊","Gen Report"],["🔔","Send Notif."]].map(([icon, label], i) => (
                <button key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
