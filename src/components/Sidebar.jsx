
import React from 'react';
import { Icons } from './Icons.jsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { id: 'appointments', label: 'Appointments', icon: Icons.Calendar },
  { id: 'patients', label: 'Patients', icon: Icons.FileText },
  { id: 'users', label: 'Management', icon: Icons.Users },
  { id: 'reports', label: 'Reports', icon: Icons.Activity },
];

export const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-400 h-screen flex flex-col sticky top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Icons.Activity size={24} />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight uppercase">Nexacare</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon 
                size={20} 
                className={isActive ? "text-white" : "text-slate-500 group-hover:text-white"} 
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="p-4 bg-slate-800/50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <span className="text-[10px] font-bold text-blue-400">JC</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">James Carter</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider font-bold">Super Admin</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors">
            <Icons.LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};