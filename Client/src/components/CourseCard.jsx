// src/components/CourseCard.jsx
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-900/30 text-green-400";
      case "intermediate":
        return "bg-yellow-900/30 text-yellow-400";
      case "advanced":
        return "bg-red-900/30 text-red-400";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <Link to={`/courses/${course._id || course.id}`}>
      <div className="card group hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 h-full">
        <div className="relative h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
          {course.thumbnail ?
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          : <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="text-4xl opacity-30">📚</div>
            </div>
          }
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.level)}`}
            >
              {course.level || "All Levels"}
            </span>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {course.category || "Development"}
            </span>
            {course.isFeatured && (
              <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {course.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-300 font-medium">
              {course.rating || "4.8"}
            </span>
            <span className="text-xs text-gray-500">
              ({course.reviewCount || 124})
            </span>
          </div>

          <div className="text-right">
            <div className="text-indigo-400 font-bold text-lg">
              ${course.price || course.price === 0 ? "Free" : "49.99"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
