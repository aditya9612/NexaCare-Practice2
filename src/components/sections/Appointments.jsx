import { useState } from "react";
import { APPOINTMENTS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { CalendarIcon, UsersIcon, UserIcon } from "../ui/Icons";

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Confirmed", "Pending", "Cancelled"];

  const filtered = APPOINTMENTS.filter((a) => {
    const matchSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.dept.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    total: APPOINTMENTS.length,
    confirmed: APPOINTMENTS.filter((a) => a.status === "Confirmed").length,
    pending: APPOINTMENTS.filter((a) => a.status === "Pending").length,
    cancelled: APPOINTMENTS.filter((a) => a.status === "Cancelled").length,
  };

  return (
    <PageWrapper>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<CalendarIcon />} label="Total Appointments" value={counts.total}
          delta={{ value: "+12%", label: "vs yesterday" }} deltaType="up"
          iconBg="bg-blue-50 text-blue-500" ringColor="#3b82f6" />
        <StatCard icon={<CalendarIcon />} label="Confirmed" value={counts.confirmed}
          delta={{ value: "Scheduled", label: "for today" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<UsersIcon />} label="Pending" value={counts.pending}
          delta={{ value: "Awaiting", label: "confirmation" }} deltaType="down"
          iconBg="bg-amber-50 text-amber-500" ringColor="#f59e0b" />
        <StatCard icon={<UserIcon />} label="Cancelled" value={counts.cancelled}
          delta={{ value: "Rescheduling", label: "needed" }} deltaType="down"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
      </div>

      {/* Table */}
      <Card>
        <SectionHeader title="All Appointments" subtitle={`${filtered.length} appointments`} />
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search appointments…" />
          <div className="flex gap-1.5">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[11px] px-3 py-1 rounded-full font-medium transition-all ${
                  filter === s ? "bg-teal-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-slate-50">
                {["ID", "Patient", "Doctor", "Department", "Date", "Time", "Type", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400">No appointments found.</td></tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-teal-50/40 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{a.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{a.patient}</td>
                    <td className="px-4 py-3 text-slate-600">{a.doctor}</td>
                    <td className="px-4 py-3 text-slate-600">{a.dept}</td>
                    <td className="px-4 py-3 text-slate-500">{a.date}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{a.time}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{a.type}</span>
                    </td>
                    <td className="px-4 py-3"><StatusPill status={a.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}
