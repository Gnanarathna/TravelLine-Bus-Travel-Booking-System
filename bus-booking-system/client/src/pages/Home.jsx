import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background of home.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full">
      
      {/* ───── Background Image ───── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>

      {/* ───── Dark Gradient Overlay ───── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

      {/* ───── Hero Content ───── */}
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

      {/* ───── Footer ───── */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-md text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🚌</span>
              <h2 className="text-2xl font-extrabold tracking-wide">TravelLine</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for comfortable and safe bus travel across Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">Home</li>
              <li className="hover:text-white transition cursor-pointer">View Buses</li>
              <li className="hover:text-white transition cursor-pointer">About Us</li>
              <li className="hover:text-white transition cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Why TravelLine */}
          <div className="text-gray-300 text-sm leading-relaxed md:text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Why TravelLine?</h3>
            <p>
              TravelLine helps Sri Lankan travelers find reliable and comfortable buses. 
              Compare routes, check availability, and book your journey with confidence — anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-3 border-t border-white/20 text-gray-300 text-sm">
          {new Date().getFullYear()} TravelLine Bus Booking. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;