import { useState } from "react";
import { LAB_TESTS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { FlaskIcon } from "../ui/Icons";

export default function LabDiagnostics() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Completed", "In Progress", "Pending"];

  const filtered = LAB_TESTS.filter((t) => {
    const matchSearch =
      t.patient.toLowerCase().includes(search.toLowerCase()) ||
      t.test.toLowerCase().includes(search.toLowerCase()) ||
      t.doctor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const completed   = LAB_TESTS.filter((t) => t.status === "Completed").length;
  const inProgress  = LAB_TESTS.filter((t) => t.status === "In Progress").length;
  const pending     = LAB_TESTS.filter((t) => t.status === "Pending").length;
  const abnormal    = LAB_TESTS.filter((t) => t.result === "Abnormal").length;

  return (
    <PageWrapper>
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<FlaskIcon />} label="Total Tests" value={LAB_TESTS.length}
          delta={{ value: "Today's orders", label: "" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<FlaskIcon />} label="Completed" value={completed}
          delta={{ value: "Results ready", label: "" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<FlaskIcon />} label="In Progress" value={inProgress}
          delta={{ value: "Processing", label: "now" }} deltaType="up"
          iconBg="bg-blue-50 text-blue-500" ringColor="#3b82f6" />
        <StatCard icon={<FlaskIcon />} label="Abnormal Results" value={abnormal}
          delta={{ value: "Review", label: "required" }} deltaType="down"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
      </div>

      <Card>
        <SectionHeader title="Lab Tests & Diagnostics" subtitle={`${filtered.length} records today`} />
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search tests or patients…" />
          <div className="flex gap-1.5">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-[11px] px-3 py-1 rounded-full font-medium transition-all ${filter === s ? "bg-teal-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-slate-50">
                {["ID", "Patient", "Test Name", "Ordered", "Doctor", "Status", "Result"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">No tests found.</td></tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-teal-50/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{t.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{t.patient}</td>
                    <td className="px-4 py-3 text-slate-700">{t.test}</td>
                    <td className="px-4 py-3 text-slate-400 text-[11px]">{t.ordered}</td>
                    <td className="px-4 py-3 text-slate-600">{t.doctor}</td>
                    <td className="px-4 py-3"><StatusPill status={t.status} /></td>
                    <td className="px-4 py-3">
                      {t.result === "—"
                        ? <span className="text-slate-300 text-[12px]">—</span>
                        : <StatusPill status={t.result} />
                      }
                    </td>
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
