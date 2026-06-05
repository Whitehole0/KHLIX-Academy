// src/pages/public/Pricing.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Access to 50+ courses",
        "Basic exercises",
        "Community access",
        "Email support",
        "Certificate of completion",
      ],
      limitations: ["No projects", "No mentor sessions", "Basic analytics"],
      buttonText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      description: "For serious learners",
      monthlyPrice: 59,
      yearlyPrice: 590,
      features: [
        "Access to 150+ courses",
        "Advanced projects",
        "Priority community access",
        "Priority email support",
        "All certificates",
        "Downloadable resources",
        "Progress tracking",
      ],
      limitations: [],
      buttonText: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Everything in Pro",
        "Team management",
        "Custom learning paths",
        "Dedicated account manager",
        "API access",
        "SSO integration",
        "Advanced analytics",
        "Custom reporting",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. No questions asked.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, all plans come with a 14-day free trial. No credit card required.",
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "Yes, we offer 30% off for verified students. Contact support to apply.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "150+ Courses",
      description: "Access our entire course library",
    },
    {
      icon: "🎓",
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      icon: "📱",
      title: "Mobile Learning",
      description: "Learn on the go with our mobile app",
    },
    {
      icon: "🔒",
      title: "Lifetime Access",
      description: "Access purchased courses forever",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day
            free trial.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === "monthly" ?
                  "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === "yearly" ?
                  "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative ${
                plan.popular ?
                  "border-indigo-500 shadow-lg shadow-indigo-500/10"
                : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">
                  $
                  {billingCycle === "monthly" ?
                    plan.monthlyPrice
                  : plan.yearlyPrice}
                </span>
                <span className="text-gray-400">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <Link
                to={plan.name === "Enterprise" ? "/contact" : "/register"}
                className={`block text-center py-3 rounded-lg font-medium mb-6 ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.buttonText}
              </Link>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}

                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start opacity-50">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 mb-4">
              Still have questions? We're here to help.
            </p>
            <Link to="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
