"use client";

import { useEffect, useState } from "react";

const LOADING_STEPS = [
  { text: "天体の配置を読み取っています...", emoji: "⭐" },
  { text: "手相の紋様を解析中...", emoji: "🖐" },
  { text: "動物の本能を探っています...", emoji: "🐾" },
  { text: "あなたの本質が現れました...", emoji: "✨" },
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const intervals = LOADING_STEPS.map((_, i) => {
      return setTimeout(() => setStep(i), i * 1100);
    });
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{ animation: "fadeInUp 0.5s ease both" }}
    >
      {/* 同心円 */}
      <div className="relative flex items-center justify-center mb-10">
        <div
          className="absolute"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.1)",
            animation: "rotateSlow 3s linear infinite reverse",
          }}
        />
        <div className="loading-ring-outer absolute" />
        <div className="loading-ring" />
        <div
          className="text-4xl absolute"
          style={{ animation: "floatUpDown 3s ease-in-out infinite" }}
        >
          {LOADING_STEPS[step]?.emoji}
        </div>
      </div>

      {/* ローディングテキスト */}
      <div className="text-center" style={{ minHeight: "60px" }}>
        {LOADING_STEPS.map((s, i) => (
          <p
            key={i}
            className="text-sm font-bold"
            style={{
              color: i === step ? "var(--gold-light)" : "transparent",
              position: i === 0 ? "relative" : "absolute",
              left: i === 0 ? "auto" : "50%",
              transform: i === 0 ? "none" : "translateX(-50%)",
              transition: "color 0.5s ease",
              letterSpacing: "0.05em",
            }}
          >
            {s.text}
          </p>
        ))}
      </div>

      {/* 進捗バー */}
      <div
        className="mt-8 w-48 h-px"
        style={{ background: "rgba(201,168,76,0.2)" }}
      >
        <div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
            width: `${((step + 1) / LOADING_STEPS.length) * 100}%`,
            transition: "width 1s ease",
          }}
        />
      </div>

      <p
        className="text-xs mt-4"
        style={{ color: "var(--mystic-dim)" }}
      >
        複数の占術を統合分析中
      </p>
    </div>
  );
}
