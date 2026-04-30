import { NAV_SECTIONS } from "../../data/constants";
import {
  GridIcon, UsersIcon, CalendarIcon, UserIcon,
  HomeIcon, PillIcon, FlaskIcon, DollarIcon, SettingsIcon, LayersIcon
} from "../ui/Icons";

const ICON_MAP = {
  "Dashboard":      GridIcon,
  "Patients":       UsersIcon,
  "Appointments":   CalendarIcon,
  "Doctors & Staff":UserIcon,
  "Wards & Beds":   HomeIcon,
  "Pharmacy":       PillIcon,
  "Lab & Diagnostics": FlaskIcon,
  "Billing":        DollarIcon,
  "Settings":       SettingsIcon,
};

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col overflow-y-auto"
      style={{ background: "#0a1628" }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #00c2a8, #0099ff)" }}
          >
            <LayersIcon />
          </div>
          <div>
            <p className="text-white font-bold text-sm tracking-wide leading-none">NexaCare</p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3">
        {NAV_SECTIONS.map((section) => (
          <div key={section.section} className="mb-1">
            <p className="text-white/25 text-[9px] uppercase tracking-widest px-2 mb-1.5 mt-3">
              {section.section}
            </p>
            {section.items.map((item) => {
              const Icon = ICON_MAP[item.label] || GridIcon;
              const isActive = active === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.label)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] mb-0.5 transition-all duration-150 relative text-left
                    ${isActive
                      ? "text-white font-medium"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    }`}
                  style={isActive ? { background: "rgba(255,255,255,0.08)" } : {}}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r bg-teal-400 transition-all" />
                  )}
                  <Icon />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-semibold text-white px-1.5 py-0.5 rounded-full ${item.badge.color}`}>
                      {item.badge.text}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            SA
          </div>
          <div>
            <p className="text-white text-[11px] font-medium leading-tight">Dr. Sarah Anand</p>
            <p className="text-white/30 text-[9px]">Super Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
