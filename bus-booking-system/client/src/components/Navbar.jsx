import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom, tokenAtom, roleAtom } from "../context/auth";

function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [, setRole] = useAtom(roleAtom);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center 
                    bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#bfdbfe]">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-black flex items-center gap-2">
        <span>🚌</span> TravelLine
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/bookings" className="text-black hover:text-gray-200">
              My Bookings
            </Link>

            {user.role === "admin" && (
              <Link to="/admin/buses" className="text-black hover:text-gray-200">
                Manage Buses
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-black text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-black font-medium hover:text-gray-200"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
