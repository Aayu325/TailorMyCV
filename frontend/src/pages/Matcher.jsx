import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    try {
      const response = await axios.post("http://localhost:8000/match/", formData);
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
    <div className="max-w-3xl mx-auto p-6 bg-[#1a1a1a] text-white rounded-2xl shadow-xl space-y-6 border border-gray-800 mt-10">
      <h2 className="text-3xl font-extrabold text-center text-blue-400">📄 AI Resume Matcher</h2>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Upload Resume (PDF):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="w-full rounded-md border border-gray-700 bg-[#121212] p-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Paste Job Description:</label>
        <textarea
          rows={6}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full rounded-md border border-gray-700 bg-[#121212] p-3 text-white shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-3 text-lg font-semibold rounded-md transition duration-300 bg-gray-900 ${
          loading
            ? "bg-gray-600 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "⏳ Processing..." : "🔍 Analyze Match"}
      </button>

      {result && (
        <div className="mt-6 bg-[#111111] border border-gray-700 rounded-xl p-5 shadow-inner space-y-4">
          <h3 className="text-xl font-semibold text-white">🧠 AI Match Results</h3>
          <p>
            <strong className="text-blue-400">✅ Match Score:</strong>{" "}
            <span className="text-white">{result.match_score ?? "N/A"} / 100</span>
          </p>
          <p>
            <strong className="text-blue-400">🔍 Missing Keywords:</strong>{" "}
            <span className="text-white">{result.missing_keywords?.join(", ") || "None"}</span>
          </p>
          <p>
            <strong className="text-blue-400">💡 Suggestions:</strong>{" "}
            <span className="text-white">{result.suggestions || "None"}</span>
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate("/Resume-Edit")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
            >
              ✏️ Edit Your Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matcher;
