"use client";

import { useState, FormEvent } from "react";
import type { UserInput, LifeLine, HeartLine, HeadLine, FateLine, SunLine, MbtiType } from "@/types";

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1929 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const MBTI_TYPES: MbtiType[] = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export default function InputForm({ onSubmit }: InputFormProps) {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [lifeLine, setLifeLine] = useState<LifeLine>("normal");
  const [heartLine, setHeartLine] = useState<HeartLine>("long");
  const [headLine, setHeadLine] = useState<HeadLine>("long");
  const [fateLine, setFateLine] = useState<FateLine>("present");
  const [sunLine, setSunLine] = useState<SunLine>("present");
  const [mbti, setMbti] = useState<MbtiType>(null);
  const [section, setSection] = useState<1 | 2 | 3>(1);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      birthDate: { year, month, day },
      palm: { lifeLine, heartLine, headLine, fateLine, sunLine },
      mbti,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[480px] mx-auto px-4 py-8">
      {/* タイトル */}
      <div className="text-center mb-8" style={{ animation: "fadeInUp 0.7s ease both" }}>
        <div className="text-5xl mb-3" style={{ animation: "floatUpDown 6s ease-in-out infinite" }}>🔮</div>
        <h1 className="text-2xl font-bold mb-2 gold-text" style={{ fontWeight: 700 }}>
          占い統合診断
        </h1>
        <p className="text-sm" style={{ color: "var(--mystic-dim)" }}>
          あなたの本質を、複数の占いで読み解く
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="flex gap-2 mb-6 justify-center">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSection(s as 1 | 2 | 3)}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: s <= section ? "linear-gradient(135deg, #c9a84c, #e8c87a)" : "rgba(30,38,64,0.8)",
                color: s <= section ? "#0b0e1a" : "var(--mystic-dim)",
                border: s === section ? "2px solid #e8c87a" : "1px solid rgba(201,168,76,0.2)",
              }}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className="w-8 h-px"
                style={{
                  background: s < section ? "var(--gold)" : "rgba(201,168,76,0.2)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* SECTION 1: 生年月日 */}
      {section === 1 && (
        <div className="mystic-card mb-4" style={{ animation: "fadeInUp 0.5s ease both" }}>
          <h2 className="text-base font-bold mb-1" style={{ color: "var(--gold-light)" }}>
            ⭐ 生年月日
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--mystic-dim)" }}>
            算命学と5アニマル占いの基礎となる情報です
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs block mb-1" style={{ color: "var(--mystic-dim)" }}>年</label>
              <select
                className="w-full"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}年</option>
                ))}
              </select>
            </div>
            <div style={{ width: "90px" }}>
              <label className="text-xs block mb-1" style={{ color: "var(--mystic-dim)" }}>月</label>
              <select
                className="w-full"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div style={{ width: "90px" }}>
              <label className="text-xs block mb-1" style={{ color: "var(--mystic-dim)" }}>日</label>
              <select
                className="w-full"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="btn-gold"
              onClick={() => setSection(2)}
            >
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: 手相 */}
      {section === 2 && (
        <div className="mystic-card mb-4" style={{ animation: "fadeInUp 0.5s ease both" }}>
          <h2 className="text-base font-bold mb-1" style={{ color: "var(--gold-light)" }}>
            🖐 手相チェックリスト
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--mystic-dim)" }}>
            利き手を見て、各手相線の状態を選んでください
          </p>

          {/* 生命線 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--mystic-white)" }}>生命線</p>
            <div className="grid grid-cols-2 gap-1">
              {(["long", "normal", "short", "branched"] as LifeLine[]).map((v) => (
                <label key={v} className="palm-option">
                  <input
                    type="radio"
                    name="lifeLine"
                    value={v}
                    checked={lifeLine === v}
                    onChange={() => setLifeLine(v)}
                  />
                  <span className="text-sm">
                    {v === "long" ? "長い" : v === "normal" ? "普通" : v === "short" ? "短い" : "枝分かれ"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="gold-divider"><span className="text-gold text-xs">✦</span></div>

          {/* 感情線 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--mystic-white)" }}>感情線</p>
            <div className="grid grid-cols-2 gap-1">
              {(["long", "short", "curved", "straight"] as HeartLine[]).map((v) => (
                <label key={v} className="palm-option">
                  <input
                    type="radio"
                    name="heartLine"
                    value={v}
                    checked={heartLine === v}
                    onChange={() => setHeartLine(v)}
                  />
                  <span className="text-sm">
                    {v === "long" ? "長い" : v === "short" ? "短い" : v === "curved" ? "カーブが強い" : "まっすぐ"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="gold-divider"><span className="text-xs" style={{ color: "var(--gold)" }}>✦</span></div>

          {/* 知能線 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--mystic-white)" }}>知能線</p>
            <div className="grid grid-cols-2 gap-1">
              {(["long", "short", "curved", "forked"] as HeadLine[]).map((v) => (
                <label key={v} className="palm-option">
                  <input
                    type="radio"
                    name="headLine"
                    value={v}
                    checked={headLine === v}
                    onChange={() => setHeadLine(v)}
                  />
                  <span className="text-sm">
                    {v === "long" ? "長い" : v === "short" ? "短い" : v === "curved" ? "カーブ" : "二股"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="gold-divider"><span className="text-xs" style={{ color: "var(--gold)" }}>✦</span></div>

          {/* 運命線 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--mystic-white)" }}>運命線</p>
            <div className="flex gap-2">
              {(["present", "faint", "absent"] as FateLine[]).map((v) => (
                <label key={v} className="palm-option flex-1">
                  <input
                    type="radio"
                    name="fateLine"
                    value={v}
                    checked={fateLine === v}
                    onChange={() => setFateLine(v)}
                  />
                  <span className="text-sm">
                    {v === "present" ? "ある" : v === "faint" ? "薄い" : "ない"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="gold-divider"><span className="text-xs" style={{ color: "var(--gold)" }}>✦</span></div>

          {/* 太陽線 */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2" style={{ color: "var(--mystic-white)" }}>太陽線</p>
            <div className="flex gap-2">
              {(["present", "absent"] as SunLine[]).map((v) => (
                <label key={v} className="palm-option flex-1">
                  <input
                    type="radio"
                    name="sunLine"
                    value={v}
                    checked={sunLine === v}
                    onChange={() => setSunLine(v)}
                  />
                  <span className="text-sm">
                    {v === "present" ? "ある" : "ない"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button type="button" className="btn-outline" onClick={() => setSection(1)}>← 戻る</button>
            <button type="button" className="btn-gold" onClick={() => setSection(3)}>次へ →</button>
          </div>
        </div>
      )}

      {/* SECTION 3: MBTI */}
      {section === 3 && (
        <div className="mystic-card mb-4" style={{ animation: "fadeInUp 0.5s ease both" }}>
          <h2 className="text-base font-bold mb-1" style={{ color: "var(--gold-light)" }}>
            🧠 MBTIタイプ（任意）
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--mystic-dim)" }}>
            わかる場合のみ選択してください（統合精度が上がります）
          </p>
          <select
            className="w-full"
            value={mbti ?? ""}
            onChange={(e) => setMbti((e.target.value || null) as MbtiType)}
          >
            <option value="">わからない / スキップ</option>
            {MBTI_TYPES.map((t) => (
              <option key={t} value={t ?? ""}>{t}</option>
            ))}
          </select>

          <div className="mt-6 flex justify-between">
            <button type="button" className="btn-outline" onClick={() => setSection(2)}>← 戻る</button>
            <button type="submit" className="btn-gold" style={{ animation: "glowPulse 3s ease-in-out infinite" }}>
              ✨ 診断する
            </button>
          </div>
        </div>
      )}

      {/* 注意書き */}
      <p className="text-center text-xs mt-4" style={{ color: "var(--mystic-dim)" }}>
        ※ 入力データはブラウザ外に送信されません
      </p>
    </form>
  );
}
