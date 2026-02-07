// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import LandingPage from "./Pages/public/LandingPage";
import CourseListing from "./pages/public/CourseListing";
import CourseDetail from "./pages/public/CourseDetail";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourse from "./pages/student/Course";
import StudentLesson from "./pages/student/Lesson";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import CreateCourse from "./pages/admin/CreateCourse";
import AdminCourse from "./pages/admin/AdminCourse";
import UploadLesson from "./pages/admin/UploadLesson";

// Error Pages
// import Unauthorized from "./pages/Unauthorized";
// import NotFound from "./pages/NotFound";

function App() {
  return (
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

              {/* Error Routes */}
              {/* <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import SignIn from "./Pages/signIn";
// import SignUp from "./Pages/SignUp";
// import AdminDashboard from "./Pages/admin/AdminDashboard";
// import Student from "./Pages/admin/Student";
// // import Home from "./Admin/Home";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         {/* <div className="bg-blue-900 py-5">
//           <nav className="flex justify-between items-center text-white font-semibold max-w-[1200px] mx-auto">
//             <Link to="/">
//               {" "}
//               <div>AUTH</div>
//             </Link>
//             <ul className="flex gap-3">
//               <Link to="/">
//                 <li>Home</li>
//               </Link>
//               <Link to="/About">
//                 <li>About</li>
//               </Link>
//               <Link to="/sign-in">
//                 <li>Signin</li>
//               </Link>
//             </ul>
//           </nav>
//         </div> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/About">About</Route>
//           <Route path="/sign-in" element={<SignIn />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/admin/students" element={<Student />} />
//           {/* <Route path="/adminDashboard" element={<Home />}></Route> */}
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
