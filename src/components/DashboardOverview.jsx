import React from 'react';
import { Icons } from './Icons.jsx';
import { MOCK_STATS, REVENUE_DATA } from '../constants.js';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const DashboardOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Operational updates and clinical statistics for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value={MOCK_STATS.totalPatients.toLocaleString()} 
          gain={MOCK_STATS.patientGain} 
          icon={<Icons.Users size={24} className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Daily Appointments" 
          value={MOCK_STATS.appointmentsToday.toString()} 
          gain={5.4} 
          icon={<Icons.Calendar size={24} className="text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Active Doctors" 
          value={MOCK_STATS.activeDoctors.toString()} 
          gain={0} 
          icon={<Icons.Activity size={24} className="text-amber-600" />}
          bgColor="bg-amber-50"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={formatCurrency(MOCK_STATS.revenue)} 
          gain={MOCK_STATS.revenueGain} 
          icon={<Icons.Dashboard size={24} className="text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Revenue Growth</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg font-medium text-slate-600 focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100 p-8">
            <div className="w-full h-full flex items-end justify-between gap-2 max-w-2xl">
              {REVENUE_DATA.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                  <div className="relative w-full flex justify-center items-end h-full">
                    <div 
                      className="w-full max-w-[40px] bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-500 group-hover:scale-x-110" 
                      style={{ height: `${(d.value / 70000) * 100}%` }} 
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                        {formatCurrency(d.value)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Patient Density</h3>
          <div className="space-y-6">
            <DensityBar label="Cardiology" value={78} color="bg-blue-500" />
            <DensityBar label="Neurology" value={45} color="bg-indigo-500" />
            <DensityBar label="Pediatrics" value={92} color="bg-emerald-500" />
            <DensityBar label="Orthopedics" value={64} color="bg-amber-500" />
            <DensityBar label="General" value={51} color="bg-rose-500" />
          </div>
          
          <div className="mt-10 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-xs text-slate-500 leading-relaxed">
            "Peak operational capacity typically occurs between 10 AM and 2 PM. Consider reallocating staff during these windows."
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, gain, icon, bgColor }) => (
  <div 
    className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm transition-all hover:border-blue-200 hover:-translate-y-1"
  >
    <div className="flex flex-col gap-1 mb-3">
      <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
        {gain !== 0 && (
          <span className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
            gain > 0 ? "text-emerald-500" : "text-rose-500"
          )}>
            {gain > 0 ? '▲' : '▼'} {Math.abs(gain)}%
          </span>
        )}
      </div>
    </div>
  </div>
);

const DensityBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-medium">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={cn("h-full rounded-full transition-all duration-1000", color)}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

