import type { SanmeigakuResult } from "@/types";

interface Props {
  result: SanmeigakuResult;
  delay?: number;
}

export default function SanmeigakuCard({ result, delay = 0 }: Props) {
  const { yearPillar, monthPillar, dayPillar, mainStar } = result;

  return (
    <div
      className="reveal-card mystic-card"
      data-delay={delay}
    >
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.4)" }}
        >
          ⭐
        </div>
        <div>
          <p className="text-xs" style={{ color: "var(--mystic-dim)" }}>算命学</p>
          <h3 className="text-base font-bold gold-text">天干地支・主星</h3>
        </div>
      </div>

      {/* 干支 */}
      <div className="flex gap-2 mb-4">
        {[
          { label: "年柱", value: yearPillar.cycleName },
          { label: "月柱", value: monthPillar.cycleName },
          { label: "日柱", value: dayPillar.cycleName },
        ].map((col) => (
          <div
            key={col.label}
            className="flex-1 text-center py-2 px-1 rounded-lg"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--mystic-dim)" }}>{col.label}</p>
            <p className="text-lg font-bold" style={{ color: "var(--gold-light)", letterSpacing: "0.1em" }}>
              {col.value}
            </p>
          </div>
        ))}
      </div>

      {/* 主星 */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.2)", color: "var(--gold)" }}>
            主星
          </span>
          <span className="text-lg font-bold" style={{ color: "var(--gold-light)" }}>
            {mainStar.name}
          </span>
          <span className="text-xs" style={{ color: "var(--mystic-dim)" }}>({mainStar.element}の星)</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--mystic-white)" }}>
          {mainStar.personality}
        </p>
      </div>

      {/* 才能・対人 */}
      <div className="grid grid-cols-1 gap-2">
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--gold)" }}>💎 才能・強み</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{mainStar.talent}</p>
        </div>
        <div>
          <p className="text-xs font-bold mb-1" style={{ color: "var(--gold)" }}>👥 対人関係</p>
          <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>{mainStar.relationship}</p>
        </div>
      </div>
    </div>
  );
}
