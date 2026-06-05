// src/components/RatingStars.jsx
import { useState } from "react";

const RatingStars = ({
  value = 0,
  onChange,
  readonly = false,
  size = "md",
}) => {
  const [hoverValue, setHoverValue] = useState(null);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const handleMouseEnter = (index) => {
    if (!readonly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const handleClick = (index) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  const getStarClass = (index) => {
    const currentValue = hoverValue !== null ? hoverValue : value;
    if (index < currentValue) {
      return "text-yellow-400";
    }
    return "text-gray-400";
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`${sizes[size]} ${getStarClass(index)} cursor-${readonly ? "default" : "pointer"} transition-colors`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-gray-400">
          {value.toFixed(1)} out of 5
        </span>
      )}
    </div>
  );
};

export default RatingStars;
