// src/pages/student/Wishlist.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import EmptyState from "../../components/EmptyState";
import Skeleton from "../../components/Skeleton";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockWishlist = [
      {
        id: 1,
        _id: 1,
        title: "Advanced React Patterns",
        description: "Master advanced React concepts and patterns",
        price: 79.99,
        rating: 4.9,
        reviewCount: 234,
        level: "advanced",
        category: "Development",
        thumbnail: null,
      },
      {
        id: 2,
        _id: 2,
        title: "Python for Data Science",
        description: "Complete data science bootcamp with Python",
        price: 89.99,
        rating: 4.8,
        reviewCount: 567,
        level: "intermediate",
        category: "Data Science",
        thumbnail: null,
      },
      {
        id: 3,
        _id: 3,
        title: "AWS Certified Solutions Architect",
        description: "Prepare for AWS certification exam",
        price: 99.99,
        rating: 4.7,
        reviewCount: 189,
        level: "intermediate",
        category: "Cloud",
        thumbnail: null,
      },
    ];

    setWishlistItems(mockWishlist);
    setLoading(false);
  };

  const handleRemoveFromWishlist = async (courseId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setWishlistItems(wishlistItems.filter((item) => item.id !== courseId));
  };

  const handleAddAllToCart = () => {
    alert("All items added to cart!");
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton count={3} type="card" />
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-400">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "course" : "courses"} saved for
                later
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <button onClick={handleAddAllToCart} className="btn-primary">
                Add All to Cart
              </button>
            )}
          </div>
        </div>

        {wishlistItems.length === 0 ?
          <EmptyState
            icon="❤️"
            title="Your wishlist is empty"
            message="Save courses you're interested in to revisit them later"
            action={() => (window.location.href = "/courses")}
            actionText="Browse Courses"
          />
        : <div className="space-y-4">
            {wishlistItems.map((course) => (
              <div key={course.id} className="card hover:border-gray-600">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-48 h-32 bg-gray-700 rounded-lg overflow-hidden">
                    {course.thumbnail ?
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                        <span className="text-3xl opacity-30">📚</span>
                      </div>
                    }
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-white hover:text-indigo-400">
                            <Link to={`/courses/${course.id}`}>
                              {course.title}
                            </Link>
                          </h3>
                          <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {course.level}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {course.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-400 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white">{course.rating}</span>
                            <span className="text-gray-500 ml-1">
                              ({course.reviewCount})
                            </span>
                          </div>
                          <span className="text-gray-400">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${course.price}
                        </div>
                        <div className="text-xs text-gray-400 mb-3">
                          or 4 payments of ${(course.price / 4).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <button
                        onClick={() => handleRemoveFromWishlist(course.id)}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                      <div className="flex space-x-3">
                        <button className="btn-secondary text-sm px-4 py-2">
                          Add to Cart
                        </button>
                        <Link
                          to={`/courses/${course.id}`}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Wishlist;
