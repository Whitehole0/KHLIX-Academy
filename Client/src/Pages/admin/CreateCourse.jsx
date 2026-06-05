// src/pages/admin/CreateCourse.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coursesAPI } from "../../services/api";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    learningOutcomes: ["", "", ""],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLearningOutcomeChange = (index, value) => {
    const newOutcomes = [...formData.learningOutcomes];
    newOutcomes[index] = value;
    setFormData((prev) => ({
      ...prev,
      learningOutcomes: newOutcomes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        learningOutcomes: formData.learningOutcomes.filter(
          (outcome) => outcome.trim() !== "",
        ),
      };

      const response = await coursesAPI.createCourse(courseData);
      navigate(`/admin/course/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create New Course
          </h1>
          <p className="text-gray-400">
            Fill in the details to create a new course
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="e.g., Advanced React Patterns"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field w-full min-h-[120px]"
              placeholder="Describe what students will learn in this course..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Learning Outcomes
            </label>
            <div className="space-y-3">
              {formData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></div>
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) =>
                      handleLearningOutcomeChange(index, e.target.value)
                    }
                    className="input-field flex-grow"
                    placeholder={`What students will learn #${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ?
                <span className="flex items-center">
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
                  Creating...
                </span>
              : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
