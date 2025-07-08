import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 py-6 text-center text-sm border-t border-gray-800">
        © {new Date().getFullYear()} TailorMyCv. Built By Aayush Goyal.
      </footer>
  )
}

export default Footer