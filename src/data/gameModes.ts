// 玩法模式定义
export type GameModeId = "classic" | "speed" | "precision" | "survival" | "zen";

export interface GameMode {
  id: GameModeId;
  name: Record<string, string>;
  desc: Record<string, string>;
  icon: string;
  // 模式参数
  pipeSpeedMult: number;    // 管道速度倍率
  pipeGapMult: number;      // 间隙大小倍率
  scoreMult: number;         // 分数倍率
  powerUpRate: number;       // 道具出现概率
  starRate: number;          // 星星出现概率
  lives: number;             // 生命数 (-1 = 无限)
  invulnAfterHit: number;    // 受击无敌时间
  unlockScore: number;       // 解锁所需分数 (0 = 默认解锁)
}

export const GAME_MODES: GameMode[] = [
  {
    id: "classic",
    name: {
      zh: "经典模式",
      en: "Classic",
      ja: "クラシック",
      ko: "클래식",
      es: "Clásico",
      fr: "Classique",
      ru: "Классика",
      de: "Klassik",
    },
    desc: {
      zh: "原汁原味的飞纸鸟体验",
      en: "The original paper bird experience",
      ja: "本来の紙鳥飛行体験",
      ko: "원조 종이새 비행 체험",
      es: "La experiencia original del pájaro de papel",
      fr: "L'expérience originale de l'oiseau de papier",
      ru: "Оригинальный полёт бумажной птицы",
      de: "Das originale Papiervogel-Erlebnis",
    },
    icon: "🕊️",
    pipeSpeedMult: 1,
    pipeGapMult: 1,
    scoreMult: 1,
    powerUpRate: 0.5,
    starRate: 0.65,
    lives: 1,
    invulnAfterHit: 0,
    unlockScore: 0,
  },
  {
    id: "speed",
    name: {
      zh: "极速模式",
      en: "Speed Rush",
      ja: "スピードラッシュ",
      ko: "스피드 러시",
      es: "Velocidad",
      fr: "Course Rapide",
      ru: "Скоростной",
      de: "Geschwindigkeit",
    },
    desc: {
      zh: "管道加速，分数翻倍，考验反应",
      en: "Faster pipes, double score, test your reflexes",
      ja: "パイプ加速、スコア2倍、反射神経を試せ",
      ko: "파이프 가속, 점수 2배, 반사신경 시험",
      es: "Tubos más rápidos, puntuación doble, pon a prueba tus reflejos",
      fr: "Tuyaux plus rapides, score doublé, testez vos réflexes",
      ru: "Быстрые трубы, двойные очки, проверь реакцию",
      de: "Schnellere Röhren, doppelte Punkte, teste deine Reflexe",
    },
    icon: "⚡",
    pipeSpeedMult: 1.6,
    pipeGapMult: 1.05,
    scoreMult: 2,
    powerUpRate: 0.4,
    starRate: 0.7,
    lives: 1,
    invulnAfterHit: 0,
    unlockScore: 30,
  },
  {
    id: "precision",
    name: {
      zh: "精准模式",
      en: "Precision",
      ja: "精密飛行",
      ko: "정밀 비행",
      es: "Precisión",
      fr: "Précision",
      ru: "Точность",
      de: "Präzision",
    },
    desc: {
      zh: "更窄的间隙，更高的分数倍率",
      en: "Narrower gaps, higher score multiplier",
      ja: "より狭い隙間、より高いスコア倍率",
      ko: "더 좁은 틈, 더 높은 점수 배율",
      es: "Espacios más estrechos, mayor multiplicador de puntuación",
      fr: "Écarts plus étroits, multiplicateur de score plus élevé",
      ru: "Уже просветы, выше множитель очков",
      de: "Engere Lücken, höherer Punktemultiplikator",
    },
    icon: "🎯",
    pipeSpeedMult: 0.9,
    pipeGapMult: 0.7,
    scoreMult: 3,
    powerUpRate: 0.3,
    starRate: 0.5,
    lives: 1,
    invulnAfterHit: 0,
    unlockScore: 50,
  },
  {
    id: "survival",
    name: {
      zh: "生存模式",
      en: "Survival",
      ja: "サバイバル",
      ko: "서바이벌",
      es: "Supervivencia",
      fr: "Survie",
      ru: "Выживание",
      de: "Überleben",
    },
    desc: {
      zh: "3条命，无道具，看你能走多远",
      en: "3 lives, no power-ups, how far can you go?",
      ja: "3つの命、アイテムなし、どこまで行ける？",
      ko: "3개의 목숨, 아이템 없음, 얼마나 멀리 갈 수 있을까?",
      es: "3 vidas, sin power-ups, ¿hasta dónde llegarás?",
      fr: "3 vies, pas de power-ups, jusqu'où irez-vous ?",
      ru: "3 жизни, без усилений, как далеко ты зайдёшь?",
      de: "3 Leben, keine Power-Ups, wie weit kommst du?",
    },
    icon: "🛡️",
    pipeSpeedMult: 1,
    pipeGapMult: 1,
    scoreMult: 1,
    powerUpRate: 0,
    starRate: 0.5,
    lives: 3,
    invulnAfterHit: 1.5,
    unlockScore: 40,
  },
  {
    id: "zen",
    name: {
      zh: "禅意模式",
      en: "Zen Mode",
      ja: "禅モード",
      ko: "선 모드",
      es: "Modo Zen",
      fr: "Mode Zen",
      ru: "Дзен-Режим",
      de: "Zen-Modus",
    },
    desc: {
      zh: "无限生命，放松飞行，享受风景",
      en: "Infinite lives, relax and enjoy the scenery",
      ja: "無限の命、リラックスして景色を楽しもう",
      ko: "무한 생명, 편안히 풍경을 즐기세요",
      es: "Vidas infinitas, relájate y disfruta del paisaje",
      fr: "Vies infinies, détendez-vous et profitez du paysage",
      ru: "Бесконечные жизни, расслабься и наслаждайся пейзажем",
      de: "Unendliche Leben, entspanne und genieße die Landschaft",
    },
    icon: "🧘",
    pipeSpeedMult: 0.7,
    pipeGapMult: 1.2,
    scoreMult: 0.5,
    powerUpRate: 0.6,
    starRate: 0.8,
    lives: -1,
    invulnAfterHit: 0,
    unlockScore: 80,
  },
];

export function getMode(id: GameModeId): GameMode {
  return GAME_MODES.find((m) => m.id === id) ?? GAME_MODES[0];
}

export function getModeName(id: GameModeId, lang: string): string {
  const mode = getMode(id);
  return (mode.name as Record<string, string>)[lang] ?? id;
}

export function getModeDesc(id: GameModeId, lang: string): string {
  const mode = getMode(id);
  return (mode.desc as Record<string, string>)[lang] ?? "";
}