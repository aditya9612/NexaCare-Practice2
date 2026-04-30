// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const patientFlowData = [
  { day: "15 May", OPD: 480, IPD: 210 },
  { day: "16 May", OPD: 520, IPD: 230 },
  { day: "17 May", OPD: 800, IPD: 310 },
  { day: "18 May", OPD: 750, IPD: 280 },
  { day: "19 May", OPD: 690, IPD: 260 },
  { day: "20 May", OPD: 620, IPD: 240 },
  { day: "21 May", OPD: 670, IPD: 290 },
];

export const revenueData = [
  { day: "15 May", revenue: 820000 },
  { day: "16 May", revenue: 1050000 },
  { day: "17 May", revenue: 1400000 },
  { day: "18 May", revenue: 1200000 },
  { day: "19 May", revenue: 980000 },
  { day: "20 May", revenue: 1350000 },
  { day: "21 May", revenue: 1600000 },
];

export const deptActivity = [
  { name: "OPD", value: 35, color: "#3B82F6" },
  { name: "IPD", value: 20, color: "#10B981" },
  { name: "Lab", value: 15, color: "#8B5CF6" },
  { name: "Pharmacy", value: 10, color: "#F59E0B" },
  { name: "Radiology", value: 10, color: "#EF4444" },
  { name: "Others", value: 10, color: "#6B7280" },
];

export const alerts = [
  { id: 1, icon: "⚠️", title: "Low Stock Alert: Paracetamol (500mg)", desc: "Only 50 strips left in Main Pharmacy", time: "10 min ago", color: "red" },
  { id: 2, icon: "🚨", title: "Emergency Alert", desc: "High patient inflow in Emergency Department", time: "25 min ago", color: "orange" },
  { id: 3, icon: "🧪", title: "Pending Lab Reports", desc: "127 reports are pending", time: "30 min ago", color: "yellow" },
  { id: 4, icon: "🛏️", title: "Bed Occupancy Alert", desc: "ICU Occupancy is more than 90%", time: "45 min ago", color: "orange" },
  { id: 5, icon: "🔧", title: "Equipment Maintenance Due", desc: "MRI Machine maintenance due tomorrow", time: "1 hr ago", color: "blue" },
];

export const todayAppointments = [
  { time: "09:00 AM", patient: "Rahul Sharma", dept: "OPD - Cardiology", doctor: "Dr. Amit Verma", status: "Completed" },
  { time: "09:30 AM", patient: "Priya Mehta", dept: "OPD - General", doctor: "Dr. Neha Singh", status: "In Progress" },
  { time: "10:00 AM", patient: "Suresh Kumar", dept: "OPD - Orthopedics", doctor: "Dr. Rohit Patel", status: "In Progress" },
  { time: "10:30 AM", patient: "Anjali Desai", dept: "OPD - Dermatology", doctor: "Dr. Pooja Shah", status: "Pending" },
  { time: "11:00 AM", patient: "Vikram Joshi", dept: "OPD - Neurology", doctor: "Dr. Karan Mehta", status: "Pending" },
];

export const bedOccupancy = [
  { ward: "ICU", occupied: 28, total: 30, pct: 93, color: "#EF4444" },
  { ward: "Private Rooms", occupied: 45, total: 60, pct: 75, color: "#F59E0B" },
  { ward: "General Ward", occupied: 120, total: 180, pct: 67, color: "#3B82F6" },
  { ward: "Pediatrics", occupied: 22, total: 40, pct: 55, color: "#10B981" },
];

export const patients = [
  { id: "P-10021", name: "Rahul Sharma", age: 45, gender: "M", dept: "Cardiology", doctor: "Dr. Amit Verma", status: "Admitted", blood: "B+" },
  { id: "P-10022", name: "Priya Mehta", age: 32, gender: "F", dept: "General", doctor: "Dr. Neha Singh", status: "OPD", blood: "O+" },
  { id: "P-10023", name: "Suresh Kumar", age: 58, gender: "M", dept: "Orthopedics", doctor: "Dr. Rohit Patel", status: "Admitted", blood: "A+" },
  { id: "P-10024", name: "Anjali Desai", age: 27, gender: "F", dept: "Dermatology", doctor: "Dr. Pooja Shah", status: "OPD", blood: "AB-" },
  { id: "P-10025", name: "Vikram Joshi", age: 63, gender: "M", dept: "Neurology", doctor: "Dr. Karan Mehta", status: "Critical", blood: "O-" },
  { id: "P-10026", name: "Sneha Patel", age: 34, gender: "F", dept: "Gynecology", doctor: "Dr. Sunita Rao", status: "Admitted", blood: "B-" },
  { id: "P-10027", name: "Manish Tiwari", age: 41, gender: "M", dept: "Cardiology", doctor: "Dr. Amit Verma", status: "Discharged", blood: "A-" },
  { id: "P-10028", name: "Kavita Singh", age: 55, gender: "F", dept: "Oncology", doctor: "Dr. Ravi Gupta", status: "Admitted", blood: "AB+" },
];

