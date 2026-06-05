// src/pages/admin/Reviews.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [searchQuery, reviews]);

  const fetchReviews = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockReviews = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      courseId: Math.floor(Math.random() * 10) + 1,
      courseTitle: `Course Title ${Math.floor(Math.random() * 10) + 1}`,
      studentId: i + 1,
      studentName: `Student ${i + 1}`,
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
      comment: `This is a great course! I learned a lot about ${["React", "JavaScript", "Python", "AWS"][Math.floor(Math.random() * 4)]}.`,
      date: new Date(2024, 0, Math.floor(Math.random() * 30)).toISOString(),
      status: Math.random() > 0.2 ? "published" : "pending",
      reply: Math.random() > 0.7 ? "Thank you for your feedback!" : null,
    }));

    setReviews(mockReviews);
    setFilteredReviews(mockReviews);
    setLoading(false);
  };

  const filterReviews = () => {
    const filtered = reviews.filter(
      (review) =>
        review.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredReviews(filtered);
    setCurrentPage(1);
  };

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleApprove = async (reviewId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, status: "published" } : r,
      ),
    );
  };

  const handleReject = async (reviewId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  const handleReply = (review) => {
    setSelectedReview(review);
    setReplyText(review.reply || "");
    setShowReplyModal(true);
  };

  const handleReplySubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReviews(
      reviews.map((r) =>
        r.id === selectedReview.id ? { ...r, reply: replyText } : r,
      ),
    );
    setShowReplyModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Reviews Management
          </h1>
          <p className="text-gray-400">
            Moderate and respond to course reviews
          </p>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div className="w-96">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search reviews..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <select className="input-field text-sm py-2">
                <option value="all">All Reviews</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {loading ?
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-800 rounded-lg"></div>
                </div>
              ))}
            </div>
          : <>
              <div className="space-y-4">
                {paginatedReviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                            <span className="text-indigo-300 text-sm">
                              {review.studentName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {review.studentName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatDate(review.date)}
                            </div>
                          </div>
                        </div>
                        <div className="ml-11">
                          <RatingStars
                            value={review.rating}
                            readonly
                            size="sm"
                          />
                          <p className="text-gray-300 mt-2">{review.comment}</p>

                          {review.reply && (
                            <div className="mt-4 pl-4 border-l-2 border-indigo-500">
                              <p className="text-sm text-gray-400">
                                <span className="text-indigo-400 font-medium">
                                  Your reply:
                                </span>{" "}
                                {review.reply}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            review.status === "published" ?
                              "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
                      {review.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(review.id)}
                            className="px-3 py-1.5 text-sm bg-green-900/30 text-green-400 rounded-lg hover:bg-green-900/50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(review.id)}
                            className="px-3 py-1.5 text-sm bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleReply(review)}
                        className="px-3 py-1.5 text-sm bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50"
                      >
                        {review.reply ? "Edit Reply" : "Reply"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredReviews.length / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </>
          }
        </div>
      </div>

      {/* Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        title="Reply to Review"
      >
        <div className="space-y-4">
          {selectedReview && (
            <>
              <div className="bg-gray-900 p-4 rounded-lg">
                <RatingStars value={selectedReview.rating} readonly size="sm" />
                <p className="text-gray-300 mt-2">{selectedReview.comment}</p>
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="input-field w-full min-h-[100px]"
              />

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                  className="btn-primary"
                >
                  Send Reply
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Reviews;
