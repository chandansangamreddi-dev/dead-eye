"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  Link2,
  Moon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
  QrCode,
  ScanLine,
} from "lucide-react";

type ActivityItem = {
  risk: string;
  threat: string;
  mode: string;
  time: string;
};

function DeadEyeMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.72)}
      viewBox="0 0 64 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 23C12 10 23 4 32 4C41 4 52 10 60 23C52 36 41 42 32 42C23 42 12 36 4 23Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="32"
        cy="23"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />

      <circle cx="32" cy="23" r="4" fill="currentColor" />

      <path
        d="M32 9V4M32 42V37M18 23H12M52 23H46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [guardianMode, setGuardianMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dead-eye-theme");
    const savedGuardian = localStorage.getItem("dead-eye-guardian");
    const savedActivity = localStorage.getItem("dead-eye-activity");

    setDarkMode(savedTheme !== "light");
    setGuardianMode(savedGuardian === "enabled");

    if (savedActivity) {
      try {
        setActivities(JSON.parse(savedActivity));
      } catch {
        setActivities([]);
      }
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setDarkMode((current) => {
      const nextMode = !current;

      localStorage.setItem(
        "dead-eye-theme",
        nextMode ? "dark" : "light",
      );

      return nextMode;
    });
  };

  const toggleGuardianMode = () => {
    setGuardianMode((current) => {
      const nextMode = !current;

      localStorage.setItem(
        "dead-eye-guardian",
        nextMode ? "enabled" : "disabled",
      );

      return nextMode;
    });
  };

  const isDark = mounted ? darkMode : true;

  const cardClass = isDark
    ? "border-white/[0.07] bg-[#101416]"
    : "border-black/[0.06] bg-white";

  const mutedText = isDark ? "text-white/35" : "text-black/40";

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-[#060809] text-white"
          : "bg-[#F1F6F3] text-[#0A1510]"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-32 top-20 h-80 w-80 rounded-full blur-[110px] ${
            isDark ? "bg-[#55e6ad]/[0.07]" : "bg-[#55e6ad]/[0.13]"
          }`}
        />

        <div
          className={`absolute -right-32 top-[35%] h-96 w-96 rounded-full blur-[130px] ${
            isDark ? "bg-[#20a876]/[0.05]" : "bg-[#8beac4]/[0.12]"
          }`}
        />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-5 pb-32 pt-7">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#A7F3D0] text-[#07110c]">
                <DeadEyeMark size={21} />
              </div>

              <span
                className={`text-[10px] font-semibold tracking-[0.22em] ${
                  isDark ? "text-white/40" : "text-black/40"
                }`}
              >
                SECURITY LAYER
              </span>
            </div>

            <h1 className="mt-3 text-[29px] font-semibold tracking-[-0.045em]">
              DEAD EYE
            </h1>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl transition hover:scale-105 active:scale-95 ${
              isDark
                ? "border-white/[0.08] bg-white/[0.04]"
                : "border-black/[0.07] bg-white/70"
            }`}
          >
            {isDark ? (
              <Moon size={19} className="text-white/65" />
            ) : (
              <Sun size={19} className="text-black/55" />
            )}
          </button>
        </header>

        {/* Hero */}
        <section
          className={`relative mt-8 overflow-hidden rounded-[36px] border p-6 ${cardClass}`}
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#69e9b6]/20 blur-[90px]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] ${
                  isDark
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#08744b]"
                }`}
              >
                ACTIVE PROTECTION
              </div>

              <div className={`flex items-center gap-1.5 text-[10px] ${mutedText}`}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A7F3D0]" />
                LIVE
              </div>
            </div>

            {/* Eye visual */}
            <div className="relative mt-8 flex justify-center">
              <div
                className={`absolute h-36 w-36 rounded-full blur-3xl ${
                  isDark ? "bg-[#67e8b4]/20" : "bg-[#67e8b4]/25"
                }`}
              />

              <div
                className={`relative flex h-32 w-32 items-center justify-center rounded-[40px] border ${
                  isDark
                    ? "border-[#A7F3D0]/20 bg-gradient-to-br from-[#A7F3D0]/15 to-[#A7F3D0]/[0.03]"
                    : "border-[#15966a]/15 bg-gradient-to-br from-[#A7F3D0]/30 to-[#A7F3D0]/[0.05]"
                }`}
              >
                <div
                  className={`absolute inset-3 rounded-[32px] border ${
                    isDark
                      ? "border-white/[0.05]"
                      : "border-black/[0.04]"
                  }`}
                />

                <div
                  className={
                    isDark ? "text-[#A7F3D0]" : "text-[#15966a]"
                  }
                >
                  <DeadEyeMark size={70} />
                </div>
              </div>
            </div>

            <div className="mt-7 text-center">
              <p className={`text-xs ${mutedText}`}>
                Protection status
              </p>

              <h2 className="mt-1 text-[38px] font-semibold tracking-[-0.05em]">
                Protected
              </h2>

              <p
                className={`mx-auto mt-2 max-w-[270px] text-sm leading-5 ${
                  isDark ? "text-white/40" : "text-black/45"
                }`}
              >
                DEAD EYE is watching for suspicious digital content.
              </p>
            </div>

            <div
              className={`mt-7 flex items-center justify-between rounded-[20px] px-4 py-3 ${
                isDark ? "bg-white/[0.035]" : "bg-black/[0.025]"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    isDark
                      ? "bg-[#A7F3D0]/10"
                      : "bg-[#15966a]/10"
                  }`}
                >
                  <Zap
                    size={15}
                    className={
                      isDark
                        ? "text-[#A7F3D0]"
                        : "text-[#15966a]"
                    }
                  />
                </div>

                <div>
                  <p className="text-xs font-medium">
                    No active threats
                  </p>

                  <p className={`text-[10px] ${mutedText}`}>
                    System ready
                  </p>
                </div>
              </div>

              <ChevronRight
                size={16}
                className={isDark ? "text-white/20" : "text-black/20"}
              />
            </div>
          </div>
        </section>

        {/* Guardian Mode */}
        <section className="mt-4">
          <div
            className={`relative overflow-hidden rounded-[28px] border p-5 ${
              guardianMode
                ? isDark
                  ? "border-[#A7F3D0]/20 bg-[#A7F3D0]/[0.06]"
                  : "border-[#15966a]/20 bg-[#15966a]/[0.05]"
                : cardClass
            }`}
          >
            {guardianMode && (
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#69e9b6]/15 blur-3xl" />
            )}

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    guardianMode
                      ? isDark
                        ? "bg-[#A7F3D0]/15 text-[#A7F3D0]"
                        : "bg-[#15966a]/10 text-[#15966a]"
                      : isDark
                        ? "bg-white/[0.05] text-white/45"
                        : "bg-black/[0.04] text-black/40"
                  }`}
                >
                  <ShieldAlert size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">
                      Guardian Mode
                    </p>

                    {guardianMode && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-semibold tracking-[0.12em] ${
                          isDark
                            ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                            : "bg-[#15966a]/10 text-[#15966a]"
                        }`}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <p className={`mt-1 max-w-[235px] text-xs leading-5 ${mutedText}`}>
                    {guardianMode
                      ? "High-confidence threats are flagged for protected review."
                      : "Extra protection for users who want stronger threat warnings."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleGuardianMode}
                aria-label={
                  guardianMode
                    ? "Disable Guardian Mode"
                    : "Enable Guardian Mode"
                }
                aria-pressed={guardianMode}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                  guardianMode
                    ? "bg-[#A7F3D0]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full shadow-sm transition-all ${
                    guardianMode
                      ? "right-1 bg-[#07110c]"
                      : "left-1 bg-white/80"
                  }`}
                />
              </button>
            </div>

            <div
              className={`relative mt-4 rounded-2xl px-3 py-3 ${
                isDark ? "bg-white/[0.025]" : "bg-black/[0.025]"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    guardianMode
                      ? "bg-[#A7F3D0] shadow-[0_0_10px_rgba(167,243,208,0.7)]"
                      : isDark
                        ? "bg-white/20"
                        : "bg-black/20"
                  }`}
                />

                <p className={`text-[10px] ${mutedText}`}>
                  {guardianMode
                    ? "Guardian protection is active on this device."
                    : "Standard protection is active."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-9">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p
                className={`text-[10px] font-semibold tracking-[0.18em] ${
                  isDark ? "text-white/30" : "text-black/35"
                }`}
              >
                QUICK ACTIONS
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Scan something
              </h2>
            </div>

            <Sparkles
              size={18}
              className={
                isDark
                  ? "text-[#A7F3D0]/60"
                  : "text-[#15966a]/60"
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Screenshot */}
            <Link
              href="/scan?mode=screenshot"
              className={`group relative overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/[0.07] bg-[#101416] hover:border-[#A7F3D0]/20"
                  : "border-black/[0.06] bg-white hover:border-[#15966a]/20"
              }`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#A7F3D0]/[0.06] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isDark
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#15966a]"
                }`}
              >
                <ScanLine size={21} />
              </div>

              <div className="relative mt-7">
                <p className="text-sm font-semibold">Screenshot</p>

                <p className={`mt-1 text-xs leading-4 ${mutedText}`}>
                  Scan visual content
                </p>
              </div>

              <div className="relative mt-6 flex items-center justify-between">
                <span
                  className={`text-[10px] font-medium ${
                    isDark
                      ? "text-[#A7F3D0]/60"
                      : "text-[#15966a]"
                  }`}
                >
                  ANALYZE
                </span>

                <ArrowUpRight
                  size={16}
                  className={isDark ? "text-white/20" : "text-black/20"}
                />
              </div>
            </Link>

            {/* Link */}
            <Link
              href="/scan?mode=link"
              className={`group relative overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/[0.07] bg-[#101416] hover:border-[#A7F3D0]/20"
                  : "border-black/[0.06] bg-white hover:border-[#15966a]/20"
              }`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#A7F3D0]/[0.06] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isDark
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#15966a]"
                }`}
              >
                <Link2 size={21} />
              </div>

              <div className="relative mt-7">
                <p className="text-sm font-semibold">Link</p>

                <p className={`mt-1 text-xs leading-4 ${mutedText}`}>
                  Inspect a suspicious URL
                </p>
              </div>

              <div className="relative mt-6 flex items-center justify-between">
                <span
                  className={`text-[10px] font-medium ${
                    isDark
                      ? "text-[#A7F3D0]/60"
                      : "text-[#15966a]"
                  }`}
                >
                  CHECK
                </span>

                <ArrowUpRight
                  size={16}
                  className={isDark ? "text-white/20" : "text-black/20"}
                />
              </div>
            </Link>

            {/* QR */}
            <Link
              href="/scan?mode=qr"
              className={`group relative col-span-2 overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${
                isDark
                  ? "border-white/[0.07] bg-[#101416] hover:border-[#A7F3D0]/20"
                  : "border-black/[0.06] bg-white hover:border-[#15966a]/20"
              }`}
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#A7F3D0]/[0.06] blur-2xl" />

              <div className="relative flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    isDark
                      ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                      : "bg-[#15966a]/10 text-[#15966a]"
                  }`}
                >
                  <QrCode size={22} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">QR Code</p>

                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Scan a QR destination with your camera
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className={isDark ? "text-white/20" : "text-black/20"}
                />
              </div>
            </Link>
          </div>
        </section>

        {/* Security Activity */}
        <section className="mt-9">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p
                className={`text-[10px] font-semibold tracking-[0.18em] ${
                  isDark ? "text-white/30" : "text-black/35"
                }`}
              >
                SECURITY ACTIVITY
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                {activities.length > 0
                  ? "Recent scans"
                  : "Looking good"}
              </h2>
            </div>

            <Activity
              size={18}
              className={
                isDark
                  ? "text-[#A7F3D0]/60"
                  : "text-[#15966a]/60"
              }
            />
          </div>

          {activities.length > 0 ? (
            <div className="space-y-2">
              {activities.slice(0, 3).map((item, index) => (
                <div
                  key={`${item.time}-${index}`}
                  className={`rounded-[24px] border p-4 ${cardClass}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        item.risk === "SAFE"
                          ? isDark
                            ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                            : "bg-[#15966a]/10 text-[#15966a]"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {item.risk === "SAFE" ? (
                        <ShieldCheck size={19} />
                      ) : (
                        <ShieldAlert size={19} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-medium">
                          {item.threat}
                        </p>

                        <span className={`shrink-0 text-[9px] ${mutedText}`}>
                          {item.time}
                        </span>
                      </div>

                      <p className={`mt-1 text-xs ${mutedText}`}>
                        {item.mode} · {item.risk}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`rounded-[28px] border p-4 ${cardClass}`}>
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    isDark
                      ? "bg-[#A7F3D0]/10"
                      : "bg-[#15966a]/10"
                  }`}
                >
                  <Activity
                    size={20}
                    className={
                      isDark
                        ? "text-[#A7F3D0]"
                        : "text-[#15966a]"
                    }
                  />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    No scans yet
                  </p>

                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Your security activity will appear here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-2xl ${
          isDark
            ? "border-white/[0.06] bg-[#060809]/90"
            : "border-black/[0.06] bg-[#F1F6F3]/90"
        }`}
      >
        <div className="mx-auto grid max-w-md grid-cols-4 items-end px-5 pb-4 pt-3">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-1.5 ${
              isDark ? "text-[#A7F3D0]" : "text-[#15966a]"
            }`}
          >
            <ShieldCheck size={19} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          {/* Activity */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
            className={`flex flex-col items-center gap-1.5 ${
              isDark ? "text-white/30" : "text-black/30"
            }`}
          >
            <Activity size={19} />
            <span className="text-[10px] font-medium">Activity</span>
          </button>

          {/* Center Scan */}
          <Link
            href="/scan"
            aria-label="Open DEAD EYE scanner"
            className="relative -mt-9 flex flex-col items-center justify-center"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full border shadow-[0_10px_40px_rgba(80,230,170,0.22)] ${
                isDark
                  ? "border-[#A7F3D0]/20 bg-[#A7F3D0] text-[#07110c]"
                  : "border-[#15966a]/20 bg-[#15966a] text-white"
              }`}
            >
              <DeadEyeMark size={32} />
            </span>

            <span
              className={`mt-1 text-[10px] font-semibold tracking-[0.08em] ${
                isDark ? "text-[#A7F3D0]" : "text-[#15966a]"
              }`}
            >
              SCAN
            </span>
          </Link>

          {/* Theme / Settings */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            className={`flex flex-col items-center gap-1.5 ${
              isDark ? "text-white/30" : "text-black/30"
            }`}
          >
            {isDark ? <Moon size={19} /> : <Sun size={19} />}

            <span className="text-[10px] font-medium">
              {isDark ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </nav>
    </main>
  );
}