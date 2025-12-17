import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Students = () => {
  const students = [
    {
      name: "John Doe",
      email: "john@example.com",
      course: "React Basics",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Node.js Advanced",
      status: "Inactive",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Header />
        <main className="p-8">
          <h2 className="text-2xl font-bold mb-4">All Students</h2>
          <div className="bg-white rounded shadow overflow-x-auto">
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
                {students.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100 transition">
                    <td className="p-4">{s.name}</td>
                    <td className="p-4">{s.email}</td>
                    <td className="p-4">{s.course}</td>
                    <td className="p-4">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;
