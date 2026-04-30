# 🏥 MediCare HMS — Hospital Management System Admin Dashboard

A professional, fully functional **Hospital Management System Admin Dashboard** built with React.js, Tailwind CSS, and Recharts. All data is mock JSON — no backend required.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI Framework |
| Tailwind CSS | Styling |
| Recharts | Charts & Graphs |
| Mock JSON | Data (no backend needed) |

---

## 📁 Project Structure

```
hms-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   └── mockData.js          # All mock data
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Topbar.jsx           # Top header bar
│   │   ├── StatusBadge.jsx      # Reusable status badge
│   │   └── SectionHeader.jsx    # Reusable section header
│   ├── pages/
│   │   ├── LoginPage.jsx        # Admin login screen
│   │   ├── DashboardHome.jsx    # Main dashboard overview
│   │   ├── ModulesOverview.jsx  # All modules overview
│   │   ├── PatientsOverview.jsx # Patient management
│   │   └── OtherPages.jsx       # All other module pages
│   ├── App.jsx                  # Root app + routing
│   ├── index.js                 # React entry point
│   └── index.css                # Tailwind directives
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🖥️ Screens & Features

### 🔐 Login Page
- Split layout: Hero panel + Login form
- Email, Password (show/hide), Role selector
- Remember Me, Forgot Password
- Biometric login button (mock)
- Loading animation on submit
- Demo: Enter any email + password + role to login

### 📊 Dashboard Home
- 8 KPI Cards (Patients, Appointments, OPD, IPD, Beds, Revenue, Lab, Pharmacy)
- Patient Flow Line Chart (OPD vs IPD)
- Revenue Bar Chart (Weekly)
- Department Activity Pie Chart
- Alerts & Notifications panel
- Today's Appointments list
- Bed Occupancy progress bars
- Quick Action buttons

### 🗂️ Modules Overview *(matches screenshot)*
- 6 top-level KPI stats (Total Modules, Active, Transactions, Revenue, Alerts, System Status)
- 22 module cards in a searchable/filterable grid
- System Alerts sidebar
- Today's Quick Stats
- Top Performing Modules with progress bars
- Quick Actions grid

### 👥 Patients Overview
- Searchable + filterable patient table
- Status filters: All / Admitted / OPD / Critical / Discharged
- Blood group badges, status badges

### 📅 Appointments Overview
- Today's schedule with queue status

### 🏥 OPD Summary
### 🛏️ IPD Summary
### 🚨 Emergency Overview — Triage color-coded cases
### 👨‍⚕️ Doctor Overview — Cards with availability status
### 💉 Nursing Overview — Ward assignments table
### 🧪 Lab Overview — Test queue with priority
### 🩻 Radiology Overview — Imaging queue
### 💊 Pharmacy Overview — Stock levels + expiry alerts
### 💳 Billing Overview — Payment tracking
### 📊 Reports — Downloadable report cards + charts
### 🤖 AI Insights — Forecasts, OCR mock upload, alert log
### ⚙️ User Management — Add user form + permissions
### 🔧 Settings — Configuration panels

---

## 🎨 Design

- **Color Scheme:** White + Blue (#3B82F6) + Green (#10B981)
- **Dark Sidebar:** #0F1B2D
- **Font:** DM Sans (Google Fonts)
- **Layout:** Collapsible sidebar + sticky topbar
- **Responsive:** Mobile + Desktop

---

## 📝 Demo Credentials

Enter **any** email address, **any** password, and **select a role** to log in.

Example:
- Email: `admin@medicare.in`
- Password: `admin123`
- Role: `Super Admin`

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `/build` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 🏥 About

Built as a **Frontend-only** monitoring & control panel for hospital administration. All data is simulated with realistic mock JSON. No backend, no database required.
