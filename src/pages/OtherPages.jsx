import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { todayAppointments, doctors, emergencyCases, labTests, pharmacyStock, billingData, aiInsights, revenueForecast, users, bedOccupancy, alerts } from "../data/mockData";
import SectionHeader from "../components/SectionHeader";
import StatusBadge from "../components/StatusBadge";

// ── Appointments ──────────────────────────────────────────────────────────────
export function AppointmentsOverview() {
  return (
    <div>
      <SectionHeader title="Appointments Overview" subtitle="Today's appointment schedule and queue status" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ l: "Total Today", v: "256", icon: "📅", c: "text-blue-600" }, { l: "Completed", v: "89", icon: "✅", c: "text-green-600" }, { l: "Remaining", v: "167", icon: "⏳", c: "text-orange-500" }].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div><p className="text-sm text-gray-500">{s.l}</p><p className={`text-2xl font-bold ${s.c}`}>{s.v}</p></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Today's Schedule</h3></div>
        <div className="divide-y divide-gray-50">
          {[...todayAppointments, ...todayAppointments].slice(0, 8).map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
              <span className="text-sm font-bold text-blue-600 w-20">{a.time}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{a.patient}</p><p className="text-xs text-gray-500">{a.dept}</p></div>
              <p className="text-sm text-gray-600 hidden md:block">{a.doctor}</p>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── OPD ───────────────────────────────────────────────────────────────────────
export function OPDSummary() {
  return (
    <div>
      <SectionHeader title="OPD Summary" subtitle="Outpatient Department - Today's overview" />
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[["Total OPD Cases","342","🏥","text-blue-600"],["Waiting","87","⏳","text-yellow-600"],["In Consultation","24","👨‍⚕️","text-green-600"],["Completed","231","✅","text-gray-600"]].map(([l,v,ic,c],i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">{ic}</span><div><p className="text-xs text-gray-500">{l}</p><p className={`text-2xl font-bold ${c}`}>{v}</p></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Current OPD Queue</h3></div>
        <div className="divide-y divide-gray-50">
          {todayAppointments.concat(todayAppointments).slice(0,6).map((a,i)=>(
            <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
              <span className="text-sm font-bold text-gray-500 w-8">#{i+1}</span>
              <span className="text-sm font-bold text-blue-600 w-20">{a.time}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{a.patient}</p><p className="text-xs text-gray-500">{a.dept}</p></div>
              <p className="text-sm text-gray-600 hidden md:block">{a.doctor}</p>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── IPD ───────────────────────────────────────────────────────────────────────
export function IPDSummary() {
  return (
    <div>
      <SectionHeader title="IPD Summary" subtitle="Inpatient Department - Current admissions" />
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[["Active Admissions","48","🛏️","text-blue-600"],["New Today","12","🆕","text-green-600"],["Surgeries","18","✂️","text-purple-600"],["Discharges Today","8","🏠","text-orange-500"]].map(([l,v,ic,c],i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">{ic}</span><div><p className="text-xs text-gray-500">{l}</p><p className={`text-2xl font-bold ${c}`}>{v}</p></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Bed Occupancy by Ward</h3>
        <div className="space-y-4">
          {bedOccupancy.map((b,i)=>(
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">{b.ward}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{b.occupied}/{b.total}</span>
                  <span className="text-sm font-bold" style={{color:b.color}}>{b.pct}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{width:`${b.pct}%`,backgroundColor:b.color}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Emergency ─────────────────────────────────────────────────────────────────
export function EmergencyOverview() {
  return (
    <div>
      <SectionHeader title="Emergency Overview" subtitle="Real-time emergency department status" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">35</p><p className="text-sm text-red-500 font-medium mt-1">Active Cases</p></div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-yellow-600">8</p><p className="text-sm text-yellow-500 font-medium mt-1">Critical (Red)</p></div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">4</p><p className="text-sm text-green-500 font-medium mt-1">Stabilized Today</p></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"/>
          <h3 className="font-bold text-gray-800">Active Emergency Cases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>{["Case ID","Patient","Age","Condition","Triage","Time","Assigned Doctor"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {emergencyCases.map(e=>(
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{e.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{e.patient}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.age}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{e.condition}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${e.triage==="Red"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700"}`}>{e.triage}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.time}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Doctors ───────────────────────────────────────────────────────────────────
export function DoctorOverview() {
  return (
    <div>
      <SectionHeader title="Doctor Overview" subtitle="Active doctors and their schedules today" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {doctors.map(d=>(
          <div key={d.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">{d.name.split(" ")[1][0]}</div>
                <div><p className="font-bold text-gray-800">{d.name}</p><p className="text-xs text-gray-500">{d.qualification}</p></div>
              </div>
              <StatusBadge status={d.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-500">Department</p><p className="font-semibold text-gray-700">{d.dept}</p></div>
              <div className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-500">Patients Today</p><p className="font-bold text-blue-600">{d.patients}</p></div>
              <div className="bg-gray-50 rounded-lg p-2 col-span-2"><p className="text-xs text-gray-500">Schedule</p><p className="font-semibold text-gray-700">{d.schedule}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Nursing ───────────────────────────────────────────────────────────────────
export function NursingOverview() {
  return (
    <div>
      <SectionHeader title="Nursing Overview" subtitle="Nursing staff and ward assignments" />
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[["Active Nurses","126","💉","text-pink-600"],["On Duty Now","84","✅","text-green-600"],["Off Duty","42","🌙","text-gray-500"]].map(([l,v,ic,c],i)=>(
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"><span className="text-3xl">{ic}</span><div><p className="text-sm text-gray-500">{l}</p><p className={`text-2xl font-bold ${c}`}>{v}</p></div></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Ward Assignments</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Ward","Nurses Assigned","Patients","Shift","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {[["ICU","6","28","Morning","Active"],["General Ward","12","120","Morning","Active"],["Pediatrics","4","22","Morning","Active"],["Private Rooms","8","45","Evening","Active"],["Emergency","10","35","Night","Active"]].map(([ward,nurses,patients,shift,status],i)=>(
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{ward}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-bold">{nurses}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{patients}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{shift}</td>
                  <td className="px-4 py-3"><StatusBadge status={status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Lab ───────────────────────────────────────────────────────────────────────
export function LabOverview() {
  return (
    <div>
      <SectionHeader title="Lab Overview" subtitle="Pending and completed lab tests" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-yellow-600">127</p><p className="text-sm text-yellow-500 font-medium mt-1">Pending Tests</p></div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-blue-600">34</p><p className="text-sm text-blue-500 font-medium mt-1">Processing</p></div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">89</p><p className="text-sm text-green-500 font-medium mt-1">Completed Today</p></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Test Queue</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Test ID","Patient","Test Name","Ordered","Priority","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {labTests.map(t=>(
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{t.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{t.patient}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{t.test}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.ordered}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Radiology ─────────────────────────────────────────────────────────────────
export function RadiologyOverview() {
  return (
    <div>
      <SectionHeader title="Radiology Overview" subtitle="Imaging and scan reports" />
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[["Total Scans","56","🩻","text-blue-600"],["X-Ray","28","📷","text-purple-600"],["MRI","12","🧲","text-indigo-600"],["CT Scan","16","💿","text-teal-600"]].map(([l,v,ic,c],i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"><span className="text-2xl">{ic}</span><div><p className="text-xs text-gray-500">{l}</p><p className={`text-2xl font-bold ${c}`}>{v}</p></div></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Today's Imaging Queue</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Scan ID","Patient","Type","Ordered By","Time","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {[["R-3001","Vikram Joshi","MRI Brain","Dr. Karan Mehta","10:00 AM","Processing"],["R-3002","Suresh Kumar","X-Ray Spine","Dr. Rohit Patel","09:30 AM","Completed"],["R-3003","Rahul Sharma","ECG","Dr. Amit Verma","09:00 AM","Completed"],["R-3004","Sneha Patel","Ultrasound","Dr. Sunita Rao","11:30 AM","Pending"],["R-3005","Kavita Singh","CT Chest","Dr. Ravi Gupta","12:00 PM","Pending"]].map(([id,pat,type,doc,time,status],i)=>(
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{id}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{pat}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{doc}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{time}</td>
                  <td className="px-4 py-3"><StatusBadge status={status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Pharmacy ──────────────────────────────────────────────────────────────────
export function PharmacyOverview() {
  return (
    <div>
      <SectionHeader title="Pharmacy Overview" subtitle="Stock levels, expiry alerts, and sales summary" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-green-600">₹3.25L</p><p className="text-sm text-green-500 font-medium mt-1">Sales Today</p></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-red-600">3</p><p className="text-sm text-red-500 font-medium mt-1">Low / Out of Stock</p></div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center"><p className="text-3xl font-bold text-yellow-600">7</p><p className="text-sm text-yellow-500 font-medium mt-1">Expiring This Month</p></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800">Inventory Status</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Medicine","Category","Current Stock","Min. Required","Expiry Date","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {pharmacyStock.map((m,i)=>(
                <tr key={i} className={`hover:bg-gray-50 ${m.status==="Out"?"bg-red-50/30":m.status==="Low"?"bg-orange-50/30":""}`}>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{m.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{m.category}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{m.stock}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{m.minStock}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{m.expiry}</td>
                  <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Billing ───────────────────────────────────────────────────────────────────
export function BillingOverview() {
  return (
    <div>
      <SectionHeader title="Billing Overview" subtitle="Today's billing and payment summary" />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[["Total Billed","₹1,44,200","text-blue-600"],["Collected","₹1,10,500","text-green-600"],["Pending","₹8,700","text-yellow-600"],["Partial","₹25,000","text-orange-500"]].map(([l,v,c],i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"><p className={`text-2xl font-bold ${c}`}>{v}</p><p className="text-xs text-gray-500 font-medium mt-1">{l}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Bill ID","Patient","Department","Amount","Paid","Status","Date"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {billingData.map(b=>(
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{b.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{b.patient}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.dept}</td>
                  <td className="px-4 py-3 text-sm font-bold">₹{b.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">₹{b.paid.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Reports ───────────────────────────────────────────────────────────────────
export function Reports() {
  return (
    <div>
      <SectionHeader title="Reports" subtitle="Generate and download hospital performance reports" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["Daily Report","Monthly Summary","Doctor Performance","Revenue Analytics"].map((r,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
            <span className="text-2xl">{["📋","📆","👨‍⚕️","📈"][i]}</span>
            <p className="font-semibold text-gray-800">{r}</p>
            <button className="mt-auto flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors justify-center">
              ⬇️ Download PDF
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} tickFormatter={v=>`${(v/100000).toFixed(0)}L`}/>
              <Tooltip formatter={v=>v?`₹${(v/100000).toFixed(1)}L`:"N/A"}/>
              <Legend/>
              <Area type="monotone" dataKey="actual" stroke="#3B82F6" fill="#DBEAFE" strokeWidth={2} name="Actual"/>
              <Area type="monotone" dataKey="forecast" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} strokeDasharray="5 5" name="Forecast"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Bed Occupancy Report</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bedOccupancy} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis type="number" domain={[0,100]} tick={{fontSize:11}} tickFormatter={v=>`${v}%`}/>
              <YAxis type="category" dataKey="ward" tick={{fontSize:11}} width={90}/>
              <Tooltip formatter={v=>`${v}%`}/>
              <Bar dataKey="pct" name="Occupancy %" radius={[0,4,4,0]}>
                {bedOccupancy.map((b,i)=><Cell key={i} fill={b.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── AI Insights ───────────────────────────────────────────────────────────────
export function AIInsights() {
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <SectionHeader title="AI Insights" subtitle="Predictive analytics and intelligent alerts" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {aiInsights.map((ins,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2"><span className="text-xl">{ins.icon}</span><span className="text-xs font-semibold text-gray-500 uppercase">{ins.title}</span></div>
            <p className="text-xl font-bold" style={{color:ins.color}}>{ins.value}</p>
            <p className="text-xs text-gray-500 mt-1">{ins.desc}</p>
            <span className="text-xs font-semibold mt-2 inline-block" style={{color:ins.color}}>{ins.trend}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Revenue Forecast (Next 3 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}} tickFormatter={v=>`${(v/100000).toFixed(0)}L`}/>
              <Tooltip formatter={v=>v?`₹${(v/100000).toFixed(1)}L`:"N/A"}/>
              <Legend/>
              <Area type="monotone" dataKey="actual" stroke="#6366F1" fill="#EEF2FF" strokeWidth={2} name="Actual"/>
              <Area type="monotone" dataKey="forecast" stroke="#F59E0B" fill="#FEF3C7" strokeWidth={2} strokeDasharray="5 5" name="AI Forecast"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">OCR Document Upload (Mock)</h3>
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${uploading?"border-blue-400 bg-blue-50":"border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"}`}
            onClick={()=>{setUploading(true);setTimeout(()=>setUploading(false),2000);}}>
            <p className="text-3xl mb-2">{uploading?"⏳":"📄"}</p>
            <p className="font-semibold text-gray-700">{uploading?"Processing...":"Upload Medical Document"}</p>
            <p className="text-sm text-gray-400 mt-1">Drag & drop or click to upload PDF / Image</p>
            {uploading&&<div className="mt-3 w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width:"60%"}}/></div>}
          </div>
          <div className="mt-3 space-y-2">
            {["patient_report_001.pdf","lab_results_may21.png"].map((f,i)=>(
              <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <span>📎</span><span className="text-sm text-gray-700 flex-1">{f}</span><span className="text-xs text-green-600 font-semibold">✓ Extracted</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">Auto Alert Log</h3>
        <div className="space-y-2">
          {alerts.map(a=>(
            <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <span className="text-lg">{a.icon}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-gray-800">{a.title}</p><p className="text-xs text-gray-500">{a.desc}</p></div>
              <div className="text-right"><span className="text-xs text-gray-400">{a.time}</span><p className="text-xs text-blue-600 font-medium mt-0.5">AI Generated</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── User Management ───────────────────────────────────────────────────────────
export function UserManagement() {
  const [showForm, setShowForm] = useState(false);
  const roles = ["Doctor","Nurse","Pharmacist","Staff","Lab Technician"];
  const permissions = ["View Patients","Edit Records","Billing Access","Lab Reports","Admin Panel","User Management"];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-gray-800">User Management</h2><p className="text-sm text-gray-500 mt-0.5">Manage hospital staff, roles, and permissions</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">+ Add User</button>
      </div>
      {showForm&&(
        <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Add New User</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Full Name","Email Address","Department","Phone Number"].map(f=>(
              <div key={f}><label className="text-xs font-bold text-gray-500 mb-1 block">{f}</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={f}/></div>
            ))}
            <div><label className="text-xs font-bold text-gray-500 mb-1 block">Role</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{roles.map(r=><option key={r}>{r}</option>)}</select></div>
          </div>
          <div className="mt-4"><label className="text-xs font-bold text-gray-500 mb-2 block">Permissions</label><div className="grid grid-cols-3 gap-2">{permissions.map(p=><label key={p} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded"/><span className="text-sm text-gray-700">{p}</span></label>)}</div></div>
          <div className="flex gap-3 mt-4"><button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Save User</button><button onClick={()=>setShowForm(false)} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button></div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["User ID","Name","Role","Department","Email","Status","Last Login"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u=>(
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{u.id}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div><span className="text-sm font-semibold text-gray-800">{u.name}</span></div></td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">{u.role}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.dept}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status}/></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────
export function Settings() {
  return (
    <div>
      <SectionHeader title="Settings" subtitle="System configuration and preferences" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[
          { title: "General Settings", icon: "⚙️", fields: ["Hospital Name","Address","Phone","Email","Timezone"] },
          { title: "Notification Settings", icon: "🔔", fields: ["Email Alerts","SMS Alerts","Push Notifications","Alert Frequency","Emergency Contacts"] },
          { title: "Security Settings", icon: "🔒", fields: ["Password Policy","Session Timeout","Two-Factor Auth","IP Whitelist","Audit Logs"] },
          { title: "Integration Settings", icon: "🔗", fields: ["HL7 FHIR API","Payment Gateway","Lab System API","Pharmacy System","SMS Provider"] },
        ].map((section,i)=>(
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4"><span className="text-xl">{section.icon}</span><h3 className="font-bold text-gray-800">{section.title}</h3></div>
            <div className="space-y-3">
              {section.fields.map(f=>(
                <div key={f} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700 font-medium">{f}</span>
                  <button className="text-xs text-blue-600 font-semibold hover:underline">Configure</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
