import type {
  SanmeigakuResult,
  FiveAnimalResult,
  PalmResult,
  MbtiResult,
  IntegratedResult,
} from "@/types";

// ===== パーソナリティ次元スコア =====
// energy: 内向(-2)〜外向(+2)
// emotion: 論理(-2)〜感情(+2)
// leadership: フォロワー(-2)〜リーダー(+2)
// action: 慎重(-2)〜行動的(+2)

interface Dimensions {
  energy: number;
  emotion: number;
  leadership: number;
  action: number;
}

function sanmeigakuDimensions(r: SanmeigakuResult): Dimensions {
  const starDimMap: Record<string, Dimensions> = {
    天将星: { energy: 2, emotion: 1, leadership: 2, action: 2 },
    天禄星: { energy: 0, emotion: 0, leadership: 0, action: -1 },
    天権星: { energy: -1, emotion: -2, leadership: 1, action: 0 },
    天奉星: { energy: 0, emotion: 2, leadership: -1, action: 0 },
    天庫星: { energy: -1, emotion: 0, leadership: -1, action: -2 },
    天極星: { energy: 1, emotion: 0, leadership: 1, action: 2 },
    天南星: { energy: 2, emotion: 1, leadership: 1, action: 2 },
    天胡星: { energy: -1, emotion: 2, leadership: -1, action: -1 },
    天報星: { energy: 2, emotion: 1, leadership: 0, action: 1 },
    天印星: { energy: -2, emotion: -1, leadership: 0, action: -1 },
  };
  return starDimMap[r.mainStar.name] ?? { energy: 0, emotion: 0, leadership: 0, action: 0 };
}

function animalDimensions(r: FiveAnimalResult): Dimensions {
  const animalDimMap: Record<string, Dimensions> = {
    リーダー虎: { energy: 2, emotion: 1, leadership: 2, action: 2 },
    サブ虎: { energy: 0, emotion: 0, leadership: 0, action: 1 },
    リーダー狼: { energy: -1, emotion: -1, leadership: 1, action: 1 },
    サブ狼: { energy: -2, emotion: -1, leadership: -1, action: 0 },
    リーダー猿: { energy: 2, emotion: 0, leadership: 1, action: 2 },
    サブ猿: { energy: 1, emotion: 1, leadership: 0, action: 1 },
    リーダーコアラ: { energy: -1, emotion: 0, leadership: 0, action: -1 },
    サブコアラ: { energy: -2, emotion: 1, leadership: -1, action: -2 },
    リーダー黒ヒョウ: { energy: 0, emotion: -1, leadership: 1, action: 2 },
    サブ黒ヒョウ: { energy: -1, emotion: -1, leadership: 0, action: 1 },
  };
  return animalDimMap[r.label] ?? { energy: 0, emotion: 0, leadership: 0, action: 0 };
}

function palmDimensions(r: PalmResult): Dimensions {
  const kw = r.keywords.join("");
  const energy = kw.includes("情熱") || kw.includes("行動") ? 2 : kw.includes("論理") || kw.includes("冷静") ? -1 : 0;
  const emotion = kw.includes("感情") || kw.includes("共感") || kw.includes("献身") ? 2 : kw.includes("現実主義") || kw.includes("論理") ? -2 : 0;
  const leadership = kw.includes("使命") || kw.includes("リーダー") || kw.includes("開拓") ? 2 : -1;
  const action = kw.includes("行動力") || kw.includes("スピード") || kw.includes("直感") ? 2 : kw.includes("着実") || kw.includes("コツコツ") ? -1 : 0;
  return { energy, emotion, leadership, action };
}

function mbtiDimensions(r: MbtiResult | null): Dimensions {
  if (!r || !r.type) return { energy: 0, emotion: 0, leadership: 0, action: 0 };
  const type = r.type as string;
  const energy = type.startsWith("E") ? 2 : -2;
  const emotion = type.includes("F") ? 2 : -2;
  const leadership = type.includes("J") ? 1 : -1;
  const action = type.startsWith("E") ? 1 : -1;
  return { energy, emotion, leadership, action };
}

