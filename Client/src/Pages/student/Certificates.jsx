// src/pages/student/Certificates.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import EmptyState from "../../components/EmptyState";
import Skeleton from "../../components/Skeleton";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockCertificates = [
      {
        id: 1,
        courseId: 101,
        courseTitle: "React Masterclass: From Beginner to Advanced",
        studentName: "John Doe",
        issueDate: "2024-03-15",
        expiryDate: null,
        credentialId: "CERT-REACT-2024-001",
        grade: "A",
        hoursCompleted: 42,
        instructor: "Sarah Johnson",
        signature: "Dr. Robert Chen",
      },
      {
        id: 2,
        courseId: 102,
        courseTitle: "JavaScript: The Complete Guide",
        studentName: "John Doe",
        issueDate: "2024-02-20",
        expiryDate: null,
        credentialId: "CERT-JS-2024-089",
        grade: "A-",
        hoursCompleted: 38,
        instructor: "Michael Brown",
        signature: "Dr. Robert Chen",
      },
      {
        id: 3,
        courseId: 103,
        courseTitle: "Python for Data Science and Machine Learning",
        studentName: "John Doe",
        issueDate: "2024-01-10",
        expiryDate: null,
        credentialId: "CERT-PYTHON-2024-156",
        grade: "A+",
        hoursCompleted: 56,
        instructor: "Emily Davis",
        signature: "Dr. Robert Chen",
      },
    ];

    setCertificates(mockCertificates);
    setLoading(false);
  };

  const handleDownload = (certificate) => {
    // Simulate PDF download
    alert(`Downloading certificate: ${certificate.courseTitle}`);
  };

  const handleShare = (certificate) => {
    // Simulate sharing
    const url = `https://khlix.com/verify/${certificate.credentialId}`;
    navigator.clipboard?.writeText(url);
    alert("Verification link copied to clipboard!");
  };

  const handleVerify = (certificate) => {
    window.open(
      `https://khlix.com/verify/${certificate.credentialId}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton count={3} type="card" />
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
            My Certificates
          </h1>
          <p className="text-gray-400">
            View and download your earned certificates
          </p>
        </div>

        {certificates.length === 0 ?
          <EmptyState
            icon="🏆"
            title="No certificates yet"
            message="Complete courses to earn certificates and showcase your achievements"
            action={() => (window.location.href = "/courses")}
            actionText="Browse Courses"
          />
        : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="card hover:border-indigo-500 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedCertificate(cert);
                  setShowCertificateModal(true);
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(cert);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
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

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Issued{" "}
                    {new Date(cert.issueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                  <div>
                    <div className="text-gray-400">Credential ID</div>
                    <div className="text-white font-mono text-xs">
                      {cert.credentialId}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Grade</div>
                    <div className="text-white font-medium">{cert.grade}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(cert);
                    }}
                    className="flex-1 btn-secondary text-sm py-2"
                  >
                    Share
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerify(cert);
                    }}
                    className="flex-1 btn-primary text-sm py-2"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>

      {/* Certificate Modal */}
      <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        title="Certificate of Completion"
        size="lg"
      >
        {selectedCertificate && (
          <div className="bg-white text-gray-900 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">K</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Certificate of Completion
              </h1>
              <p className="text-gray-600">This certifies that</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-4xl font-bold text-indigo-600 mb-2">
                {selectedCertificate.studentName}
              </p>
              <p className="text-xl text-gray-700 mb-4">
                has successfully completed
              </p>
              <p className="text-2xl font-bold mb-6">
                {selectedCertificate.courseTitle}
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div>
                  <div className="text-sm text-gray-500">Grade</div>
                  <div className="text-xl font-bold">
                    {selectedCertificate.grade}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Hours</div>
                  <div className="text-xl font-bold">
                    {selectedCertificate.hoursCompleted}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Issue Date</p>
                <p className="font-medium">
                  {new Date(selectedCertificate.issueDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Credential ID</p>
                <p className="font-mono text-sm">
                  {selectedCertificate.credentialId}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Instructor</p>
                <p className="font-medium">{selectedCertificate.instructor}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Director of Education
                </p>
                <p className="font-medium">{selectedCertificate.signature}</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={() => handleDownload(selectedCertificate)}
                className="btn-primary"
              >
                Download PDF
              </button>
              <button
                onClick={() => handleShare(selectedCertificate)}
                className="btn-secondary"
              >
                Share Certificate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Certificates;
