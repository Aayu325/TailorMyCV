import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import uploadAnimation from "../assets/animations/upload.json";
import matchAnimation from "../assets/animations/match.json";
import insightAnimation from "../assets/animations/insight.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] text-gray-200 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-28 text-center relative">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-800/10 via-black/30 to-purple-800/10 blur-xl z-0" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Land Your Dream Job Faster
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 mb-10"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Instantly match your resume with job descriptions using smart AI
          </motion.p>
         
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                anim: uploadAnimation,
                title: "Upload Resume",
                desc: "Upload your resume in PDF/DOCX and we'll extract the content.",
              },
              {
                anim: matchAnimation,
                title: "Paste JD",
                desc: "Paste the job description and let the AI compare both.",
              },
              {
                anim: insightAnimation,
                title: "Get Insights",
                desc: "Receive a match score and get suggestions to improve.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1e1e1e] p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center"
                custom={idx + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="w-full flex justify-center items-center h-[200px] mb-4">
                  <Lottie
                    animationData={step.anim}
                    loop
                    className="w-48 h-48"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-14 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-y-8 gap-x-6 text-left justify-items-start">
            {[
              "AI-powered match analysis",
              "Support for PDF & DOCX",
              "In-browser resume editing",
              "Download polished PDF instantly",
              "Secure and blazing fast",
              "Match score with improvement tips",
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-start space-x-4"
                custom={idx + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <FaCheckCircle className="text-green-400 mt-1" size={20} />
                <p className="text-gray-300 text-lg">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-900 to-purple-900">
        <motion.h2
          className="text-4xl font-bold mb-4 text-white"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          Ready to Supercharge Your Job Hunt?
        </motion.h2>
        <motion.p
          className="text-lg mb-6 text-gray-200"
          initial="hidden"
          whileInView="visible"
          custom={2}
          variants={fadeUp}
        >
          Let our AI do the heavy lifting while you prepare to shine.
        </motion.p>
        <motion.a
          href="/Resume-Match"
          className="bg-white text-blue-800 font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition transform hover:scale-110"
          initial="hidden"
          whileInView="visible"
          custom={3}
          variants={fadeUp}
        >
          Try Resume Matcher →
        </motion.a>
      </section>

      {/* <footer className="text-center text-sm text-gray-500 py-6 bg-[#101010] border-t border-gray-800">
        © {new Date().getFullYear()} ResumeMatcher.ai – All Rights Reserved.
      </footer> */}
    </div>
  );
};

export default LandingPage;
