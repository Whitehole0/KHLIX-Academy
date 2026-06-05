// src/pages/student/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { enrollmentsAPI, coursesAPI } from "../../services/api";
import CourseCard from "../../components/CourseCard";
import DashboardStats from "../../components/DashboardStats";
import EmptyState from "../../components/EmptyState";

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      label: "Enrolled Courses",
      value: 0,
      icon: "📚",
      iconBgColor: "bg-indigo-900/30",
    },
    {
      label: "Completed Lessons",
      value: 0,
      icon: "✅",
      iconBgColor: "bg-green-900/30",
    },
    {
      label: "Learning Hours",
      value: "0h",
      icon: "⏱️",
      iconBgColor: "bg-blue-900/30",
    },
    {
      label: "Avg. Progress",
      value: "0%",
      icon: "📈",
      iconBgColor: "bg-purple-900/30",
    },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [enrollmentsRes, coursesRes] = await Promise.all([
        enrollmentsAPI.getMyEnrollments(),
        coursesAPI.getAllCourses(),
      ]);

      setEnrollments(enrollmentsRes.data);

      // Filter for recommended courses (not enrolled yet)
      const enrolledIds = enrollmentsRes.data.map((e) => e.course._id);
      const recommended = coursesRes.data
        .filter((course) => !enrolledIds.includes(course._id))
        .slice(0, 3);
      setRecommendedCourses(recommended);

      // Update stats
      const totalProgress = enrollmentsRes.data.reduce(
        (sum, enrollment) => sum + (enrollment.progress || 0),
        0,
      );
      const avgProgress =
        enrollmentsRes.data.length > 0 ?
          Math.round(totalProgress / enrollmentsRes.data.length)
        : 0;

      setStats([
        {
          label: "Enrolled Courses",
          value: enrollmentsRes.data.length,
          icon: "📚",
          iconBgColor: "bg-indigo-900/30",
        },
        {
          label: "Completed Lessons",
          value: enrollmentsRes.data.reduce(
            (sum, e) => sum + (e.completedLessons || 0),
            0,
          ),
          icon: "✅",
          iconBgColor: "bg-green-900/30",
        },
        {
          label: "Learning Hours",
          value: `${enrollmentsRes.data.reduce((sum, e) => sum + (e.totalHours || 0), 0)}h`,
          icon: "⏱️",
          iconBgColor: "bg-blue-900/30",
        },
        {
          label: "Avg. Progress",
          value: `${avgProgress}%`,
          icon: "📈",
          iconBgColor: "bg-purple-900/30",
          change: 12,
        },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Current Enrollments */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Your Courses</h2>
            <Link
              to="/courses"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Browse More →
            </Link>
          </div>

          {loading ?
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                </div>
              ))}
            </div>
          : enrollments.length === 0 ?
            <EmptyState
              icon="🎯"
              title="No enrolled courses yet"
              message="Start your learning journey by enrolling in a course."
              action={() => (window.location.href = "/courses")}
              actionText="Browse Courses"
            />
          : <div className="grid md:grid-cols-3 gap-6">
              {enrollments.slice(0, 3).map((enrollment) => (
                <div key={enrollment._id} className="card group">
                  <Link
                    to={`/student/course/${enrollment.course._id}`}
                    className="block"
                  >
                    <div className="h-40 bg-gray-700 rounded-lg mb-4 overflow-hidden relative">
                      {enrollment.course.thumbnail && (
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="text-white font-semibold">
                          {enrollment.course.title}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">
                        {enrollment.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {enrollment.completedLessons || 0} of{" "}
                      {enrollment.totalLessons || 0} lessons
                    </span>
                    <Link
                      to={`/student/course/${enrollment.course._id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                      Continue →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Recommended for You
              </h2>
              <Link
                to="/courses"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
