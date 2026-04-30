import { WARDS } from "../../data/constants";
import { PageWrapper, Card, SectionHeader, StatCard, ProgressBar } from "../ui/UIComponents";
import { HomeIcon, BedIcon } from "../ui/Icons";

const WARD_COLORS = {
  ICU:  { bar: "bg-red-500",    badge: "bg-red-50 text-red-600",     ring: "#ef4444" },
  GEN:  { bar: "bg-blue-500",   badge: "bg-blue-50 text-blue-600",   ring: "#3b82f6" },
  PED:  { bar: "bg-teal-500",   badge: "bg-teal-50 text-teal-600",   ring: "#00c2a8" },
  MAT:  { bar: "bg-purple-500", badge: "bg-purple-50 text-purple-600",ring: "#8b5cf6" },
  ORT:  { bar: "bg-amber-500",  badge: "bg-amber-50 text-amber-600", ring: "#f59e0b" },
  NEU:  { bar: "bg-indigo-500", badge: "bg-indigo-50 text-indigo-600",ring: "#6366f1" },
};

export default function WardsBeds() {
  const totalBeds = WARDS.reduce((s, w) => s + w.total, 0);
  const totalOccupied = WARDS.reduce((s, w) => s + w.occupied, 0);
  const totalAvailable = WARDS.reduce((s, w) => s + w.available, 0);

  return (
    <PageWrapper>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard icon={<BedIcon />} label="Total Beds" value={totalBeds}
          delta={{ value: "Across all wards", label: "" }} deltaType="up"
          iconBg="bg-teal-50 text-teal-500" ringColor="#00c2a8" />
        <StatCard icon={<BedIcon />} label="Occupied" value={totalOccupied}
          delta={{ value: `${Math.round((totalOccupied / totalBeds) * 100)}%`, label: "occupancy" }} deltaType="up"
          iconBg="bg-red-50 text-red-500" ringColor="#ef4444" />
        <StatCard icon={<BedIcon />} label="Available" value={totalAvailable}
          delta={{ value: "Ready for", label: "admission" }} deltaType="up"
          iconBg="bg-emerald-50 text-emerald-500" ringColor="#10b981" />
        <StatCard icon={<HomeIcon />} label="Active Wards" value={WARDS.length}
          delta={{ value: "Fully", label: "operational" }} deltaType="up"
          iconBg="bg-blue-50 text-blue-500" ringColor="#3b82f6" />
      </div>

      {/* Ward cards */}
      <div className="grid grid-cols-3 gap-3.5">
        {WARDS.map((w) => {
          const style = WARD_COLORS[w.id] || WARD_COLORS.GEN;
          const pct = Math.round((w.occupied / w.total) * 100);
          return (
            <Card key={w.id} className="hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 cursor-pointer">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-800 text-[13px]">{w.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{w.floor} · Incharge: {w.incharge}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${style.badge}`}>{w.id}</span>
                </div>

                <div className="flex justify-between text-[12px] mb-2">
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-lg">{w.total}</p>
                    <p className="text-[10px] text-slate-400">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-lg">{w.occupied}</p>
                    <p className="text-[10px] text-slate-400">Occupied</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-bold text-lg ${w.available <= 3 ? "text-red-500" : "text-emerald-500"}`}>{w.available}</p>
                    <p className="text-[10px] text-slate-400">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-slate-800 text-lg">{pct}%</p>
                    <p className="text-[10px] text-slate-400">Full</p>
                  </div>
                </div>

                <ProgressBar value={w.occupied} max={w.total} color={style.bar} showLabel={false} />

                {w.available <= 3 && (
                  <p className="mt-2 text-[10px] text-red-500 font-medium">⚠ Low availability — {w.available} beds left</p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
