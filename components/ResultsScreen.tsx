"use client";

import { useEffect, useRef } from "react";
import type { DiagnosisResult } from "@/types";
import SanmeigakuCard from "@/components/results/SanmeigakuCard";
import AnimalCard from "@/components/results/AnimalCard";
import PalmCard from "@/components/results/PalmCard";
import MbtiCard from "@/components/results/MbtiCard";
import IntegratedCard from "@/components/results/IntegratedCard";

interface Props {
  result: DiagnosisResult;
  onReset: () => void;
}

export default function ResultsScreen({ result, onReset }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserverでカードを順次フェードイン
    const cards = containerRef.current?.querySelectorAll(".reveal-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.classList.add("visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // 初期遅延でアニメーション開始
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      const delay = i * 200;
      el.dataset.delay = String(delay);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-[480px] mx-auto px-4 py-8 space-y-4"
    >
      {/* ヘッダー */}
      <div
        className="reveal-card text-center mb-2"
        data-delay="0"
      >
        <div className="text-4xl mb-2" style={{ animation: "floatUpDown 4s ease-in-out infinite" }}>✨</div>
        <h1 className="text-xl font-bold gold-text mb-1">診断結果</h1>
        <p className="text-xs" style={{ color: "var(--mystic-dim)" }}>
          {result.input.birthDate.year}年{result.input.birthDate.month}月{result.input.birthDate.day}日生まれ
        </p>
      </div>

      {/* 各占い結果 */}
      <SanmeigakuCard result={result.sanmeigaku} />
      <AnimalCard result={result.fiveAnimal} />
      <PalmCard result={result.palm} />
      {result.mbti && <MbtiCard result={result.mbti} />}

      {/* 統合結果 */}
      <IntegratedCard result={result.integrated} />

      {/* もう一度診断するボタン */}
      <div className="reveal-card text-center pt-4">
        <button onClick={onReset} className="btn-outline">
          🔮 もう一度診断する
        </button>
      </div>
    </div>
  );
}