function mergeDimensions(dims: Dimensions[]): Dimensions {
  const n = dims.length;
  return {
    energy: dims.reduce((s, d) => s + d.energy, 0) / n,
    emotion: dims.reduce((s, d) => s + d.emotion, 0) / n,
    leadership: dims.reduce((s, d) => s + d.leadership, 0) / n,
    action: dims.reduce((s, d) => s + d.action, 0) / n,
  };
}

// ===== 統合テキスト生成 =====

function buildIntegratedPersonality(
  merged: Dimensions,
  sanmeigaku: SanmeigakuResult,
  fiveAnimal: FiveAnimalResult,
  palm: PalmResult,
  mbti: MbtiResult | null
): string {
  const star = sanmeigaku.mainStar.name;
  const animal = fiveAnimal.label;
  const palmTop = palm.keywords[0] ?? "独自の感性";

  const energyDesc =
    merged.energy > 1
      ? "人と関わることでエネルギーを得る社交的な存在"
      : merged.energy < -1
      ? "一人の時間を大切にする内省的な存在"
      : "社交的な場も一人の時間も両方必要なバランス型";

  const emotionDesc =
    merged.emotion > 1
      ? "豊かな感受性で人の気持ちに深く寄り添える"
      : merged.emotion < -1
      ? "論理と理性を軸に冷静に物事を判断する"
      : "感情と理性のバランスが取れた成熟した判断力を持つ";

  const leaderDesc =
    merged.leadership > 1
      ? "生まれながらのリーダー気質で、自然と人を惹きつけ道を切り拓く"
      : merged.leadership < -1
      ? "縁の下で人を支えることに真の喜びを感じる、なくてはならない存在"
      : "状況に応じてリーダーにも参謀にもなれる柔軟性を持つ";

  const actionDesc =
    merged.action > 1
      ? "直感と行動力で素早くチャンスをつかむ"
      : merged.action < -1
      ? "じっくりと考えを深め、着実に物事を積み上げる"
      : "考えてから動く慎重さと、勝機を見た時の行動力を合わせ持つ";

  return `算命学の「${star}」と${animal}の性質を持つあなたは、${energyDesc}。${emotionDesc}ため、${leaderDesc}タイプ。${palmTop}という手相が示すように、${actionDesc}。複数の占いが一致して示すのは、表面とは異なる内面の深さ──あなたはまだ、自分の可能性を全部使い切っていない。`;
}

function buildLoveType(merged: Dimensions, fiveAnimal: FiveAnimalResult): string {
  const types = [
    merged.leadership > 1 && merged.emotion > 0
      ? "引っ張りながらも相手を大切にする情熱リード型"
      : "",
    merged.leadership < -1 && merged.emotion > 0
      ? "相手を全力で支える献身的な愛情型"
      : "",
    merged.energy > 1 && merged.action > 1
      ? "積極的に恋を楽しむ自由奔放型"
      : "",
    merged.energy < -1 && merged.emotion < 0
      ? "ゆっくり深く愛情を育てる信頼優先型"
      : "",
    merged.emotion > 1 && merged.action < 0
      ? "感情を丁寧に共有する精神的な繋がり重視型"
      : "",
  ].filter(Boolean);

  return types.length > 0
    ? types[0]
    : `${fiveAnimal.animal}らしい${merged.emotion > 0 ? "情熱的で" : "冷静で"}${merged.leadership > 0 ? "リードする" : "寄り添う"}恋愛スタイル`;
}

