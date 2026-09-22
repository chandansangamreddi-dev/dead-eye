"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Activity,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Link2,
  Moon,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [guardianMode, setGuardianMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dead-eye-theme");
    const savedGuardian = localStorage.getItem("dead-eye-guardian");

    if (savedTheme === "light") {
      setDarkMode(false);
    }

    if (savedGuardian === "enabled") {
      setGuardianMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    localStorage.setItem(
      "dead-eye-theme",
      nextMode ? "dark" : "light"
    );
  };

  const toggleGuardianMode = () => {
    const nextMode = !guardianMode;

    setGuardianMode(nextMode);

    localStorage.setItem(
      "dead-eye-guardian",
      nextMode ? "enabled" : "disabled"
    );
  };

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-[#060809] text-white"
          : "bg-[#F1F6F3] text-[#0A1510]"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-32 top-20 h-80 w-80 rounded-full blur-[110px] ${
            darkMode
              ? "bg-[#55e6ad]/[0.07]"
              : "bg-[#55e6ad]/[0.13]"
          }`}
        />

        <div
          className={`absolute -right-32 top-[35%] h-96 w-96 rounded-full blur-[130px] ${
            darkMode
              ? "bg-[#20a876]/[0.05]"
              : "bg-[#8beac4]/[0.12]"
          }`}
        />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-5 pb-32 pt-7">

        {/* Header */}
        <header className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#A7F3D0] text-[#07110c]">
                <ShieldCheck size={15} />
              </div>

              <span
                className={`text-[11px] font-semibold tracking-[0.22em] ${
                  darkMode
                    ? "text-white/45"
                    : "text-black/40"
                }`}
              >
                SECURITY LAYER
              </span>

            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.04em]">
              DEAD EYE
            </h1>
          </div>

          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl transition ${
              darkMode
                ? "border-white/[0.08] bg-white/[0.04]"
                : "border-black/[0.07] bg-white/70"
            }`}
          >
            <Bell
              size={19}
              className={
                darkMode
                  ? "text-white/65"
                  : "text-black/55"
              }
            />

            <span className="absolute mt-[-18px] ml-[18px] h-2 w-2 rounded-full bg-[#A7F3D0]" />
          </button>

        </header>

        {/* HERO */}
        <section
          className={`relative mt-8 overflow-hidden rounded-[36px] border p-6 ${
            darkMode
              ? "border-white/[0.08] bg-[#101614]"
              : "border-black/[0.06] bg-white"
          }`}
        >

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#69e9b6]/20 blur-[90px]" />

          <div className="relative">

            {/* Top row */}
            <div className="flex items-center justify-between">

              <div
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] ${
                  darkMode
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#08744b]"
                }`}
              >
                ACTIVE PROTECTION
              </div>

              <div
                className={`flex items-center gap-1.5 text-[10px] ${
                  darkMode
                    ? "text-white/35"
                    : "text-black/35"
                }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A7F3D0]" />
                LIVE
              </div>

            </div>

            {/* Shield visual */}
            <div className="relative mt-8 flex justify-center">

              <div
                className={`absolute h-36 w-36 rounded-full blur-3xl ${
                  darkMode
                    ? "bg-[#67e8b4]/20"
                    : "bg-[#67e8b4]/25"
                }`}
              />

              <div
                className={`relative flex h-32 w-32 items-center justify-center rounded-[40px] border ${
                  darkMode
                    ? "border-[#A7F3D0]/20 bg-gradient-to-br from-[#A7F3D0]/15 to-[#A7F3D0]/[0.03]"
                    : "border-[#15966a]/15 bg-gradient-to-br from-[#A7F3D0]/30 to-[#A7F3D0]/[0.05]"
                }`}
              >

                <div
                  className={`absolute inset-3 rounded-[32px] border ${
                    darkMode
                      ? "border-white/[0.05]"
                      : "border-black/[0.04]"
                  }`}
                />

                <ShieldCheck
                  size={55}
                  strokeWidth={1.4}
                  className={
                    darkMode
                      ? "text-[#A7F3D0]"
                      : "text-[#15966a]"
                  }
                />

              </div>

            </div>

            {/* Status */}
            <div className="mt-7 text-center">

              <p
                className={`text-xs ${
                  darkMode
                    ? "text-white/40"
                    : "text-black/40"
                }`}
              >
                Protection status
              </p>

              <h2 className="mt-1 text-[38px] font-semibold tracking-[-0.05em]">
                Protected
              </h2>

              <p
                className={`mx-auto mt-2 max-w-[270px] text-sm leading-5 ${
                  darkMode
                    ? "text-white/40"
                    : "text-black/45"
                }`}
              >
                DEAD EYE is watching for suspicious digital content.
              </p>

            </div>

            {/* Bottom status */}
            <div
              className={`mt-7 flex items-center justify-between rounded-[20px] px-4 py-3 ${
                darkMode
                  ? "bg-white/[0.035]"
                  : "bg-black/[0.025]"
              }`}
            >

              <div className="flex items-center gap-2">

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    darkMode
                      ? "bg-[#A7F3D0]/10"
                      : "bg-[#15966a]/10"
                  }`}
                >
                  <Zap
                    size={15}
                    className={
                      darkMode
                        ? "text-[#A7F3D0]"
                        : "text-[#15966a]"
                    }
                  />
                </div>

                <div>

                  <p className="text-xs font-medium">
                    No active threats
                  </p>

                  <p
                    className={`text-[10px] ${
                      darkMode
                        ? "text-white/30"
                        : "text-black/35"
                    }`}
                  >
                    System ready
                  </p>

                </div>

              </div>

              <ChevronRight
                size={16}
                className={
                  darkMode
                    ? "text-white/20"
                    : "text-black/20"
                }
              />

            </div>

          </div>
        </section>

        {/* GUARDIAN MODE */}
        <section className="mt-4">

          <div
            className={`relative overflow-hidden rounded-[28px] border p-5 transition-all duration-300 ${
              guardianMode
                ? darkMode
                  ? "border-[#A7F3D0]/20 bg-[#A7F3D0]/[0.06]"
                  : "border-[#15966a]/20 bg-[#15966a]/[0.05]"
                : darkMode
                  ? "border-white/[0.07] bg-[#101416]"
                  : "border-black/[0.06] bg-white"
            }`}
          >

            {/* Guardian glow */}
            {guardianMode && (
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#69e9b6]/15 blur-3xl" />
            )}

            <div className="relative flex items-start justify-between gap-4">

              <div className="flex gap-3">

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    guardianMode
                      ? darkMode
                        ? "bg-[#A7F3D0]/15 text-[#A7F3D0]"
                        : "bg-[#15966a]/10 text-[#15966a]"
                      : darkMode
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
                          darkMode
                            ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                            : "bg-[#15966a]/10 text-[#15966a]"
                        }`}
                      >
                        ACTIVE
                      </span>
                    )}

                  </div>

                  <p
                    className={`mt-1 max-w-[235px] text-xs leading-5 ${
                      darkMode
                        ? "text-white/35"
                        : "text-black/40"
                    }`}
                  >
                    {guardianMode
                      ? "High-confidence threats are flagged for protected review."
                      : "Extra protection for users who want stronger threat warnings."}
                  </p>

                </div>

              </div>

              {/* Toggle */}
              <button
  type="button"
  onClick={toggleGuardianMode}
  aria-label={
    guardianMode
      ? "Disable Guardian Mode"
      : "Enable Guardian Mode"
  }
  aria-pressed={guardianMode}
  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
    guardianMode
      ? "bg-[#A7F3D0]"
      : darkMode
        ? "bg-white/10"
        : "bg-black/10"
  }`}
>
  <span
    className={`absolute top-1 h-5 w-5 rounded-full shadow-sm transition-all duration-300 ${
      guardianMode
        ? "right-1 bg-[#07110c]"
        : "left-1 bg-white/80"
    }`}
  />
</button>

            </div>

            {/* Guardian status */}
            <div
              className={`relative mt-4 rounded-2xl px-3 py-3 ${
                darkMode
                  ? "bg-white/[0.025]"
                  : "bg-black/[0.025]"
              }`}
            >

              <div className="flex items-center gap-2">

                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    guardianMode
                      ? "bg-[#A7F3D0] shadow-[0_0_10px_rgba(167,243,208,0.7)]"
                      : darkMode
                        ? "bg-white/20"
                        : "bg-black/20"
                  }`}
                />

                <p
                  className={`text-[10px] ${
                    darkMode
                      ? "text-white/35"
                      : "text-black/40"
                  }`}
                >
                  {guardianMode
                    ? "Guardian protection is active on this device."
                    : "Standard protection is active."}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-9">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <p
                className={`text-[10px] font-semibold tracking-[0.18em] ${
                  darkMode
                    ? "text-white/30"
                    : "text-black/35"
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
                darkMode
                  ? "text-[#A7F3D0]/60"
                  : "text-[#15966a]/60"
              }
            />

          </div>

          <div className="grid grid-cols-2 gap-3">

            {/* Screenshot */}
            <Link
              href="/scan"
              className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "border-white/[0.07] bg-[#101416] hover:border-[#A7F3D0]/20"
                  : "border-black/[0.06] bg-white hover:border-[#15966a]/20"
              }`}
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#A7F3D0]/[0.06] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#15966a]"
                }`}
              >
                <ScanLine size={21} />
              </div>

              <div className="relative mt-7">

                <p className="text-sm font-semibold">
                  Screenshot
                </p>

                <p
                  className={`mt-1 text-xs leading-4 ${
                    darkMode
                      ? "text-white/30"
                      : "text-black/40"
                  }`}
                >
                  Scan visual content
                </p>

              </div>

              <div className="relative mt-6 flex items-center justify-between">

                <span
                  className={`text-[10px] font-medium ${
                    darkMode
                      ? "text-[#A7F3D0]/60"
                      : "text-[#15966a]"
                  }`}
                >
                  ANALYZE
                </span>

                <ArrowUpRight
                  size={16}
                  className={
                    darkMode
                      ? "text-white/20"
                      : "text-black/20"
                  }
                />

              </div>

            </Link>

            {/* Link */}
            <button
              type="button"
              className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "border-white/[0.07] bg-[#101416] hover:border-[#A7F3D0]/20"
                  : "border-black/[0.06] bg-white hover:border-[#15966a]/20"
              }`}
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#A7F3D0]/[0.06] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#A7F3D0]/10 text-[#A7F3D0]"
                    : "bg-[#15966a]/10 text-[#15966a]"
                }`}
              >
                <Link2 size={21} />
              </div>

              <div className="relative mt-7">

                <p className="text-sm font-semibold">
                  Link
                </p>

                <p
                  className={`mt-1 text-xs leading-4 ${
                    darkMode
                      ? "text-white/30"
                      : "text-black/40"
                  }`}
                >
                  Inspect a suspicious URL
                </p>

              </div>

              <div className="relative mt-6 flex items-center justify-between">

                <span
                  className={`text-[10px] font-medium ${
                    darkMode
                      ? "text-[#A7F3D0]/60"
                      : "text-[#15966a]"
                  }`}
                >
                  CHECK
                </span>

                <ArrowUpRight
                  size={16}
                  className={
                    darkMode
                      ? "text-white/20"
                      : "text-black/20"
                  }
                />

              </div>

            </button>

          </div>

        </section>

        {/* SECURITY ACTIVITY */}
        <section className="mt-9">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <p
                className={`text-[10px] font-semibold tracking-[0.18em] ${
                  darkMode
                    ? "text-white/30"
                    : "text-black/35"
                }`}
              >
                SECURITY ACTIVITY
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Looking good
              </h2>

            </div>

            <button
              type="button"
              className={`text-xs ${
                darkMode
                  ? "text-white/35"
                  : "text-black/40"
              }`}
            >
              View all
            </button>

          </div>

          <div
            className={`rounded-[28px] border p-4 ${
              darkMode
                ? "border-white/[0.07] bg-[#101416]"
                : "border-black/[0.06] bg-white"
            }`}
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#A7F3D0]/10"
                    : "bg-[#15966a]/10"
                }`}
              >
                <Activity
                  size={20}
                  className={
                    darkMode
                      ? "text-[#A7F3D0]"
                      : "text-[#15966a]"
                  }
                />
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium">
                    No threats detected
                  </p>

                  <span
                    className={`text-[10px] ${
                      darkMode
                        ? "text-white/25"
                        : "text-black/30"
                    }`}
                  >
                    NOW
                  </span>

                </div>

                <p
                  className={`mt-1 text-xs ${
                    darkMode
                      ? "text-white/30"
                      : "text-black/40"
                  }`}
                >
                  Your digital environment is clear.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* Floating DEAD EYE button */}
      <button
        type="button"
        className={`fixed bottom-24 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_12px_50px_rgba(80,230,170,0.18)] backdrop-blur-xl transition duration-300 hover:scale-105 ${
          darkMode
            ? "border-[#A7F3D0]/20 bg-[#111917] text-[#A7F3D0]"
            : "border-[#15966a]/20 bg-white text-[#15966a]"
        }`}
        aria-label="Open DEAD EYE"
      >
        <ShieldCheck size={23} />
      </button>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-10 border-t backdrop-blur-2xl ${
          darkMode
            ? "border-white/[0.06] bg-[#060809]/85"
            : "border-black/[0.06] bg-[#F1F6F3]/85"
        }`}
      >

        <div className="mx-auto flex max-w-md items-center justify-around px-6 py-4">

          <button
            type="button"
            className={`flex flex-col items-center gap-1.5 ${
              darkMode
                ? "text-[#A7F3D0]"
                : "text-[#15966a]"
            }`}
          >
            <ShieldCheck size={19} />

            <span className="text-[10px] font-medium">
              Home
            </span>
          </button>

          <button
            type="button"
            className={`flex flex-col items-center gap-1.5 ${
              darkMode
                ? "text-white/30"
                : "text-black/30"
            }`}
          >
            <Activity size={19} />

            <span className="text-[10px] font-medium">
              Activity
            </span>
          </button>

          {/* Center Scan */}
          <Link
            href="/scan"
            className={`-mt-8 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_10px_35px_rgba(80,230,170,0.18)] ${
              darkMode
                ? "border-[#A7F3D0]/20 bg-[#A7F3D0] text-[#07110c]"
                : "border-[#15966a]/20 bg-[#15966a] text-white"
            }`}
            aria-label="Scan screenshot"
          >
            <ScanLine size={21} />
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className={`flex flex-col items-center gap-1.5 ${
              darkMode
                ? "text-white/30"
                : "text-black/30"
            }`}
          >
            {darkMode ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}

            <span className="text-[10px] font-medium">
              {darkMode ? "Dark" : "Light"}
            </span>
          </button>

        </div>

      </nav>
    </main>
  );
}