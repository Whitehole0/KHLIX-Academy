import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/SignUp";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Student from "./Pages/admin/Student";
// import Home from "./Admin/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        /*{" "}
        <div className="bg-blue-900 py-5">
          <nav className="flex justify-between items-center text-white font-semibold max-w-[1200px] mx-auto">
            <Link to="/">
              {" "}
              <div>AUTH</div>
            </Link>
            <ul className="flex gap-3">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/About">
                <li>About</li>
              </Link>
              <Link to="/sign-in">
                <li>Signin</li>
              </Link>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About">About</Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Student />} />
          {/* <Route path="/adminDashboard" element={<Home />}></Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
