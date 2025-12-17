import { useAuth } from "../context/AuthContext";

const courses = [
  { name: "React Basics", progress: 70 },
  { name: "Node.js Advanced", progress: 40 },
  { name: "UI/UX Design", progress: 90 },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>

      {/* My Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.name} className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">{course.name}</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-gray-500">{course.progress}% Complete</p>
          </div>
        ))}
      </div>

      {/* Example Activity */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="font-bold text-xl mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>Completed lesson 3 in React Basics</li>
          <li>Started Node.js Advanced</li>
          <li>Joined live session for UI/UX Design</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
