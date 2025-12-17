// import { useAuth } from "../context/AuthContext";

const stats = [
  { title: "Total Students", value: 120 },
  { title: "Courses", value: 25 },
  { title: "Revenue", value: "$12,500" },
  { title: "Live Sessions", value: 5 },
];

const AdminDashboard = () => {
  // const { user } = useAuth();

  // if (user.role !== "admin") return <div className="p-8">Access Denied</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 font-bold text-xl border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <a
            href="/admin/dashboard"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </a>
          <a
            href="/admin/students"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Students
          </a>
          <a
            href="/admin/courses"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Courses
          </a>
          <a
            href="/admin/settings"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.title} className="bg-white p-6 rounded shadow">
              <p className="text-gray-500">{s.title}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Example Table */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">John Doe</td>
                <td className="p-4">john@example.com</td>
                <td className="p-4">React Basics</td>
                <td className="p-4">Active</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Jane Smith</td>
                <td className="p-4">jane@example.com</td>
                <td className="p-4">Node.js Advanced</td>
                <td className="p-4">Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
