import React, { useState } from 'react';
import { MOCK_USERS } from '../constants.js';
import { Icons } from './Icons.jsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const UserManagement = () => {
  const [users] = useState(MOCK_USERS);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage hospital staff, doctors, and system administrators.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Icons.Plus size={18} />
          Add New Member
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-[11px] font-bold bg-blue-600 text-white rounded-lg shadow-sm">All Members</button>
            <button className="px-4 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">Doctors</button>
            <button className="px-4 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">Admins</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
              <Icons.Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Clinical Member</th>
                <th className="px-6 py-4">Department / Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full",
                      user.role === 'Admin' ? "bg-indigo-50 text-indigo-600" :
                      user.role === 'Doctor' ? "bg-amber-50 text-amber-600" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        user.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                      )} />
                      <span className="text-xs font-semibold text-slate-600 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500">{user.lastActive}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                      <Icons.MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};