export const doctors = [
  { id: "D-001", name: "Dr. Amit Verma", dept: "Cardiology", qualification: "MD, DM", patients: 18, schedule: "09:00–17:00", status: "Available" },
  { id: "D-002", name: "Dr. Neha Singh", dept: "General Medicine", qualification: "MBBS, MD", patients: 24, schedule: "08:00–16:00", status: "Busy" },
  { id: "D-003", name: "Dr. Rohit Patel", dept: "Orthopedics", qualification: "MS Ortho", patients: 12, schedule: "10:00–18:00", status: "Available" },
  { id: "D-004", name: "Dr. Pooja Shah", dept: "Dermatology", qualification: "MD Derm", patients: 9, schedule: "09:00–13:00", status: "Off Duty" },
  { id: "D-005", name: "Dr. Karan Mehta", dept: "Neurology", qualification: "DM Neuro", patients: 7, schedule: "11:00–19:00", status: "Available" },
  { id: "D-006", name: "Dr. Sunita Rao", dept: "Gynecology", qualification: "MS, DNB", patients: 14, schedule: "09:00–15:00", status: "Busy" },
];

export const labTests = [
  { id: "L-5001", patient: "Rahul Sharma", test: "Complete Blood Count", ordered: "08:30 AM", status: "Processing", priority: "Urgent" },
  { id: "L-5002", patient: "Priya Mehta", test: "Lipid Profile", ordered: "09:00 AM", status: "Pending", priority: "Normal" },
  { id: "L-5003", patient: "Suresh Kumar", test: "X-Ray Spine", ordered: "09:15 AM", status: "Completed", priority: "Normal" },
  { id: "L-5004", patient: "Vikram Joshi", test: "MRI Brain", ordered: "10:00 AM", status: "Processing", priority: "Urgent" },
  { id: "L-5005", patient: "Anjali Desai", test: "Skin Biopsy", ordered: "10:30 AM", status: "Pending", priority: "Normal" },
  { id: "L-5006", patient: "Kavita Singh", test: "Tumor Markers", ordered: "11:00 AM", status: "Completed", priority: "Urgent" },
];

export const pharmacyStock = [
  { name: "Paracetamol 500mg", category: "Analgesic", stock: 50, minStock: 200, expiry: "2025-12-31", status: "Low" },
  { name: "Amoxicillin 250mg", category: "Antibiotic", stock: 320, minStock: 150, expiry: "2026-03-15", status: "OK" },
  { name: "Metformin 500mg", category: "Antidiabetic", stock: 180, minStock: 100, expiry: "2025-11-20", status: "OK" },
  { name: "Atorvastatin 10mg", category: "Cardiac", stock: 45, minStock: 100, expiry: "2025-09-30", status: "Low" },
  { name: "Omeprazole 20mg", category: "Antacid", stock: 260, minStock: 150, expiry: "2026-06-01", status: "OK" },
  { name: "Ibuprofen 400mg", category: "Analgesic", stock: 0, minStock: 200, expiry: "2025-10-15", status: "Out" },
];

export const billingData = [
  { id: "B-9001", patient: "Rahul Sharma", dept: "Cardiology", amount: 12500, paid: 12500, status: "Paid", date: "21 May" },
  { id: "B-9002", patient: "Priya Mehta", dept: "General", amount: 3200, paid: 0, status: "Pending", date: "21 May" },
  { id: "B-9003", patient: "Suresh Kumar", dept: "Orthopedics", amount: 45000, paid: 20000, status: "Partial", date: "20 May" },
  { id: "B-9004", patient: "Vikram Joshi", dept: "Neurology", amount: 78000, paid: 78000, status: "Paid", date: "20 May" },
  { id: "B-9005", patient: "Anjali Desai", dept: "Dermatology", amount: 5500, paid: 0, status: "Pending", date: "21 May" },
];

