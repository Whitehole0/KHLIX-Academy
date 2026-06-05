// src/pages/student/LearningHistory.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import DatePicker from "../../components/DatePicker";
import Skeleton from "../../components/Skeleton";

const LearningHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [stats, setStats] = useState({
    totalHours: 0,
    averageSession: 0,
    mostActiveDay: "",
    streak: 0,
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockHistory = [
      {
        id: 1,
        courseId: 101,
        courseTitle: "React Masterclass",
        lessonId: 1001,
        lessonTitle: "Introduction to Hooks",
        date: "2024-03-15T14:30:00",
        duration: 45,
        completed: true,
      },
      {
        id: 2,
        courseId: 101,
        courseTitle: "React Masterclass",
        lessonId: 1002,
        lessonTitle: "useState Deep Dive",
        date: "2024-03-14T10:15:00",
        duration: 60,
        completed: true,
      },
      {
        id: 3,
        courseId: 101,
        courseTitle: "React Masterclass",
        lessonId: 1003,
        lessonTitle: "useEffect Explained",
        date: "2024-03-13T16:45:00",
        duration: 55,
        completed: true,
      },
      {
        id: 4,
        courseId: 102,
        courseTitle: "Python for Data Science",
        lessonId: 2001,
        lessonTitle: "NumPy Basics",
        date: "2024-03-12T09:30:00",
        duration: 50,
        completed: true,
      },
      {
        id: 5,
        courseId: 102,
        courseTitle: "Python for Data Science",
        lessonId: 2002,
        lessonTitle: "Pandas Introduction",
        date: "2024-03-11T13:20:00",
        duration: 65,
        completed: false,
      },
    ];

    setHistory(mockHistory);

    // Calculate stats
    const totalHours =
      mockHistory.reduce((sum, item) => sum + item.duration, 0) / 60;
    setStats({
      totalHours: totalHours.toFixed(1),
      averageSession: (totalHours / mockHistory.length).toFixed(1),
      mostActiveDay: "Tuesday",
      streak: 5,
    });

    setLoading(false);
  };

  const filteredHistory = history.filter((item) => {
    if (filter === "completed" && !item.completed) return false;
    if (filter === "in-progress" && item.completed) return false;

    if (dateRange.start && new Date(item.date) < new Date(dateRange.start))
      return false;
    if (dateRange.end && new Date(item.date) > new Date(dateRange.end))
      return false;

    return true;
  });

  const groupByDate = () => {
    const grouped = {};
    filteredHistory.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  const groupedHistory = groupByDate();

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Learning History
          </h1>
          <p className="text-gray-400">
            Track your learning activity over time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-2xl text-indigo-400 mb-2">⏱️</div>
            <div className="text-2xl font-bold text-white">
              {stats.totalHours}h
            </div>
            <div className="text-sm text-gray-400">Total learning hours</div>
          </div>
          <div className="card">
            <div className="text-2xl text-green-400 mb-2">📊</div>
            <div className="text-2xl font-bold text-white">
              {stats.averageSession}h
            </div>
            <div className="text-sm text-gray-400">Average session</div>
          </div>
          <div className="card">
            <div className="text-2xl text-yellow-400 mb-2">📅</div>
            <div className="text-2xl font-bold text-white">
              {stats.mostActiveDay}
            </div>
            <div className="text-sm text-gray-400">Most active day</div>
          </div>
          <div className="card">
            <div className="text-2xl text-purple-400 mb-2">🔥</div>
            <div className="text-2xl font-bold text-white">
              {stats.streak} days
            </div>
            <div className="text-sm text-gray-400">Current streak</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filter === "all" ?
                    "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                All Activity
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filter === "completed" ?
                    "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("in-progress")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filter === "in-progress" ?
                    "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                In Progress
              </button>
            </div>

            <div className="flex space-x-4">
              <DatePicker
                value={dateRange.start}
                onChange={(date) =>
                  setDateRange((prev) => ({ ...prev, start: date }))
                }
                placeholder="Start date"
              />
              <DatePicker
                value={dateRange.end}
                onChange={(date) =>
                  setDateRange((prev) => ({ ...prev, end: date }))
                }
                placeholder="End date"
              />
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-8">
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-white mb-4">{date}</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="card hover:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            item.completed ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-white font-medium">
                              {item.lessonTitle}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {item.courseTitle}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-400">
                              {new Date(item.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <span className="text-gray-400">
                              {item.duration} minutes
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${
                                item.completed ?
                                  "bg-green-900/30 text-green-400"
                                : "bg-yellow-900/30 text-yellow-400"
                              }`}
                            >
                              {item.completed ? "Completed" : "In Progress"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/student/lesson/${item.lessonId}`}
                        className="text-indigo-400 hover:text-indigo-300 text-sm"
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 opacity-30">📚</div>
              <h3 className="text-xl text-white mb-2">
                No learning activity found
              </h3>
              <p className="text-gray-400">
                Start learning to see your history here
              </p>
            </div>
          )}
        </div>

        {/* Weekly Activity Heatmap */}
        <div className="card mt-8">
          <h3 className="text-lg font-semibold text-white mb-6">
            Weekly Activity
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-sm text-gray-400 mb-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const intensity = Math.random();
              let bgColor = "bg-gray-800";
              if (intensity > 0.8) bgColor = "bg-indigo-600";
              else if (intensity > 0.5) bgColor = "bg-indigo-700";
              else if (intensity > 0.2) bgColor = "bg-indigo-800";

              return (
                <div
                  key={i}
                  className={`aspect-square rounded ${bgColor} hover:ring-2 hover:ring-indigo-400 transition-all`}
                  title={`${Math.floor(intensity * 100)} minutes`}
                ></div>
              );
            })}
          </div>
          <div className="flex items-center justify-end mt-4 space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-800 rounded mr-2"></div>
              <span className="text-xs text-gray-400">Less</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-800 rounded mr-2"></div>
              <span className="text-xs text-gray-400">Some</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-700 rounded mr-2"></div>
              <span className="text-xs text-gray-400">Regular</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-600 rounded mr-2"></div>
              <span className="text-xs text-gray-400">Most</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHistory;
