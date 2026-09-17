import { useState } from "react";
import { UploadCloud, FileText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import api from "../services/api";
import logo from "../assets/logo.png";

function Hero({ setAnalysis, analysis }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/plain": [".log", ".txt"],
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const content = await file.arrayBuffer();
      const bytes = new Uint8Array(content);
      let binary = "";
      const chunkSize = 0x8000;

      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
      }

      const res = await api.post("/upload/encoded", {
        filename: file.name,
        content: btoa(binary),
      });

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`transition-all duration-500 ${
        analysis ? "mb-10" : "min-h-[85vh]"
      } flex flex-col justify-center`}
    >
      {/* Badge */}

      <div className="mb-6 flex justify-center">

        <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
          Web Server Security Platform
        </div>

      </div>

      {/* Heading */}

<div className="flex flex-col items-center">

  <div className="flex items-center justify-center gap-6">

    <img
      src={logo}
      alt="WSL Analyzer"
      className="h-20 w-20 object-contain drop-shadow-lg"
    />

    <h1 className="font-['Outfit'] text-6xl font-bold tracking-tight text-white">
      WSL Analyzer
    </h1>

  </div>

  <p className="mt-6 max-w-3xl text-center text-lg leading-8 text-zinc-400">

    Analyze Apache and Nginx access logs to identify SQL Injection,
    Cross Site Scripting, Directory Traversal, Command Injection,
    Security Scanners and suspicious web requests.

  </p>

</div>

        

      {/* Upload */}

      <div className="mx-auto mt-14 w-full max-w-3xl">

        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 transition-all

          ${
            isDragActive
              ? "border-amber-500 bg-amber-500/10"
              : "border-zinc-700 bg-zinc-900 hover:border-amber-400"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center">

            <div className="rounded-full bg-zinc-800 p-6">

              <UploadCloud
                size={40}
                className="text-amber-400"
              />

            </div>

            <h2 className="mt-6 text-2xl font-semibold text-white">

              {file ? file.name : "Drop your log file here"}

            </h2>

            <p className="mt-2 text-zinc-400">

              or click to browse your computer

            </p>

            <div className="mt-8 flex gap-3">

              <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                Apache
              </span>

              <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                Nginx
              </span>

              <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                .log
              </span>

            </div>

          </div>

        </div>

        {/* Upload Button */}

        <div className="mt-8 flex justify-center">

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="rounded-xl bg-amber-500 px-10 py-4 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Log"}
          </button>

        </div>

      </div>

      {/* Bottom Features */}

      {!analysis && (
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <FileText className="mb-4 text-amber-400" />

            <h3 className="font-semibold text-white">
              Log Parsing
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Parses Apache and Nginx access logs with structured extraction.
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <ShieldCheck className="mb-4 text-amber-400" />

            <h3 className="font-semibold text-white">
              Threat Detection
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Detects SQLi, XSS, Traversal, Command Injection and scanners.
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <UploadCloud className="mb-4 text-amber-400" />

            <h3 className="font-semibold text-white">
              Security Report
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Generates attack summaries, statistics and risk insights.
            </p>

          </div>

        </div>
      )}
    </motion.section>
  );
}

export default Hero;