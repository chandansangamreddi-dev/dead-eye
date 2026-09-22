"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

function ShareContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const text = searchParams.get("text") || "";
  const url = searchParams.get("url") || "";

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function analyzeSharedContent() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/analyze-text",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              text,
              url,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Unable to analyze shared content.",
          );
        }

        setResult(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to analyze shared content.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (title || text || url) {
      analyzeSharedContent();
    } else {
      setLoading(false);
    }
  }, [title, text, url]);

  const riskLevel = result?.analysis.risk_level;

  const riskLabel =
    riskLevel === "CRITICAL"
      ? "CRITICAL RISK"
      : riskLevel === "HIGH"
        ? "HIGH RISK"
        : riskLevel === "MEDIUM"
          ? "MEDIUM RISK"
          : riskLevel === "LOW"
            ? "LOW RISK"
            : "NO SIGNIFICANT THREAT";

  const isBlocked =
    result?.analysis.guardian_action === "BLOCK";

  return (
    <main className="min-h-screen bg-[#060809] px-5 py-8 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#A7F3D0]">
            DEAD EYE
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Shared Content
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Local security analysis of content shared to DEAD EYE.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Received
          </p>

          <div className="space-y-4">
            {title && (
              <div>
                <p className="mb-1 text-xs text-white/40">TITLE</p>
                <p className="text-sm text-white/85">{title}</p>
              </div>
            )}

            {text && (
              <div>
                <p className="mb-1 text-xs text-white/40">MESSAGE</p>
                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-white/80">
                  {text}
                </p>
              </div>
            )}

            {url && (
              <div>
                <p className="mb-1 text-xs text-white/40">URL</p>
                <p className="break-all text-sm text-white/80">
                  {url}
                </p>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/60">
              Analyzing locally...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-3xl border border-red-400/20 bg-red-400/[0.06] p-6">
            <p className="text-xs font-semibold tracking-[0.15em] text-red-300">
              ANALYSIS ERROR
            </p>

            <p className="mt-2 text-sm text-white/70">
              {error}
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-5 space-y-4">
            <div
              className={`rounded-3xl border p-6 ${
                isBlocked
                  ? "border-red-400/30 bg-red-400/[0.08]"
                  : riskLevel === "MEDIUM" || riskLevel === "LOW"
                    ? "border-yellow-300/20 bg-yellow-300/[0.06]"
                    : "border-[#A7F3D0]/20 bg-[#A7F3D0]/[0.05]"
              }`}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-white/40">
                SECURITY VERDICT
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                {isBlocked ? "ACTION BLOCKED" : riskLabel}
              </h2>

              <p className="mt-2 text-sm text-white/60">
                {result.analysis.threat_type}
              </p>

              <div className="mt-5">
                <p className="text-sm leading-6 text-white/75">
                  {result.analysis.explanation}
                </p>
              </div>
            </div>

            {result.analysis.evidence.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/40">
                  EVIDENCE
                </p>

                <ul className="mt-4 space-y-3">
                  {result.analysis.evidence.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex gap-3 text-sm leading-6 text-white/75"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A7F3D0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/40">
                RECOMMENDED ACTION
              </p>

              <p className="mt-3 text-sm leading-6 text-white/75">
                {result.analysis.recommended_action}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs text-white/40">
                ANALYZED LOCALLY
              </p>

              <p className="mt-1 text-sm text-white/60">
                No cloud AI request is used for this shared-content
                security decision.
              </p>
            </div>
          </div>
        )}

        <a
          href="/"
          className="mt-5 block rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/[0.07]"
        >
          Back to DEAD EYE
        </a>
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={null}>
      <ShareContent />
    </Suspense>
  );
}