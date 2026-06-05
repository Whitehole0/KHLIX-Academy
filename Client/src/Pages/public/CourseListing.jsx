// src/pages/public/CourseListing.jsx
import { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard";
import { coursesAPI } from "../../services/api";

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllCourses();
      setCourses(response.data);
    } catch (err) {
      setError("Failed to load courses");
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
        <h1 className="text-3xl font-bold text-white mb-2">All Courses</h1>
        <p className="text-gray-400 mb-8">
          Browse our catalog of professional courses
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {courses.length === 0 ?
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No courses available yet</div>
          </div>
        : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default CourseListing;
