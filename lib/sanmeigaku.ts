import type { BirthDate, StemBranch, MainStar, SanmeigakuResult } from "@/types";

// ===== 天干・地支 定数 =====
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = [
  "子", "丑", "寅", "卯", "辰", "巳",
  "午", "未", "申", "酉", "戌", "亥",
];

function makeStemBranch(cycle: number): StemBranch {
  const c = ((cycle % 60) + 60) % 60;
  const stem = c % 10;
  const branch = c % 12;
  return {
    stem,
    branch,
    cycle: c,
    stemName: STEMS[stem],
    branchName: BRANCHES[branch],
    cycleName: STEMS[stem] + BRANCHES[branch],
  };
}

// ===== 年柱計算 =====
// 基準: 4年 = 甲子 (cycle 0)
// 立春（2月4日）以前は前年扱い
function calcYearPillar(year: number, month: number, day: number): StemBranch {
  let y = year;
  // 立春補正：2/4より前は前年
  if (month < 2 || (month === 2 && day < 4)) {
    y -= 1;
  }
  const cycle = (y - 4) % 60;
  return makeStemBranch(cycle);
}

// ===== 月柱計算 =====
// 月支は固定（寅月=2から始まる）
// 月干は年干によって起点が決まる
function calcMonthPillar(
  year: number,
  month: number,
  day: number
): StemBranch {
  // 節入り日（概算）を考慮した月インデックス（寅月=0）
  // 実際の節入りは毎年変わるが概算で4日を使用
  let solarMonth = month - 1; // 0-11
  if (day < 6) {
    // 節入り前は前月扱い（概算）
    solarMonth -= 1;
  }
  solarMonth = ((solarMonth % 12) + 12) % 12;

  // 月支: 寅(2)から始まる
  const monthBranch = (solarMonth + 2) % 12;

  // 月干起点は年干によって決まる
  const yearPillar = calcYearPillar(year, month, day);
  const yearStemGroup = yearPillar.stem % 5;
  // 甲/己年→丙(2), 乙/庚年→戊(4), 丙/辛年→庚(6), 丁/壬年→壬(8), 戊/癸年→甲(0)
  const monthStemBase = [2, 4, 6, 8, 0][yearStemGroup];
  const monthStem = (monthStemBase + solarMonth) % 10;

  const cycle = monthStem * 6 + Math.floor(monthBranch / 2);
  return {
    stem: monthStem,
    branch: monthBranch,
    cycle: ((cycle % 60) + 60) % 60,
    stemName: STEMS[monthStem],
    branchName: BRANCHES[monthBranch],
    cycleName: STEMS[monthStem] + BRANCHES[monthBranch],
  };
}

// ===== 日柱計算（ユリウス通日方式）=====
function calcDayPillar(year: number, month: number, day: number): StemBranch {
  // ユリウス通日（JDN）計算
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  // 基準: JDN 2451545 (2000年1月1日) = 甲辰日 (cycle 40)
  const dayCycle = ((jdn - 2451545 + 40) % 60 + 60) % 60;
  return makeStemBranch(dayCycle);
}

// ===== 十大主星テーブル =====
// [日干(0-9)][月支(0-11)] → 主星インデックス(0-9)
// 五行の相互関係（比劫・食傷・財・官・印）から算出
const STAR_MATRIX: number[][] = [
  // 甲(0): 木陽
  [9, 8, 5, 4, 8, 6, 7, 6, 3, 2, 8, 0],
  // 乙(1): 木陰
  [8, 9, 4, 5, 9, 7, 6, 7, 2, 3, 9, 1],
  // 丙(2): 火陽
  [3, 2, 9, 8, 2, 0, 1, 0, 7, 6, 2, 4],
  // 丁(3): 火陰
  [2, 3, 8, 9, 3, 1, 0, 1, 6, 7, 3, 5],
  // 戊(4): 土陽
  [7, 6, 3, 2, 6, 4, 5, 4, 1, 0, 6, 8],
  // 己(5): 土陰
  [6, 7, 2, 3, 7, 5, 4, 5, 0, 1, 7, 9],
  // 庚(6): 金陽
  [1, 0, 7, 6, 0, 8, 9, 8, 5, 4, 0, 2],
  // 辛(7): 金陰
  [0, 1, 6, 7, 1, 9, 8, 9, 4, 5, 1, 3],
  // 壬(8): 水陽
  [5, 4, 1, 0, 4, 2, 3, 2, 9, 8, 4, 6],
  // 癸(9): 水陰
  [4, 5, 0, 1, 5, 3, 2, 3, 8, 9, 5, 7],
];

