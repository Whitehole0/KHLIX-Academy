// src/pages/student/Profile.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";
import FileUpload from "../../components/FileUpload";
import Tabs from "../../components/Tabs";
import Skeleton from "../../components/Skeleton";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio:
          user.bio || "Passionate learner always looking to expand my skills.",
        location: user.location || "New York, NY",
        website: user.website || "https://myportfolio.com",
        github: user.github || "github.com/username",
        linkedin: user.linkedin || "linkedin.com/in/username",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update user context
    updateUser(formData);
    setEditing(false);
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("Password updated successfully");
  };

  const handleAvatarUpload = async (file) => {
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowAvatarModal(false);
    alert("Avatar updated successfully");
  };

  const stats = [
    { label: "Courses Enrolled", value: 8 },
    { label: "Completed", value: 5 },
    { label: "Learning Hours", value: "127h" },
    { label: "Certificates", value: 3 },
  ];

  const tabs = [
    {
      label: "Learning Activity",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">Recent Courses</h4>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-700 rounded mr-3"></div>
                    <div>
                      <div className="text-white">Course Title {i}</div>
                      <div className="text-xs text-gray-400">Progress: 75%</div>
                    </div>
                  </div>
                  <Link
                    to="/student/course/1"
                    className="text-indigo-400 text-sm"
                  >
                    Continue →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Certificates",
      count: 3,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-3xl">🏆</div>
                <button className="text-gray-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
              <h4 className="text-white font-medium mb-1">React Masterclass</h4>
              <p className="text-xs text-gray-400 mb-3">Issued March 2024</p>
              <div className="text-xs text-gray-500">
                Credential ID: CERT-{i}2345
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Payment History",
      content: (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
            >
              <div>
                <div className="text-white font-medium">React Masterclass</div>
                <div className="text-xs text-gray-400">March 15, 2024</div>
              </div>
              <div className="text-right">
                <div className="text-white">$49.99</div>
                <div className="text-xs text-green-400">Paid</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton count={5} type="card" />
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
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">
            Manage your personal information and settings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-indigo-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  {user?.avatar ?
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  : <span>{user?.name?.charAt(0)}</span>}
                </div>
                <button
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-4 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                {user?.name}
              </h2>
              <p className="text-gray-400 mb-4">{user?.email}</p>

              <div className="flex justify-center space-x-2 mb-6">
                <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-sm rounded-full">
                  Student
                </span>
                <span className="px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEditing(!editing)}
                  className="btn-secondary text-sm"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="btn-secondary text-sm"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              {editing ?
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="input-field w-full"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="input-field w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GitHub
                      </label>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              : <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      About
                    </h3>
                    <p className="text-gray-300">{formData.bio}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Location</div>
                      <div className="text-white">{formData.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Member Since
                      </div>
                      <div className="text-white">January 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Website</div>
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        {formData.website}
                      </a>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Social</div>
                      <div className="flex space-x-3">
                        <a
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          GitHub
                        </a>
                        <a
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>

                  <Tabs tabs={tabs} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="input-field w-full"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handlePasswordChange} className="btn-primary">
              Update Password
            </button>
          </div>
        </div>
      </Modal>

      {/* Avatar Upload Modal */}
      <Modal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        title="Upload Profile Picture"
      >
        <div className="space-y-6">
          <FileUpload
            onUpload={handleAvatarUpload}
            accept="image/*"
            maxSize={2 * 1024 * 1024}
            label="Upload new avatar"
          />
          <p className="text-xs text-gray-400 text-center">
            Recommended: Square image, at least 200x200px, max 2MB
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
