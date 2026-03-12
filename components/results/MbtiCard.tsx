import type { MbtiResult } from "@/types";

interface Props {
  result: MbtiResult;
  delay?: number;
}

export default function MbtiCard({ result, delay = 0 }: Props) {
  if (!result.type) return null;

  return (
    <div className="reveal-card mystic-card" data-delay={delay}>
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: "rgba(123,159,212,0.2)", border: "1px solid rgba(123,159,212,0.4)" }}
        >
          🧠
        </div>
        <div>
          <p className="text-xs" style={{ color: "var(--mystic-dim)" }}>MBTI</p>
          <h3 className="text-base font-bold" style={{ color: "var(--mystic-star)" }}>
            {result.type}タイプ
          </h3>
        </div>
      </div>

      <div
        className="rounded-xl p-4 mb-3"
        style={{ background: "rgba(123,159,212,0.06)", border: "1px solid rgba(123,159,212,0.2)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--mystic-white)" }}>
          {result.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--mystic-star)" }}>💕 恋愛</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{result.loveStyle}</p>
        </div>
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--mystic-star)" }}>💼 仕事</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{result.workStyle}</p>
        </div>
      </div>
    </div>
  );
}
