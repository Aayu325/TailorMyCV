import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 font-sans">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="py-20 bg-[#1a1a1a] border-b border-gray-800 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
            Boost Your Chances of Getting Hired
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Match your resume to job descriptions using AI in seconds.
          </p>
          <a
            href="/Resume-Match"
            className="inline-block bg-blue-600 text-white text-lg px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <span className="text-white">🚀 Get Started</span>
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#121212] border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                icon: "📄",
                title: "Upload Resume",
                desc: "Upload your PDF or DOCX resume. We’ll extract and analyze the content.",
              },
              {
                icon: "💼",
                title: "Paste JD",
                desc: "Paste any job description you're applying for and let AI do the rest.",
              },
              {
                icon: "🧠",
                title: "Get Insights",
                desc: "Receive a match score, missing keywords, and improvement tips.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700 shadow hover:shadow-md transition"
              >
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {step.icon} {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0f0f0f] border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14 text-white">Features</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "AI-powered match analysis",
              "PDF & DOCX support",
              "Editable resume in browser",
              "Download as styled PDF",
              "Secure and fast processing",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <FaCheckCircle className="text-green-400 mt-1" size={20} />
                <p className="text-gray-300 text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20 text-center border-t border-gray-700">
        <h2 className="text-4xl font-bold mb-4 text-white">Ready to Stand Out?</h2>
        <p className="text-lg mb-6 text-gray-300">
          Try Resume Matcher now – it's fast, simple, and free!
        </p>
        <a
          href="/Resume-Match"
          className="bg-blue-600 text-white font-bold px-8 py-3 rounded hover:bg-blue-700 transition"
        >
          <span className="text-white">Try It Now</span>
        </a>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;
