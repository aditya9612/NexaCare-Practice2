// ─── NAV ─────────────────────────────────────────────────────────────────────
export const NAV_SECTIONS = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", badge: null },
      { label: "Patients", badge: { text: "12", color: "bg-emerald-500" } },
      { label: "Appointments", badge: { text: "5", color: "bg-red-500" } },
      { label: "Doctors & Staff", badge: null },
    ],
  },
  {
    section: "Clinical",
    items: [
      { label: "Wards & Beds", badge: null },
      { label: "Pharmacy", badge: null },
      { label: "Lab & Diagnostics", badge: null },
    ],
  },
  {
    section: "Admin",
    items: [
      { label: "Billing", badge: null },
      { label: "Settings", badge: null },
    ],
  },
];

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
export const ADMISSIONS_DATA = [
  { day: "Mon", admitted: 42, discharged: 35 },
  { day: "Tue", admitted: 55, discharged: 48 },
  { day: "Wed", admitted: 38, discharged: 40 },
  { day: "Thu", admitted: 61, discharged: 53 },
  { day: "Fri", admitted: 47, discharged: 44 },
  { day: "Sat", admitted: 30, discharged: 28 },
  { day: "Sun", admitted: 52, discharged: 45 },
];

export const DEPT_DATA = [
  { name: "General", value: 101, color: "#00c2a8" },
  { name: "Cardiology", value: 62, color: "#3b82f6" },
  { name: "Ortho", value: 44, color: "#f59e0b" },
  { name: "Neuro", value: 44, color: "#8b5cf6" },
  { name: "Others", value: 61, color: "#e2e8f0" },
];

export const WARD_CAPACITY = [
  { name: "ICU", used: 18, total: 20, color: "bg-red-500" },
  { name: "General", used: 76, total: 100, color: "bg-blue-500" },
  { name: "Pediatric", used: 22, total: 40, color: "bg-teal-500" },
  { name: "Maternity", used: 14, total: 30, color: "bg-purple-500" },
];

export const SYSTEM_ALERTS = [
  { color: "bg-red-500", title: "ICU Bed Threshold Reached", meta: "Ward A · 2 min ago", urgent: true },
  { color: "bg-amber-400", title: "Blood Bank: O− Low Stock", meta: "Pharmacy · 14 min ago", urgent: true },
  { color: "bg-red-500", title: "Emergency: Trauma case in OT-2", meta: "Operation Theatre · 22 min ago", urgent: true },
  { color: "bg-blue-400", title: "Scheduled maintenance: Lab system", meta: "IT Dept · Tonight 11 PM", urgent: false },
  { color: "bg-green-400", title: "New staff onboarded: 3 nurses", meta: "HR Dept · 1 hr ago", urgent: false },
];

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
export const PATIENTS = [
  { id: "P-10482", name: "Arjun Mehta", age: 54, gender: "Male", dept: "Cardiology", doctor: "Dr. Sharma", status: "Critical", bed: "ICU-04", admitted: "29 Apr 2026", phone: "+91 98201 11234" },
  { id: "P-10483", name: "Priya Nair", age: 32, gender: "Female", dept: "Ortho", doctor: "Dr. Pillai", status: "Stable", bed: "W3-12", admitted: "29 Apr 2026", phone: "+91 98765 43210" },
  { id: "P-10484", name: "Rajan Iyer", age: 67, gender: "Male", dept: "Neuro", doctor: "Dr. Khanna", status: "Observation", bed: "W1-07", admitted: "28 Apr 2026", phone: "+91 91234 56789" },
  { id: "P-10485", name: "Sneha Desai", age: 28, gender: "Female", dept: "General", doctor: "Dr. Anand", status: "Recovery", bed: "W2-03", admitted: "27 Apr 2026", phone: "+91 99876 54321" },
  { id: "P-10486", name: "Vikram Rao", age: 45, gender: "Male", dept: "Cardiology", doctor: "Dr. Sharma", status: "Stable", bed: "W4-08", admitted: "26 Apr 2026", phone: "+91 98123 45678" },
  { id: "P-10487", name: "Ananya Krishnan", age: 38, gender: "Female", dept: "Neuro", doctor: "Dr. Khanna", status: "Stable", bed: "W1-09", admitted: "25 Apr 2026", phone: "+91 97654 32109" },
  { id: "P-10488", name: "Mohan Das", age: 72, gender: "Male", dept: "General", doctor: "Dr. Anand", status: "Critical", bed: "ICU-06", admitted: "24 Apr 2026", phone: "+91 96543 21098" },
  { id: "P-10489", name: "Kavya Reddy", age: 23, gender: "Female", dept: "Ortho", doctor: "Dr. Pillai", status: "Recovery", bed: "W3-05", admitted: "23 Apr 2026", phone: "+91 95432 10987" },
];

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
export const APPOINTMENTS = [
  { id: "APT-001", patient: "Rahul Verma", doctor: "Dr. Sharma", dept: "Cardiology", date: "30 Apr 2026", time: "09:00 AM", type: "Consultation", status: "Confirmed" },
  { id: "APT-002", patient: "Meera Joshi", doctor: "Dr. Pillai", dept: "Ortho", date: "30 Apr 2026", time: "10:30 AM", type: "Follow-up", status: "Confirmed" },
  { id: "APT-003", patient: "Suresh Kumar", doctor: "Dr. Khanna", dept: "Neuro", date: "30 Apr 2026", time: "11:00 AM", type: "Consultation", status: "Pending" },
  { id: "APT-004", patient: "Divya Patel", doctor: "Dr. Anand", dept: "General", date: "30 Apr 2026", time: "02:00 PM", type: "Check-up", status: "Confirmed" },
  { id: "APT-005", patient: "Arun Singh", doctor: "Dr. Sharma", dept: "Cardiology", date: "30 Apr 2026", time: "03:30 PM", type: "ECG", status: "Cancelled" },
  { id: "APT-006", patient: "Pooja Nair", doctor: "Dr. Pillai", dept: "Ortho", date: "01 May 2026", time: "09:30 AM", type: "Surgery Prep", status: "Confirmed" },
  { id: "APT-007", patient: "Kiran Rao", doctor: "Dr. Khanna", dept: "Neuro", date: "01 May 2026", time: "11:30 AM", type: "MRI Review", status: "Pending" },
];

