import type {
  PalmInput,
  PalmLineReading,
  PalmResult,
  LifeLine,
  HeartLine,
  HeadLine,
  FateLine,
  SunLine,
} from "@/types";

// ===== 各線の読み解きデータ =====

const LIFE_LINE_DATA: Record<LifeLine, { meaning: string; keywords: string[] }> = {
  long: {
    meaning: "生命力・体力・行動力に恵まれ、長く活動できる強さを持つ。粘り強さが武器。",
    keywords: ["生命力旺盛", "行動力", "持久力"],
  },
  normal: {
    meaning: "バランスのとれた生命エネルギー。健康に気をつけながら着実に人生を歩む。",
    keywords: ["バランス感覚", "堅実", "安定志向"],
  },
  short: {
    meaning: "集中的にエネルギーを爆発させるタイプ。短期勝負に強く、効率を重視する。",
    keywords: ["瞬発力", "集中力", "効率主義"],
  },
  branched: {
    meaning: "多彩な才能と人生の転機を持つ。変化を恐れず、複数の道を歩む柔軟性がある。",
    keywords: ["多才", "変化対応力", "多様な才能"],
  },
};

const HEART_LINE_DATA: Record<HeartLine, { meaning: string; keywords: string[] }> = {
  long: {
    meaning: "豊かな感情と深い愛情の持ち主。感受性が高く、人を思いやる心が強い。",
    keywords: ["感情豊か", "愛情深い", "共感力高い"],
  },
  short: {
    meaning: "感情より理性を優先するタイプ。冷静に判断し、実利を重視する現実主義者。",
    keywords: ["現実主義", "冷静沈着", "論理的"],
  },
  curved: {
    meaning: "情熱的で感情表現が豊か。愛する人のために全力を尽くす献身的な愛情の持ち主。",
    keywords: ["情熱的", "献身的", "表現力豊か"],
  },
  straight: {
    meaning: "安定した感情コントロールができる。理性と感情のバランスが取れた成熟した愛情観。",
    keywords: ["感情コントロール", "成熟した愛情観", "安定性"],
  },
};

const HEAD_LINE_DATA: Record<HeadLine, { meaning: string; keywords: string[] }> = {
  long: {
    meaning: "思考力・分析力に優れ、深く考えてから行動する。学習能力が高く、知識を広げる。",
    keywords: ["深い思考力", "分析力", "知的好奇心"],
  },
  short: {
    meaning: "直感と行動力を活かすタイプ。考えすぎず、スピーディーに動ける実践力がある。",
    keywords: ["直感力", "行動力", "スピード感"],
  },
  curved: {
    meaning: "創造性と豊かな想像力の持ち主。芸術的センスと柔軟な発想で新しいものを生み出す。",
    keywords: ["創造力", "芸術的センス", "柔軟な発想"],
  },
  forked: {
    meaning: "多角的な視点で物事を捉えられる。文系と理系、両方の思考を持つ万能タイプ。",
    keywords: ["多角的視点", "万能型", "バランスある思考"],
  },
};

const FATE_LINE_DATA: Record<FateLine, { meaning: string; keywords: string[] }> = {
  present: {
    meaning: "明確な目標と強い使命感を持つ。自分の道を意志を持って歩む、目的意識が高い人物。",
    keywords: ["使命感", "目標志向", "意志の強さ"],
  },
  faint: {
    meaning: "柔軟に状況に応じて進路を定める。固定した運命ではなく、自分で道を切り拓く力を持つ。",
    keywords: ["柔軟性", "自力開拓", "適応力"],
  },
  absent: {
    meaning: "自由に自分の道を歩む自由人。型にはまらず、自分のペースで人生を創造する。",
    keywords: ["自由精神", "自己決定力", "独自路線"],
  },
};

const SUN_LINE_DATA: Record<SunLine, { meaning: string; keywords: string[] }> = {
  present: {
    meaning: "人気運・才能運に恵まれる。人に認められる星の下に生まれ、輝く才能を持つ。",
    keywords: ["人気運", "才能", "社会的認知"],
  },
  absent: {
    meaning: "堅実に積み上げるタイプ。派手さはないが着実に実力をつけ、信頼を勝ち取る。",
    keywords: ["着実さ", "実力主義", "地道な努力"],
  },
};

// ===== 手相総合分析 =====

