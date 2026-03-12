import type { IntegratedResult } from "@/types";
import ShareButton from "@/components/ShareButton";

interface Props {
  result: IntegratedResult;
  delay?: number;
}

export default function IntegratedCard({ result, delay = 0 }: Props) {
  return (
    <div className="reveal-card space-y-4" data-delay={delay}>
      {/* キャッチコピー */}
      <div
        className="mystic-card text-center py-8"
        style={{
          background: "linear-gradient(145deg, rgba(22,29,48,0.98), rgba(17,24,39,0.95))",
          boxShadow: "0 0 40px rgba(201,168,76,0.3), 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <p className="text-xs mb-3 tracking-widest" style={{ color: "var(--mystic-dim)" }}>
          ✦ あなたへのキャッチコピー ✦
        </p>
        <h2
          className="text-3xl font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #c9a84c, #e8c87a, #c9a84c)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
            lineHeight: 1.3,
          }}
        >
          {result.catchphrase}
        </h2>
      </div>

      {/* 統合人物像 */}
      <div
        className="mystic-card"
        style={{ borderColor: "rgba(201,168,76,0.5)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💫</span>
          <h3 className="text-base font-bold gold-text">統合人物像</h3>
        </div>
        <p className="text-sm leading-loose" style={{ color: "var(--mystic-white)" }}>
          {result.integratedPersonality}
        </p>
      </div>

      {/* 恋愛・仕事タイプ */}
      <div className="grid grid-cols-1 gap-3">
        <div className="mystic-card">
          <p className="text-xs font-bold mb-2" style={{ color: "var(--gold)" }}>💕 恋愛タイプ</p>
          <p className="text-sm font-bold" style={{ color: "var(--mystic-white)" }}>
            {result.loveType}
          </p>
        </div>
        <div className="mystic-card">
          <p className="text-xs font-bold mb-2" style={{ color: "var(--gold)" }}>💼 仕事タイプ</p>
          <p className="text-sm font-bold" style={{ color: "var(--mystic-white)" }}>
            {result.workType}
          </p>
        </div>
      </div>

      {/* シェアボタン */}
      <div>
        <ShareButton text={result.shareText} />
      </div>
    </div>
  );
}
