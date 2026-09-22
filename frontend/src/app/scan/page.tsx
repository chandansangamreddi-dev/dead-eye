"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
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

  const [guardianMode, setGuardianMode] = useState(false);
  const [trustedReviewRequested, setTrustedReviewRequested] =
    useState(false);

  useEffect(() => {
    const savedGuardian = localStorage.getItem(
      "dead-eye-guardian"
    );

    setGuardianMode(savedGuardian === "enabled");
  }, []);

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
    setTrustedReviewRequested(false);

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setTrustedReviewRequested(false);

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
    setTrustedReviewRequested(false);

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
        const errorBody = await response
          .json()
          .catch(() => null);

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

  const requestTrustedReview = () => {
    setTrustedReviewRequested(true);
  };

  const getRiskColor = () => {
    if (!result) return "";

    switch (result.analysis.risk_level) {
      case "SAFE":
        return "text-[#A7F3D0]";

      case "LOW":
        return "text-[#A7F3D0]";

      case "MEDIUM":
        return "text-yellow-300";

      case "HIGH":
        return "text-orange-300";

      case "CRITICAL":
        return "text-red-300";

      default:
        return "text-white";
    }
  };

  const guardianBlocking =
    guardianMode &&
    result?.analysis.guardian_action === "BLOCK";

  const standardHighRisk =
    !guardianMode &&
    result?.analysis.guardian_action === "BLOCK";

  return (
    <main className="min-h-screen overflow-hidden bg-[#060809] text-white">

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#55e6ad]/[0.06] blur-[110px]" />

        <div className="absolute -right-32 top-[45%] h-96 w-96 rounded-full bg-[#20a876]/[0.05] blur-[130px]" />

      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-5 pb-10 pt-7">

        {/* Header */}
        <header className="flex items-center gap-4">

          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl"
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
        {!result && (
          <section className="mt-8">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A7F3D0]/10 text-[#A7F3D0]">
              <ShieldCheck size={23} />
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              See what&apos;s hiding
              <br />
              in your screen.
            </h2>

            <p className="mt-3 max-w-[310px] text-sm leading-5 text-white/40">
              DEAD EYE analyzes screenshots for phishing,
              suspicious messages, dangerous links, and
              social engineering signals.
            </p>

            {/* Current protection mode */}
            <div className="mt-5 flex items-center gap-2">

              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  guardianMode
                    ? "bg-[#A7F3D0] shadow-[0_0_10px_rgba(167,243,208,0.7)]"
                    : "bg-yellow-300"
                }`}
              />

              <span
                className={`text-[9px] font-semibold tracking-[0.15em] ${
                  guardianMode
                    ? "text-[#A7F3D0]"
                    : "text-yellow-300"
                }`}
              >
                {guardianMode
                  ? "GUARDIAN PROTECTION ACTIVE"
                  : "STANDARD PROTECTION"}
              </span>

            </div>

          </section>
        )}

        {/* Upload / Preview */}
        <section className={result ? "mt-7" : "mt-8"}>

          {!preview ? (
            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="group relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[32px] border border-dashed border-[#A7F3D0]/20 bg-[#101416] transition hover:border-[#A7F3D0]/40 hover:bg-[#121918]"
            >

              <div className="absolute h-48 w-48 rounded-full bg-[#69e9b6]/10 blur-[70px]" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#A7F3D0]/15 bg-[#A7F3D0]/10 text-[#A7F3D0] transition group-hover:scale-105">
                <ImagePlus
                  size={31}
                  strokeWidth={1.5}
                />
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
                aria-label="Remove screenshot"
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

        {/* Analyze button */}
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

        {/* RESULT */}
        {result && (
          <section className="mt-7">

            {/* Threat card */}
            <div
              className={`relative overflow-hidden rounded-[32px] border bg-[#101416] p-6 ${
                guardianBlocking
                  ? "border-red-400/20 shadow-[0_20px_80px_rgba(248,113,113,0.08)]"
                  : "border-white/[0.08]"
              }`}
            >

              {/* Threat glow */}
              {guardianBlocking && (
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-400/[0.06] blur-[80px]" />
              )}

              <div className="relative">

                {/* Verdict header */}
                <div className="flex items-center justify-between">

                  <div
                    className={`text-[11px] font-semibold tracking-[0.16em] ${getRiskColor()}`}
                  >
                    {result.analysis.risk_level} THREAT
                  </div>

                  <div className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[10px] text-white/50">
                    {Math.round(
                      result.analysis.confidence * 100
                    )}
                    % confidence
                  </div>

                </div>

                <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight">
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

                {/* Guardian Action */}
                <div
                  className={`mt-6 rounded-[24px] p-4 ${
                    guardianBlocking
                      ? "border border-red-400/20 bg-red-400/[0.06]"
                      : standardHighRisk
                        ? "border border-yellow-300/15 bg-yellow-300/[0.05]"
                        : "border border-[#A7F3D0]/15 bg-[#A7F3D0]/[0.04]"
                  }`}
                >

                  {/* Mode label */}
                  <div className="flex items-center gap-2">

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        guardianBlocking
                          ? "bg-red-300"
                          : standardHighRisk
                            ? "bg-yellow-300"
                            : "bg-[#A7F3D0]"
                      }`}
                    />

                    <p
                      className={`text-[10px] font-semibold tracking-[0.18em] ${
                        guardianBlocking
                          ? "text-red-300"
                          : standardHighRisk
                            ? "text-yellow-300"
                            : "text-[#A7F3D0]"
                      }`}
                    >
                      {guardianMode
                        ? "GUARDIAN PROTECTION"
                        : "STANDARD PROTECTION"}
                    </p>

                  </div>

                  {/* Action */}
                  <p className="mt-3 text-xl font-semibold">
                    {guardianBlocking
                      ? "ACTION BLOCKED"
                      : standardHighRisk
                        ? "HIGH-RISK WARNING"
                        : result.analysis.guardian_action}
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-5 text-white/40">

                    {guardianBlocking
                      ? "Guardian Mode has placed this content into protected review. Verify it through a trusted channel before proceeding."
                      : standardHighRisk
                        ? "This content has been classified as high risk. Review the evidence carefully before interacting with it."
                        : result.analysis.recommended_action}

                  </p>

                  {/* Trusted review */}
                  {guardianBlocking && (
                    <button
                      type="button"
                      onClick={requestTrustedReview}
                      disabled={trustedReviewRequested}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-semibold transition ${
                        trustedReviewRequested
                          ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                          : "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                      }`}
                    >

                      {trustedReviewRequested ? (
                        <>
                          <CheckCircle2 size={15} />

                          Trusted review requested
                        </>
                      ) : (
                        <>
                          <UserRoundCheck size={15} />

                          Request trusted review
                        </>
                      )}

                    </button>
                  )}

                </div>

              </div>

            </div>

            {/* Protection explanation */}
            {guardianBlocking && (
              <div className="mt-4 flex gap-3 rounded-[24px] border border-[#A7F3D0]/10 bg-[#A7F3D0]/[0.035] p-4">

                <ShieldAlert
                  size={18}
                  className="mt-0.5 shrink-0 text-[#A7F3D0]"
                />

                <div>

                  <p className="text-xs font-semibold text-[#A7F3D0]">
                    Guardian Mode is active
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/35">
                    DEAD EYE requires an additional review step
                    for high-confidence threats in this mode.
                  </p>

                </div>

              </div>
            )}

            {/* Scan Again */}
            <button
              onClick={clearFile}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.06]"
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