import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
