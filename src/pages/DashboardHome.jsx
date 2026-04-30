import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { patientFlowData, revenueData, deptActivity, alerts, todayAppointments, bedOccupancy } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import StatusBadge from "../components/StatusBadge";

function KPICard({ title, value, icon, trend, sub, trendUp, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`text-2xl font-bold ${color || "text-gray-900"}`}>{value}</div>
      {sub && (
        <div className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-500"}`}>
          {trend} {sub}
        </div>
      )}
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening in your hospital today."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        <KPICard title="Total Patients" value="12,458" icon="👥" trend="+18.2%" sub="from yesterday" trendUp color="text-blue-600" />
        <KPICard title="Today Appointments" value="256" icon="📅" trend="+12.5%" sub="from yesterday" trendUp color="text-green-600" />
        <KPICard title="OPD Cases Today" value="342" icon="🏥" trend="+15.3%" sub="from yesterday" trendUp color="text-purple-600" />
        <KPICard title="IPD Admissions" value="48" icon="🛏️" trend="+8.4%" sub="from yesterday" trendUp color="text-orange-500" />
        <KPICard title="Bed Occupancy" value="78.5%" icon="🏨" trend="+2.6%" sub="from yesterday" trendUp color="text-teal-600" />
        <KPICard title="Revenue Today" value="₹8.45L" icon="💰" trend="+20.4%" sub="from yesterday" trendUp color="text-green-700" />
        <KPICard title="Pending Lab" value="127" icon="🧪" trend="+5.6%" sub="from yesterday" color="text-yellow-600" />
        <KPICard title="Pharmacy Sales" value="₹3.25L" icon="💊" trend="+14.8%" sub="from yesterday" trendUp color="text-indigo-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Patient Flow</h3>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={patientFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="OPD" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="IPD" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Revenue Overview</h3>
            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={v => `₹${(v / 100000).toFixed(1)}L`} />
              <Bar dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Dept. Wise Activity</h3>
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={deptActivity} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                  {deptActivity.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={v => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5">
              {deptActivity.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alerts */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <SectionHeader title="Alerts & Notifications" action="View All" />
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <span className="text-lg mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-500 truncate">{a.desc}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <SectionHeader title="Today's Appointments" action="View All" />
          <div className="space-y-3">
            {todayAppointments.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 w-16">{a.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{a.patient}</p>
                  <p className="text-xs text-gray-500 truncate">{a.doctor}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Bed Occupancy + Quick Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <SectionHeader title="Bed Occupancy" action="View All" />
          <div className="space-y-4">
            {bedOccupancy.map((b, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{b.ward}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{b.occupied}/{b.total}</span>
                    <span className="text-sm font-bold" style={{ color: b.color }}>{b.pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-2">Quick Actions</p>
            <div className="grid grid-cols-4 gap-1">
              {[["➕","Add Patient"],["📅","Book Appt."],["📊","Gen Report"],["🔔","Send Alert"]].map(([icon, label], i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs text-gray-600 text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
