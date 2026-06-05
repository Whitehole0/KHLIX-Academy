// src/pages/admin/Coupons.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import DatePicker from "../../components/DatePicker";
import Skeleton from "../../components/Skeleton";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    maxUses: "",
    expiresAt: "",
    appliesTo: "all",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockCoupons = [
      {
        id: 1,
        code: "WELCOME20",
        description: "Welcome discount for new students",
        discountType: "percentage",
        discountValue: 20,
        minPurchase: 50,
        usedCount: 145,
        maxUses: 500,
        expiresAt: "2024-12-31",
        status: "active",
      },
      {
        id: 2,
        code: "FLASH10",
        description: "Flash sale - 10% off",
        discountType: "percentage",
        discountValue: 10,
        minPurchase: 0,
        usedCount: 89,
        maxUses: 200,
        expiresAt: "2024-03-15",
        status: "active",
      },
      {
        id: 3,
        code: "FIXED25",
        description: "$25 off any course",
        discountType: "fixed",
        discountValue: 25,
        minPurchase: 100,
        usedCount: 34,
        maxUses: 100,
        expiresAt: "2024-04-30",
        status: "active",
      },
      {
        id: 4,
        code: "HOLIDAY50",
        description: "Holiday special - 50% off",
        discountType: "percentage",
        discountValue: 50,
        minPurchase: 200,
        usedCount: 200,
        maxUses: 200,
        expiresAt: "2024-01-15",
        status: "expired",
      },
    ];

    setCoupons(mockCoupons);
    setLoading(false);
  };

  const handleCreateCoupon = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      maxUses: "",
      expiresAt: "",
      appliesTo: "all",
    });
    setShowCreateModal(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase,
      maxUses: coupon.maxUses,
      expiresAt: coupon.expiresAt,
      appliesTo: coupon.appliesTo || "all",
    });
    setShowCreateModal(true);
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    await new Promise((resolve) => setTimeout(resolve, 500));
    setCoupons(coupons.filter((c) => c.id !== couponId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.code || !formData.discountValue) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingCoupon) {
      // Update existing
      setCoupons(
        coupons.map((c) =>
          c.id === editingCoupon.id ?
            {
              ...c,
              ...formData,
              discountValue: parseFloat(formData.discountValue),
            }
          : c,
        ),
      );
    } else {
      // Create new
      const newCoupon = {
        id: coupons.length + 1,
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        usedCount: 0,
        status: "active",
      };
      setCoupons([newCoupon, ...coupons]);
    }

    setShowCreateModal(false);
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, code }));
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Coupons</h1>
              <p className="text-gray-400">
                Create and manage discount coupons
              </p>
            </div>
            <button onClick={handleCreateCoupon} className="btn-primary">
              + Create Coupon
            </button>
          </div>
        </div>

        <div className="card">
          {loading ?
            <Skeleton count={4} type="card" />
          : <div className="space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="bg-gray-900 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {coupon.code}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            coupon.status === "active" ?
                              "bg-green-900/30 text-green-400"
                            : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-2">{coupon.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Discount:</span>
                          <span className="ml-2 text-white">
                            {coupon.discountType === "percentage" ?
                              `${coupon.discountValue}%`
                            : `$${coupon.discountValue}`}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Min. Purchase:</span>
                          <span className="ml-2 text-white">
                            ${coupon.minPurchase}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Uses:</span>
                          <span className="ml-2 text-white">
                            {coupon.usedCount} / {coupon.maxUses}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <span className="ml-2 text-white">
                            {new Date(coupon.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCoupon(coupon)}
                        className="px-3 py-1.5 text-sm bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="px-3 py-1.5 text-sm bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Usage progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Usage</span>
                      <span>
                        {Math.round((coupon.usedCount / coupon.maxUses) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-1.5 rounded">
                      <div
                        className="bg-indigo-500 h-1.5 rounded"
                        style={{
                          width: `${(coupon.usedCount / coupon.maxUses) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Create/Edit Coupon Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={editingCoupon ? "Edit Coupon" : "Create New Coupon"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coupon Code *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  className="input-field flex-grow"
                  placeholder="SAVE20"
                  required
                />
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="input-field w-full"
                placeholder="Welcome discount"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discount Type
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountType: e.target.value,
                  }))
                }
                className="input-field w-full"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discount Value *
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discountValue: e.target.value,
                  }))
                }
                className="input-field w-full"
                placeholder={
                  formData.discountType === "percentage" ? "20" : "25"
                }
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum Purchase
              </label>
              <input
                type="number"
                value={formData.minPurchase}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minPurchase: e.target.value,
                  }))
                }
                className="input-field w-full"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Maximum Uses
              </label>
              <input
                type="number"
                value={formData.maxUses}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, maxUses: e.target.value }))
                }
                className="input-field w-full"
                placeholder="100"
                min="1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiration Date
              </label>
              <DatePicker
                value={formData.expiresAt}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, expiresAt: date }))
                }
                minDate={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Applies To
              </label>
              <select
                value={formData.appliesTo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    appliesTo: e.target.value,
                  }))
                }
                className="input-field w-full"
              >
                <option value="all">All Courses</option>
                <option value="specific">Specific Courses</option>
                <option value="category">Specific Category</option>
              </select>
            </div>
          </div>

          {formData.appliesTo === "specific" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Courses
              </label>
              <select multiple className="input-field w-full h-32">
                <option value="1">React Masterclass</option>
                <option value="2">Advanced JavaScript</option>
                <option value="3">Python for Data Science</option>
              </select>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Coupons;
