import { useState } from "react";

const features = [
  { icon: "📊", title: "Real-time Monitoring", desc: "Live tracking of all departments" },
  { icon: "🤖", title: "AI Powered Insights", desc: "Smart analytics for better decisions" },
  { icon: "🏥", title: "Multi-Department Control", desc: "Unified system for all hospital modules" },
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password || !role) {
      setError("Please fill in all fields to continue.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: "Admin User", role });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* ── Left Hero Panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 40%, #E0F2FE 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-60 h-60 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #10B981, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, #6366F1, transparent)" }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <span className="text-2xl">🏥</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">MediCare</p>
            <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Hospital System</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-7">
          <div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              Smart Hospital<br />
              <span className="text-blue-600">Management System</span>
            </h1>
            <p className="mt-4 text-gray-600 text-base leading-relaxed max-w-sm">
              A unified platform to manage all hospital operations, monitor real-time activities and improve patient care.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/70 backdrop-blur rounded-xl p-3 shadow-sm border border-white/50">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Patients", value: "4,782", sub: "+12.3%" },
              { label: "Bed Occupancy", value: "78%", sub: "+2.2%" },
              { label: "Active Modules", value: "24", sub: "Online" },
            ].map((s, i) => (
              <div key={i} className="bg-white/80 backdrop-blur rounded-xl p-3 text-center shadow-sm border border-white/50">
                <p className="text-lg font-black text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                <p className="text-xs text-green-600 font-semibold mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="relative z-10 flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl px-4 py-3 w-fit shadow-sm border border-white/50">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-bold text-gray-700">System Online</span>
          <span className="text-xs text-gray-400">All systems operational</span>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <span className="text-3xl">🏥</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Admin Login</h2>
            <p className="text-gray-500 mt-1 text-sm">Access Hospital Control Dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <span>⚠️</span>
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Fields */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">Email / Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="admin@medicare.in"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5 block">Select Role</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🛡️</span>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-colors appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  {/* <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Billing Staff">Billing Staff</option> */}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 font-bold hover:underline">Forgot Password?</button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Login →"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Biometric */}
          <button className="w-full py-3.5 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-semibold text-gray-700 flex items-center justify-center gap-2 transition-all">
            <span className="text-xl">🫆</span> Login with Biometric
          </button>

          {/* Security */}
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <span className="text-xl mt-0.5">🛡️</span>
            <div>
              <p className="text-sm font-bold text-green-800">Secure Hospital System</p>
              <p className="text-xs text-green-600 mt-0.5">Your data is protected with enterprise-grade security</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400">
            Demo: Enter any email, password &amp; select a role to login
          </p>
        </div>
      </div>
    </div>
  );
}
