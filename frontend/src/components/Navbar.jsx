import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#121212] text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          TailorMyCv
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/Resume-Edit" className="hover:text-blue-400">✍️ Edit Resume</Link>
          <Link to="/Resume-Match" className="hover:text-blue-400">📄 Match Resume</Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col space-y-3 md:hidden">
          <Link to="/Resume-Edit" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            ✍️ Edit Resume
          </Link>
          <Link to="/Resume-Match" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            📄 Match Resume
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
