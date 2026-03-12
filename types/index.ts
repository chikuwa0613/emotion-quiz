// ===== INPUT TYPES =====

export interface BirthDate {
  year: number;
  month: number;
  day: number;
}

export type LifeLine = "long" | "normal" | "short" | "branched";
export type HeartLine = "long" | "short" | "curved" | "straight";
export type HeadLine = "long" | "short" | "curved" | "forked";
export type FateLine = "present" | "faint" | "absent";
export type SunLine = "present" | "absent";

export interface PalmInput {
  lifeLine: LifeLine;
  heartLine: HeartLine;
  headLine: HeadLine;
  fateLine: FateLine;
  sunLine: SunLine;
}

export type MbtiType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP"
  | null;

export interface UserInput {
  birthDate: BirthDate;
  palm: PalmInput;
  mbti: MbtiType;
}

// ===== SANMEIGAKU TYPES =====

export interface StemBranch {
  stem: number; // 0-9
  branch: number; // 0-11
  cycle: number; // 0-59
  stemName: string;
  branchName: string;
  cycleName: string;
}

export interface MainStar {
  index: number;
  name: string;
  element: string;
  personality: string;
  talent: string;
  relationship: string;
  loveStyle: string;
  workStyle: string;
}

export interface SanmeigakuResult {
  yearPillar: StemBranch;
  monthPillar: StemBranch;
  dayPillar: StemBranch;
  mainStar: MainStar;
}

// ===== 5 ANIMALS TYPES =====

export type AnimalName = "虎" | "狼" | "猿" | "コアラ" | "黒ヒョウ";
export type AnimalRole = "リーダー" | "サブ";

export interface FiveAnimalResult {
  lifeNumber: number;
  animalTypeIndex: number; // 1-10
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

// ===== PALM READING TYPES =====

export interface PalmLineReading {
  line: string;
  value: string;
  meaning: string;
}

export interface PalmResult {
  readings: PalmLineReading[];
  keywords: string[];
  overall: string;
  loveStyle: string;
  workStyle: string;
}

// ===== MBTI TYPES =====

export interface MbtiResult {
  type: MbtiType;
  description: string;
  loveStyle: string;
  workStyle: string;
}

// ===== INTEGRATED RESULT TYPES =====

export interface IntegratedResult {
  catchphrase: string;
  integratedPersonality: string;
  loveType: string;
  workType: string;
  shareText: string;
}

// ===== APP STATE =====

export type AppStep = "input" | "loading" | "results";

export interface DiagnosisResult {
  input: UserInput;
  sanmeigaku: SanmeigakuResult;
  fiveAnimal: FiveAnimalResult;
  palm: PalmResult;
  mbti: MbtiResult | null;
  integrated: IntegratedResult;
}
