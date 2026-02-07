// src/pages/public/LandingPage.jsx
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      title: "Upload & Create",
      description:
        "Easily upload videos and create structured courses with our intuitive admin tools.",
      icon: "📤",
    },
    {
      title: "Enroll & Learn",
      description:
        "Browse courses and enroll with one click. Start learning immediately.",
      icon: "🎓",
    },
    {
      title: "Track Progress",
      description:
        "Monitor your learning journey with detailed progress tracking and analytics.",
      icon: "📊",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master New Skills with
              <span className="text-indigo-400"> Khlix Academy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              A professional learning platform where experts share knowledge and
              students achieve their goals. Join thousands of learners today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-lg px-8 py-3">
                Browse Courses
              </Link>
              <Link to="/register" className="btn-secondary text-lg px-8 py-3">
                Start Learning Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">
            Why Choose Khlix Academy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Join Khlix Academy today and get access to hundreds of courses
            taught by industry experts.
          </p>
          <Link
            to="/register"
            className="btn-primary text-lg px-10 py-3 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
