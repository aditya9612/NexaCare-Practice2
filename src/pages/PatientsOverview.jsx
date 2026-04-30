import { useState } from "react";
import { patients } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import StatusBadge from "../components/StatusBadge";

export default function PatientsOverview() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Admitted", "OPD", "Critical", "Discharged"];

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.dept.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <SectionHeader title="Patients Overview" subtitle="All registered patients and their current status" />

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Total Patients", value: "12,458", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Admitted", value: "342", color: "text-green-600", bg: "bg-green-50" },
          { label: "Critical", value: "18", color: "text-red-600", bg: "bg-red-50" },
          { label: "Discharged Today", value: "25", color: "text-gray-600", bg: "bg-gray-50" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4 text-center border border-gray-100`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
              placeholder="Search patients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${activeFilter === f ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Patient ID", "Name", "Age/Gender", "Department", "Doctor", "Blood", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600 font-semibold">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {p.name[0]}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.age} / {p.gender}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.dept}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.doctor}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-bold">{p.blood}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing {filtered.length} of {patients.length} patients</p>
          <div className="flex gap-1">
            {[1, 2, 3, "..."].map((n, i) => (
              <button key={i} className={`w-8 h-8 rounded text-sm font-medium ${n === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
