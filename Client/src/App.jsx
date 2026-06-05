// src/App.jsx (Updated with new routes)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import CourseListing from "./pages/public/CourseListing";
import CourseDetail from "./pages/public/CourseDetail";
import About from "./pages/public/About";
import Pricing from "./pages/public/Pricing";
import Contact from "./pages/public/Contact";
import FAQ from "./pages/public/FAQ";
import Blog from "./pages/public/Blog";
import BlogPost from "./pages/public/BlogPost";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourse from "./pages/student/Course";
import StudentLesson from "./pages/student/Lesson";
import StudentProfile from "./pages/student/Profile";
import StudentWishlist from "./pages/student/Wishlist";
import StudentCertificates from "./pages/student/Certificates";
import StudentLearningHistory from "./pages/student/LearningHistory";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import CreateCourse from "./pages/admin/CreateCourse";
import AdminCourse from "./pages/admin/AdminCourse";
import UploadLesson from "./pages/admin/UploadLesson";
import AdminSettings from "./pages/admin/Settings";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminStudents from "./pages/admin/Students";
import AdminReviews from "./pages/admin/Reviews";
import AdminCoupons from "./pages/admin/Coupons";
import AdminCategories from "./pages/admin/Categories";

// Error Pages
// import Unauthorized from "./pages/Unauthorized";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/courses" element={<CourseListing />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Student Routes */}
                <Route
                  path="/student/dashboard"
                  element={
                    <StudentRoute>
                      <StudentDashboard />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/profile"
                  element={
                    <StudentRoute>
                      <StudentProfile />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/wishlist"
                  element={
                    <StudentRoute>
                      <StudentWishlist />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/certificates"
                  element={
                    <StudentRoute>
                      <StudentCertificates />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/history"
                  element={
                    <StudentRoute>
                      <StudentLearningHistory />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/course/:courseId"
                  element={
                    <StudentRoute>
                      <StudentCourse />
                    </StudentRoute>
                  }
                />
                <Route
                  path="/student/lesson/:lessonId"
                  element={
                    <StudentRoute>
                      <StudentLesson />
                    </StudentRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <AdminRoute>
                      <AdminAnalytics />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/students"
                  element={
                    <AdminRoute>
                      <AdminStudents />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/reviews"
                  element={
                    <AdminRoute>
                      <AdminReviews />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/coupons"
                  element={
                    <AdminRoute>
                      <AdminCoupons />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <AdminCategories />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/create-course"
                  element={
                    <AdminRoute>
                      <CreateCourse />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/course/:courseId"
                  element={
                    <AdminRoute>
                      <AdminCourse />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/course/:courseId/upload-lesson"
                  element={
                    <AdminRoute>
                      <UploadLesson />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <AdminRoute>
                      <AdminSettings />
                    </AdminRoute>
                  }
                />

                {/* Error Routes */}
                {/* <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />*/}
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