function generateOverall(
  lifeLine: LifeLine,
  heartLine: HeartLine,
  headLine: HeadLine,
  fateLine: FateLine,
  sunLine: SunLine
): { overall: string; loveStyle: string; workStyle: string } {
  // スコアリング
  const energyScore = { long: 3, normal: 2, short: 1, branched: 2.5 }[lifeLine];
  const emotionScore = { long: 3, short: 1, curved: 3, straight: 2 }[heartLine];
  const intellectScore = { long: 3, short: 1, curved: 2.5, forked: 2.5 }[headLine];
  const fateScore = { present: 3, faint: 2, absent: 1 }[fateLine];
  const sunScore = { present: 3, absent: 1 }[sunLine];

  const totalScore = energyScore + emotionScore + intellectScore + fateScore + sunScore;

  let overall = "";
  let loveStyle = "";
  let workStyle = "";

  if (totalScore >= 12) {
    overall =
      "全体的に非常にバランスの取れた手相。生命力・感情・知性のすべてが高く、人生のあらゆる局面で輝ける素質を持つ。";
    loveStyle = "情熱的で誠実な恋愛。相手を深く愛しながら、自分も大切にするバランスの良いパートナーシップを築く。";
    workStyle = "どんな仕事でも活躍できる万能型。リーダーシップと専門性の両方を持ち合わせる。";
  } else if (emotionScore > intellectScore + 1) {
    overall =
      "感情の豊かさと共感力が際立つ手相。人の気持ちに寄り添う力が強く、深い人間関係を築く。";
    loveStyle = "愛情深く献身的なパートナー。相手の幸せを自分の喜びとする、純粋な愛情の持ち主。";
    workStyle = "対人サービス・医療・教育・福祉分野で能力を発揮。人の役に立つことに喜びを感じる。";
  } else if (intellectScore > emotionScore + 1) {
    overall =
      "知性と分析力が光る手相。論理的思考と深い洞察力で、複雑な問題も解決できる知的なタイプ。";
    loveStyle = "頭で考えすぎる傾向があるが、深く繋がった相手には誠実。精神的な対話を大切にする。";
    workStyle = "研究・技術・戦略職での活躍が期待できる。専門性を磨くことで頭角を現す。";
  } else if (energyScore >= 2.5) {
    overall =
      "行動力とエネルギーが溢れる手相。どんな状況でも前に進む力と、チャレンジ精神が旺盛。";
    loveStyle = "積極的に愛情を表現するタイプ。情熱的に追いかけ、相手を幸せにしたいという強い気持ちがある。";
    workStyle = "行動力と推進力を活かしたフィールドワーク・営業・起業に向いている。";
  } else {
    overall =
      "堅実で落ち着いた人生設計ができる手相。着実に信頼と実力を積み上げ、長期的な成功を手にする。";
    loveStyle = "ゆっくりと関係を深めるタイプ。信頼と安心感を土台にした、長く続く愛情を育む。";
    workStyle = "専門性や継続的な取り組みが実を結ぶ仕事で活躍。コツコツと積み上げることが強み。";
  }

  return { overall, loveStyle, workStyle };
}

// ===== メイン分析関数 =====

export function analyzePalmLines(palm: PalmInput): PalmResult {
  const lifeData = LIFE_LINE_DATA[palm.lifeLine];
  const heartData = HEART_LINE_DATA[palm.heartLine];
  const headData = HEAD_LINE_DATA[palm.headLine];
  const fateData = FATE_LINE_DATA[palm.fateLine];
  const sunData = SUN_LINE_DATA[palm.sunLine];

  const readings: PalmLineReading[] = [
    { line: "生命線", value: palm.lifeLine === "long" ? "長い" : palm.lifeLine === "normal" ? "普通" : palm.lifeLine === "short" ? "短い" : "枝分かれ", meaning: lifeData.meaning },
    { line: "感情線", value: palm.heartLine === "long" ? "長い" : palm.heartLine === "short" ? "短い" : palm.heartLine === "curved" ? "カーブが強い" : "まっすぐ", meaning: heartData.meaning },
    { line: "知能線", value: palm.headLine === "long" ? "長い" : palm.headLine === "short" ? "短い" : palm.headLine === "curved" ? "カーブ" : "二股", meaning: headData.meaning },
    { line: "運命線", value: palm.fateLine === "present" ? "ある" : palm.fateLine === "faint" ? "薄い" : "ない", meaning: fateData.meaning },
    { line: "太陽線", value: palm.sunLine === "present" ? "ある" : "ない", meaning: sunData.meaning },
  ];

  // キーワード集約（重複除去）
  const allKeywords = [
    ...lifeData.keywords,
    ...heartData.keywords,
    ...headData.keywords,
    ...fateData.keywords,
    ...sunData.keywords,
  ];
  const keywords = [...new Set(allKeywords)].slice(0, 6);

  const { overall, loveStyle, workStyle } = generateOverall(
    palm.lifeLine,
    palm.heartLine,
    palm.headLine,
    palm.fateLine,
    palm.sunLine
  );

  return {
    readings,
    keywords,
    overall,
    loveStyle,
    workStyle,
  };
}
