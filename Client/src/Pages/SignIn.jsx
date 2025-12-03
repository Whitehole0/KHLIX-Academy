import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [login] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Your email is invalid, Please enter a valid email");
      return;
    }

    if (!password) {
      setError("You dont enter a Password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await login("/api/login", { email, password });

      console.log("Login success:", res.data);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 ">
      <h1 className="text-center font-semibold text-3xl text-blue-900 ">
        Sign <span className="text-red-800">In</span>
      </h1>
      <form
        className="flex flex-col gap-4 max-w-[500px] mx-auto mt-10 "
        onSubmit={handleLogin}
      >
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="rounded-2xl outline-0 p-2.5 border-1 border-gray-400"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-2xl outline-0 p-2.5 border-1 border-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 font-semibold text-2xl font-mono ">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-2xl bg-blue-950 p-2.5 text-white hover:opacity-80"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button className="rounded-2xl bg-red-900 p-2.5 text-white hover:opacity-80">
          SignIn with Google
        </button>
      </form>

      <div className="flex flex-col items-center mt-6">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <p className="text-blue-600 text-underline"> sign-up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
