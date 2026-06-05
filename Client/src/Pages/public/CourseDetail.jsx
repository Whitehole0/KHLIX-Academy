// src/pages/public/CourseDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { coursesAPI } from "../../services/api";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isStudent } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourse();
  });

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getCourse(courseId);
      setCourse(response.data);
    } catch (err) {
      setError("Failed to load course details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isStudent) {
      navigate("/unauthorized");
      return;
    }

    setEnrolling(true);
    setError(null);

    try {
      // Note: Enrollment endpoint not in API contract, this would be implemented when available
      // For now, we'll simulate enrollment
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/student/dashboard");
    } catch (err) {
      setError("Failed to enroll in course");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Course not found
          </h1>
          <p className="text-gray-400">
            The course you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h1 className="text-3xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">{course.description}</p>

                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    What you'll learn
                  </h3>
                  <ul className="space-y-2">
                    {course.learningOutcomes?.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{outcome}</span>
                      </li>
                    )) || (
                      <li className="text-gray-400">
                        Course learning outcomes coming soon
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              {course.thumbnail && (
                <div className="mb-6">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  ${course.price || "Free"}
                </div>
                <div className="text-gray-400">One-time payment</div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="btn-primary w-full py-3 text-lg mb-4"
              >
                {enrolling ?
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                : "Enroll Now"}
              </button>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Certificate of completion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
