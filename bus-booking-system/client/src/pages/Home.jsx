import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background of home.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      ></div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        {/* Animated Bus Icon */}
        <div className="text-7xl mb-4 animate-bounce">🚌</div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
          TravelLine Bus Booking
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mt-3 max-w-2xl animate-slideUp">
          Book Sri Lankan bus tickets easily — travel comfortably and safely to any destination.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10 animate-fadeUp">

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/buses")}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition"
          >
            View Buses
          </button>

        </div>
      </div>
    </div>
  );
}

export default Home;
