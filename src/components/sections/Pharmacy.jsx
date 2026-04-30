import { useState } from "react";
import { PHARMACY_ITEMS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { PillIcon } from "../ui/Icons";

export default function Pharmacy() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "In Stock", "Low Stock", "Critical", "Out of Stock"];

  const filtered = PHARMACY_ITEMS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || m.status === filter;
    return matchSearch && matchFilter;
  });

  const inStock    = PHARMACY_ITEMS.filter((m) => m.status === "In Stock").length;
  const lowStock   = PHARMACY_ITEMS.filter((m) => m.status === "Low Stock").length;
  const critical   = PHARMACY_ITEMS.filter((m) => m.status === "Critical").length;
  const outOfStock = PHARMACY_ITEMS.filter((m) => m.status === "Out of Stock").length;

  return (
    <PageWrapper>
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<PillIcon />} label="Total Items" value={PHARMACY_ITEMS.length}
          delta={{ value: "Tracked items", label: "" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<PillIcon />} label="In Stock" value={inStock}
          delta={{ value: "Fully", label: "available" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<PillIcon />} label="Low / Critical" value={lowStock + critical}
          delta={{ value: "Reorder", label: "required" }} deltaType="down"
          iconBg="bg-amber-50 text-amber-500" ringColor="#f59e0b" />
        <StatCard icon={<PillIcon />} label="Out of Stock" value={outOfStock}
          delta={{ value: "Immediate", label: "action needed" }} deltaType="down"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
      </div>

      <Card>
        <SectionHeader title="Inventory" subtitle={`${filtered.length} items`} />
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search medicines…" />
          <div className="flex gap-1.5 flex-wrap">
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
                {["ID", "Medicine", "Category", "Stock", "Reorder At", "Unit", "Expiry", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400">No items found.</td></tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="border-b border-slate-50 hover:bg-teal-50/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{m.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{m.name}</td>
                    <td className="px-4 py-3 text-slate-500">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">{m.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${m.stock === 0 ? "text-red-500" : m.stock < m.reorder ? "text-amber-500" : "text-slate-800"}`}>
                        {m.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{m.reorder}</td>
                    <td className="px-4 py-3 text-slate-500">{m.unit}</td>
                    <td className="px-4 py-3 text-slate-500">{m.expiry}</td>
                    <td className="px-4 py-3"><StatusPill status={m.status} /></td>
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
