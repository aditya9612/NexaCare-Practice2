import { useState } from "react";
import { PATIENTS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { UsersIcon, HeartIcon, UserIcon } from "../ui/Icons";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Stable", "Critical", "Observation", "Recovery"];

  const filtered = PATIENTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.dept.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    total: PATIENTS.length,
    critical: PATIENTS.filter((p) => p.status === "Critical").length,
    stable: PATIENTS.filter((p) => p.status === "Stable").length,
    recovery: PATIENTS.filter((p) => p.status === "Recovery").length,
  };

  return (
    <PageWrapper>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<UsersIcon />} label="Total Patients" value={counts.total}
          delta={{ value: "+8.3%", label: "vs last month" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<HeartIcon />} label="Critical" value={counts.critical}
          delta={{ value: "Needs attention", label: "" }} deltaType="down"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
        <StatCard icon={<UserIcon />} label="Stable" value={counts.stable}
          delta={{ value: "Good status", label: "" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<UsersIcon />} label="In Recovery" value={counts.recovery}
          delta={{ value: "Progressing", label: "well" }} deltaType="up"
          iconBg="bg-purple-50 text-purple-500" ringColor="#8b5cf6" />
      </div>

      {/* Table */}
      <Card>
        <SectionHeader title="All Patients" subtitle={`${filtered.length} records`} />
        {/* Filters */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patients…" />
          <div className="flex gap-1.5">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[11px] px-3 py-1 rounded-full font-medium transition-all ${
                  filter === s
                    ? "bg-teal-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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
                {["Patient", "Age", "Department", "Doctor", "Admitted", "Bed", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400 text-sm">No patients found.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-teal-50/40 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      <p className="text-[10px] text-slate-400">ID #{p.id}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.age} / {p.gender}</td>
                    <td className="px-4 py-3 text-slate-600">{p.dept}</td>
                    <td className="px-4 py-3 text-slate-600">{p.doctor}</td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">{p.admitted}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{p.bed}</span>
                    </td>
                    <td className="px-4 py-3"><StatusPill status={p.status} /></td>
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
