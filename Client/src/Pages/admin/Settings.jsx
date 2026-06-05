// src/pages/admin/Settings.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Khlix Academy",
    siteDescription: "Learn from anywhere, anytime",
    emailFrom: "noreply@khlix.com",
    supportEmail: "support@khlix.com",
    requireEmailVerification: true,
    allowPublicRegistration: true,
    maintenanceMode: false,
    defaultCurrency: "USD",
    timezone: "America/New_York",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccessMessage("Settings updated successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
    setLoading(false);
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
            Platform Settings
          </h1>
          <p className="text-gray-400">
            Configure your learning platform settings
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
            <p className="text-green-400">{successMessage}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card space-y-2">
              <button className="w-full text-left px-4 py-2 bg-indigo-900/30 text-indigo-300 rounded-lg">
                General Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
                Payments
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
                Email
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
                Security
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
                Integrations
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  General Settings
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Configure basic platform information and preferences
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Currency
                  </label>
                  <select
                    name="defaultCurrency"
                    value={settings.defaultCurrency}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  className="input-field w-full"
                  rows="3"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    name="emailFrom"
                    value={settings.emailFrom}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={settings.supportEmail}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="input-field w-full"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <div className="font-medium text-white">
                      Require Email Verification
                    </div>
                    <div className="text-sm text-gray-400">
                      Users must verify email before accessing courses
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <div className="font-medium text-white">
                      Allow Public Registration
                    </div>
                    <div className="text-sm text-gray-400">
                      Anyone can create an account
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowPublicRegistration"
                      checked={settings.allowPublicRegistration}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <div className="font-medium text-white">
                      Maintenance Mode
                    </div>
                    <div className="text-sm text-gray-400">
                      Temporarily disable public access
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
