import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0e0e0e] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          TailorMyCv
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {[
            { name: "✍️ Edit Resume", to: "/Resume-Edit" },
            { name: "📄 Match Resume", to: "/Resume-Match" },
          ].map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="relative group transition"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-xl focus:outline-none"
          aria-label="Open Menu"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="absolute right-0 top-0 w-64 h-full bg-[#1a1a1a] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-blue-400">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl text-white"
                aria-label="Close Menu"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 text-base">
              {[
                { name: "✍️ Edit Resume", to: "/Resume-Edit" },
                { name: "📄 Match Resume", to: "/Resume-Match" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="relative group hover:text-blue-400"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
