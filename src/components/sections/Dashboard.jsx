import { StatCard, Card, SectionHeader, PageWrapper, ProgressBar } from "../ui/UIComponents";
import { UsersIcon, CalendarIcon, UserIcon, HeartIcon } from "../ui/Icons";
import { ADMISSIONS_DATA, DEPT_DATA, WARD_CAPACITY, SYSTEM_ALERTS } from "../../data/constants";
import { StatusPill } from "../ui/UIComponents";

const RECENT_PATIENTS = [
  { name: "Arjun Mehta", id: "P-10482", dept: "Cardiology", doctor: "Dr. Sharma", status: "Critical", bed: "ICU-04" },
  { name: "Priya Nair", id: "P-10483", dept: "Ortho", doctor: "Dr. Pillai", status: "Stable", bed: "W3-12" },
  { name: "Rajan Iyer", id: "P-10484", dept: "Neuro", doctor: "Dr. Khanna", status: "Observation", bed: "W1-07" },
  { name: "Sneha Desai", id: "P-10485", dept: "General", doctor: "Dr. Anand", status: "Recovery", bed: "W2-03" },
  { name: "Vikram Rao", id: "P-10486", dept: "Cardiology", doctor: "Dr. Sharma", status: "Stable", bed: "W4-08" },
];

function BarChart() {
  const max = Math.max(...ADMISSIONS_DATA.map((d) => Math.max(d.admitted, d.discharged)));
  return (
    <div className="p-4">
      <div className="flex items-end gap-2 h-28 mb-2">
        {ADMISSIONS_DATA.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-0.5 flex-1 w-full">
              <div
                className="flex-1 rounded-t-md bg-teal-400 hover:opacity-75 transition-opacity cursor-pointer"
                style={{ height: `${Math.round((d.admitted / max) * 100)}%` }}
                title={`${d.admitted} admitted`}
              />
              <div
                className="flex-1 rounded-t-md bg-blue-400 hover:opacity-75 transition-opacity cursor-pointer"
                style={{ height: `${Math.round((d.discharged / max) * 100)}%` }}
                title={`${d.discharged} discharged`}
              />
            </div>
            <span className="text-[10px] text-slate-400">{d.day}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-teal-400 inline-block" /> Admitted</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-400 inline-block" /> Discharged</span>
      </div>
    </div>
  );
}

function DonutChart() {
  const total = DEPT_DATA.reduce((s, d) => s + d.value, 0);
  const circumference = 2 * Math.PI * 40;
  let cumulative = 0;
  return (
    <div className="p-4 flex items-center gap-5">
      <svg width="110" height="110" viewBox="0 0 110 110" className="flex-shrink-0">
        <circle cx="55" cy="55" r="40" fill="none" stroke="#e2e8f0" strokeWidth="16" />
        {DEPT_DATA.map((d) => {
          const dashArray = (d.value / total) * circumference;
          const dashOffset = -cumulative;
          cumulative += dashArray;
          return (
            <circle
              key={d.name}
              cx="55" cy="55" r="40"
              fill="none"
              stroke={d.color}
              strokeWidth="16"
              strokeDasharray={`${dashArray} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          );
        })}
        <text x="55" y="51" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1a2b4a" fontFamily="sans-serif">{total}</text>
        <text x="55" y="63" textAnchor="middle" fontSize="9" fill="#94a3b8">patients</text>
      </svg>
      <div className="flex flex-col gap-2.5">
        {DEPT_DATA.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-xs text-slate-700">{d.name}</span>
            <span className="text-xs text-slate-400 font-medium ml-auto pl-4">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <PageWrapper>
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<UsersIcon />} label="Total Patients" value="4,821"
          delta={{ value: "+8.3%", label: "vs last month" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<CalendarIcon />} label="Appointments Today" value="127"
          delta={{ value: "+12%", label: "vs yesterday" }} deltaType="up"
          iconBg="bg-blue-50 text-blue-500" ringColor="#3b82f6" />
        <StatCard icon={<UserIcon />} label="Active Doctors" value="86"
          delta={{ value: "−2", label: "on leave today" }} deltaType="down"
          iconBg="bg-amber-50 text-amber-500" ringColor="#f59e0b" />
        <StatCard icon={<HeartIcon />} label="Bed Occupancy" value="78%"
          delta={{ value: "+4%", label: "this week" }} deltaType="up"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3.5">
        <Card>
          <SectionHeader title="Patient Admissions" subtitle="Last 7 days" action="View all →" />
          <BarChart />
        </Card>
        <Card>
          <SectionHeader title="Dept. Distribution" subtitle="Current inpatients" action="Details →" />
          <DonutChart />
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        {/* Table */}
        <Card>
          <SectionHeader title="Recent Patients" subtitle="Today's admissions" action="View all →" />
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-slate-50">
                  {["Patient", "Dept.", "Doctor", "Status", "Bed"].map((h) => (
                    <th key={h} className="text-left px-4 py-2 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_PATIENTS.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-slate-800">{p.name}</p>
                      <p className="text-[10px] text-slate-400">ID #{p.id}</p>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">{p.dept}</td>
                    <td className="px-4 py-2.5 text-slate-600">{p.doctor}</td>
                    <td className="px-4 py-2.5"><StatusPill status={p.status} /></td>
                    <td className="px-4 py-2.5 text-slate-600 font-medium">{p.bed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right col */}
        <div className="flex flex-col gap-3.5">
          {/* Alerts */}
          <Card className="flex-1">
            <SectionHeader title="System Alerts" subtitle="Real-time notifications"
              action={<span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">3 urgent</span>}
            />
            <div>
              {SYSTEM_ALERTS.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors last:border-b-0">
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${a.color}`} />
                  <div>
                    <p className="text-[12px] font-medium text-slate-800">{a.title}</p>
                    <p className="text-[10px] text-slate-400">{a.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Ward capacity */}
          <Card>
            <SectionHeader title="Ward Capacity" />
            <div className="px-4 py-3 flex flex-col gap-3">
              {WARD_CAPACITY.map((w) => (
                <div key={w.name}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="font-medium text-slate-700">{w.name}</span>
                    <span className="text-slate-400">{w.used}/{w.total}</span>
                  </div>
                  <ProgressBar value={w.used} max={w.total} color={w.color} showLabel={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
