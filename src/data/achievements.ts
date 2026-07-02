// 成就系统
export type AchievementId =
  | "first_flight"
  | "score_10"
  | "score_50"
  | "score_100"
  | "combo_10"
  | "combo_25"
  | "collect_50_stars"
  | "collect_200_stars"
  | "powerup_5"
  | "powerup_20"
  | "skin_5"
  | "skin_15"
  | "skin_all"
  | "theme_5"
  | "theme_all"
  | "speed_20"
  | "precision_15"
  | "survival_30"
  | "zen_10min"
  | "no_hit_30"
  | "play_100"
  | "daily_all";

export interface Achievement {
  id: AchievementId;
  title: Record<string, string>;
  desc: Record<string, string>;
  icon: string;
  reward: number;
  check: (stats: AchievementStats) => { progress: number; target: number; done: boolean };
}

export interface AchievementProgress {
  id: AchievementId;
  done: boolean;
  claimed: boolean;
}

export interface AchievementStats {
  bestScore: number;
  totalScore: number;
  gamesPlayed: number;
  totalStars: number;
  totalPowerUps: number;
  maxCombo: number;
  ownedSkins: number;
  ownedThemes: number;
  speedBest: number;
  precisionBest: number;
  survivalBest: number;
  zenBest: number;
  noHitBest: number;
  dailyCompleted: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_flight",
    title: { zh: "初次飞行", en: "First Flight", ja: "初飛行", ko: "첫 비행", es: "Primer Vuelo", fr: "Premier Vol", ru: "Первый Полёт", de: "Erstflug" },
    desc: { zh: "完成一局游戏", en: "Complete one game", ja: "ゲームを1回完了", ko: "게임 1회 완료", es: "Completa una partida", fr: "Terminer une partie", ru: "Завершить одну игру", de: "Ein Spiel abschließen" },
    icon: "🕊️",
    reward: 20,
    check: (s) => ({ progress: Math.min(s.gamesPlayed, 1), target: 1, done: s.gamesPlayed >= 1 }),
  },
  {
    id: "score_10",
    title: { zh: "小试牛刀", en: "Warm Up", ja: "小手調べ", ko: "첫 도전", es: "Calentamiento", fr: "Échauffement", ru: "Разминка", de: "Aufwärmen" },
    desc: { zh: "单局达到 10 分", en: "Score 10 in one game", ja: "1ゲームで10点", ko: "한 게임 10점", es: "10 puntos en una partida", fr: "10 points en une partie", ru: "10 очков за игру", de: "10 Punkte in einem Spiel" },
    icon: "⭐",
    reward: 30,
    check: (s) => ({ progress: Math.min(s.bestScore, 10), target: 10, done: s.bestScore >= 10 }),
  },
  {
    id: "score_50",
    title: { zh: "展翅高飞", en: "Soaring High", ja: "高く舞い上がれ", ko: "높이 날아올라", es: "Volando Alto", fr: "En Plein Vol", ru: "Высокий Полёт", de: "Hoch Hinaus" },
    desc: { zh: "单局达到 50 分", en: "Score 50 in one game", ja: "1ゲームで50点", ko: "한 게임 50점", es: "50 puntos en una partida", fr: "50 points en une partie", ru: "50 очков за игру", de: "50 Punkte in einem Spiel" },
    icon: "🌟",
    reward: 60,
    check: (s) => ({ progress: Math.min(s.bestScore, 50), target: 50, done: s.bestScore >= 50 }),
  },
  {
    id: "score_100",
    title: { zh: "云端漫步", en: "Cloud Walker", ja: "雲の上の散歩", ko: "구름 위 산책", es: "Caminante de Nubes", fr: "Marcheur des Nuages", ru: "Ходок по Облакам", de: "Wolkenwanderer" },
    desc: { zh: "单局达到 100 分", en: "Score 100 in one game", ja: "1ゲームで100点", ko: "한 게임 100점", es: "100 puntos en una partida", fr: "100 points en une partie", ru: "100 очков за игру", de: "100 Punkte in einem Spiel" },
    icon: "💫",
    reward: 100,
    check: (s) => ({ progress: Math.min(s.bestScore, 100), target: 100, done: s.bestScore >= 100 }),
  },
  {
    id: "combo_10",
    title: { zh: "行云流水", en: "Flowing", ja: "流れるように", ko: "물 흐르듯", es: "Fluido", fr: "Fluide", ru: "Плавно", de: "Fließend" },
    desc: { zh: "达成 10 连击", en: "Get a 10-combo", ja: "10コンボ達成", ko: "10콤보 달성", es: "Consigue un combo de 10", fr: "Obtenir un combo de 10", ru: "Комбо из 10", de: "10er-Kombo" },
    icon: "🔥",
    reward: 40,
    check: (s) => ({ progress: Math.min(s.maxCombo, 10), target: 10, done: s.maxCombo >= 10 }),
  },
  {
    id: "combo_25",
    title: { zh: "一气呵成", en: "Unstoppable", ja: "一気呵成", ko: "단숨에", es: "Imparable", fr: "Inarrêtable", ru: "Неудержимый", de: "Unaufhaltsam" },
    desc: { zh: "达成 25 连击", en: "Get a 25-combo", ja: "25コンボ達成", ko: "25콤보 달성", es: "Consigue un combo de 25", fr: "Obtenir un combo de 25", ru: "Комбо из 25", de: "25er-Kombo" },
    icon: "💥",
    reward: 80,
    check: (s) => ({ progress: Math.min(s.maxCombo, 25), target: 25, done: s.maxCombo >= 25 }),
  },
  {
    id: "collect_50_stars",
    title: { zh: "星光收集者", en: "Star Collector", ja: "星の収集家", ko: "별 수집가", es: "Coleccionista de Estrellas", fr: "Collectionneur d'Étoiles", ru: "Собиратель Звёзд", de: "Sternensammler" },
    desc: { zh: "累计收集 50 颗星芒", en: "Collect 50 stars total", ja: "星を50個集める", ko: "별 50개 수집", es: "50 estrellas en total", fr: "50 étoiles au total", ru: "50 звёзд всего", de: "50 Sterne gesammelt" },
    icon: "✨",
    reward: 30,
    check: (s) => ({ progress: Math.min(s.totalStars, 50), target: 50, done: s.totalStars >= 50 }),
  },
  {
    id: "collect_200_stars",
    title: { zh: "星河漫步", en: "Star River", ja: "星の川", ko: "별의 강", es: "Río de Estrellas", fr: "Rivière d'Étoiles", ru: "Звёздная Река", de: "Sternenfluss" },
    desc: { zh: "累计收集 200 颗星芒", en: "Collect 200 stars total", ja: "星を200個集める", ko: "별 200개 수집", es: "200 estrellas en total", fr: "200 étoiles au total", ru: "200 звёзд всего", de: "200 Sterne gesammelt" },
    icon: "🌌",
    reward: 60,
    check: (s) => ({ progress: Math.min(s.totalStars, 200), target: 200, done: s.totalStars >= 200 }),
  },
  {
    id: "powerup_5",
    title: { zh: "道具新手", en: "Power-Up Novice", ja: "アイテム初心者", ko: "아이템 초보", es: "Novato de Power-Ups", fr: "Novice des Power-Ups", ru: "Новичок Усилений", de: "Power-Up-Anfänger" },
    desc: { zh: "累计收集 5 个道具", en: "Collect 5 power-ups total", ja: "アイテムを5個集める", ko: "아이템 5개 수집", es: "5 power-ups en total", fr: "5 power-ups au total", ru: "5 усилений всего", de: "5 Power-Ups gesammelt" },
    icon: "🎁",
    reward: 20,
    check: (s) => ({ progress: Math.min(s.totalPowerUps, 5), target: 5, done: s.totalPowerUps >= 5 }),
  },
  {
    id: "powerup_20",
    title: { zh: "道具猎人", en: "Power-Up Hunter", ja: "アイテムハンター", ko: "아이템 헌터", es: "Cazador de Power-Ups", fr: "Chasseur de Power-Ups", ru: "Охотник за Усилениями", de: "Power-Up-Jäger" },
    desc: { zh: "累计收集 20 个道具", en: "Collect 20 power-ups total", ja: "アイテムを20個集める", ko: "아이템 20개 수집", es: "20 power-ups en total", fr: "20 power-ups au total", ru: "20 усилений всего", de: "20 Power-Ups gesammelt" },
    icon: "🎒",
    reward: 50,
    check: (s) => ({ progress: Math.min(s.totalPowerUps, 20), target: 20, done: s.totalPowerUps >= 20 }),
  },
  {
    id: "skin_5",
    title: { zh: "收藏家", en: "Collector", ja: "コレクター", ko: "수집가", es: "Coleccionista", fr: "Collectionneur", ru: "Коллекционер", de: "Sammler" },
    desc: { zh: "拥有 5 款皮肤", en: "Own 5 skins", ja: "スキンを5つ所持", ko: "스킨 5개 보유", es: "5 skins", fr: "5 skins", ru: "5 скинов", de: "5 Skins" },
    icon: "🎨",
    reward: 40,
    check: (s) => ({ progress: Math.min(s.ownedSkins, 5), target: 5, done: s.ownedSkins >= 5 }),
  },
  {
    id: "skin_15",
    title: { zh: "皮肤达人", en: "Skin Master", ja: "スキンマスター", ko: "스킨 마스터", es: "Maestro de Skins", fr: "Maître des Skins", ru: "Мастер Скинов", de: "Skin-Meister" },
    desc: { zh: "拥有 15 款皮肤", en: "Own 15 skins", ja: "スキンを15個所持", ko: "스킨 15개 보유", es: "15 skins", fr: "15 skins", ru: "15 скинов", de: "15 Skins" },
    icon: "🖼️",
    reward: 80,
    check: (s) => ({ progress: Math.min(s.ownedSkins, 15), target: 15, done: s.ownedSkins >= 15 }),
  },
  {
    id: "skin_all",
    title: { zh: "全收集", en: "Completionist", ja: "コンプリート", ko: "올 컬렉션", es: "Completista", fr: "Complétionniste", ru: "Коллекционер", de: "Vollständig" },
    desc: { zh: "拥有全部皮肤", en: "Own all skins", ja: "全スキン所持", ko: "모든 스킨 보유", es: "Todos los skins", fr: "Tous les skins", ru: "Все скины", de: "Alle Skins" },
    icon: "👑",
    reward: 200,
    check: (s) => ({ progress: Math.min(s.ownedSkins, 27), target: 27, done: s.ownedSkins >= 27 }),
  },
  {
    id: "theme_5",
    title: { zh: "旅行者", en: "Traveler", ja: "旅人", ko: "여행자", es: "Viajero", fr: "Voyageur", ru: "Путешественник", de: "Reisender" },
    desc: { zh: "拥有 5 个主题", en: "Own 5 themes", ja: "テーマを5つ所持", ko: "테마 5개 보유", es: "5 temas", fr: "5 thèmes", ru: "5 тем", de: "5 Themen" },
    icon: "🏞️",
    reward: 40,
    check: (s) => ({ progress: Math.min(s.ownedThemes, 5), target: 5, done: s.ownedThemes >= 5 }),
  },
  {
    id: "theme_all",
    title: { zh: "环游世界", en: "World Tour", ja: "世界一周", ko: "세계 일주", es: "Vuelta al Mundo", fr: "Tour du Monde", ru: "Кругосветка", de: "Weltreise" },
    desc: { zh: "拥有全部主题", en: "Own all themes", ja: "全テーマ所持", ko: "모든 테마 보유", es: "Todos los temas", fr: "Tous les thèmes", ru: "Все темы", de: "Alle Themen" },
    icon: "🌍",
    reward: 200,
    check: (s) => ({ progress: Math.min(s.ownedThemes, 17), target: 17, done: s.ownedThemes >= 17 }),
  },
  {
    id: "speed_20",
    title: { zh: "闪电侠", en: "Speedster", ja: "スピードスター", ko: "스피드스터", es: "Velocista", fr: "Bolide", ru: "Спидстер", de: "Sprinter" },
    desc: { zh: "极速模式达到 20 分", en: "Score 20 in Speed Rush", ja: "スピードモードで20点", ko: "스피드 모드 20점", es: "20 en Velocidad", fr: "20 en Course Rapide", ru: "20 в Скоростном", de: "20 in Geschwindigkeit" },
    icon: "⚡",
    reward: 50,
    check: (s) => ({ progress: Math.min(s.speedBest, 20), target: 20, done: s.speedBest >= 20 }),
  },
  {
    id: "precision_15",
    title: { zh: "外科医生", en: "Surgeon", ja: "外科医", ko: "외과의사", es: "Cirujano", fr: "Chirurgien", ru: "Хирург", de: "Chirurg" },
    desc: { zh: "精准模式达到 15 分", en: "Score 15 in Precision", ja: "精密モードで15点", ko: "정밀 모드 15점", es: "15 en Precisión", fr: "15 en Précision", ru: "15 в Точности", de: "15 in Präzision" },
    icon: "🎯",
    reward: 60,
    check: (s) => ({ progress: Math.min(s.precisionBest, 15), target: 15, done: s.precisionBest >= 15 }),
  },
  {
    id: "survival_30",
    title: { zh: "幸存者", en: "Survivor", ja: "サバイバー", ko: "생존자", es: "Superviviente", fr: "Survivant", ru: "Выживший", de: "Überlebender" },
    desc: { zh: "生存模式达到 30 分", en: "Score 30 in Survival", ja: "サバイバルで30点", ko: "서바이벌 30점", es: "30 en Supervivencia", fr: "30 en Survie", ru: "30 в Выживании", de: "30 in Überleben" },
    icon: "🛡️",
    reward: 70,
    check: (s) => ({ progress: Math.min(s.survivalBest, 30), target: 30, done: s.survivalBest >= 30 }),
  },
  {
    id: "zen_10min",
    title: { zh: "禅意大师", en: "Zen Master", ja: "禅マスター", ko: "선 마스터", es: "Maestro Zen", fr: "Maître Zen", ru: "Мастер Дзен", de: "Zen-Meister" },
    desc: { zh: "禅意模式获得 10 分", en: "Score 10 in Zen Mode", ja: "禅モードで10点", ko: "선 모드 10점", es: "10 en Modo Zen", fr: "10 en Mode Zen", ru: "10 в Дзен", de: "10 im Zen-Modus" },
    icon: "🧘",
    reward: 30,
    check: (s) => ({ progress: Math.min(s.zenBest, 10), target: 10, done: s.zenBest >= 10 }),
  },
  {
    id: "no_hit_30",
    title: { zh: "完美无伤", en: "Untouchable", ja: "完全無傷", ko: "무적", es: "Intocable", fr: "Intouchable", ru: "Неприкасаемый", de: "Unberührbar" },
    desc: { zh: "不使用护盾获得 30 分", en: "Score 30 without using a shield", ja: "シールドなしで30点", ko: "방패 없이 30점", es: "30 sin usar escudo", fr: "30 sans bouclier", ru: "30 без щита", de: "30 ohne Schild" },
    icon: "💎",
    reward: 100,
    check: (s) => ({ progress: Math.min(s.noHitBest, 30), target: 30, done: s.noHitBest >= 30 }),
  },
  {
    id: "play_100",
    title: { zh: "百折不挠", en: "Persistent", ja: "不屈の精神", ko: "백절불굴", es: "Persistente", fr: "Persévérant", ru: "Настойчивый", de: "Beharrlich" },
    desc: { zh: "累计游玩 100 局", en: "Play 100 games", ja: "100プレイ達成", ko: "100회 플레이", es: "100 partidas", fr: "100 parties", ru: "100 игр", de: "100 Spiele" },
    icon: "🎮",
    reward: 100,
    check: (s) => ({ progress: Math.min(s.gamesPlayed, 100), target: 100, done: s.gamesPlayed >= 100 }),
  },
  {
    id: "daily_all",
    title: { zh: "勤勉", en: "Diligent", ja: "勤勉", ko: "근면", es: "Diligente", fr: "Assidu", ru: "Прилежный", de: "Fleißig" },
    desc: { zh: "完成全部每日任务", en: "Complete all daily tasks", ja: "デイリー任務を全て完了", ko: "일일 임무 모두 완료", es: "Todas las tareas diarias", fr: "Toutes les tâches quotidiennes", ru: "Все ежедневные задания", de: "Alle täglichen Aufgaben" },
    icon: "📋",
    reward: 50,
    check: (s) => ({ progress: Math.min(s.dailyCompleted, 1), target: 1, done: s.dailyCompleted >= 1 }),
  },
];

export function getAchievement(id: AchievementId): Achievement {
  return ACHIEVEMENTS.find((a) => a.id === id) ?? ACHIEVEMENTS[0];
}