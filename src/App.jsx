import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./components/sections/Dashboard";
import Patients from "./components/sections/Patients";
import Appointments from "./components/sections/Appointments";
import DoctorsStaff from "./components/sections/DoctorsStaff";
import WardsBeds from "./components/sections/WardsBeds";
import Pharmacy from "./components/sections/Pharmacy";
import LabDiagnostics from "./components/sections/LabDiagnostics";
import Billing from "./components/sections/Billing";
import Settings from "./components/sections/Settings";

const SECTION_MAP = {
  "Dashboard":        Dashboard,
  "Patients":         Patients,
  "Appointments":     Appointments,
  "Doctors & Staff":  DoctorsStaff,
  "Wards & Beds":     WardsBeds,
  "Pharmacy":         Pharmacy,
  "Lab & Diagnostics":LabDiagnostics,
  "Billing":          Billing,
  "Settings":         Settings,
};

export default function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const ActiveComponent = SECTION_MAP[activeSection] || Dashboard;

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      <Sidebar active={activeSection} onNavigate={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar activeSection={activeSection} />
        <main
          key={activeSection}
          className="flex-1 overflow-y-auto"
          style={{ animation: "sectionIn 0.22s ease both" }}
        >
          <style>{`
            @keyframes sectionIn {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
