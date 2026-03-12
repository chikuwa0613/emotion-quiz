import type { BirthDate, AnimalName, AnimalRole, FiveAnimalResult } from "@/types";

// ===== うるう年判定 =====
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// ===== 年内の通算日数（1月1日=1）=====
function getDayOfYear(month: number, day: number, leap: boolean): number {
  const daysInMonth = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = day;
  for (let i = 0; i < month - 1; i++) {
    total += daysInMonth[i];
  }
  return total;
}

// ===== 命数計算 =====
// 5アニマル占いの命数（1〜60）を生年月日から算出
// 節分（2月4日）を年の区切りとし、それ以前は前年扱い
export function calcLifeNumber(year: number, month: number, day: number): number {
  // 節分補正
  let adjustedYear = year;
  if (month === 1 || (month === 2 && day <= 3)) {
    adjustedYear = year - 1;
  }

  const leap = isLeapYear(adjustedYear);
  const dayOfYear = getDayOfYear(month, day, leap);

  // 年ベース数の計算
  // 1900年を基準に、年が変わるごとに6増加（うるう年を考慮）
  const yearsSince1900 = adjustedYear - 1900;
  const leapYearCount = Math.floor(yearsSince1900 / 4) -
    Math.floor(yearsSince1900 / 100) +
    Math.floor(yearsSince1900 / 400);
  const yearBase = (yearsSince1900 * 5 + leapYearCount) % 60;

  // 命数 = 年ベース + 日数 (1-indexed)
  let lifeNumber = (yearBase + dayOfYear) % 60;
  if (lifeNumber === 0) lifeNumber = 60;

  return lifeNumber;
}

// ===== 動物タイプデータ =====

interface AnimalTypeData {
  animal: AnimalName;
  role: AnimalRole;
  label: string;
  personality: string;
  strength: string;
  weakness: string;
  loveStyle: string;
  workStyle: string;
  compatibleAnimals: AnimalName[];
}

