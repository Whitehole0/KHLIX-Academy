// src/pages/admin/AdminCourse.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesAPI, lessonsAPI } from "../../utils/api";

const AdminCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseRes, lessonsRes] = await Promise.all([
        coursesAPI.getCourse(courseId),
        lessonsAPI.getCourseLessons(courseId),
      ]);
      setCourse(courseRes.data);
      setLessons(lessonsRes.data.lessons || []);
    } catch (err) {
      setError("Failed to load course data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      // Note: Delete endpoint not in API contract
      // This would be implemented when available
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
    } catch (err) {
      setError("Failed to delete lesson");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
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
            to="/admin/dashboard"
            className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {course?.title}
              </h1>
              <p className="text-gray-400">Manage course lessons and content</p>
            </div>
            <Link
              to={`/admin/course/${courseId}/upload-lesson`}
              className="btn-primary"
            >
              + Upload Lesson
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Course Lessons
              </h2>

              {lessons.length === 0 ?
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">No lessons yet</div>
                  <p className="text-gray-500 text-sm">
                    Upload your first lesson to get started
                  </p>
                </div>
              : <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson._id}
                      className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-900 text-indigo-300 rounded-full flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {lesson.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            {lesson.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/admin/course/${courseId}/upload-lesson?edit=${lesson._id}`}
                          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteLesson(lesson._id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">
                Course Details
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="text-xl font-bold text-white">
                    ${course?.price || "Free"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Lessons</div>
                  <div className="text-xl font-bold text-white">
                    {lessons.length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Created</div>
                  <div className="text-white">
                    {course?.createdAt ?
                      new Date(course.createdAt).toLocaleDateString()
                    : "N/A"}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <Link
                    to={`/courses/${courseId}`}
                    className="block text-gray-400 hover:text-white text-sm"
                    target="_blank"
                  >
                    View Public Page
                  </Link>
                  <Link
                    to={`/admin/create-course?edit=${courseId}`}
                    className="block text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    Edit Course Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
