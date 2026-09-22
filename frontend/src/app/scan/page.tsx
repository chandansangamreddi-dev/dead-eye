"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  ScanLine,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";

type AnalysisResult = {
  observation: {
    visible_text: string;
    sender: string;
    subject: string;
    urls: string[];
    call_to_action: string;
    urgency: boolean;
    credential_request: boolean;
    financial_targeting: boolean;
    impersonation: boolean;
    account_threat: boolean;
  };

  analysis: {
    risk_level: "SAFE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    threat_type: string;
    confidence: number;
    evidence: string[];
    explanation: string;
    recommended_action: string;
    guardian_action: "ALLOW" | "WARN" | "BLOCK";
  };
};

export default function ScanPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError(null);
    setResult(null);

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeScreenshot = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(
          errorBody?.detail ||
            `Analysis failed with status ${response.status}`
        );
      }

      const data: AnalysisResult = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the screenshot."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const riskColor = result
    ? {
        SAFE: "text-[#A7F3D0]",
        LOW: "text-[#A7F3D0]",
        MEDIUM: "text-yellow-300",
        HIGH: "text-orange-300",
        CRITICAL: "text-red-300",
      }[result.analysis.risk_level]
    : "";

  return (
    <main className="min-h-screen bg-[#060809] text-white">
      <div className="mx-auto min-h-screen max-w-md px-5 pb-10 pt-7">

        {/* Header */}
        <header className="flex items-center gap-4">

          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/30">
              DEAD EYE
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Screenshot Scan
            </h1>
          </div>

        </header>

        {/* Intro */}
        <section className="mt-8">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A7F3D0]/10 text-[#A7F3D0]">
            <ShieldCheck size={23} />
          </div>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight">
            See what's hiding
            <br />
            in your screen.
          </h2>

          <p className="mt-3 max-w-[310px] text-sm leading-5 text-white/40">
            DEAD EYE analyzes screenshots for phishing,
            suspicious messages, dangerous links, and
            social engineering signals.
          </p>

        </section>

        {/* Upload / Preview */}
        <section className="mt-8">

          {!preview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[32px] border border-dashed border-[#A7F3D0]/20 bg-[#101416] transition hover:border-[#A7F3D0]/40 hover:bg-[#121918]"
            >

              <div className="absolute h-48 w-48 rounded-full bg-[#69e9b6]/10 blur-[70px]" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#A7F3D0]/15 bg-[#A7F3D0]/10 text-[#A7F3D0] transition group-hover:scale-105">
                <ImagePlus size={31} strokeWidth={1.5} />
              </div>

              <h3 className="relative mt-6 text-base font-medium">
                Choose a screenshot
              </h3>

              <p className="relative mt-2 text-xs text-white/30">
                PNG, JPG or WEBP
              </p>

            </button>
          ) : (
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#101416]">

              <img
                src={preview}
                alt="Selected screenshot"
                className="max-h-[520px] w-full object-contain"
              />

              <button
                onClick={clearFile}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xl"
              >
                <X size={18} />
              </button>

            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

        </section>

        {/* Analyze Button */}
        {selectedFile && !result && (
          <button
            onClick={analyzeScreenshot}
            disabled={isAnalyzing}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#A7F3D0] px-6 py-4 font-semibold text-[#07110c] shadow-[0_10px_40px_rgba(80,230,170,0.15)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >

            {isAnalyzing ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />

                Analyzing...
              </>
            ) : (
              <>
                <ScanLine size={19} />

                Analyze with DEAD EYE
              </>
            )}

          </button>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-[24px] border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Analysis Result */}
        {result && (
          <section className="mt-7">

            <div
              className={`rounded-[32px] border border-white/[0.08] bg-[#101416] p-6 ${
                result.analysis.guardian_action === "BLOCK"
                  ? "shadow-[0_20px_70px_rgba(248,113,113,0.08)]"
                  : ""
              }`}
            >

              {/* Verdict */}
              <div className="flex items-center justify-between">

                <div
                  className={`text-xs font-semibold tracking-[0.16em] ${riskColor}`}
                >
                  {result.analysis.risk_level} THREAT
                </div>

                <div className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-white/50">
                  {Math.round(
                    result.analysis.confidence * 100
                  )}
                  % confidence
                </div>

              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                {result.analysis.threat_type}
              </h2>

              <p className="mt-3 text-sm leading-5 text-white/40">
                {result.analysis.explanation}
              </p>

              {/* Evidence */}
              <div className="mt-7">

                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/30">
                  WHY WE FLAGGED IT
                </p>

                <div className="mt-3 space-y-2">

                  {result.analysis.evidence.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-2xl bg-white/[0.035] p-3"
                      >
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#A7F3D0]" />

                        <p className="text-xs leading-5 text-white/65">
                          {item}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Action */}
              <div
                className={`mt-6 rounded-[24px] p-4 ${
                  result.analysis.guardian_action === "BLOCK"
                    ? "border border-red-400/20 bg-red-400/[0.06]"
                    : "border border-yellow-300/15 bg-yellow-300/[0.05]"
                }`}
              >

                <p
                  className={`text-[10px] font-semibold tracking-[0.18em] ${
                    result.analysis.guardian_action === "BLOCK"
                      ? "text-red-300"
                      : "text-yellow-300"
                  }`}
                >
                  GUARDIAN ACTION
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {result.analysis.guardian_action === "BLOCK"
                    ? "ACTION BLOCKED"
                    : result.analysis.guardian_action}
                </p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {result.analysis.recommended_action}
                </p>

              </div>

            </div>

            {/* Scan Again */}
            <button
              onClick={clearFile}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/70"
            >
              <ScanLine size={17} />
              Scan another screenshot
            </button>

          </section>
        )}

        {/* Privacy */}
        {!result && (
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] text-white/25">
            <ShieldCheck size={13} />
            Your screenshot is analyzed locally.
          </div>
        )}

      </div>
    </main>
  );
}