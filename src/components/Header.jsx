import React from 'react';
import { Icons } from './Icons';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-[1600px] h-full mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-800">Operational Dashboard</h2>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-black uppercase tracking-wider">System Status: Healthy</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative group hidden md:block">
            <input 
              type="text" 
              placeholder="Search records..." 
              className="w-64 pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />
            <Icons.Search size={16} className="text-slate-400 absolute left-3.5 top-2.5 group-focus-within:text-blue-500" />
          </div>
          <button className="relative p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <Icons.Bell size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none">Admin Sarah Jones</p>
              <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-tighter">Super Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 font-bold text-sm">
              SJ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

