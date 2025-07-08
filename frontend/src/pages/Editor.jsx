import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import html2pdf from "html2pdf.js";
import "react-quill/dist/quill.snow.css";

const Editor = ({ editorText, setEditorText }) => {
  const [docxFile, setDocxFile] = useState(null);

  // Clear any accidental pre-filled content
  useEffect(() => {
    if (!docxFile) setEditorText(""); // Only clear when editor is first loaded
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
  // Create a hidden container to render the editor content
  const container = document.createElement("div");
  container.innerHTML = editorText;
  container.style.padding = "30px";
  container.style.fontFamily = "'Arial', sans-serif";
  container.style.lineHeight = "1.6";
  container.style.color = "#000";
  container.style.width = "210mm"; // A4 width
  container.style.minHeight = "297mm"; // A4 height
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
    <div className="mt-10 p-6 max-w-5xl mx-auto bg-[#121212] text-white rounded-2xl shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold mb-6 text-center text-indigo-400 flex items-center justify-center gap-2">
        📝 Resume Editor
      </h3>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <label className="font-medium">Upload .docx File:</label>
        <input
          type="file"
          accept=".docx"
          onChange={(e) => setDocxFile(e.target.files[0])}
          className="border border-gray-600 bg-[#1f1f1f] text-white px-3 py-2 rounded focus:outline-none"
        />
        <button
          onClick={handleDocxEditorLoad}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
        >
          ✍️ Load Resume Content
        </button>
      </div>

      <div className="bg-white text-black rounded overflow-hidden">
        <ReactQuill
          theme="snow"
          value={editorText}
          onChange={setEditorText}
          className="h-[500px] text-black"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold flex items-center gap-2 transition"
        >
          📥 Download Edited Resume
        </button>
      </div>
    </div>
  );
};

export default Editor;
