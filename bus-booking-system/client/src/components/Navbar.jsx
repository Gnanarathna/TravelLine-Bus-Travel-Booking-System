import { useAtom } from "jotai";
import { tokenAtom } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    bg-black/30 backdrop-blur-md 
                    border-b border-white/10 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-3 
                      flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl drop-shadow-lg">🚌</span>
          <span className="text-white font-extrabold text-2xl tracking-wide drop-shadow">
            TravelLine
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">

          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/buses" className="hover:text-yellow-300 transition">View Buses</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-white/40 
                           hover:bg-white hover:text-blue-700 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold 
                           hover:bg-gray-200 transition shadow-md"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-lg bg-white text-blue-700 font-semibold 
                           hover:bg-gray-200 transition shadow-md"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg border border-red-400 text-red-300 
                           hover:bg-red-500 hover:text-white hover:border-red-500 
                           transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-3xl md:hidden drop-shadow"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-black/70 backdrop-blur-md 
                        text-white px-6 pb-4 space-y-4 border-t border-white/10">

          <Link to="/" className="block">Home</Link>
          <Link to="/buses" className="block">View Buses</Link>
          <Link to="/about" className="block">About</Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="block w-full py-2 rounded bg-white text-blue-700 font-semibold text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block w-full py-2 rounded bg-white text-blue-700 font-semibold text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block w-full py-2 rounded bg-white text-blue-700 font-semibold text-center"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full py-2 rounded border border-white/40 text-center"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
