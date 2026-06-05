// src/pages/public/FAQ.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState("general");
  const [openItems, setOpenItems] = useState([]);

  const categories = [
    { id: "general", name: "General Questions" },
    { id: "account", name: "Account & Billing" },
    { id: "courses", name: "Courses & Learning" },
    { id: "technical", name: "Technical Support" },
  ];

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "What is Khlix Academy?",
      answer:
        "Khlix Academy is an online learning platform that offers high-quality courses in technology, business, and creative skills. Our courses are taught by industry experts and designed to help you advance your career.",
    },
    {
      id: 2,
      category: "general",
      question: "How does Khlix Academy work?",
      answer:
        "You can browse our course catalog, choose a course that interests you, and start learning immediately. Courses include video lessons, practical exercises, and projects. You can learn at your own pace and access the content anytime.",
    },
    {
      id: 3,
      category: "account",
      question: "How do I create an account?",
      answer:
        'Click the "Sign Up" button on our homepage, enter your name, email, and password, and you\'re ready to start learning. You can also sign up with your Google or GitHub account.',
    },
    {
      id: 4,
      category: "account",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely.",
    },
    {
      id: 5,
      category: "account",
      question: "Can I get a refund?",
      answer:
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course, contact our support team within 30 days of purchase for a full refund.",
    },
    {
      id: 6,
      category: "courses",
      question: "Are the courses self-paced?",
      answer:
        "Yes, all courses are self-paced. You can learn at your own speed and access the content 24/7. There are no deadlines or schedules to follow.",
    },
    {
      id: 7,
      category: "courses",
      question: "Do I get a certificate?",
      answer:
        "Yes, upon completing a course, you'll receive a certificate of completion that you can share on LinkedIn or add to your resume.",
    },
    {
      id: 8,
      category: "courses",
      question: "How long do I have access to a course?",
      answer:
        "Once you purchase a course, you have lifetime access. You can revisit the content anytime, even after completing the course.",
    },
    {
      id: 9,
      category: "technical",
      question: "What are the system requirements?",
      answer:
        "You need a modern web browser (Chrome, Firefox, Safari, Edge) and a stable internet connection. For mobile learning, you can use our mobile app available for iOS and Android.",
    },
    {
      id: 10,
      category: "technical",
      question: "Can I download videos for offline viewing?",
      answer:
        "Yes, with our mobile app, you can download course videos and watch them offline. This feature is available for all paid courses.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400">
            Find answers to common questions about Khlix Academy
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="input-field w-full pl-12 pr-4 py-3"
            />
            <div className="absolute left-4 top-3.5 text-gray-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setOpenCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                openCategory === cat.id ?
                  "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryFaqs = groupedFaqs[category.id] || [];
            if (openCategory !== category.id || categoryFaqs.length === 0)
              return null;

            return (
              <div key={category.id} className="space-y-3">
                {categoryFaqs.map((faq) => (
                  <div key={faq.id} className="card">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-medium text-white">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          openItems.includes(faq.id) ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openItems.includes(faq.id) && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 opacity-30">🔍</div>
              <h3 className="text-xl text-white mb-2">No results found</h3>
              <p className="text-gray-400">
                Try different keywords or contact support
              </p>
            </div>
          )}
        </div>

        {/* Still have questions */}
        <div className="mt-12 card text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
