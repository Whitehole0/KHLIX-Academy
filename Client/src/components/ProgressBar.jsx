// src/components/ProgressBar.jsx
const ProgressBar = ({
  progress,
  size = "md",
  showLabel = true,
  color = "indigo",
}) => {
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
    xl: "h-4",
  };

  const colors = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  };

  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-white">
            {progressValue}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}
      >
        <div
          className={`${colors[color]} transition-all duration-300 ease-in-out rounded-full ${sizes[size]}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
