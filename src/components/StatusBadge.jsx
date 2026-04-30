const statusMap = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Admitted: "bg-blue-100 text-blue-700",
  OPD: "bg-purple-100 text-purple-700",
  Critical: "bg-red-100 text-red-700",
  Discharged: "bg-gray-100 text-gray-600",
  Available: "bg-green-100 text-green-700",
  Busy: "bg-orange-100 text-orange-700",
  "Off Duty": "bg-gray-100 text-gray-500",
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-500",
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-yellow-100 text-yellow-700",
  Low: "bg-orange-100 text-orange-700",
  OK: "bg-green-100 text-green-700",
  Out: "bg-red-100 text-red-700",
  Processing: "bg-blue-100 text-blue-700",
  Urgent: "bg-red-100 text-red-700",
  Normal: "bg-gray-100 text-gray-600",
  Healthy: "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusMap[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
