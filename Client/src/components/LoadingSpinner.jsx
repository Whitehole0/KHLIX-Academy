// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-700 border-t-indigo-500`}
      ></div>
      {text && <p className="mt-4 text-gray-400">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