// ─── DOCTORS ─────────────────────────────────────────────────────────────────
export const DOCTORS = [
  { id: "D-001", name: "Dr. Ramesh Sharma", speciality: "Cardiology", experience: "18 yrs", patients: 124, rating: 4.9, status: "On Duty", phone: "+91 98001 11001", email: "r.sharma@nexacare.in" },
  { id: "D-002", name: "Dr. Sunita Pillai", speciality: "Orthopaedics", experience: "14 yrs", patients: 98, rating: 4.7, status: "On Duty", phone: "+91 98002 22002", email: "s.pillai@nexacare.in" },
  { id: "D-003", name: "Dr. Anil Khanna", speciality: "Neurology", experience: "22 yrs", patients: 87, rating: 4.8, status: "On Leave", phone: "+91 98003 33003", email: "a.khanna@nexacare.in" },
  { id: "D-004", name: "Dr. Sarah Anand", speciality: "General Medicine", experience: "10 yrs", patients: 210, rating: 4.6, status: "On Duty", phone: "+91 98004 44004", email: "s.anand@nexacare.in" },
  { id: "D-005", name: "Dr. Pradeep Menon", speciality: "Pediatrics", experience: "16 yrs", patients: 175, rating: 4.9, status: "On Duty", phone: "+91 98005 55005", email: "p.menon@nexacare.in" },
  { id: "D-006", name: "Dr. Nisha Gupta", speciality: "Gynaecology", experience: "12 yrs", patients: 143, rating: 4.7, status: "On Leave", phone: "+91 98006 66006", email: "n.gupta@nexacare.in" },
];

// ─── WARDS ────────────────────────────────────────────────────────────────────
export const WARDS = [
  { id: "ICU", name: "Intensive Care Unit", total: 20, occupied: 18, available: 2, floor: "Ground", incharge: "Dr. Sharma" },
  { id: "GEN", name: "General Ward", total: 100, occupied: 76, available: 24, floor: "1st Floor", incharge: "Dr. Anand" },
  { id: "PED", name: "Pediatric Ward", total: 40, occupied: 22, available: 18, floor: "2nd Floor", incharge: "Dr. Menon" },
  { id: "MAT", name: "Maternity Ward", total: 30, occupied: 14, available: 16, floor: "2nd Floor", incharge: "Dr. Gupta" },
  { id: "ORT", name: "Orthopaedic Ward", total: 25, occupied: 19, available: 6, floor: "3rd Floor", incharge: "Dr. Pillai" },
  { id: "NEU", name: "Neurology Ward", total: 20, occupied: 11, available: 9, floor: "3rd Floor", incharge: "Dr. Khanna" },
];

