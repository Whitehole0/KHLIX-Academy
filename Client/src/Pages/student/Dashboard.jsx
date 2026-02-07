// src/pages/student/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { enrollmentsAPI } from "../../utils/api";
import CourseCard from "../../components/CourseCard";

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentsAPI.getMyEnrollments();
      setEnrollments(response.data);
    } catch (err) {
      setError("Failed to load your courses");
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
            <div className="h-8 bg-gray-800 rounded w-48 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
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
            <h1 className="text-3xl font-bold text-white mb-2">My Learning</h1>
            <p className="text-gray-400">Continue your learning journey</p>
          </div>
          <Link to="/courses" className="btn-primary">
            Browse More Courses
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {enrollments.length === 0 ?
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              You haven't enrolled in any courses yet
            </div>
            <Link to="/courses" className="btn-primary">
              Explore Courses
            </Link>
          </div>
        : <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {enrollments.map((enrollment) => (
                <CourseCard
                  key={enrollment.course._id}
                  course={enrollment.course}
                />
              ))}
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {enrollments.slice(0, 3).map((enrollment) => (
                  <div
                    key={enrollment._id}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-white">
                        {enrollment.course.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        Last accessed:{" "}
                        {new Date(enrollment.lastAccessed).toLocaleDateString()}
                      </div>
                    </div>
                    <Link
                      to={`/student/course/${enrollment.course._id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                      Continue →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default StudentDashboard;
