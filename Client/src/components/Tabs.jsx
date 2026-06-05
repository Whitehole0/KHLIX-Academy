// src/components/Tabs.jsx
import { useState } from "react";

const Tabs = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div>
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`py-4 px-1 relative text-sm font-medium transition-colors ${
                activeTab === index ? "text-indigo-400" : (
                  "text-gray-400 hover:text-gray-300"
                )
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === index ?
                      "bg-indigo-900/30 text-indigo-300"
                    : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
