"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Activity,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Link2,
  Moon,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dead-eye-theme");

    if (savedTheme === "light") {
      setDarkMode(false);
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

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-[#0B0D11] text-white"
          : "bg-[#F4F6F5] text-[#0A1510]"
      }`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-32 top-20 h-80 w-80 rounded-full blur-[110px] ${
            darkMode
              ? "bg-[#1F8A6F]/[0.06]"
              : "bg-[#1F8A6F]/[0.09]"
          }`}
        />

        <div
          className={`absolute -right-32 top-[35%] h-96 w-96 rounded-full blur-[130px] ${
            darkMode
              ? "bg-[#14614C]/[0.05]"
              : "bg-[#5EEAD4]/[0.08]"
          }`}
        />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-5 pb-32 pt-7">

        {/* Header */}
        <header className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#1F8A6F] text-white">
                <ShieldCheck size={15} />
              </div>

              <span
                className={`text-[11px] font-semibold tracking-[0.22em] ${
                  darkMode ? "text-white/45" : "text-black/40"
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
            className={`relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl transition ${
              darkMode
                ? "border-white/[0.08] bg-white/[0.04]"
                : "border-black/[0.07] bg-white/70"
            }`}
          >
            <Bell
              size={19}
              className={
                darkMode ? "text-white/65" : "text-black/55"
              }
            />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#5EEAD4]" />
          </button>

        </header>

        {/* HERO */}
        <section
          className={`relative mt-8 overflow-hidden rounded-[36px] border p-6 ${
            darkMode
              ? "border-white/[0.08] bg-[#12161A]"
              : "border-black/[0.06] bg-white"
          }`}
        >

          {/* Glow */}
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1F8A6F]/[0.14] blur-[90px]" />

          <div className="relative">

            {/* Top row */}
            <div className="flex items-center justify-between">

              <div
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] ${
                  darkMode
                    ? "bg-[#1F8A6F]/[0.14] text-[#5EEAD4]"
                    : "bg-[#0F7A5C]/10 text-[#0B5E48]"
                }`}
              >
                ACTIVE PROTECTION
              </div>

              <div
                className={`flex items-center gap-1.5 text-[10px] ${
                  darkMode ? "text-white/35" : "text-black/35"
                }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5EEAD4]" />
                LIVE
              </div>

            </div>

            {/* Shield visual */}
            <div className="relative mt-8 flex justify-center">

              <div
                className={`absolute h-36 w-36 rounded-full blur-3xl ${
                  darkMode
                    ? "bg-[#1F8A6F]/[0.16]"
                    : "bg-[#1F8A6F]/[0.18]"
                }`}
              />

              <div
                className={`relative flex h-32 w-32 items-center justify-center rounded-[40px] border ${
                  darkMode
                    ? "border-[#5EEAD4]/15 bg-gradient-to-br from-[#1F8A6F]/20 to-[#1F8A6F]/[0.03]"
                    : "border-[#0F7A5C]/15 bg-gradient-to-br from-[#1F8A6F]/[0.16] to-[#1F8A6F]/[0.03]"
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
                      ? "text-[#5EEAD4]"
                      : "text-[#0F7A5C]"
                  }
                />
              </div>

            </div>

            {/* Status */}
            <div className="mt-7 text-center">

              <p
                className={`text-xs ${
                  darkMode ? "text-white/40" : "text-black/40"
                }`}
              >
                Protection status
              </p>

              <h2 className="mt-1 text-[38px] font-semibold tracking-[-0.05em]">
                Protected
              </h2>

              <p
                className={`mx-auto mt-2 max-w-[270px] text-sm leading-5 ${
                  darkMode ? "text-white/40" : "text-black/45"
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
                      ? "bg-[#1F8A6F]/[0.14]"
                      : "bg-[#0F7A5C]/10"
                  }`}
                >
                  <Zap
                    size={15}
                    className={
                      darkMode
                        ? "text-[#5EEAD4]"
                        : "text-[#0F7A5C]"
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
                  ? "text-[#5EEAD4]/50"
                  : "text-[#0F7A5C]/50"
              }
            />

          </div>

          <div className="grid grid-cols-2 gap-3">

            {/* Screenshot */}
            <Link
              href="/scan"
              className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "border-white/[0.07] bg-[#12161A] hover:border-[#5EEAD4]/20"
                  : "border-black/[0.06] bg-white hover:border-[#0F7A5C]/20"
              }`}
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#1F8A6F]/[0.05] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#1F8A6F]/[0.14] text-[#5EEAD4]"
                    : "bg-[#0F7A5C]/10 text-[#0F7A5C]"
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
                      ? "text-[#5EEAD4]/70"
                      : "text-[#0F7A5C]"
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
              className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "border-white/[0.07] bg-[#12161A] hover:border-[#5EEAD4]/20"
                  : "border-black/[0.06] bg-white hover:border-[#0F7A5C]/20"
              }`}
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#1F8A6F]/[0.05] blur-2xl" />

              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#1F8A6F]/[0.14] text-[#5EEAD4]"
                    : "bg-[#0F7A5C]/10 text-[#0F7A5C]"
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
                      ? "text-[#5EEAD4]/70"
                      : "text-[#0F7A5C]"
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
                ? "border-white/[0.07] bg-[#12161A]"
                : "border-black/[0.06] bg-white"
            }`}
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  darkMode
                    ? "bg-[#1F8A6F]/[0.14]"
                    : "bg-[#0F7A5C]/10"
                }`}
              >
                <Activity
                  size={20}
                  className={
                    darkMode
                      ? "text-[#5EEAD4]"
                      : "text-[#0F7A5C]"
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
        className={`fixed bottom-24 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_12px_40px_rgba(31,138,111,0.16)] backdrop-blur-xl transition duration-300 hover:scale-105 ${
          darkMode
            ? "border-[#5EEAD4]/20 bg-[#12181A] text-[#5EEAD4]"
            : "border-[#0F7A5C]/20 bg-white text-[#0F7A5C]"
        }`}
        aria-label="Open DEAD EYE"
      >
        <ShieldCheck size={23} />
      </button>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-10 border-t backdrop-blur-2xl ${
          darkMode
            ? "border-white/[0.06] bg-[#0B0D11]/85"
            : "border-black/[0.06] bg-[#F4F6F5]/85"
        }`}
      >

        <div className="mx-auto flex max-w-md items-center justify-around px-6 py-4">

          <button
            className={`flex flex-col items-center gap-1.5 ${
              darkMode
                ? "text-[#5EEAD4]"
                : "text-[#0F7A5C]"
            }`}
          >
            <ShieldCheck size={19} />

            <span className="text-[10px] font-medium">
              Home
            </span>
          </button>

          <button
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
          <button
            className={`-mt-8 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_10px_28px_rgba(31,138,111,0.22)] ${
              darkMode
                ? "border-[#5EEAD4]/20 bg-[#1F8A6F] text-white"
                : "border-[#0F7A5C]/20 bg-[#0F7A5C] text-white"
            }`}
          >
            <ScanLine size={21} />
          </button>

          <button
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