import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { motion } from "framer-motion";

const stats = [
  { title: "Total Students", value: 120 },
  { title: "Courses", value: 25 },
  { title: "Revenue", value: "$12,500" },
  { title: "Live Sessions", value: 5 },
];

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Header />
        <main className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                className="bg-white p-6 rounded shadow hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white rounded shadow overflow-x-auto p-4">
            <h2 className="text-xl font-bold mb-4">Recent Students</h2>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100 transition">
                  <td className="p-4">John Doe</td>
                  <td className="p-4">john@example.com</td>
                  <td className="p-4">React Basics</td>
                  <td className="p-4">Active</td>
                </tr>
                <tr className="border-b hover:bg-gray-100 transition">
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
    </div>
  );
};

export default AdminDashboard;
