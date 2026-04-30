import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants.js';
import { Icons } from './Icons.jsx';

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const PatientRecords = () => {
  const [patients] = useState(MOCK_PATIENTS);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Patient Records</h2>
          <p className="text-slate-500 text-sm mt-1">Access medical history and detailed personal records of registered patients.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            <Icons.Filter size={18} />
            Export Data
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <Icons.Plus size={18} />
            New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 font-black text-lg border border-slate-100 uppercase tracking-tighter">
                  {patient.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{patient.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">NEXA-ID: {patient.id}</p>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600">
                <Icons.MoreVertical size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Demographics</p>
                <p className="text-xs font-bold text-slate-700">{patient.age} / {patient.gender}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Blood Group</p>
                <p className="text-xs font-bold text-rose-600">{patient.bloodGroup}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6 p-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Primary Condition:</span>
                <span className="font-bold text-slate-700">{patient.condition}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400 font-medium">Last Physical:</span>
                <span className="font-bold text-slate-700">{formatDate(patient.lastVisit)}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all active:scale-95">
              <Icons.FileText size={15} />
              Clinical Dossier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
