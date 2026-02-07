// src/pages/student/Course.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { lessonsAPI } from "../../utils/api";

const StudentCourse = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await lessonsAPI.getCourseLessons(courseId);
      setLessons(response.data.lessons || []);
      setCourse(response.data.course);
    } catch (err) {
      setError("Failed to load course lessons");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/student/dashboard"
            className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {course?.title}
          </h1>
          <p className="text-gray-400">{course?.description}</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">
            Course Lessons
          </h2>

          {lessons.length === 0 ?
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">No lessons available yet</div>
              <p className="text-gray-500 text-sm">
                Check back later for course content
              </p>
            </div>
          : <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson._id}
                  to={`/student/lesson/${lesson._id}`}
                  className="flex items-center p-4 bg-gray-900 hover:bg-gray-850 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-indigo-900 text-indigo-300 rounded-full flex items-center justify-center mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-white">{lesson.title}</div>
                    <div className="text-sm text-gray-400">
                      {lesson.description}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default StudentCourse;