export const aiInsights = [
  { title: "Readmission Risk", value: "23 patients", trend: "+5%", desc: "High risk of readmission in next 30 days", color: "#EF4444", icon: "🔴" },
  { title: "Bed Shortage Forecast", value: "ICU full by 3 PM", trend: "Alert", desc: "Based on current admission rate", color: "#F59E0B", icon: "🟡" },
  { title: "Revenue Forecast", value: "₹ 9.2L today", trend: "+12%", desc: "Projected end-of-day revenue", color: "#10B981", icon: "🟢" },
  { title: "Stock Depletion", value: "4 medicines", trend: "Critical", desc: "Will run out within 48 hours", color: "#8B5CF6", icon: "🟣" },
];

export const revenueForecast = [
  { month: "Jan", actual: 7200000, forecast: 7400000 },
  { month: "Feb", actual: 8100000, forecast: 7900000 },
  { month: "Mar", actual: 7600000, forecast: 8000000 },
  { month: "Apr", actual: 8900000, forecast: 8600000 },
  { month: "May", actual: 8450000, forecast: 9200000 },
  { month: "Jun", actual: null, forecast: 9500000 },
  { month: "Jul", actual: null, forecast: 10100000 },
];

export const users = [
  { id: "U-001", name: "Dr. Amit Verma", role: "Doctor", dept: "Cardiology", email: "amit.verma@medicare.in", status: "Active", lastLogin: "Today 09:14" },
  { id: "U-002", name: "Nurse Rekha Nair", role: "Nurse", dept: "ICU", email: "rekha.nair@medicare.in", status: "Active", lastLogin: "Today 07:30" },
  { id: "U-003", name: "Mohan Sharma", role: "Pharmacist", dept: "Pharmacy", email: "mohan.s@medicare.in", status: "Active", lastLogin: "Today 08:55" },
  { id: "U-004", name: "Anita Roy", role: "Staff", dept: "Billing", email: "anita.roy@medicare.in", status: "Inactive", lastLogin: "2 days ago" },
  { id: "U-005", name: "Dr. Neha Singh", role: "Doctor", dept: "General", email: "neha.singh@medicare.in", status: "Active", lastLogin: "Today 08:10" },
];

export const emergencyCases = [
  { id: "E-301", patient: "Unknown Male", age: "~50", condition: "Cardiac Arrest", triage: "Red", time: "10:12 AM", doctor: "Dr. Amit Verma" },
  { id: "E-302", patient: "Sita Devi", age: 34, condition: "Severe Burns", triage: "Red", time: "09:47 AM", doctor: "Dr. Priya Kapoor" },
  { id: "E-303", patient: "Arun Mishra", age: 22, condition: "Road Accident", triage: "Yellow", time: "09:20 AM", doctor: "Dr. Rohit Patel" },
  { id: "E-304", patient: "Geeta Rani", age: 67, condition: "Stroke Symptoms", triage: "Red", time: "08:55 AM", doctor: "Dr. Karan Mehta" },
  { id: "E-305", patient: "Rahul Das", age: 15, condition: "High Fever Seizure", triage: "Yellow", time: "08:30 AM", doctor: "Dr. Sunita Rao" },
];

