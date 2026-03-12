import type { PalmResult } from "@/types";

interface Props {
  result: PalmResult;
  delay?: number;
}

export default function PalmCard({ result, delay = 0 }: Props) {
  return (
    <div className="reveal-card mystic-card" data-delay={delay}>
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)" }}
        >
          🖐
        </div>
        <div>
          <p className="text-xs" style={{ color: "var(--mystic-dim)" }}>手相占い</p>
          <h3 className="text-base font-bold gold-text">手相の読み解き</h3>
        </div>
      </div>

      {/* キーワードバッジ */}
      <div className="flex flex-wrap gap-2 mb-4">
        {result.keywords.map((kw) => (
          <span key={kw} className="keyword-badge">{kw}</span>
        ))}
      </div>

      {/* 各線の読み解き */}
      <div className="space-y-2 mb-4">
        {result.readings.map((r) => (
          <div
            key={r.line}
            className="rounded-lg p-3"
            style={{ background: "rgba(30,38,64,0.6)", border: "1px solid rgba(201,168,76,0.15)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)" }}>
                {r.line}
              </span>
              <span className="text-xs" style={{ color: "var(--gold-light)" }}>{r.value}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--mystic-dim)" }}>{r.meaning}</p>
          </div>
        ))}
      </div>

      {/* 総合 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <p className="text-xs font-bold mb-2" style={{ color: "var(--gold)" }}>📖 総合読み解き</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--mystic-white)" }}>
          {result.overall}
        </p>
      </div>
    </div>
  );
}
