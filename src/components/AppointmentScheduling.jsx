import React, { useState } from 'react';
import { MOCK_APPOINTMENTS } from '../constants.js';
import { Icons } from './Icons.jsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const AppointmentScheduling = () => {
  const [appointments] = useState(MOCK_APPOINTMENTS);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Appointment Queue</h2>
          <p className="text-slate-500 text-sm mt-1">Live tracking of all clinical schedules and surgical consultations.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">List View</button>
            <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700">Calendar</button>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <Icons.Plus size={18} />
            Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white p-5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-slate-50/50 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center shadow-md shadow-blue-200">
                  <span className="text-[10px] font-black leading-none uppercase opacity-80">{appt.date.split('-')[1]}</span>
                  <span className="text-lg font-black leading-none">{appt.date.split('-')[2]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">{appt.patientName}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Assigned: {appt.doctorName}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 group/icon">
                  <Icons.Calendar size={14} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{appt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Activity size={14} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{appt.type}</span>
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border",
                  appt.status === 'Scheduled' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  appt.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                  "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                  {appt.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 text-[11px] font-extrabold text-blue-600 hover:bg-blue-50 rounded-lg transition-all uppercase tracking-tighter">Reschedule</button>
                <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 shadow-md shadow-slate-200 transition-all">
                  <Icons.ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
              <h3 className="font-bold text-slate-800 text-sm">On-Call Staff</h3>
              <p className="text-[10px] font-black text-blue-600 tracking-widest cursor-pointer hover:text-blue-700 uppercase">Directory</p>
            </div>
            <div className="space-y-4">
              <DoctorStatus name="Dr. Sarah Wilson" department="Cardiology" status="Available" />
              <DoctorStatus name="Dr. Robert Miller" department="Neurology" status="Surgery" dotColor="bg-amber-500" />
              <DoctorStatus name="Dr. Emily Grey" department="Pediatrics" status="Lunch" dotColor="bg-slate-300" />
              <DoctorStatus name="Dr. James Wood" department="Dermatology" status="Available" />
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl text-white relative overflow-hidden group shadow-lg shadow-blue-300">
            <Icons.Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2 relative z-10 opacity-70">Capacity Alert</p>
            <h4 className="text-xl font-bold mb-4 relative z-10 leading-tight">OPD Ward is exceeding 85% utilization.</h4>
            <button className="relative z-10 w-full py-2.5 bg-white text-blue-600 rounded-lg text-xs font-black uppercase tracking-wider transition-all hover:bg-blue-50 active:scale-95 shadow-sm">
              Manage Allocation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorStatus = ({ name, department, status, dotColor = "bg-emerald-500" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
        {name.split(' ').pop()?.[0]}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900">{name}</p>
        <p className="text-[10px] text-slate-500">{department}</p>
      </div>
    </div>
    <div className="flex items-center gap-1.5">
      <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      <span className="text-[10px] font-bold text-slate-400">{status}</span>
    </div>
  </div>
)