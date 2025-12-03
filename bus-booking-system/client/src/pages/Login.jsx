import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, tokenAtom, roleAtom } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [, setRole] = useAtom(roleAtom);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      setRole(res.data.user.role);

      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/google-login", {
        token: credentialResponse.credential,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      setRole(res.data.user.role);

      navigate("/");
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl p-8 rounded-3xl border border-white/40 animate-fadeIn">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <span className="text-6xl animate-bounce">🚌</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500">Login to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          New here?{" "}
          <a href="/Register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
