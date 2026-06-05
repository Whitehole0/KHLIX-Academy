// src/pages/admin/Analytics.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "../../components/Chart";
import DatePicker from "../../components/DatePicker";
import Tabs from "../../components/Tabs";
import Skeleton from "../../components/Skeleton";

const Analytics = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    setData({
      revenue: {
        total: 48920,
        change: 24,
        data: [12500, 15000, 18000, 22000, 28000, 35000, 42000, 48920],
      },
      students: {
        total: 2847,
        change: 12,
        data: [1800, 2100, 2300, 2500, 2700, 2800, 2830, 2847],
      },
      courses: {
        total: 156,
        change: 8,
        data: [120, 125, 132, 138, 145, 150, 154, 156],
      },
      engagement: {
        averageTime: "45m",
        completion: 76,
        satisfaction: 4.8,
      },
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "Revenue",
            data: [12500, 15000, 18000, 22000, 28000, 35000, 42000, 48920],
          },
        ],
      },
      topCourses: [
        {
          title: "React Masterclass",
          students: 234,
          revenue: 11682,
          rating: 4.9,
        },
        {
          title: "Advanced JavaScript",
          students: 189,
          revenue: 9441,
          rating: 4.8,
        },
        {
          title: "Python for Data Science",
          students: 167,
          revenue: 8341,
          rating: 4.7,
        },
        {
          title: "AWS Cloud Practitioner",
          students: 145,
          revenue: 7245,
          rating: 4.8,
        },
        {
          title: "Machine Learning A-Z",
          students: 128,
          revenue: 6392,
          rating: 4.6,
        },
      ],
    });

    setLoading(false);
  };

  const tabs = [
    {
      label: "Overview",
      content: (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            {data &&
              [
                {
                  label: "Total Revenue",
                  value: `$${data.revenue.total.toLocaleString()}`,
                  change: data.revenue.change,
                  icon: "💰",
                },
                {
                  label: "Active Students",
                  value: data.students.total.toLocaleString(),
                  change: data.students.change,
                  icon: "👥",
                },
                {
                  label: "Total Courses",
                  value: data.courses.total,
                  change: data.courses.change,
                  icon: "📚",
                },
                { label: "Avg. Rating", value: "4.8", change: 3, icon: "⭐" },
              ].map((metric, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{metric.icon}</div>
                    <span
                      className={`text-sm ${metric.change > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {metric.change > 0 ? "↑" : "↓"} {Math.abs(metric.change)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
          </div>

          {/* Revenue Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">
              Revenue Overview
            </h3>
            <div className="h-80">
              {loading ?
                <Skeleton type="chart" />
              : <Chart data={data?.chartData} type="line" />}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            {data &&
              [
                {
                  label: "Avg. Time on Platform",
                  value: data.engagement.averageTime,
                  icon: "⏱️",
                },
                {
                  label: "Course Completion Rate",
                  value: `${data.engagement.completion}%`,
                  icon: "✅",
                },
                {
                  label: "Student Satisfaction",
                  value: data.engagement.satisfaction,
                  icon: "😊",
                },
              ].map((metric, index) => (
                <div key={index} className="card">
                  <div className="text-2xl mb-3">{metric.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      label: "Revenue",
      count: 2,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="font-medium text-white mb-4">Revenue by Course</h4>
              <div className="space-y-3">
                {data?.topCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-700 rounded"
                  >
                    <div>
                      <div className="text-white text-sm">{course.title}</div>
                      <div className="text-xs text-gray-400">
                        {course.students} students
                      </div>
                    </div>
                    <div className="text-indigo-400 font-medium">
                      ${course.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h4 className="font-medium text-white mb-4">Revenue Breakdown</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">One-time purchases</span>
                    <span className="text-white">$32,876</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-indigo-500 h-2 rounded"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Subscriptions</span>
                    <span className="text-white">$12,456</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Corporate deals</span>
                    <span className="text-white">$3,588</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-purple-500 h-2 rounded"
                      style={{ width: "8%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Students",
      count: data?.students.total,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="font-medium text-white mb-4">Student Growth</h4>
              <Chart
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                  ],
                  datasets: [{ data: data?.students.data || [] }],
                }}
                type="line"
              />
            </div>
            <div className="card">
              <h4 className="font-medium text-white mb-4">
                Student Demographics
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">North America</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-indigo-500 h-2 rounded"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Europe</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Asia</span>
                    <span className="text-white">18%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-purple-500 h-2 rounded"
                      style={{ width: "18%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
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
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-400">Track your platform's performance</p>
            </div>
            <div className="flex items-center space-x-4">
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

        <div className="card">
          <Tabs tabs={tabs} />
        </div>

        <div className="mt-8 flex justify-end">
          <button className="btn-secondary">Export Report</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
