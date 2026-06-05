// src/pages/public/About.jsx
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Google engineer with 10+ years in edtech",
      avatar: "SJ",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Michael Chen",
      role: "Head of Education",
      bio: "PhD in Computer Science, 15 years teaching experience",
      avatar: "MC",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Instructor",
      bio: 'Full-stack developer, author of "Modern React"',
      avatar: "ER",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "David Kim",
      role: "Product Director",
      bio: "Ex-Amazon, passionate about learning experience",
      avatar: "DK",
      social: { linkedin: "#", twitter: "#" },
    },
  ];

  const values = [
    {
      title: "Quality First",
      description: "Every course is crafted with care by industry experts",
      icon: "✨",
    },
    {
      title: "Practical Learning",
      description: "Learn by doing with real-world projects",
      icon: "💡",
    },
    {
      title: "Community Driven",
      description: "Join a community of passionate learners",
      icon: "🌍",
    },
    {
      title: "Lifetime Access",
      description: "Access your courses forever, learn at your pace",
      icon: "🔑",
    },
  ];

  const milestones = [
    { year: "2020", event: "Khlix Academy founded" },
    { year: "2021", event: "First 1000 students enrolled" },
    { year: "2022", event: "Launched 50+ courses" },
    { year: "2023", event: "Expanded to 10 countries" },
    { year: "2024", event: "10,000+ successful graduates" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empowering Learners Worldwide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khlix Academy was founded with a simple mission: to make quality
            education accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-4 text-lg">
                To democratize education by providing high-quality, affordable
                learning experiences that help people advance their careers and
                achieve their goals.
              </p>
              <p className="text-gray-400">
                We believe that everyone deserves access to the skills they need
                to succeed in today's rapidly changing world. Whether you're
                just starting your career or looking to level up, Khlix Academy
                is here to support your journey.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="text-6xl mb-4 text-indigo-400">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                By the numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-indigo-400">10k+</div>
                  <div className="text-gray-400">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-400">50+</div>
                  <div className="text-gray-400">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-400">20+</div>
                  <div className="text-gray-400">Experts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-400">92%</div>
                  <div className="text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Passionate educators and industry experts dedicated to your success
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 bg-indigo-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-indigo-300">
                    {member.avatar}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-white"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="w-24 text-lg font-bold text-indigo-400">
                  {milestone.year}
                </div>
                <div className="flex-1 relative">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-indigo-600 rounded-full"></div>
                  <div className="ml-8 pb-8 border-l-2 border-gray-700">
                    <div className="ml-8">
                      <p className="text-white text-lg">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community of Learners
          </h2>
          <p className="text-gray-300 mb-8">
            Start your learning journey today and become part of a global
            community
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
