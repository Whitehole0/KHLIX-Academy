// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coursesAPI } from "../../utils/api";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getMyCourses();
      setCourses(response.data);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      // Note: Delete endpoint not in API contract
      // This would be implemented when available
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      setError("Failed to delete course");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your courses and content</p>
          </div>
          <Link to="/admin/create-course" className="btn-primary">
            + Create New Course
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">
            Your Courses
          </h2>

          {courses.length === 0 ?
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                You haven't created any courses yet
              </div>
              <Link to="/admin/create-course" className="btn-primary">
                Create Your First Course
              </Link>
            </div>
          : <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{course.title}</div>
                    <div className="text-sm text-gray-400">
                      {course.description}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/admin/course/${course._id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                      Manage
                    </Link>
                    <Link
                      to={`/courses/${course._id}`}
                      className="text-gray-400 hover:text-white text-sm font-medium"
                      target="_blank"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteCourse(course._id)}
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

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-white">
                  {courses.length}
                </div>
                <div className="text-sm text-gray-400">Total Courses</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <Link
                to="/admin/create-course"
                className="block text-indigo-400 hover:text-indigo-300"
              >
                + Create Course
              </Link>
              <Link
                to="/courses"
                className="block text-gray-400 hover:text-white"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
