import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardHome from "./pages/DashboardHome";
import ModulesOverview from "./pages/ModulesOverview";
import PatientsOverview from "./pages/PatientsOverview";
import {
  AppointmentsOverview, OPDSummary, IPDSummary, EmergencyOverview,
  DoctorOverview, NursingOverview, LabOverview, RadiologyOverview,
  PharmacyOverview, BillingOverview, Reports, AIInsights,
  UserManagement, Settings
} from "./pages/OtherPages";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function renderScreen(active) {
  switch (active) {
    case "dashboard":    return <DashboardHome />;
    case "modules":      return <ModulesOverview />;
    case "patients":     return <PatientsOverview />;
    case "appointments": return <AppointmentsOverview />;
    case "opd":          return <OPDSummary />;
    case "ipd":          return <IPDSummary />;
    case "emergency":    return <EmergencyOverview />;
    case "doctors":      return <DoctorOverview />;
    case "nursing":      return <NursingOverview />;
    case "lab":          return <LabOverview />;
    case "radiology":    return <RadiologyOverview />;
    case "pharmacy":     return <PharmacyOverview />;
    case "billing":      return <BillingOverview />;
    case "reports":      return <Reports />;
    case "ai":           return <AIInsights />;
    case "users":        return <UserManagement />;
    case "settings":     return <Settings />;
    default:             return <DashboardHome />;
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive]           = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [time, setTime]               = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Login gate ── */
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  /* ── Main shell ── */
  return (
    <div
      className="flex h-screen bg-gray-50 overflow-hidden"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <Sidebar
        active={active}
        setActive={setActive}
        open={sidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentUser={currentUser}
          time={time}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
            setActive("dashboard");
          }}
        />

        <main className="flex-1 overflow-y-auto p-5">
          {renderScreen(active)}
        </main>
      </div>
    </div>
  );
}
