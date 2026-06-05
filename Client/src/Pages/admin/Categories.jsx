// src/pages/admin/Categories.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Skeleton from "../../components/Skeleton";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "📚",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockCategories = [
      {
        id: 1,
        name: "Web Development",
        slug: "web-development",
        description: "Learn modern web development",
        icon: "💻",
        courseCount: 45,
        isActive: true,
        order: 1,
      },
      {
        id: 2,
        name: "Data Science",
        slug: "data-science",
        description: "Master data analysis and ML",
        icon: "📊",
        courseCount: 32,
        isActive: true,
        order: 2,
      },
      {
        id: 3,
        name: "Cloud Computing",
        slug: "cloud-computing",
        description: "AWS, Azure, GCP certifications",
        icon: "☁️",
        courseCount: 28,
        isActive: true,
        order: 3,
      },
      {
        id: 4,
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Protect systems and networks",
        icon: "🔒",
        courseCount: 19,
        isActive: false,
        order: 4,
      },
    ];

    setCategories(mockCategories);
    setLoading(false);
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      icon: "📚",
      isActive: true,
    });
    setShowCreateModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      isActive: category.isActive,
    });
    setShowCreateModal(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? Courses in this category will become uncategorized.",
      )
    )
      return;

    await new Promise((resolve) => setTimeout(resolve, 500));
    setCategories(categories.filter((c) => c.id !== categoryId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate slug from name
    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingCategory) {
      // Update existing
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData, slug } : c,
        ),
      );
    } else {
      // Create new
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        slug,
        courseCount: 0,
        order: categories.length + 1,
      };
      setCategories([...categories, newCategory]);
    }

    setShowCreateModal(false);
  };

  const handleToggleActive = async (categoryId, currentStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, isActive: !currentStatus } : c,
      ),
    );
  };

  const handleReorder = (categoryId, direction) => {
    const index = categories.findIndex((c) => c.id === categoryId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === categories.length - 1)
    )
      return;

    const newCategories = [...categories];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newCategories[index].order, newCategories[swapIndex].order] = [
      newCategories[swapIndex].order,
      newCategories[index].order,
    ];

    setCategories(newCategories.sort((a, b) => a.order - b.order));
  };

  const iconOptions = [
    "💻",
    "📊",
    "☁️",
    "🔒",
    "🎨",
    "📱",
    "🤖",
    "🧠",
    "📈",
    "🎮",
    "📝",
    "🔧",
    "📚",
    "🎯",
    "💡",
    "⚡",
    "🔬",
    "🏗️",
    "🌐",
    "📦",
  ];

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
              <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
              <p className="text-gray-400">
                Organize your courses with categories
              </p>
            </div>
            <button onClick={handleCreateCategory} className="btn-primary">
              + Add Category
            </button>
          </div>
        </div>

        <div className="card">
          {loading ?
            <Skeleton count={4} type="card" />
          : <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center text-2xl">
                        {category.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {category.name}
                          </h3>
                          <span className="text-xs text-gray-400">
                            /{category.slug}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              category.isActive ?
                                "bg-green-900/30 text-green-400"
                              : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {category.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">
                            <span className="text-white font-medium">
                              {category.courseCount}
                            </span>{" "}
                            courses
                          </span>
                          <span className="text-gray-500">
                            Order:{" "}
                            <span className="text-white">{category.order}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleReorder(category.id, "up")}
                        className="p-2 text-gray-400 hover:text-white"
                        disabled={category.order === 1}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleReorder(category.id, "down")}
                        className="p-2 text-gray-400 hover:text-white"
                        disabled={category.order === categories.length}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() =>
                          handleToggleActive(category.id, category.isActive)
                        }
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                          category.isActive ?
                            "bg-yellow-900/30 text-yellow-300 hover:bg-yellow-900/50"
                          : "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                        }`}
                      >
                        {category.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="px-3 py-1.5 text-sm bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="px-3 py-1.5 text-sm bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Create/Edit Category Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={editingCategory ? "Edit Category" : "Create New Category"}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, ""),
                }));
              }}
              className="input-field w-full"
              placeholder="e.g., Web Development"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="input-field w-full"
              placeholder="web-development"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-generated from name if left empty
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="input-field w-full"
              rows="3"
              placeholder="Describe this category..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon }))}
                  className={`p-3 text-2xl rounded-lg ${
                    formData.icon === icon ?
                      "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="rounded border-gray-600 text-indigo-600 bg-gray-700"
            />
            <label htmlFor="isActive" className="text-white">
              Active (visible on the site)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCategory ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