const ANIMAL_TYPES: AnimalTypeData[] = [
  // 1: 虎（リーダー）
  {
    animal: "虎",
    role: "リーダー",
    label: "リーダー虎",
    personality:
      "百獣の王の風格を持つ、生まれながらのリーダー。圧倒的な存在感と決断力で人を惹きつける。正義感が強く、弱者を守る精神に溢れる。大きな夢を持ち、周囲を巻き込んで実現していく力がある。",
    strength: "カリスマ性・決断力・正義感・スケールの大きさ",
    weakness: "頑固・プライドが高い・細かいことが苦手",
    loveStyle:
      "恋愛でも主導権を握りたいタイプ。情熱的で一途だが、プライドが邪魔して素直になれないことも。",
    workStyle:
      "経営者・リーダー職に最適。大きな目標を掲げ、チームを引っ張る役割で輝く。",
    compatibleAnimals: ["コアラ", "狼"],
  },
  // 2: 虎（サブ）
  {
    animal: "虎",
    role: "サブ",
    label: "サブ虎",
    personality:
      "表に出るより裏方でリーダーを支えることに喜びを感じる虎。鋭い観察眼と戦略的思考で、チームを陰から強くする。忠誠心が高く、信じた人のためなら全力を尽くす。",
    strength: "戦略性・忠誠心・観察力・サポート力",
    weakness: "本音を言えない・ストレスを抱えやすい",
    loveStyle:
      "相手を立てながら深く愛するタイプ。献身的だが、自分の感情を後回しにしがち。",
    workStyle:
      "参謀・マネージャー・コンサルタント向き。リーダーの右腕として実力を発揮。",
    compatibleAnimals: ["コアラ", "黒ヒョウ"],
  },
  // 3: 狼（リーダー）
  {
    animal: "狼",
    role: "リーダー",
    label: "リーダー狼",
    personality:
      "孤高の哲学者にして行動者。自分の信念と価値観に従って生きる、個性派のリーダー。群れをなすより独自の道を歩むが、ひとたびチームを率いると絶大な信頼を得る。",
    strength: "独創性・信念の強さ・深い思考・カリスマ性",
    weakness: "孤立しやすい・頑固・妥協しない",
    loveStyle:
      "理想の相手を見つけるまでは一人でいることも多い。一度決めると一途で深く愛する。",
    workStyle:
      "起業家・クリエイター・研究者向き。自分のやり方で挑める環境が最適。",
    compatibleAnimals: ["虎", "猿"],
  },
  // 4: 狼（サブ）
  {
    animal: "狼",
    role: "サブ",
    label: "サブ狼",
    personality:
      "冷静な分析力と深い洞察力を持つ、知性派のサポーター。感情より理性を優先し、論理的に物事を進める。独自の美学と哲学を持ち、信じる価値観のために動く。",
    strength: "分析力・冷静さ・論理的思考・専門性",
    weakness: "感情表現が苦手・完璧主義・とっつきにくい",
    loveStyle:
      "論理的に恋愛を考えすぎて踏み出せないことも。深く理解してくれる相手には心を開く。",
    workStyle:
      "研究職・エンジニア・分析職向き。専門分野を極めることで真価を発揮。",
    compatibleAnimals: ["黒ヒョウ", "コアラ"],
  },
  // 5: 猿（リーダー）
  {
    animal: "猿",
    role: "リーダー",
    label: "リーダー猿",
    personality:
      "知恵と機転で場を制する、タフで賢いリーダー。状況判断が素早く、どんな逆境でも突破口を見つける。ユーモアと明るさで場を和ませながら、したたかに目標を達成する。",
    strength: "頭の回転の速さ・適応力・ユーモア・逆境への強さ",
    weakness: "考えすぎる・策略的に見られる・落ち着きがない",
    loveStyle:
      "軽やかに恋愛を楽しむが、本気になると意外と深い一面も。頭がいいので先読みしすぎることも。",
    workStyle:
      "経営・交渉・マーケティング向き。頭を使ってチャンスをつかむのが得意。",
    compatibleAnimals: ["狼", "虎"],
  },
  // 6: 猿（サブ）
  {
    animal: "猿",
    role: "サブ",
    label: "サブ猿",
    personality:
      "器用で多才、あらゆる場面に適応できるユーティリティプレーヤー。誰とでも打ち解けられる社交性と、場の空気を読む高いアンテナを持つ。縁の下から組織を支える影の功労者。",
    strength: "適応力・社交性・器用さ・空気を読む力",
    weakness: "八方美人に見られる・本音を見せにくい",
    loveStyle:
      "誰とでも仲良くなれるが、本命には特別な気持ちを示す。サービス精神旺盛な恋人タイプ。",
    workStyle:
      "営業・コーディネーター・マルチタスク職向き。どんな職場でも馴染む適応力がある。",
    compatibleAnimals: ["コアラ", "虎"],
  },
  // 7: コアラ（リーダー）
  {
    animal: "コアラ",
    role: "リーダー",
    label: "リーダーコアラ",
    personality:
      "独自のマイペースさと高い審美眼を持つ、個性派リーダー。自分のペースを崩さないが、その強い美意識と個性が周囲を引き寄せる。好きなことへの集中力は誰にも負けない。",
    strength: "個性・審美眼・集中力・独自性",
    weakness: "マイペース過ぎる・協調性に欠けることがある",
    loveStyle:
      "自分のペースで進む恋愛スタイル。理解してくれる相手との穏やかな関係を好む。",
    workStyle:
      "クリエイター・アーティスト・専門職向き。自分のスタイルを活かせる仕事で開花。",
    compatibleAnimals: ["虎", "狼"],
  },
  // 8: コアラ（サブ）
  {
    animal: "コアラ",
    role: "サブ",
    label: "サブコアラ",
    personality:
      "のんびりしているように見えて、実は深い知恵と鋭い感性を持つ。マイペースながら周囲への気配りができ、独特の存在感で場を和ませる。安心感を与えるオーラがある。",
    strength: "安心感・感性・マイペース・独自の世界観",
    weakness: "行動が遅い・優柔不断・変化を嫌う",
    loveStyle:
      "ゆっくり時間をかけて関係を深める。安心できる関係を最重要視し、急な変化が苦手。",
    workStyle:
      "ものづくり・研究・サポート職向き。じっくり取り組む仕事で真価を発揮。",
    compatibleAnimals: ["猿", "黒ヒョウ"],
  },
  // 9: 黒ヒョウ（リーダー）
  {
    animal: "黒ヒョウ",
    role: "リーダー",
    label: "リーダー黒ヒョウ",
    personality:
      "圧倒的なスピードと直感で目標を仕留める、クールなトップアスリート。自由を愛し、自分の本能と直感を信じて動く。神秘的な魅力とどこか近寄りがたい雰囲気で、多くの人を惹きつける。",
    strength: "スピード・直感力・神秘的魅力・独立心",
    weakness: "孤独主義・感情を見せない・深い関係が苦手",
    loveStyle:
      "ミステリアスな魅力でモテるが、本心を見せるまでに時間がかかる。自由な恋愛スタイル。",
    workStyle:
      "フリーランス・アスリート・芸術家向き。制約なく自分の力を発揮できる環境で輝く。",
    compatibleAnimals: ["虎", "狼"],
  },
  // 10: 黒ヒョウ（サブ）
  {
    animal: "黒ヒョウ",
    role: "サブ",
    label: "サブ黒ヒョウ",
    personality:
      "クールな外見の奥に、繊細で豊かな感情を秘めたミステリアスな存在。自分の世界観を大切にし、表面的なお付き合いを好まない。深く関わった相手には驚くほど温かい一面を見せる。",
    strength: "繊細さ・深さ・神秘性・独自の感性",
    weakness: "誤解されやすい・打ち解けるまでに時間がかかる",
    loveStyle:
      "なかなか本音を見せないが、心を開いた相手には深く情熱的に愛する。",
    workStyle:
      "クリエイター・研究者・専門家向き。深みのある作品や仕事で評価される。",
    compatibleAnimals: ["コアラ", "猿"],
  },
];

// ===== メイン計算関数 =====

export function calcFiveAnimals(birthDate: BirthDate): FiveAnimalResult {
  const { year, month, day } = birthDate;
  const lifeNumber = calcLifeNumber(year, month, day);

  // 命数1-60 → 動物タイプ1-10 (6つずつ)
  const animalTypeIndex = ((lifeNumber - 1) % 10) + 1;
  const typeData = ANIMAL_TYPES[animalTypeIndex - 1];

  return {
    lifeNumber,
    animalTypeIndex,
    animal: typeData.animal,
    role: typeData.role,
    label: typeData.label,
    personality: typeData.personality,
    strength: typeData.strength,
    weakness: typeData.weakness,
    loveStyle: typeData.loveStyle,
    workStyle: typeData.workStyle,
    compatibleAnimals: typeData.compatibleAnimals,
  };
}