// ===== 十大主星データ =====
const MAIN_STARS: MainStar[] = [
  {
    index: 0,
    name: "天将星",
    element: "火",
    personality:
      "帝王の風格を持つ、強烈な個性と支配力の持ち主。圧倒的なカリスマで周囲を引き込む存在感がある。自分の信念を曲げず、目標に向かって猪突猛進。時に激しすぎるが、その純粋さが人を惹きつける。",
    talent:
      "リーダーシップ・開拓精神・突破力。誰もやらないことへの挑戦が得意。",
    relationship:
      "対等な関係を好む。支配的になりやすいが、認めた相手には絶対的な忠誠を誓う。",
    loveStyle:
      "情熱的に燃え上がるが冷めるのも早い。対等な関係でぶつかり合える相手を求める。",
    workStyle:
      "独立・起業・リーダー向き。組織の枠に収まらず、自ら道を切り拓く。",
  },
  {
    index: 1,
    name: "天禄星",
    element: "土",
    personality:
      "安定と信頼を重んじる、堅実で誠実な人物。現実主義者でありながら、内面には豊かな感性を持つ。コツコツと積み上げる忍耐力があり、人生の基盤をしっかり築く。",
    talent:
      "継続力・実務能力・財運。着実に資産や信頼を積み上げる力が卓越している。",
    relationship:
      "義理人情を大切にし、長く付き合える関係を好む。裏切りには敏感。",
    loveStyle:
      "安定した関係を求め、浮気は絶対にしない一途なタイプ。信頼を築くまでに時間がかかる。",
    workStyle:
      "会社員・専門職・管理職向き。コツコツ積み上げて確実に昇進していく。",
  },
  {
    index: 2,
    name: "天権星",
    element: "金",
    personality:
      "鋭い知性と分析力を持つ、論理的思考の持ち主。物事を多角的に捉え、冷静に判断する。権威を重んじ、規律と秩序を大切にする。外見はクールだが、内に熱い信念を秘めている。",
    talent: "分析力・組織管理・権威性。複雑な問題を整理して解決する能力が高い。",
    relationship:
      "礼儀と敬意を重視。感情より理性で関係を築くが、信頼した相手には深い情を示す。",
    loveStyle:
      "理想が高く慎重。完璧主義が出やすいが、本気になると深く誠実に愛する。",
    workStyle: "経営・法律・医療・学術向き。権威ある立場で実力を発揮する。",
  },
  {
    index: 3,
    name: "天奉星",
    element: "木",
    personality:
      "純粋な奉仕心と優しさを持つ、縁の下の力持ち。他者のために動くことに喜びを感じる。穏やかで協調性が高く、周囲を和やかな雰囲気にする。自己犠牲になりやすいが、その善意は本物。",
    talent: "サポート力・共感力・調和。チームをまとめ、全員が活躍できる環境を作る。",
    relationship:
      "相手の立場に立って考えられる。深い絆を大切にし、助けを求められると断れない。",
    loveStyle:
      "献身的で相手中心。自分の気持ちより相手の幸せを優先する愛情深いタイプ。",
    workStyle: "医療・福祉・教育・サービス業向き。人の役に立つ仕事で輝く。",
  },
  {
    index: 4,
    name: "天庫星",
    element: "土",
    personality:
      "蓄積と忍耐の人。過去から学び、経験を積み重ねることで力を発揮する。表面上は頑固に見えるが、内面は豊かな感情と深い洞察力を持つ。時間をかけることを厭わない。",
    talent:
      "記憶力・蓄積力・歴史的思考。過去の経験を活かして現在に価値をもたらす。",
    relationship:
      "一度信頼すれば長く付き合う。疑い深い面があるが、認めた相手への忠誠は揺るぎない。",
    loveStyle:
      "慎重でなかなか打ち明けないが、相手を決めたら長く深く愛し続ける。",
    workStyle: "伝統産業・骨董・歴史・研究職向き。経験を積むほど価値が増す職種に向いている。",
  },
  {
    index: 5,
    name: "天極星",
    element: "水",
    personality:
      "変革と自由を愛する革命家。既存の枠組みを壊し、新しい秩序を作ることに使命を感じる。独創的で型破りな発想の持ち主。孤独を恐れず、自分の信念で突き進む。",
    talent: "改革力・独創性・先見性。時代の先を読み、新しい価値を創造する。",
    relationship:
      "束縛を嫌い、対等かつ自由な関係を求める。特定の人と深く繋がる前に多くの出会いを経る。",
    loveStyle:
      "自由恋愛型。束縛されることを嫌い、互いの独立を尊重できる相手を求める。",
    workStyle: "起業・芸術・革命的事業向き。組織より個人で活動する方が本領発揮。",
  },
  {
    index: 6,
    name: "天南星",
    element: "火",
    personality:
      "情熱と行動力に溢れる、明るい太陽のような存在。直感で動き、スピード感を持って物事を進める。楽天的で場の雰囲気を明るくする。衝動的な面もあるが、その活力が周囲を元気にする。",
    talent: "行動力・積極性・エネルギー。やると決めたら即実行、推進力が誰よりも強い。",
    relationship:
      "オープンで友好的。誰とでもすぐ仲良くなれるが、深い関係を築くには時間と努力が必要。",
    loveStyle:
      "積極的でアプローチが早い。恋が始まると情熱的だが、飽きっぽい一面も。",
    workStyle: "営業・エンタメ・スポーツ・フロント業務向き。人前に出る仕事で輝く。",
  },
  {
    index: 7,
    name: "天胡星",
    element: "木",
    personality:
      "豊かな創造力と感受性を持つ、アーティスティックな魂の持ち主。物事の美しさや本質を直感で捉える。独特の世界観があり、型にはまることを嫌う。夢と現実の間を自由に行き来する。",
    talent: "芸術性・感受性・直感力。言葉や形を超えた表現で人の心を動かす。",
    relationship:
      "感情豊かで共感力が高い。芸術的・精神的な繋がりを大切にする。",
    loveStyle:
      "ロマンチックで夢見がち。理想の愛を求め、現実とのギャップに悩むことも。",
    workStyle: "芸術・クリエイティブ・精神世界関連向き。感性を活かせる環境が最高のステージ。",
  },
  {
    index: 8,
    name: "天報星",
    element: "金",
    personality:
      "人との縁に恵まれ、不思議な運の引きを持つ。明るく親しみやすい人柄で、自然と人が集まる。器用で多才、多くの分野に興味を持つ。運命の流れに乗ることで才能が開花する。",
    talent: "人脈構築・多才・運引き。縁を活かして思わぬチャンスをつかむ能力がある。",
    relationship:
      "誰とでも気軽に付き合えるが、特定の深い絆を求める傾向も。人に恵まれる。",
    loveStyle:
      "モテるタイプ。縁のある出会いが多く、運命的な恋に発展することがある。",
    workStyle: "芸能・広報・コンサルタント・フリーランス向き。人脈が財産になる。",
  },
  {
    index: 9,
    name: "天印星",
    element: "水",
    personality:
      "高い精神性と品格を持つ、知性的な哲学者。物事の本質を深く考え、表面的なことに惑わされない。温かみと知性を兼ね備え、人生の意味を探求し続ける。静かな強さを内に秘めた人物。",
    talent: "精神性・哲学的思考・品格。深い思索と高い倫理観で周囲に影響を与える。",
    relationship:
      "表面的な付き合いを嫌い、精神的な深さを共有できる人との繋がりを重視。",
    loveStyle:
      "精神的な繋がりを最重要視する。外見より内面の美しさに惹かれる。",
    workStyle: "教育・哲学・宗教・カウンセリング向き。人の魂に触れる仕事で真価を発揮。",
  },
];

// ===== メイン計算関数 =====

export function calcSanmeigaku(birthDate: BirthDate): SanmeigakuResult {
  const { year, month, day } = birthDate;

  const yearPillar = calcYearPillar(year, month, day);
  const monthPillar = calcMonthPillar(year, month, day);
  const dayPillar = calcDayPillar(year, month, day);

  // 主星: 日干 × 月支
  const starIndex = STAR_MATRIX[dayPillar.stem][monthPillar.branch];
  const mainStar = MAIN_STARS[starIndex];

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    mainStar,
  };
}
