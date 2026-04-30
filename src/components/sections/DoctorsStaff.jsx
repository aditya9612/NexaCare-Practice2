import { useState } from "react";
import { DOCTORS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatusPill, SearchBar, StatCard } from "../ui/UIComponents";
import { UserIcon, StarIcon, PhoneIcon, MailIcon } from "../ui/Icons";

export default function DoctorsStaff() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "On Duty", "On Leave"];

  const filtered = DOCTORS.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const onDuty = DOCTORS.filter((d) => d.status === "On Duty").length;
  const onLeave = DOCTORS.filter((d) => d.status === "On Leave").length;
  const totalPatients = DOCTORS.reduce((s, d) => s + d.patients, 0);

  return (
    <PageWrapper>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<UserIcon />} label="Total Doctors" value={DOCTORS.length}
          delta={{ value: "All specialities", label: "" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<UserIcon />} label="On Duty" value={onDuty}
          delta={{ value: "Active now", label: "" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<UserIcon />} label="On Leave" value={onLeave}
          delta={{ value: "Unavailable", label: "today" }} deltaType="down"
          iconBg="bg-amber-50 text-amber-500" ringColor="#f59e0b" />
        <StatCard icon={<UserIcon />} label="Patients Under Care" value={totalPatients}
          delta={{ value: "Across all", label: "departments" }} deltaType="up"
          iconBg="bg-blue-50 text-blue-500" ringColor="#3b82f6" />
      </div>

      {/* Search + filter */}
      <Card>
        <SectionHeader title="Doctors & Staff" subtitle={`${filtered.length} members`} />
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or speciality…" />
          <div className="flex gap-1.5">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-[11px] px-3 py-1 rounded-full font-medium transition-all ${filter === s ? "bg-teal-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="p-4 grid grid-cols-3 gap-3">
          {filtered.length === 0 ? (
            <div className="col-span-3 py-10 text-center text-slate-400">No staff found.</div>
          ) : (
            filtered.map((d) => (
              <div key={d.id} className="border border-slate-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
                  >
                    {d.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <StatusPill status={d.status} />
                </div>
                <p className="font-semibold text-slate-800 text-[13px] mb-0.5">{d.name}</p>
                <p className="text-[11px] text-teal-600 font-medium mb-2">{d.speciality}</p>
                <div className="flex items-center gap-1 mb-3">
                  <StarIcon className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-700">{d.rating}</span>
                  <span className="text-[10px] text-slate-400 ml-1">· {d.experience} exp.</span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <PhoneIcon />
                    <span>{d.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MailIcon />
                    <span className="truncate">{d.email}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px]">
                  <span className="text-slate-400">Patients</span>
                  <span className="font-semibold text-slate-700">{d.patients}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </PageWrapper>
  );
}
