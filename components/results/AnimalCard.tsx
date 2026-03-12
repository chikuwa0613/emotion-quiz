import type { FiveAnimalResult } from "@/types";

interface Props {
  result: FiveAnimalResult;
  delay?: number;
}

const ANIMAL_EMOJI: Record<string, string> = {
  虎: "🐯",
  狼: "🐺",
  猿: "🐒",
  コアラ: "🐨",
  黒ヒョウ: "🐆",
};

export default function AnimalCard({ result, delay = 0 }: Props) {
  return (
    <div className="reveal-card mystic-card" data-delay={delay}>
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)" }}
        >
          🐾
        </div>
        <div>
          <p className="text-xs" style={{ color: "var(--mystic-dim)" }}>5アニマル占い</p>
          <h3 className="text-base font-bold gold-text">あなたの動物タイプ</h3>
        </div>
      </div>

      {/* 動物タイプ */}
      <div className="text-center mb-4 py-4">
        <div className="text-6xl mb-2" style={{ animation: "floatUpDown 4s ease-in-out infinite" }}>
          {ANIMAL_EMOJI[result.animal] ?? "🌟"}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-bold"
            style={{
              background: result.role === "リーダー" ? "rgba(201,168,76,0.25)" : "rgba(123,159,212,0.25)",
              color: result.role === "リーダー" ? "var(--gold)" : "var(--mystic-star)",
              border: `1px solid ${result.role === "リーダー" ? "rgba(201,168,76,0.5)" : "rgba(123,159,212,0.5)"}`,
            }}
          >
            {result.role}
          </span>
          <span className="text-2xl font-bold" style={{ color: "var(--gold-light)" }}>
            {result.animal}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--mystic-dim)" }}>
          命数 {result.lifeNumber} / Type {result.animalTypeIndex}
        </p>
      </div>

      {/* 性格 */}
      <div
        className="rounded-xl p-4 mb-3"
        style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--mystic-white)" }}>
          {result.personality}
        </p>
      </div>

      {/* 強み・弱み */}
      <div className="grid grid-cols-1 gap-2 mb-3">
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--gold)" }}>✨ 強み</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{result.strength}</p>
        </div>
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--mystic-star)" }}>💧 弱み</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{result.weakness}</p>
        </div>
      </div>

      {/* 相性 */}
      {result.compatibleAnimals.length > 0 && (
        <div>
          <p className="text-xs font-bold mb-2" style={{ color: "var(--gold)" }}>💞 相性の良い動物</p>
          <div className="flex gap-2 flex-wrap">
            {result.compatibleAnimals.map((a) => (
              <span key={a} className="keyword-badge">
                {ANIMAL_EMOJI[a]} {a}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
