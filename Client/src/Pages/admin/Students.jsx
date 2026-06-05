// src/pages/admin/Students.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import Skeleton from "../../components/Skeleton";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockStudents = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      enrolledCourses: Math.floor(Math.random() * 10) + 1,
      completedCourses: Math.floor(Math.random() * 5),
      joinedAt: new Date(2024, 0, Math.floor(Math.random() * 30)).toISOString(),
      lastActive: new Date(
        2024,
        1,
        Math.floor(Math.random() * 28),
      ).toISOString(),
      status: Math.random() > 0.2 ? "active" : "inactive",
      totalSpent: Math.floor(Math.random() * 500) + 50,
    }));

    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setLoading(false);
  };

  const filterStudents = () => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleSendMessage = (student) => {
    setSelectedStudent(student);
    setMessageText("");
    setShowMessageModal(true);
  };

  const handleMessageSubmit = async () => {
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowMessageModal(false);
    alert(`Message sent to ${selectedStudent.name}`);
  };

  const handleUpdateStatus = async (studentId, newStatus) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStudents(
      students.map((s) =>
        s.id === studentId ? { ...s, status: newStatus } : s,
      ),
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              <h1 className="text-3xl font-bold text-white mb-2">Students</h1>
              <p className="text-gray-400">Manage your student community</p>
            </div>
            <button className="btn-primary">Export CSV</button>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <div className="w-96">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search students by name or email..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <select className="input-field text-sm py-2">
                <option value="all">All Students</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {loading ?
            <Skeleton count={5} type="card" />
          : <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Courses
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Joined
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Last Active
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                        Total Spent
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-700 hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                              <span className="text-indigo-300 text-sm">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {student.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white">
                            {student.enrolledCourses}
                          </div>
                          <div className="text-xs text-gray-400">
                            {student.completedCourses} completed
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {formatDate(student.joinedAt)}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {formatDate(student.lastActive)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              student.status === "active" ?
                                "bg-green-900/30 text-green-400"
                              : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white">
                          ${student.totalSpent}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewStudent(student)}
                              className="px-3 py-1.5 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleSendMessage(student)}
                              className="px-3 py-1.5 text-sm bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50"
                            >
                              Message
                            </button>
                            <select
                              value={student.status}
                              onChange={(e) =>
                                handleUpdateStatus(student.id, e.target.value)
                              }
                              className="text-sm bg-gray-700 text-white rounded-lg px-2 py-1.5 border border-gray-600"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </>
          }
        </div>
      </div>

      {/* Student Details Modal */}
      <Modal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-300 text-2xl">
                  {selectedStudent.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {selectedStudent.name}
                </h3>
                <p className="text-gray-400">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">
                  Enrolled Courses
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedStudent.enrolledCourses}
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">
                  Completed Courses
                </div>
                <div className="text-2xl font-bold text-white">
                  {selectedStudent.completedCourses}
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Total Spent</div>
                <div className="text-2xl font-bold text-white">
                  ${selectedStudent.totalSpent}
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Member Since</div>
                <div className="text-white">
                  {formatDate(selectedStudent.joinedAt)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3">Enrolled Courses</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded mr-3"></div>
                      <div>
                        <div className="text-white">Course Title {i}</div>
                        <div className="text-xs text-gray-400">
                          Progress: 60%
                        </div>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">In Progress</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Send Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={`Send Message to ${selectedStudent?.name}`}
      >
        <div className="space-y-4">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here..."
            className="input-field w-full min-h-[150px]"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowMessageModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleMessageSubmit}
              disabled={!messageText.trim()}
              className="btn-primary"
            >
              Send Message
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Students;
