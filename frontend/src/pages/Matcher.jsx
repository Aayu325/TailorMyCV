import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Matcher = ({ onEditorTextChange }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!resumeFile || jdText.trim().length < 20) {
      alert("📎 Please upload a PDF resume and enter a valid job description (min 20 characters).");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jd_text", jdText);

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("https://tailormycv-1.onrender.com/match/", formData);
      if (response.data.error) {
        alert("❌ " + response.data.error);
        setResult(null);
        onEditorTextChange("");
      } else {
        setResult(response.data);
        onEditorTextChange(response.data.resume_text || "");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong while analyzing. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-2">
          🧠 Resume Matcher AI
        </h2>
        <p className="text-gray-400 text-md">
          Upload your resume, paste the job description, and let AI handle the matching.
        </p>
      </div>

      {/* Form */}
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-800 shadow-xl space-y-6">
        {/* Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            📎 Upload Resume (PDF only)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full file:bg-blue-600 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-md file:border-0 file:mr-4 bg-[#121212] text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* JD */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            📋 Paste Job Description
          </label>
          <textarea
            rows={6}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full bg-[#121212] text-gray-200 border border-gray-700 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold rounded-md transition duration-300 ${
            loading
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "⏳ Processing..." : "🔍 Analyze Match"}
        </button>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-2">
            <motion.div
              className="bg-blue-500 h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      {/* Animated Result */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            className="mt-10 bg-[#111111] border border-gray-700 rounded-2xl p-6 shadow-lg space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              ✅ Match Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm text-gray-300">
                <span className="block font-semibold text-blue-400">Match Score:</span>
                <span className="text-white text-lg">{result.match_score ?? "N/A"} / 100</span>
              </div>

              <div className="text-sm text-gray-300">
                <span className="block font-semibold text-blue-400">Missing Keywords:</span>
                <span className="text-white">{result.missing_keywords?.join(", ") || "None"}</span>
              </div>
            </div>

            <div className="text-sm text-gray-300">
              <span className="block font-semibold text-blue-400">Suggestions:</span>
              <span className="text-white">{result.suggestions || "None"}</span>
            </div>

            <button
              onClick={() => navigate("/Resume-Edit")}
              className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
            >
              ✏️ Edit Resume Instantly
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Matcher;
