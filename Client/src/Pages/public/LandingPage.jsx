// src/pages/public/LandingPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { coursesAPI } from "../../services/api";
import CourseCard from "../../components/CourseCard";

const LandingPage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 156,
    activeStudents: 2847,
    completionRate: "92%",
    expertInstructors: 42,
  });

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllCourses();
      // Take first 3 courses as featured
      setFeaturedCourses(response.data.slice(0, 3));
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "🎯",
      title: "Structured Learning Paths",
      description:
        "Follow expertly curated learning paths that take you from beginner to advanced.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description:
        "Track your learning journey with detailed analytics and completion certificates.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of practical experience.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: "💼",
      title: "Career Ready Skills",
      description:
        "Gain skills that are in-demand and directly applicable to real-world scenarios.",
      color: "from-orange-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "Khlix Academy transformed my career. The structured courses helped me land my dream job.",
      avatar: "AJ",
    },
    {
      name: "Maria Garcia",
      role: "Product Manager",
      company: "StartupXYZ",
      content:
        "The quality of instruction is exceptional. I use what I learn every single day.",
      avatar: "MG",
    },
    {
      name: "David Chen",
      role: "Data Scientist",
      company: "DataSystems Inc.",
      content:
        "Best investment in my education. The platform is intuitive and content is top-notch.",
      avatar: "DC",
    },
  ];

  const learningPaths = [
    {
      title: "Web Development",
      description: "Master frontend and backend technologies",
      courses: 12,
      duration: "6 months",
      icon: "💻",
    },
    {
      title: "Data Science",
      description: "Learn analytics, ML, and data visualization",
      courses: 15,
      duration: "8 months",
      icon: "📊",
    },
    {
      title: "Cloud Engineering",
      description: "AWS, Azure, and DevOps practices",
      courses: 10,
      duration: "5 months",
      icon: "☁️",
    },
  ];

  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-700/50 mb-6">
              <span className="text-indigo-300 text-sm font-medium">
                🎉 Join 10,000+ successful learners
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Master In-Demand{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Tech Skills
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Accelerate your career with industry-relevant courses taught by
              top professionals. Learn at your own pace with hands-on projects
              and real-world applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                Explore Courses
              </Link>
              <Link
                to="/register"
                className="btn-secondary text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Start Learning Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Khlix Academy
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with proven educational methods
              to deliver exceptional learning experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="card h-full hover:border-gray-600 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Courses
              </h2>
              <p className="text-gray-400">
                Start your learning journey with our most popular courses
              </p>
            </div>
            <Link
              to="/courses"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View All Courses →
            </Link>
          </div>

          {loading ?
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          : <div className="grid md:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          }
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Follow curated paths designed by industry experts to achieve
              specific career goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className="card hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl">{path.icon}</div>
                  <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-sm rounded-full">
                    {path.courses} courses
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {path.title}
                </h3>
                <p className="text-gray-400 mb-4">{path.description}</p>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
                  <span className="text-gray-400 text-sm">
                    ⏱️ {path.duration}
                  </span>
                  <Link
                    to="/courses"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  >
                    Explore Path →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from our learners who have transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card relative">
                <div className="absolute -top-4 left-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-medium text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers
              with Khlix Academy. Start learning today with our free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-10 py-4 rounded-xl shadow-lg shadow-indigo-500/25"
              >
                Start Free Trial
              </Link>
              <Link
                to="/courses"
                className="btn-secondary text-lg px-10 py-4 rounded-xl"
              >
                Schedule a Demo
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