function buildWorkType(merged: Dimensions, sanmeigaku: SanmeigakuResult): string {
  if (merged.leadership > 1 && merged.action > 1) {
    return "開拓者型・リーダー職向き（自分でビジョンを描き、チームを引っ張る）";
  } else if (merged.emotion > 1 && merged.leadership < 0) {
    return "縁の下の力持ち型・対人サポート職向き（人の力を引き出し、陰から支える）";
  } else if (merged.energy < -1 && merged.action < 0) {
    return "専門職・研究職向き（一つのことを深く極め、静かに実力を積み上げる）";
  } else if (merged.action > 1 && merged.energy > 0) {
    return "フロント型・営業・起業向き（人前に立ち、スピーディーに成果を出す）";
  } else {
    return `${sanmeigaku.mainStar.name}の才能を活かした専門職（${sanmeigaku.mainStar.talent}）`;
  }
}

function buildCatchphrase(
  merged: Dimensions,
  sanmeigaku: SanmeigakuResult,
  fiveAnimal: FiveAnimalResult
): string {
  const phrases: [() => boolean, string][] = [
    [() => merged.leadership > 1 && merged.emotion < 0, "孤高の王"],
    [() => merged.leadership > 1 && merged.emotion > 0, "情熱の旗手"],
    [() => merged.emotion > 1 && merged.action < 0, "静かなる共感者"],
    [() => merged.energy < -1 && merged.action < -1, "深淵の思索家"],
    [() => merged.energy > 1 && merged.action > 1, "疾風の開拓者"],
    [() => merged.emotion > 1 && merged.leadership > 0, "愛に生きるリーダー"],
    [() => merged.energy < -1 && merged.emotion > 1, "内なる炎を宿す夢想家"],
    [() => merged.leadership < -1 && merged.emotion > 1, "縁の下の革命家"],
    [() => merged.action > 1 && merged.emotion < 0, "冷徹なる行動者"],
    [() => sanmeigaku.mainStar.name === "天極星", "静かなる革命家"],
    [() => sanmeigaku.mainStar.name === "天胡星", "美と創造の求道者"],
    [() => fiveAnimal.animal === "黒ヒョウ" && merged.energy < 0, "夜を駆ける孤高の猛者"],
    [() => fiveAnimal.animal === "虎" && merged.leadership > 0, "百獣の帝王"],
  ];

  for (const [condition, phrase] of phrases) {
    if (condition()) return phrase;
  }
  return `${fiveAnimal.animal}の魂を持つ${sanmeigaku.mainStar.name.replace("天", "").replace("星", "")}の申し子`;
}

function buildShareText(result: {
  catchphrase: string;
  integratedPersonality: string;
  loveType: string;
  workType: string;
  mainStar: string;
  animal: string;
}): string {
  return `【占い統合診断 結果】
✨ ${result.catchphrase}

⭐ 算命学の主星：${result.mainStar}
🐾 5アニマル：${result.animal}

💫 あなたという人物：
${result.integratedPersonality}

💕 恋愛タイプ：${result.loveType}
💼 仕事タイプ：${result.workType}

#占い統合診断 #性格診断`;
}

// ===== メイン統合関数 =====

export function integrate(
  sanmeigaku: SanmeigakuResult,
  fiveAnimal: FiveAnimalResult,
  palm: PalmResult,
  mbti: MbtiResult | null
): IntegratedResult {
  const dims = [
    sanmeigakuDimensions(sanmeigaku),
    animalDimensions(fiveAnimal),
    palmDimensions(palm),
    ...(mbti ? [mbtiDimensions(mbti)] : []),
  ];

  const merged = mergeDimensions(dims);

  const catchphrase = buildCatchphrase(merged, sanmeigaku, fiveAnimal);
  const integratedPersonality = buildIntegratedPersonality(merged, sanmeigaku, fiveAnimal, palm, mbti);
  const loveType = buildLoveType(merged, fiveAnimal);
  const workType = buildWorkType(merged, sanmeigaku);
  const shareText = buildShareText({
    catchphrase,
    integratedPersonality,
    loveType,
    workType,
    mainStar: sanmeigaku.mainStar.name,
    animal: fiveAnimal.label,
  });

  return {
    catchphrase,
    integratedPersonality,
    loveType,
    workType,
    shareText,
  };
}