export const allModules = [
  { icon: "👥", color: "bg-blue-100", iconColor: "text-blue-600", name: "Patient Module", value: "12,458", label: "Total Patients", trend: "+128 Today", pct: null },
  { icon: "📅", color: "bg-green-100", iconColor: "text-green-600", name: "Appointment Module", value: "256", label: "Today's Appointments", trend: "+12 Today", pct: null },
  { icon: "🩺", color: "bg-purple-100", iconColor: "text-purple-600", name: "OPD Module", value: "342", label: "OPD Cases Today", trend: "+15.3%", pct: null },
  { icon: "🛏️", color: "bg-orange-100", iconColor: "text-orange-600", name: "IPD Module", value: "48", label: "Active Admissions", trend: "+8.4%", pct: null },
  { icon: "🚨", color: "bg-red-100", iconColor: "text-red-600", name: "Emergency Module", value: "35", label: "Emergency Cases", trend: "+5 Today", pct: null },
  { icon: "👨‍⚕️", color: "bg-teal-100", iconColor: "text-teal-600", name: "Doctor Module", value: "78", label: "Active Doctors", trend: null, pct: null },
  { icon: "💉", color: "bg-pink-100", iconColor: "text-pink-600", name: "Nursing Module", value: "126", label: "Active Nursing Staff", trend: null, pct: null },
  { icon: "✂️", color: "bg-indigo-100", iconColor: "text-indigo-600", name: "OT / Surgery Module", value: "18", label: "Surgeries Today", trend: "+2 Today", pct: null },
  { icon: "💊", color: "bg-emerald-100", iconColor: "text-emerald-600", name: "Pharmacy Module", value: "₹3,25,470", label: "Sales Today", trend: "+14.8%", pct: null },
  { icon: "🧪", color: "bg-violet-100", iconColor: "text-violet-600", name: "Lab Module", value: "127", label: "Tests Today", trend: "+9.2%", pct: null },
  { icon: "🩻", color: "bg-amber-100", iconColor: "text-amber-600", name: "Radiology Module", value: "56", label: "Scans Today", trend: "+7.1%", pct: null },
  { icon: "🧾", color: "bg-cyan-100", iconColor: "text-cyan-600", name: "Billing Module", value: "₹8,45,230", label: "Billing Today", trend: "+20.4%", pct: null },
  { icon: "🛡️", color: "bg-rose-100", iconColor: "text-rose-600", name: "Insurance / TPA", value: "23", label: "Claims Today", trend: "+4 Today", pct: null },
  { icon: "📦", color: "bg-yellow-100", iconColor: "text-yellow-600", name: "Inventory Module", value: "1,245", label: "Items in Stock", trend: null, pct: null },
  { icon: "👔", color: "bg-slate-100", iconColor: "text-slate-600", name: "HR & Payroll", value: "156", label: "Total Employees", trend: null, pct: null },
  { icon: "₹", color: "bg-lime-100", iconColor: "text-lime-700", name: "Finance Module", value: "₹18,75,230", label: "Total Income", trend: null, pct: null },
  { icon: "📊", color: "bg-sky-100", iconColor: "text-sky-600", name: "Reports Module", value: "56", label: "Reports Generated", trend: "+6 Today", pct: null },
  { icon: "🤖", color: "bg-fuchsia-100", iconColor: "text-fuchsia-600", name: "AI Module", value: "12", label: "AI Insights Today", trend: "+3 Today", pct: null },
  { icon: "📣", color: "bg-orange-100", iconColor: "text-orange-600", name: "Social Media Module", value: "8", label: "Active Campaigns", trend: "+7 Today", pct: null },
  { icon: "💬", color: "bg-teal-100", iconColor: "text-teal-600", name: "Chat Support Module", value: "34", label: "Active Chats", trend: null, pct: null },
  { icon: "⚙️", color: "bg-gray-100", iconColor: "text-gray-600", name: "Settings Module", value: "24", label: "Configurations", trend: null, pct: null },
  { icon: "📱", color: "bg-blue-100", iconColor: "text-blue-600", name: "Mobile App Module", value: "1,245", label: "App Users", trend: null, pct: null },
];

export const sidebarItems = [
  { id: "dashboard", label: "Dashboard Home", icon: "🏠" },
  { id: "modules", label: "Modules Overview", icon: "🗂️" },
  { id: "patients", label: "Patients Overview", icon: "👥" },
  { id: "appointments", label: "Appointments Overview", icon: "📅" },
  { id: "opd", label: "OPD Summary", icon: "🏥" },
  { id: "ipd", label: "IPD Summary", icon: "🛏️" },
  { id: "emergency", label: "Emergency Overview", icon: "🚨" },
  { id: "doctors", label: "Doctor Overview", icon: "👨‍⚕️" },
  { id: "nursing", label: "Nursing Overview", icon: "💉" },
  { id: "lab", label: "Lab Overview", icon: "🧪" },
  { id: "radiology", label: "Radiology Overview", icon: "🩻" },
  { id: "pharmacy", label: "Pharmacy Overview", icon: "💊" },
  { id: "billing", label: "Billing Overview", icon: "💳" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "ai", label: "AI Insights", icon: "🤖" },
  { id: "users", label: "User Management", icon: "⚙️" },
  { id: "settings", label: "Settings", icon: "🔧" },
];
