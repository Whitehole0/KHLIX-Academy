// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coursesAPI } from "../../services/api";
import DashboardStats from "../../components/DashboardStats";
import EmptyState from "../../components/EmptyState";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      label: "Total Courses",
      value: 0,
      icon: "📚",
      iconBgColor: "bg-indigo-900/30",
    },
    {
      label: "Active Students",
      value: 0,
      icon: "👥",
      iconBgColor: "bg-green-900/30",
    },
    {
      label: "Total Revenue",
      value: "$0",
      icon: "💰",
      iconBgColor: "bg-yellow-900/30",
    },
    {
      label: "Avg. Rating",
      value: "0.0",
      icon: "⭐",
      iconBgColor: "bg-purple-900/30",
    },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getMyCourses();
      setCourses(response.data);

      // Simulated stats (in production, these would come from API)
      setStats([
        {
          label: "Total Courses",
          value: response.data.length,
          icon: "📚",
          iconBgColor: "bg-indigo-900/30",
        },
        {
          label: "Active Students",
          value: "2,847",
          icon: "👥",
          iconBgColor: "bg-green-900/30",
          change: 12,
        },
        {
          label: "Total Revenue",
          value: "$48,920",
          icon: "💰",
          iconBgColor: "bg-yellow-900/30",
          change: 24,
        },
        {
          label: "Avg. Rating",
          value: "4.8",
          icon: "⭐",
          iconBgColor: "bg-purple-900/30",
          change: 3,
        },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone.",
      )
    )
      return;

    try {
      // Note: Delete endpoint would be implemented here
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      alert("Failed to delete course");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your academy and track performance
            </p>
          </div>
          <div className="flex space-x-4">
            <Link to="/admin/create-course" className="btn-primary">
              + Create Course
            </Link>
            <button className="btn-secondary">📊 Analytics</button>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Recent Courses */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Recent Courses
              </h2>
              <Link
                to="/admin/create-course"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                + Add New
              </Link>
            </div>

            {loading ?
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            : courses.length === 0 ?
              <EmptyState
                icon="📚"
                title="No courses yet"
                message="Create your first course to get started"
                action={() => (window.location.href = "/admin/create-course")}
              />
            : <div className="space-y-4">
                {courses.slice(0, 5).map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4 flex items-center justify-center">
                        {course.thumbnail ?
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        : <span className="text-xl">📘</span>}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {course.lessons?.length || 0} lessons • $
                          {course.price || "Free"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/admin/course/${course._id}`}
                        className="px-3 py-1.5 text-sm bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50 transition-colors"
                      >
                        Manage
                      </Link>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="px-3 py-1.5 text-sm bg-red-900/30 text-red-300 rounded-lg hover:bg-red-900/50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            }

            {courses.length > 5 && (
              <div className="mt-4 text-center">
                <Link
                  to="/admin/courses"
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  View all courses →
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions & Insights */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/admin/create-course"
                  className="p-4 bg-gray-900 rounded-lg text-center hover:bg-gray-850 transition-colors"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-white font-medium">New Course</div>
                  <div className="text-sm text-gray-400">
                    Create from scratch
                  </div>
                </Link>
                <Link
                  to="/courses"
                  className="p-4 bg-gray-900 rounded-lg text-center hover:bg-gray-850 transition-colors"
                >
                  <div className="text-2xl mb-2">👁️</div>
                  <div className="text-white font-medium">Preview Site</div>
                  <div className="text-sm text-gray-400">View as student</div>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="p-4 bg-gray-900 rounded-lg text-center hover:bg-gray-850 transition-colors"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-white font-medium">Analytics</div>
                  <div className="text-sm text-gray-400">View reports</div>
                </Link>
                <Link
                  to="/admin/settings"
                  className="p-4 bg-gray-900 rounded-lg text-center hover:bg-gray-850 transition-colors"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-white font-medium">Settings</div>
                  <div className="text-sm text-gray-400">
                    Configure platform
                  </div>
                </Link>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">
                Performance Insights
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Enrollment rate
                    </span>
                    <span className="text-sm font-medium text-white">+24%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Course completion
                    </span>
                    <span className="text-sm font-medium text-white">62%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Student satisfaction
                    </span>
                    <span className="text-sm font-medium text-white">
                      4.8/5.0
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-indigo-300 text-sm">👤</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      New enrollment in "React Masterclass"
                    </div>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                </div>
                <span className="text-green-400 text-sm">+$49.99</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
