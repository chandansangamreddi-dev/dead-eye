"use client";

import { useEffect, useRef, useState } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
} from "html5-qrcode";

type QrScannerProps = {
  onDetected: (value: string) => void;
  onClose: () => void;
};

export default function QrScanner({
  onDetected,
  onClose,
}: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const detectedRef = useRef(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scannerId = "dead-eye-qr-reader";

    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    detectedRef.current = false;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        (decodedText) => {
          if (detectedRef.current) return;

          detectedRef.current = true;

          onDetected(decodedText);
        },
        () => {
          // Ignore normal frame-by-frame scan failures.
        },
      )
      .catch((err) => {
        console.error(err);
        setError(
          "Camera access failed. Please allow camera permission and try again.",
        );
      });

    return () => {
      const currentScanner = scannerRef.current;

      if (!currentScanner) return;

      const state = currentScanner.getState();

      if (
        state === Html5QrcodeScannerState.SCANNING ||
        state === Html5QrcodeScannerState.PAUSED
      ) {
        currentScanner
          .stop()
          .catch(() => {
            // Scanner may already be stopped during unmount.
          });
      }
    };
  }, [onDetected]);

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-[32px] border border-[#A7F3D0]/15 bg-[#101416]">
        <div
          id="dead-eye-qr-reader"
          className="min-h-[320px] w-full overflow-hidden"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        className="mt-4 flex w-full items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-sm font-medium text-white/70 transition hover:bg-white/[0.06]"
      >
        Cancel QR scan
      </button>
    </div>
  );
}