export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button className="text-sm text-blue-600 font-semibold hover:underline">{action}</button>
      )}
    </div>
  );
}
