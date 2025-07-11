import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import html2pdf from "html2pdf.js";
import "react-quill/dist/quill.snow.css";

const Editor = ({ editorText, setEditorText }) => {
  const [docxFile, setDocxFile] = useState(null);

  useEffect(() => {
    if (!docxFile) setEditorText("");
  }, []);

  const handleDocxEditorLoad = async () => {
    if (!docxFile) {
      alert("Please upload a .docx file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", docxFile);

    try {
      const response = await axios.post("https://tailormycv-1.onrender.com/upload-docx/", formData);
      if (response.data.html) {
        setEditorText(response.data.html);
      } else {
        alert("❌ Failed to extract text from DOCX.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    }
  };

  const handleDownloadPDF = () => {
    const container = document.createElement("div");
    container.innerHTML = editorText;
    container.style.padding = "30px";
    container.style.fontFamily = "'Arial', sans-serif";
    container.style.lineHeight = "1.6";
    container.style.color = "#000";
    container.style.width = "210mm";
    container.style.minHeight = "297mm";
    container.style.backgroundColor = "#fff";

    document.body.appendChild(container);

    html2pdf()
      .from(container)
      .set({
        filename: "Updated_Resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .save()
      .finally(() => {
        document.body.removeChild(container);
      });
  };

  return (
    <div className="mt-16 px-4 sm:px-8 max-w-6xl mx-auto text-white">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text mb-2">
            📝 Resume Editor
          </h2>
          <p className="text-gray-400">Load a DOCX file and polish your resume right in the browser.</p>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="file"
            accept=".docx"
            onChange={(e) => setDocxFile(e.target.files[0])}
            className="file:bg-indigo-600 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded file:border-0 bg-[#121212] text-gray-300 border border-gray-700 rounded w-full"
          />
          <button
            onClick={handleDocxEditorLoad}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition w-full md:w-auto"
          >
            ✍️ Load Resume Content
          </button>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-md overflow-hidden">
          <ReactQuill
            theme="snow"
            value={editorText}
            onChange={setEditorText}
            className="h-[500px] text-black"
          />
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition inline-flex items-center gap-2"
          >
            📥 Download Edited Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
