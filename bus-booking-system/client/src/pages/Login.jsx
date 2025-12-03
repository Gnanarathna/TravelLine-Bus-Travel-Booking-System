import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, tokenAtom, roleAtom } from "../context/auth";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password:</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
