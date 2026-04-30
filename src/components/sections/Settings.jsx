import { useState } from "react";
import { PageWrapper, Card, SectionHeader } from "../ui/UIComponents";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0 ${checked ? "bg-teal-500" : "bg-slate-200"}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    criticalNotify: true,
    bedAlerts: true,
    pharmacyAlerts: true,
    darkMode: false,
    twoFactor: true,
    autoLogout: true,
    dataBackup: true,
    maintenanceMode: false,
  });

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const groups = [
    {
      title: "Notification Preferences",
      subtitle: "Configure alert and notification settings",
      items: [
        { key: "emailAlerts", label: "Email Alerts", desc: "Send critical alerts to admin email" },
        { key: "smsAlerts", label: "SMS Notifications", desc: "Receive SMS for urgent patient events" },
        { key: "criticalNotify", label: "Critical Patient Alerts", desc: "Immediate notification for ICU / critical patients" },
        { key: "bedAlerts", label: "Bed Capacity Warnings", desc: "Alert when ward exceeds 90% occupancy" },
        { key: "pharmacyAlerts", label: "Pharmacy Stock Alerts", desc: "Notify on low or critical inventory" },
      ],
    },
    {
      title: "Security & Access",
      subtitle: "Manage authentication and access control",
      items: [
        { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require OTP for super admin login" },
        { key: "autoLogout", label: "Auto Logout (30 min)", desc: "Automatically logout inactive sessions" },
      ],
    },
    {
      title: "System Configuration",
      subtitle: "General system and data settings",
      items: [
        { key: "dataBackup", label: "Automatic Data Backup", desc: "Daily encrypted backup to cloud" },
        { key: "darkMode", label: "Dark Mode", desc: "Switch to dark theme across the dashboard" },
        { key: "maintenanceMode", label: "Maintenance Mode", desc: "Put the system in read-only maintenance state" },
      ],
    },
  ];

  return (
    <PageWrapper>
      {/* Profile card */}
      <Card>
        <SectionHeader title="Admin Profile" subtitle="Super Administrator account" />
        <div className="p-5 flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          >
            SA
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-800 text-base">Dr. Sarah Anand</p>
            <p className="text-sm text-teal-600 font-medium">Super Administrator</p>
            <p className="text-[12px] text-slate-400 mt-1">s.anand@nexacare.in · +91 98004 44004</p>
          </div>
          <button className="px-4 py-2 text-[12px] font-semibold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
            Edit Profile
          </button>
        </div>
      </Card>

      {/* Setting groups */}
      {groups.map((group) => (
        <Card key={group.title}>
          <SectionHeader title={group.title} subtitle={group.subtitle} />
          <div className="divide-y divide-slate-50">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
                <div>
                  <p className="text-[13px] font-medium text-slate-800">{item.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Danger zone */}
      <Card>
        <SectionHeader title="Danger Zone" subtitle="Irreversible actions — proceed with caution" />
        <div className="p-5 flex flex-wrap gap-3">
          <button className="px-4 py-2 text-[12px] font-semibold text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
            Export All Data
          </button>
          <button className="px-4 py-2 text-[12px] font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            Reset Dashboard
          </button>
          <button className="px-4 py-2 text-[12px] font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            Revoke All Sessions
          </button>
        </div>
      </Card>
    </PageWrapper>
  );
}
