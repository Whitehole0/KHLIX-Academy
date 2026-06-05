// src/components/ErrorBoundary.jsx
import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl text-red-500 mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-400 mb-8 max-w-md">
              We apologize for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary block w-full"
              >
                Refresh Page
              </button>
              <Link to="/" className="btn-secondary block w-full">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
