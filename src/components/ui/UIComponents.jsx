import { ChevronUpIcon, ChevronDownIcon } from "./Icons";

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export function StatCard({ icon, label, value, delta, deltaType, iconBg, ringColor }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.06] -translate-y-4 translate-x-4 pointer-events-none"
        style={{ background: ringColor }}
      />
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
        {icon}
      </div>
      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-800 leading-none mb-2">{value}</p>
      <div className={`flex items-center gap-1 text-[11px] font-semibold ${deltaType === "up" ? "text-emerald-600" : "text-red-500"}`}>
        {deltaType === "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
        {delta.value} <span className="text-slate-400 font-normal">{delta.label}</span>
      </div>
    </div>
  );
}

// ─── STATUS PILL ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Critical:      "bg-red-100 text-red-700",
  Stable:        "bg-emerald-100 text-emerald-700",
  Observation:   "bg-amber-100 text-amber-700",
  Recovery:      "bg-purple-100 text-purple-700",
  Confirmed:     "bg-emerald-100 text-emerald-700",
  Pending:       "bg-amber-100 text-amber-700",
  Cancelled:     "bg-red-100 text-red-700",
  "On Duty":     "bg-emerald-100 text-emerald-700",
  "On Leave":    "bg-slate-100 text-slate-500",
  "In Stock":    "bg-emerald-100 text-emerald-700",
  "Low Stock":   "bg-amber-100 text-amber-700",
  "Out of Stock":"bg-red-100 text-red-700",
  Completed:     "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Paid:          "bg-emerald-100 text-emerald-700",
  Partial:       "bg-amber-100 text-amber-700",
  Normal:        "bg-emerald-100 text-emerald-700",
  Abnormal:      "bg-red-100 text-red-700",
};

export function StatusPill({ status }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[status] || "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-[13px] font-semibold text-slate-800">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction} className="text-[11px] text-teal-500 font-medium hover:underline">
          {action}
        </button>
      )}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-slate-200 mb-3">{icon}</div>
      <p className="font-semibold text-slate-500 mb-1">{title}</p>
      <p className="text-[12px] text-slate-400">{desc}</p>
    </div>
  );
}

// ─── PAGE WRAPPER ─────────────────────────────────────────────────────────────
export function PageWrapper({ children }) {
  return (
    <div
      className="p-5 space-y-4 animate-fadein"
      style={{ animation: "fadeIn 0.25s ease both" }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
      {children}
    </div>
  );
}

// ─── SEARCH BAR ──────────────────────────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="relative">
      <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 pr-3 py-1.5 text-[12px] border border-slate-200 rounded-lg bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-400 w-52 transition-colors"
      />
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, color = "bg-teal-500", showLabel = true }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-slate-500">{value}/{max}</span>
          <span className="font-medium text-slate-700">{pct}%</span>
        </div>
      )}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
