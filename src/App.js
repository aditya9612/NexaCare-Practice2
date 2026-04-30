import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { DashboardOverview } from './components/DashboardOverview.jsx';
import { UserManagement } from './components/UserManagement.jsx';
import { AppointmentScheduling } from './components/AppointmentScheduling.jsx';
import { PatientRecords } from './components/PatientRecords.jsx';
import { Icons } from './components/Icons.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'appointments':
        return <AppointmentScheduling />;
      case 'patients':
        return <PatientRecords />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white border border-slate-100 rounded-xl shadow-sm animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Icons.Activity size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Advanced Analytics</h2>
            <p className="text-slate-500 max-sm mx-auto mb-8 text-sm leading-relaxed">
              Our clinical intelligence engine is compiling the quarterly data. 
              The comprehensive PDF report will be ready for download shortly.
            </p>
            <button className="bg-blue-600 text-white px-10 py-3 rounded-lg text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              Request Interim Dossier
            </button>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="p-8 max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </div>

        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="max-w-[1600px] mx-auto p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
            <p>© 2026 Nexacare Healthcare Systems. All clinical data encrypted.</p>
            <div className="flex gap-6 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">System Status</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support Portal</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
