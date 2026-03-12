"use client";

import { useState, useCallback } from "react";
import StarField from "@/components/StarField";
import InputForm from "@/components/InputForm";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import type { UserInput, DiagnosisResult, AppStep } from "@/types";
import { calcSanmeigaku } from "@/lib/sanmeigaku";
import { calcFiveAnimals } from "@/lib/fiveAnimals";
import { analyzePalmLines } from "@/lib/palmReading";
import { getMbtiResult } from "@/lib/mbti";
import { integrate } from "@/lib/integrate";

export default function Home() {
  const [step, setStep] = useState<AppStep>("input");
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSubmit = useCallback((input: UserInput) => {
    setStep("loading");

    // 計算（同期・純粋関数）
    const sanmeigaku = calcSanmeigaku(input.birthDate);
    const fiveAnimal = calcFiveAnimals(input.birthDate);
    const palm = analyzePalmLines(input.palm);
    const mbti = getMbtiResult(input.mbti);
    const integrated = integrate(sanmeigaku, fiveAnimal, palm, mbti);

    const diagnosisResult: DiagnosisResult = {
      input,
      sanmeigaku,
      fiveAnimal,
      palm,
      mbti,
      integrated,
    };

    setResult(diagnosisResult);

    // ローディングアニメーション（4.4秒）後に結果表示
    setTimeout(() => {
      setStep("results");
    }, 4400);
  }, []);

  const handleReset = useCallback(() => {
    setStep("input");
    setResult(null);
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1 }}>
        {step === "input" && <InputForm onSubmit={handleSubmit} />}
        {step === "loading" && <LoadingScreen />}
        {step === "results" && result && (
          <ResultsScreen result={result} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
