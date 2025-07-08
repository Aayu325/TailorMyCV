// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-[#121212] text-white px-6 py-4 shadow-md flex justify-between items-center">
    <Link to="/" className="text-2xl font-bold text-blue-400">TailorMyCv</Link>
    <div className="space-x-6">
      <Link to="/Resume-Edit" className="hover:text-blue-400">✍️ Edit Resume</Link>
      <Link to="/Resume-Match" className="hover:text-blue-400">📄 Match Resume</Link>
    </div>
  </nav>
);

export default Navbar;
