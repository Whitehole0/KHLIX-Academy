import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "./signIn";
import { useState } from "react";
import { api } from "../utils/api";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("You dont enter you name");
    }

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
      const res = await api.post("/api/register", { name, email, password });

      console.log("Login success:", res.data);

      // Redirect to dashboard
      navigate("/sign-in");
    } catch (err) {
      setError(err.response?.data || "signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10">
      <h1 className="text-center font-semibold text-3xl text-blue-900">
        Sign <span className="text-red-800">Up</span>{" "}
      </h1>
      <form
        className="flex flex-col gap-4 max-w-[500px] mx-auto mt-10 "
        onSubmit={handleSignup}
      >
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="rounded-2xl outline-0 p-2.5 border-1 border-gray-400"
          onChange={(e) => setName(e.target.value)}
        />
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

        <button className="rounded-2xl bg-blue-950 p-2.5 text-white hover:opacity-80">
          {loading ? "signning-up..." : "SignUp"}
        </button>

        <button className="rounded-2xl bg-red-900 p-2.5 text-white hover:opacity-80">
          SignUp with Google
        </button>
      </form>

      <div className="flex flex-col items-center mt-6">
        <p>Do you have an account?</p>
        <Link to="/sign-in">
          <p className="text-blue-600 text-underline"> sign-In</p>
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
