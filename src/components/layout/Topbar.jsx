import { useState, useEffect } from "react";
import { SearchIcon, BellIcon, TrendIcon } from "../ui/Icons";

export default function Topbar({ activeSection }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = time.toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="bg-white border-b border-slate-100 px-6 h-14 flex items-center gap-4 flex-shrink-0">
      <div>
        <h1 className="text-base font-bold text-slate-800">{activeSection}</h1>
        <p className="text-[11px] text-slate-400">{dateStr}</p>
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <span className="text-[11px] text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
          {timeStr} · Q2 · Wk 18
        </span>
        {[SearchIcon, BellIcon, TrendIcon].map((Icon, i) => (
          <button
            key={i}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors relative"
          >
            <Icon />
            {i === 1 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
