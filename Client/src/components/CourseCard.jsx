// src/components/CourseCard.jsx
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="card hover:border-indigo-500 transition-all duration-300 hover:shadow-lg">
      <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        {course.thumbnail ?
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover rounded-lg"
          />
        : <div className="text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        }
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
        {course.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-indigo-400 font-bold">
          ${course.price || "Free"}
        </span>

        <Link
          to={`/courses/${course._id || course.id}`}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