// ─── PHARMACY ─────────────────────────────────────────────────────────────────
export const PHARMACY_ITEMS = [
  { id: "MED-001", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 240, reorder: 100, unit: "Strips", expiry: "Jan 2027", status: "In Stock" },
  { id: "MED-002", name: "Paracetamol 650mg", category: "Analgesic", stock: 48, reorder: 100, unit: "Strips", expiry: "Mar 2027", status: "Low Stock" },
  { id: "MED-003", name: "O− Blood Units", category: "Blood Bank", stock: 6, reorder: 20, unit: "Units", expiry: "15 May 2026", status: "Critical" },
  { id: "MED-004", name: "Insulin Glargine", category: "Hormone", stock: 120, reorder: 50, unit: "Vials", expiry: "Jun 2026", status: "In Stock" },
  { id: "MED-005", name: "Metformin 500mg", category: "Antidiabetic", stock: 380, reorder: 150, unit: "Strips", expiry: "Dec 2026", status: "In Stock" },
  { id: "MED-006", name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 22, reorder: 80, unit: "Strips", expiry: "Nov 2026", status: "Low Stock" },
  { id: "MED-007", name: "Ondansetron 4mg", category: "Antiemetic", stock: 0, reorder: 50, unit: "Vials", expiry: "Sep 2026", status: "Out of Stock" },
];

// ─── LAB ─────────────────────────────────────────────────────────────────────
export const LAB_TESTS = [
  { id: "LAB-001", patient: "Arjun Mehta", test: "Complete Blood Count", ordered: "29 Apr 09:00", status: "Completed", result: "Abnormal", doctor: "Dr. Sharma" },
  { id: "LAB-002", patient: "Priya Nair", test: "X-Ray - Right Knee", ordered: "29 Apr 10:15", status: "Completed", result: "Normal", doctor: "Dr. Pillai" },
  { id: "LAB-003", patient: "Rajan Iyer", test: "MRI Brain", ordered: "29 Apr 11:30", status: "In Progress", result: "—", doctor: "Dr. Khanna" },
  { id: "LAB-004", patient: "Sneha Desai", test: "Liver Function Test", ordered: "29 Apr 12:00", status: "Completed", result: "Normal", doctor: "Dr. Anand" },
  { id: "LAB-005", patient: "Vikram Rao", test: "ECG", ordered: "29 Apr 13:45", status: "Pending", result: "—", doctor: "Dr. Sharma" },
  { id: "LAB-006", patient: "Mohan Das", test: "ABG Analysis", ordered: "29 Apr 14:00", status: "In Progress", result: "—", doctor: "Dr. Anand" },
  { id: "LAB-007", patient: "Kavya Reddy", test: "Blood Glucose", ordered: "29 Apr 15:30", status: "Completed", result: "Normal", doctor: "Dr. Pillai" },
];

// ─── BILLING ─────────────────────────────────────────────────────────────────
export const BILLS = [
  { id: "INV-2026-001", patient: "Arjun Mehta", dept: "Cardiology", amount: 42500, paid: 42500, date: "29 Apr 2026", status: "Paid" },
  { id: "INV-2026-002", patient: "Priya Nair", dept: "Ortho", amount: 18200, paid: 0, date: "29 Apr 2026", status: "Pending" },
  { id: "INV-2026-003", patient: "Rajan Iyer", dept: "Neuro", amount: 67000, paid: 30000, date: "28 Apr 2026", status: "Partial" },
  { id: "INV-2026-004", patient: "Sneha Desai", dept: "General", amount: 8400, paid: 8400, date: "27 Apr 2026", status: "Paid" },
  { id: "INV-2026-005", patient: "Vikram Rao", dept: "Cardiology", amount: 31000, paid: 0, date: "26 Apr 2026", status: "Pending" },
  { id: "INV-2026-006", patient: "Mohan Das", dept: "General", amount: 54000, paid: 54000, date: "24 Apr 2026", status: "Paid" },
];
