import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Matcher from './pages/Matcher';
import Editor from './pages/Editor';
import Navbar from './components/Navbar'; // ✅ import Navbar
import Footer from './components/Footer'
function App() {
  const [editorText, setEditorText] = useState("");

  return (
    <Router>
      <div className="bg-[#0e0e0e] text-white min-h-screen min-w-screen">
        <Navbar /> {/* ✅ Always visible */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Resume-Match" element={<Matcher onEditorTextChange={setEditorText} />} />
          <Route path="/Resume-Edit" element={<Editor editorText={editorText} setEditorText={setEditorText} />} />
        </Routes>
      </div>
       <Footer />
    </Router>
  );
}

export default App;
