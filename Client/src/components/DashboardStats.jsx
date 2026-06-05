// src/components/DashboardStats.jsx
const DashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="card hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className={`p-3 rounded-lg ${stat.iconBgColor}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </div>
          {stat.change && (
            <div
              className={`text-sm mt-2 ${stat.change > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {stat.change > 0 ? "↑" : "↓"} {Math.abs(stat.change)}% from last
              month
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
