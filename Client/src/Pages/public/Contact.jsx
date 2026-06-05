// src/pages/public/Contact.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setLoading(false);
  };

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 400",
      country: "USA",
      phone: "+1 (555) 123-4567",
      email: "sf@khlix.com",
    },
    {
      city: "London",
      address: "45 Oxford Street",
      country: "UK",
      phone: "+44 20 7946 0123",
      email: "london@khlix.com",
    },
    {
      city: "Singapore",
      address: "10 Marina Boulevard",
      country: "Singapore",
      phone: "+65 6789 0123",
      email: "sg@khlix.com",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-gray-400 mb-8">
              We've received your message and will get back to you within 24
              hours.
            </p>
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input-field w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="card space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Email Us
                </h3>
                <p className="text-gray-400 mb-2">General Inquiries</p>
                <a
                  href="mailto:hello@khlix.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  hello@khlix.com
                </a>
                <p className="text-gray-400 mt-4 mb-2">Support</p>
                <a
                  href="mailto:support@khlix.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  support@khlix.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Call Us
                </h3>
                <p className="text-gray-400 mb-2">Sales</p>
                <a
                  href="tel:+18001234567"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  +1 (800) 123-4567
                </a>
                <p className="text-gray-400 mt-4 mb-2">Support</p>
                <a
                  href="tel:+18007654321"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  +1 (800) 765-4321
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Our Offices
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {office.city}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{office.address}</p>
                <p className="text-gray-400 text-sm mb-2">{office.country}</p>
                <p className="text-gray-400 text-sm mb-1">{office.phone}</p>
                <a
                  href={`mailto:${office.email}`}
                  className="text-indigo-400 text-sm"
                >
                  {office.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
