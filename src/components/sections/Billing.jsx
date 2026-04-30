import { useState } from "react";
import { BILLS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { DollarIcon } from "../ui/Icons";

export default function Billing() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Paid", "Partial", "Pending"];

  const filtered = BILLS.filter((b) => {
    const matchSearch =
      b.patient.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.dept.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue   = BILLS.reduce((s, b) => s + b.paid, 0);
  const totalPending   = BILLS.reduce((s, b) => s + (b.amount - b.paid), 0);
  const paidCount      = BILLS.filter((b) => b.status === "Paid").length;
  const pendingCount   = BILLS.filter((b) => b.status === "Pending").length;

  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <PageWrapper>
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<DollarIcon />} label="Total Revenue" value={fmt(totalRevenue)}
          delta={{ value: "+15%", label: "this month" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<DollarIcon />} label="Outstanding" value={fmt(totalPending)}
          delta={{ value: "To be", label: "collected" }} deltaType="down"
          iconBg="bg-amber-50 text-amber-500" ringColor="#f59e0b" />
        <StatCard icon={<DollarIcon />} label="Paid Invoices" value={paidCount}
          delta={{ value: "Fully", label: "settled" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<DollarIcon />} label="Pending Invoices" value={pendingCount}
          delta={{ value: "Follow-up", label: "required" }} deltaType="down"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
      </div>

      <Card>
        <SectionHeader title="Invoices" subtitle={`${filtered.length} records`} />
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search invoices…" />
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
                {["Invoice ID", "Patient", "Department", "Total", "Paid", "Balance", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400">No invoices found.</td></tr>
              ) : (
                filtered.map((b) => {
                  const balance = b.amount - b.paid;
                  return (
                    <tr key={b.id} className="border-b border-slate-50 hover:bg-teal-50/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{b.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{b.patient}</td>
                      <td className="px-4 py-3 text-slate-500">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">{b.dept}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{fmt(b.amount)}</td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">{fmt(b.paid)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${balance > 0 ? "text-red-500" : "text-slate-400"}`}>
                          {balance > 0 ? fmt(balance) : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">{b.date}</td>
                      <td className="px-4 py-3"><StatusPill status={b.status} /></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}
