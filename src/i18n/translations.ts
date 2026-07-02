// 支持 8 种语言
export type Lang = "zh" | "en" | "ja" | "ko" | "es" | "fr" | "ru" | "de";

export const LANG_LABELS: Record<Lang, string> = {
  zh: "汉语",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  ru: "Русский",
  de: "Deutsch",
};

export const LANG_NAMES: Record<Lang, string> = {
  zh: "汉语",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  ru: "Русский",
  de: "Deutsch",
};

// 所有 UI 文本
export interface Translations {
  // 通用
  common: {
    back: string;
    confirm: string;
    cancel: string;
    stars: string;
    bestScore: string;
    equipped: string;
    clickToEquip: string;
    free: string;
    all: string;
    notEnoughStars: string;
    unlockFailed: string;
    unlocked: string;
    claimSuccess: string;
    inProgress: string;
    claimed: string;
    continue: string;
    restart: string;
    home: string;
    start: string;
    pause: string;
    resume: string;
    clear: string;
    clearAll: string;
    save: string;
    loading: string;
  };
  // 首页
  home: {
    subtitle: string;
    title: string;
    tagline: string;
    begin: string;
    collection: string;
    shop: string;
    leaderboard: string;
    settings: string;
    hint: string;
    subtitleEn: string;
  };
  // 游戏页
  game: {
    ready: string;
    readyHint: string;
    paused: string;
    currentScore: string;
    combo: string;
    restart: string;
    home: string;
  };
  // 结算页
  gameOver: {
    newRecord: string;
    gameOver: string;
    subtitleNew: string;
    subtitleEnd: string;
    score: string;
    best: string;
    stars: string;
    combo: string;
    quote: string;
    mainMenu: string;
    playAgain: string;
  };
  // 收藏馆
  collection: {
    title: string;
    subtitle: string;
    skins: string;
    themes: string;
    all: string;
    common: string;
    rare: string;
    epic: string;
    legendary: string;
    equipped: string;
    clickEquip: string;
    notEnough: string;
    unlocked: string;
    unlockFail: string;
    currentTheme: string;
  };
  // 商城
  shop: {
    title: string;
    subtitle: string;
    equipment: string;
    dailyTasks: string;
    trail: string;
    shield: string;
    accessory: string;
    noTasks: string;
    noTasksHint: string;
  };
  // 排行榜
  leaderboard: {
    title: string;
    subtitle: string;
    empty: string;
    emptyHint: string;
    startGame: string;
    rank: string;
    score: string;
    stars: string;
    date: string;
    bestScore: string;
    totalStars: string;
  };
  // 设置
  settings: {
    title: string;
    subtitle: string;
    audio: string;
    sound: string;
    soundDesc: string;
    music: string;
    musicDesc: string;
    graphics: string;
    quality: string;
    paperTexture: string;
    language: string;
    languageDesc: string;
    data: string;
    dataDesc: string;
    clearData: string;
    qualityLow: string;
    qualityMed: string;
    qualityHigh: string;
    reset: string;
  };
  // 道具
  powerUps: Record<string, { name: string; desc: string }>;
  // 稀有度
  rarity: Record<string, string>;
  // 装备种类
  equipKinds: Record<string, string>;
}

// 皮肤名称翻译
export const SKIN_NAMES: Record<string, Record<Lang, string>> = {
  classic: { zh: "原色", en: "Classic", ja: "原色", ko: "원색", es: "Clásico", fr: "Classique", ru: "Классика", de: "Klassik" },
  cloud: { zh: "云白", en: "Cloud", ja: "雲白", ko: "구름", es: "Nube", fr: "Nuage", ru: "Облако", de: "Wolke" },
  sakura: { zh: "樱粉", en: "Sakura", ja: "桜色", ko: "사쿠라", es: "Sakura", fr: "Sakura", ru: "Сакура", de: "Sakura" },
  cream: { zh: "奶油", en: "Cream", ja: "クリーム", ko: "크림", es: "Crema", fr: "Crème", ru: "Крем", de: "Creme" },
  peach: { zh: "蜜桃", en: "Peach", ja: "桃色", ko: "복숭아", es: "Melocotón", fr: "Pêche", ru: "Персик", de: "Pfirsich" },
  lavender: { zh: "薰衣草", en: "Lavender", ja: "ラベンダー", ko: "라벤더", es: "Lavanda", fr: "Lavande", ru: "Лаванда", de: "Lavendel" },
  mint: { zh: "薄荷", en: "Mint", ja: "ミント", ko: "민트", es: "Menta", fr: "Menthe", ru: "Мята", de: "Minze" },
  mistblue: { zh: "雾蓝", en: "Mist Blue", ja: "霧青", ko: "안개 블루", es: "Azul Niebla", fr: "Bleu Brume", ru: "Туманный Синий", de: "Nebelblau" },
  sage: { zh: "鼠尾草", en: "Sage", ja: "セージ", ko: "세이지", es: "Salvia", fr: "Sauge", ru: "Шалфей", de: "Salbei" },
  terracotta: { zh: "赤陶", en: "Terracotta", ja: "テラコッタ", ko: "테라코타", es: "Terracota", fr: "Terre Cuite", ru: "Терракота", de: "Terrakotta" },
  coral: { zh: "珊瑚", en: "Coral", ja: "珊瑚", ko: "산호", es: "Coral", fr: "Corail", ru: "Коралл", de: "Koralle" },
  matcha: { zh: "抹茶", en: "Matcha", ja: "抹茶", ko: "말차", es: "Matcha", fr: "Matcha", ru: "Матча", de: "Matcha" },
  oat: { zh: "米杏", en: "Oat", ja: "オート", ko: "오트", es: "Avena", fr: "Avoine", ru: "Овёс", de: "Hafer" },
  sand: { zh: "沙丘", en: "Dune", ja: "砂丘", ko: "모래언덕", es: "Duna", fr: "Dune", ru: "Дюна", de: "Düne" },
  clay: { zh: "陶土", en: "Clay", ja: "陶土", ko: "점토", es: "Arcilla", fr: "Argile", ru: "Глина", de: "Ton" },
  midnight: { zh: "午夜", en: "Midnight", ja: "真夜中", ko: "자정", es: "Medianoche", fr: "Minuit", ru: "Полночь", de: "Mitternacht" },
  rose: { zh: "玫瑰", en: "Rose", ja: "薔薇", ko: "장미", es: "Rosa", fr: "Rose", ru: "Роза", de: "Rose" },
  goldleaf: { zh: "金箔", en: "Gold Leaf", ja: "金箔", ko: "금박", es: "Pan de Oro", fr: "Feuille d'Or", ru: "Золотой Лист", de: "Blattgold" },
  ocean: { zh: "深海", en: "Deep Sea", ja: "深海", ko: "심해", es: "Mar Profundo", fr: "Mer Profonde", ru: "Глубокое Море", de: "Tiefsee" },
  amethyst: { zh: "紫晶", en: "Amethyst", ja: "紫晶", ko: "자수정", es: "Amatista", fr: "Améthyste", ru: "Аметист", de: "Amethyst" },
  forest: { zh: "苔藓", en: "Moss", ja: "苔", ko: "이끼", es: "Musgo", fr: "Mousse", ru: "Мох", de: "Moos" },
  copper: { zh: "赤铜", en: "Copper", ja: "赤銅", ko: "구리", es: "Cobre", fr: "Cuivre", ru: "Медь", de: "Kupfer" },
  ink: { zh: "墨色", en: "Ink", ja: "墨色", ko: "먹색", es: "Tinta", fr: "Encre", ru: "Чернила", de: "Tinte" },
  nebula: { zh: "星云", en: "Nebula", ja: "星雲", ko: "성운", es: "Nebulosa", fr: "Nébuleuse", ru: "Туманность", de: "Nebel" },
  aurora: { zh: "极光", en: "Aurora", ja: "極光", ko: "오로라", es: "Aurora", fr: "Aurore", ru: "Аврора", de: "Aurora" },
  rainbow: { zh: "彩虹", en: "Rainbow", ja: "虹", ko: "무지개", es: "Arcoíris", fr: "Arc-en-Ciel", ru: "Радуга", de: "Regenbogen" },
  celestial: { zh: "天穹", en: "Celestial", ja: "天穹", ko: "천궁", es: "Celestial", fr: "Céleste", ru: "Небесный", de: "Himmlisch" },
  void: { zh: "虚空", en: "Void", ja: "虚空", ko: "공허", es: "Vacío", fr: "Vide", ru: "Пустота", de: "Leere" },
};

// 皮肤描述翻译
export const SKIN_DESCS: Record<string, Record<Lang, string>> = {
  classic: { zh: "和纸本色，温润如初", en: "Washi paper, warm as ever", ja: "和紙の本色、温もりそのまま", ko: "화지 본연의 색, 따뜻함 그대로", es: "Papel washi, cálido como siempre", fr: "Papier washi, chaleureux comme toujours", ru: "Бумага васи, тёплая как всегда", de: "Washi-Papier, warm wie immer" },
  cloud: { zh: "如云似絮，一尘不染", en: "Like clouds, pure and spotless", ja: "雲のように純白で", ko: "구름처럼 순백으로", es: "Como nubes, puro e impecable", fr: "Comme les nuages, pur et immaculé", ru: "Как облака, чистый и безупречный", de: "Wie Wolken, rein und makellos" },
  sakura: { zh: "春风拂过的花瓣色", en: "Petals kissed by spring breeze", ja: "春風に撫でられた花びら", ko: "봄바람에 스친 꽃잎 색", es: "Pétalos acariciados por la brisa", fr: "Pétales caressés par la brise", ru: "Лепестки под весенним ветром", de: "Vom Frühlingswind geküsste Blüten" },
  cream: { zh: "午后阳光里的奶油甜", en: "Sweet cream in afternoon sun", ja: "午後の陽だまりのクリーム", ko: "오후 햇살 속 크림", es: "Dulce crema al sol de la tarde", fr: "Douce crème au soleil d'après-midi", ru: "Сладкий крем в полуденном солнце", de: "Süße Creme in der Nachmittagssonne" },
  peach: { zh: "初夏枝头的蜜桃色", en: "Peach hue of early summer", ja: "初夏の枝先の桃色", ko: "초여름 가지 끝의 복숭아색", es: "Color melocotón de principios de verano", fr: "Teinte pêche du début d'été", ru: "Персиковый оттенок начала лета", de: "Pfirsichfarbe des Frühsommers" },
  lavender: { zh: "普罗旺斯山谷的淡紫", en: "Lavender of Provence valleys", ja: "プロヴァンスの谷の薄紫", ko: "프로방스 계곡의 연보라", es: "Lavanda de los valles de Provenza", fr: "Lavande des vallées de Provence", ru: "Лаванда долин Прованса", de: "Lavendel der Provence-Täler" },
  mint: { zh: "清凉沁心的薄荷绿", en: "Cool refreshing mint green", ja: "清涼感あふれるミントグリーン", ko: "청량한 민트 그린", es: "Verde menta fresco y refrescante", fr: "Vert menthe frais et rafraîchissant", ru: "Освежающий мятно-зелёный", de: "Kühles erfrischendes Mintgrün" },
  mistblue: { zh: "清晨山岚中的远空", en: "Distant sky in morning mist", ja: "朝霧の遠い空", ko: "아침 안개 속 먼 하늘", es: "Cielo lejano en la niebla matinal", fr: "Ciel lointain dans la brume matinale", ru: "Далёкое небо в утреннем тумане", de: "Ferner Himmel im Morgennebel" },
  sage: { zh: "地中海边的鼠尾草绿", en: "Sage green by the Mediterranean", ja: "地中海のセージグリーン", ko: "지중해의 세이지 그린", es: "Verde salvia del Mediterráneo", fr: "Vert sauge de la Méditerranée", ru: "Зелень шалфея у Средиземного моря", de: "Salbeigrün am Mittelmeer" },
  terracotta: { zh: "托斯卡纳的赤陶色", en: "Tuscan terracotta", ja: "トスカーナのテラコッタ", ko: "토스카나의 테라코타", es: "Terracota toscana", fr: "Terre cuite toscane", ru: "Тосканская терракота", de: "Toskanische Terrakotta" },
  coral: { zh: "海面下的珊瑚礁色", en: "Coral reef beneath the waves", ja: "波の下の珊瑚礁", ko: "파도 아래 산호초", es: "Arrecife de coral bajo las olas", fr: "Récif corallien sous les vagues", ru: "Коралловый риф под волнами", de: "Korallenriff unter den Wellen" },
  matcha: { zh: "茶室檐下的嫩叶", en: "Young leaves under the tea house", ja: "茶室の軒下の若葉", ko: "찻집 처마 밑의 새잎", es: "Hojas jóvenes bajo la casa de té", fr: "Jeunes feuilles sous la maison de thé", ru: "Молодые листья под чайным домом", de: "Junge Blätter unter dem Teehaus" },
  oat: { zh: "秋天麦田的暖意", en: "Warmth of autumn wheat fields", ja: "秋の麦畑の温もり", ko: "가을 밀밭의 온기", es: "Calor de los campos de trigo en otoño", fr: "Chaleur des champs de blé en automne", ru: "Тепло осенних пшеничных полей", de: "Wärme der herbstlichen Weizenfelder" },
  sand: { zh: "撒哈拉的沙丘金", en: "Sahara dune gold", ja: "サハラの砂丘の金", ko: "사하라 사구의 금빛", es: "Oro de las dunas del Sahara", fr: "Or des dunes du Sahara", ru: "Золото сахарских дюн", de: "Gold der Sahara-Dünen" },
  clay: { zh: "手工陶艺的泥土色", en: "Earth tones of handmade pottery", ja: "手作りの陶芸の土色", ko: "수제 도예의 흙빛", es: "Tonos tierra de cerámica artesanal", fr: "Tons terreux de la poterie artisanale", ru: "Землистые тона ручной керамики", de: "Erdtöne handgemachter Töpferei" },
  midnight: { zh: "午夜深蓝的静谧", en: "Stillness of midnight blue", ja: "真夜中の深い青の静けさ", ko: "자정 깊은 청색의 고요", es: "Quietud del azul medianoche", fr: "Quiétude du bleu de minuit", ru: "Тишина полуночной синевы", de: "Stille des Mitternachtsblaus" },
  rose: { zh: "花店里刚剪下的玫瑰", en: "Freshly cut roses from the florist", ja: "花屋で切りたての薔薇", ko: "꽃집에서 막 자른 장미", es: "Rosas recién cortadas de la floristería", fr: "Roses fraîchement coupées du fleuriste", ru: "Свежесрезанные розы из цветочного", de: "Frisch geschnittene Rosen vom Floristen" },
  goldleaf: { zh: "和纸贴上的24K金箔", en: "24K gold leaf on washi paper", ja: "和紙に貼った24K金箔", ko: "화지에 붙인 24K 금박", es: "Pan de oro de 24K sobre papel washi", fr: "Feuille d'or 24K sur papier washi", ru: "24K золотой лист на бумаге васи", de: "24K Blattgold auf Washi-Papier" },
  ocean: { zh: "马里亚纳海沟的颜色", en: "Color of the Mariana Trench", ja: "マリアナ海溝の色", ko: "마리아나 해구의 색", es: "Color de la Fosa de las Marianas", fr: "Couleur de la fosse des Mariannes", ru: "Цвет Марианской впадины", de: "Farbe des Marianengrabens" },
  amethyst: { zh: "水晶洞里的紫晶簇", en: "Amethyst cluster in a geode", ja: "晶洞の中の紫水晶", ko: "정동 속 자수정 군집", es: "Racimo de amatista en una geoda", fr: "Amas d'améthyste dans une géode", ru: "Аметистовая друза в жеоде", de: "Amethyst-Cluster in einer Geode" },
  forest: { zh: "雨后森林的苔藓绿", en: "Moss green after the rain", ja: "雨上がりの森の苔緑", ko: "비 온 뒤 숲의 이끼 녹색", es: "Verde musgo después de la lluvia", fr: "Vert mousse après la pluie", ru: "Мшистая зелень после дождя", de: "Moosgrün nach dem Regen" },
  copper: { zh: "老式铜器的岁月色", en: "Patina of aged copper", ja: "古い銅器の経年色", ko: "오래된 구리 그릇의 세월색", es: "Pátina del cobre envejecido", fr: "Patine du cuivre ancien", ru: "Патина старой меди", de: "Patina gealterten Kupfers" },
  ink: { zh: "水墨晕染的剪影", en: "Silhouette of ink wash", ja: "墨絵のにじむシルエット", ko: "수묵이 번지는 실루엣", es: "Silueta de tinta aguada", fr: "Silhouette d'encre de Chine", ru: "Силуэт тушевой размывки", de: "Silhouette der Tuschemalerei" },
  nebula: { zh: "猎户座星云的紫蓝", en: "Purple-blue of Orion Nebula", ja: "オリオン星雲の紫青", ko: "오리온 성운의 보라-파랑", es: "Azul púrpura de la Nebulosa de Orión", fr: "Bleu-violet de la Nébuleuse d'Orion", ru: "Фиолетово-синий туманности Ориона", de: "Violett-Blau des Orionnebels" },
  aurora: { zh: "冰岛夜空的极光绿", en: "Aurora green of Iceland's sky", ja: "アイスランドの夜空の極光緑", ko: "아이슬란드 밤하늘의 오로라 녹색", es: "Verde aurora del cielo de Islandia", fr: "Vert aurore du ciel islandais", ru: "Зелёное сияние неба Исландии", de: "Auroragrün des isländischen Himmels" },
  rainbow: { zh: "雨后初晴的七色光芒", en: "Seven colors after the rain", ja: "雨上がりの七色の光", ko: "비 온 뒤 맑은 하늘의 일곱 빛깔", es: "Siete colores después de la lluvia", fr: "Sept couleurs après la pluie", ru: "Семь цветов после дождя", de: "Sieben Farben nach dem Regen" },
  celestial: { zh: "穹顶壁画的金色穹光", en: "Golden light of celestial murals", ja: "天井画の金色の光", ko: "천장 벽화의 금빛 광휘", es: "Luz dorada de murales celestiales", fr: "Lumière dorée des fresques célestes", ru: "Золотой свет небесных фресок", de: "Goldenes Licht himmlischer Wandmalereien" },
  void: { zh: "宇宙深空的虚无黑", en: "Void black of deep space", ja: "宇宙深淵の虚無の黒", ko: "우주 심연의 허무의 검정", es: "Negro vacío del espacio profundo", fr: "Noir du vide de l'espace profond", ru: "Пустотная чернота глубокого космоса", de: "Leeres Schwarz des tiefen Weltraums" },
};

// 主题名称翻译
export const THEME_NAMES: Record<string, Record<Lang, string>> = {
  morning: { zh: "晨曦薄雾", en: "Morning Mist", ja: "朝霧", ko: "아침 안개", es: "Niebla Matinal", fr: "Brume Matinale", ru: "Утренний Туман", de: "Morgennebel" },
  washi: { zh: "和纸素色", en: "Washi Plain", ja: "和紙の素色", ko: "화지 소색", es: "Washi Simple", fr: "Washi Simple", ru: "Васи Простой", de: "Washi Schlicht" },
  skylight: { zh: "晴空淡蓝", en: "Clear Sky Blue", ja: "晴れた空の淡青", ko: "맑은 하늘 연청", es: "Azul Cielo Claro", fr: "Bleu Ciel Clair", ru: "Светло-Голубое Небо", de: "Klares Himmelblau" },
  dusk: { zh: "暮色将至", en: "Approaching Dusk", ja: "暮れなずむ空", ko: "땅거미 질 무렵", es: "Crepúsculo Cercano", fr: "Crépuscule Approchant", ru: "Приближающиеся Сумерки", de: "Nahende Dämmerung" },
  rainy: { zh: "雨后初霁", en: "After the Rain", ja: "雨上がり", ko: "비 갠 뒤", es: "Después de la Lluvia", fr: "Après la Pluie", ru: "После Дождя", de: "Nach dem Regen" },
  autumn: { zh: "秋日林间", en: "Autumn Woods", ja: "秋の林", ko: "가을 숲", es: "Bosque Otoñal", fr: "Bois d'Automne", ru: "Осенний Лес", de: "Herbstwald" },
  snow: { zh: "初雪清晨", en: "First Snow Morning", ja: "初雪の朝", ko: "첫눈 내린 아침", es: "Mañana de Primera Nieve", fr: "Matin de Première Neige", ru: "Утро Первого Снега", de: "Erster Schnee Morgen" },
  meadow: { zh: "草原午后", en: "Meadow Afternoon", ja: "草原の午後", ko: "초원의 오후", es: "Tarde en la Pradera", fr: "Après-midi dans la Prairie", ru: "Полдень на Лугу", de: "Wiesennachmittag" },
  desert: { zh: "沙漠黄昏", en: "Desert Dusk", ja: "砂漠の黄昏", ko: "사막의 황혼", es: "Atardecer en el Desierto", fr: "Crépuscule du Désert", ru: "Пустынные Сумерки", de: "Wüstendämmerung" },
  sea: { zh: "海岸栈桥", en: "Coastal Pier", ja: "海岸の桟橋", ko: "해안 잔교", es: "Muelle Costero", fr: "Jetée Côtière", ru: "Береговой Пирс", de: "Küstensteg" },
  forest: { zh: "深林迷雾", en: "Deep Forest Mist", ja: "深林の霧", ko: "깊은 숲의 안개", es: "Niebla del Bosque Profundo", fr: "Brume de la Forêt Profonde", ru: "Туман Глубокого Леса", de: "Tiefer Waldnebel" },
  volcano: { zh: "火山岩浆", en: "Volcanic Lava", ja: "火山の溶岩", ko: "화산 용암", es: "Lava Volcánica", fr: "Lave Volcanique", ru: "Вулканическая Лава", de: "Vulkanische Lava" },
  aurora: { zh: "极光夜空", en: "Aurora Night", ja: "極光の夜空", ko: "오로라 밤하늘", es: "Noche de Aurora", fr: "Nuit d'Aurore", ru: "Ночь Авроры", de: "Aurora-Nacht" },
  twilight: { zh: "薄暮紫霞", en: "Twilight Purple", ja: "薄暮の紫霞", ko: "땅거미 보라 노을", es: "Púrpura Crepuscular", fr: "Pourpre du Crépuscule", ru: "Лиловые Сумерки", de: "Dämmerungspurpur" },
  nebula: { zh: "星云深处", en: "Deep Nebula", ja: "星雲の深み", ko: "성운 깊은 곳", es: "Nebulosa Profunda", fr: "Nébuleuse Profonde", ru: "Глубокая Туманность", de: "Tiefer Nebel" },
  void: { zh: "虚空裂隙", en: "Void Rift", ja: "虚空の裂け目", ko: "공허의 균열", es: "Fisura del Vacío", fr: "Faille du Vide", ru: "Разлом Пустоты", de: "Leerenriss" },
  eden: { zh: "伊甸花园", en: "Garden of Eden", ja: "エデンの園", ko: "에덴 동산", es: "Jardín del Edén", fr: "Jardin d'Éden", ru: "Эдемский Сад", de: "Garten Eden" },
  sakura: { zh: "樱吹雪", en: "Sakura Blizzard", ja: "桜吹雪", ko: "벚꽃 눈보라", es: "Ventisca de Sakura", fr: "Tempête de Sakura", ru: "Сакуровая Метель", de: "Sakura-Schneesturm" },
};

// 主题描述翻译
export const THEME_DESCS: Record<string, Record<Lang, string>> = {
  morning: { zh: "醒来时分的微光", en: "Glimmer of waking moments", ja: "目覚めの微かな光", ko: "깨어나는 순간의 희미한 빛", es: "Destello del despertar", fr: "Lueur du réveil", ru: "Проблеск пробуждения", de: "Schimmer des Erwachens" },
  washi: { zh: "古卷舒展的素雅", en: "Elegance of ancient scrolls", ja: "古い巻物が広がる素雅", ko: "옛 두루마리 펼쳐지는 소박한 우아함", es: "Elegancia de pergaminos antiguos", fr: "Élégance des rouleaux anciens", ru: "Изящество древних свитков", de: "Eleganz alter Schriftrollen" },
  skylight: { zh: "风起云舒的清透", en: "Clarity of wind and clouds", ja: "風が雲を散らす清透", ko: "바람이 구름을 흩뜨리는 청명함", es: "Claridad de viento y nubes", fr: "Clarté du vent et des nuages", ru: "Ясность ветра и облаков", de: "Klarheit von Wind und Wolken" },
  dusk: { zh: "日落前最后一抹温柔", en: "Last tenderness before sunset", ja: "日没前の最後の優しさ", ko: "일몰 전 마지막 부드러움", es: "Última ternura antes del atardecer", fr: "Dernière tendresse avant le coucher", ru: "Последняя нежность перед закатом", de: "Letzte Zärtlichkeit vor Sonnenuntergang" },
  rainy: { zh: "雨滴未干的清晨", en: "Morning with lingering raindrops", ja: "雨滴がまだ乾かない朝", ko: "빗방울 마르지 않은 아침", es: "Mañana con gotas de lluvia aún", fr: "Matin aux gouttes de pluie persistantes", ru: "Утро с невысохшими каплями дождя", de: "Morgen mit verbliebenen Regentropfen" },
  autumn: { zh: "枫叶落满小径的秋日", en: "Autumn path covered in maple leaves", ja: "もみじが小道を埋める秋", ko: "단풍잎이 오솔길을 덮는 가을", es: "Sendero otoñal cubierto de hojas de arce", fr: "Sentier d'automne couvert de feuilles d'érable", ru: "Осенняя тропа, усыпанная кленовыми листьями", de: "Herbstpfad mit Ahornblättern bedeckt" },
  snow: { zh: "第一场雪后的静谧", en: "Stillness after the first snow", ja: "初雪のあとの静けさ", ko: "첫눈 내린 뒤의 고요", es: "Quietud tras la primera nieve", fr: "Quiétude après la première neige", ru: "Тишина после первого снега", de: "Stille nach dem ersten Schnee" },
  meadow: { zh: "风吹草低见牛羊", en: "Wind-swept grassy plains", ja: "風吹く草原に牛羊見ゆ", ko: "바람에 풀이 눕고 소와 양이 보이네", es: "Llanuras de hierba barridas por el viento", fr: "Plaines herbeuses balayées par le vent", ru: "Ветреные травянистые равнины", de: "Windgepeitschte Grasebenen" },
  desert: { zh: "金字塔边的日落", en: "Sunset by the pyramids", ja: "ピラミッドのほとりの夕日", ko: "피라미드 곁의 석양", es: "Atardecer junto a las pirámides", fr: "Coucher de soleil près des pyramides", ru: "Закат у пирамид", de: "Sonnenuntergang bei den Pyramiden" },
  sea: { zh: "海风吹拂的木栈桥", en: "Wooden pier in sea breeze", ja: "潮風に吹かれる木の桟橋", ko: "바닷바람 부는 나무 잔교", es: "Muelle de madera en la brisa marina", fr: "Jetée en bois dans la brise marine", ru: "Деревянный пирс на морском ветру", de: "Holzsteg in der Meeresbrise" },
  forest: { zh: "雾气缭绕的原始森林", en: "Misty primeval forest", ja: "霧に包まれた原始の森", ko: "안개 감도는 원시림", es: "Bosque primigenio brumoso", fr: "Forêt primaire brumeuse", ru: "Туманный первобытный лес", de: "Nebliger Urwald" },
  volcano: { zh: "岩浆流淌的火山脚下", en: "At the foot of flowing lava", ja: "溶岩流れる火山の麓", ko: "용암이 흐르는 화산 기슭", es: "Al pie de la lava fluyente", fr: "Au pied de la lave en fusion", ru: "У подножия текущей лавы", de: "Am Fuß der fließenden Lava" },
  aurora: { zh: "北欧峡湾的极光", en: "Aurora over Nordic fjords", ja: "北欧フィヨルドの極光", ko: "북유럽 피오르의 오로라", es: "Aurora sobre los fiordos nórdicos", fr: "Aurore sur les fjords nordiques", ru: "Аврора над северными фьордами", de: "Aurora über nordischen Fjorden" },
  twilight: { zh: "天边最后一抹紫霞", en: "Last purple glow on the horizon", ja: "地平線の最後の紫の光", ko: "지평선의 마지막 보라빛", es: "Último resplandor púrpura en el horizonte", fr: "Dernière lueur pourpre à l'horizon", ru: "Последнее лиловое сияние на горизонте", de: "Letzter purpurner Schein am Horizont" },
  nebula: { zh: "星际深处的星云", en: "Nebula in deep space", ja: "星間の深みの星雲", ko: "성간 깊은 곳의 성운", es: "Nebulosa en el espacio profundo", fr: "Nébuleuse dans l'espace profond", ru: "Туманность в глубоком космосе", de: "Nebel im tiefen Weltraum" },
  void: { zh: "宇宙边缘的虚空裂隙", en: "Void rift at the edge of the cosmos", ja: "宇宙の果ての虚空の裂け目", ko: "우주 끝의 공허 균열", es: "Fisura del vacío en el borde del cosmos", fr: "Faille du vide au bord du cosmos", ru: "Разлом пустоты на краю космоса", de: "Leerenriss am Rande des Kosmos" },
  eden: { zh: "创世之初的伊甸园", en: "Eden at the dawn of creation", ja: "創世の夜明けのエデン", ko: "창세의 새벽 에덴", es: "Edén en el alba de la creación", fr: "Éden à l'aube de la création", ru: "Эдем на заре творения", de: "Eden am Anbeginn der Schöpfung" },
  sakura: { zh: "京都哲学之道的樱吹雪", en: "Sakura blizzard on Philosopher's Path", ja: "京都哲学の道の桜吹雪", ko: "교토 철학의 길 벚꽃 눈보라", es: "Ventisca de sakura en el Camino del Filósofo", fr: "Tempête de sakura sur le Chemin des Philosophes", ru: "Сакуровая метель на Тропе Философа", de: "Sakura-Schneesturm auf dem Philosophenweg" },
};

// 装备名称翻译
export const EQUIP_NAMES: Record<string, Record<Lang, string>> = {
  "trail-basic": { zh: "素色纸屑", en: "Plain Paper", ja: "無地の紙片", ko: "무지 종이 조각", es: "Papel Simple", fr: "Papier Uni", ru: "Простая Бумага", de: "Einfaches Papier" },
  "trail-sakura": { zh: "樱花瓣", en: "Sakura Petals", ja: "桜の花びら", ko: "벚꽃잎", es: "Pétalos de Sakura", fr: "Pétales de Sakura", ru: "Лепестки Сакуры", de: "Sakura-Blüten" },
  "trail-stardust": { zh: "星尘", en: "Stardust", ja: "星屑", ko: "별가루", es: "Polvo Estelar", fr: "Poussière d'Étoiles", ru: "Звёздная Пыль", de: "Sternenstaub" },
  "trail-aurora": { zh: "极光之尘", en: "Aurora Dust", ja: "極光の粉", ko: "오로라 가루", es: "Polvo de Aurora", fr: "Poussière d'Aurore", ru: "Пыль Авроры", de: "Aurora-Staub" },
  "trail-ember": { zh: "余烬", en: "Embers", ja: "残り火", ko: "불씨", es: "Brasas", fr: "Braises", ru: "Тлеющие Угли", de: "Glut" },
  "trail-rainbow": { zh: "彩虹轨迹", en: "Rainbow Trail", ja: "虹の軌跡", ko: "무지개 궤적", es: "Estela Arcoíris", fr: "Traînée Arc-en-Ciel", ru: "Радужный След", de: "Regenbogenspur" },
  "trail-void": { zh: "虚空裂痕", en: "Void Rift", ja: "虚空の裂け目", ko: "공허 균열", es: "Fisura del Vacío", fr: "Faille du Vide", ru: "Разлом Пустоты", de: "Leerenriss" },
  "trail-gold": { zh: "金粉飘落", en: "Gold Dust", ja: "金粉舞い降りる", ko: "금가루 흩날림", es: "Polvo de Oro", fr: "Poussière d'Or", ru: "Золотая Пыль", de: "Goldstaub" },
  "shield-paper": { zh: "纸盾", en: "Paper Shield", ja: "紙の盾", ko: "종이 방패", es: "Escudo de Papel", fr: "Bouclier de Papier", ru: "Бумажный Щит", de: "Papierschild" },
  "shield-bamboo": { zh: "竹编盾", en: "Bamboo Shield", ja: "竹編みの盾", ko: "대나무 방패", es: "Escudo de Bambú", fr: "Bouclier de Bambou", ru: "Бамбуковый Щит", de: "Bambusschild" },
  "shield-crystal": { zh: "水晶盾", en: "Crystal Shield", ja: "水晶の盾", ko: "수정 방패", es: "Escudo de Cristal", fr: "Bouclier de Cristal", ru: "Хрустальный Щит", de: "Kristallschild" },
  "shield-flame": { zh: "火焰盾", en: "Flame Shield", ja: "炎の盾", ko: "불꽃 방패", es: "Escudo de Fuego", fr: "Bouclier de Flamme", ru: "Огненный Щит", de: "Flammenschild" },
  "shield-ice": { zh: "冰霜盾", en: "Frost Shield", ja: "氷霜の盾", ko: "서리 방패", es: "Escudo de Hielo", fr: "Bouclier de Givre", ru: "Ледяной Щит", de: "Frostschild" },
  "shield-celestial": { zh: "天穹之盾", en: "Celestial Shield", ja: "天穹の盾", ko: "천궁의 방패", es: "Escudo Celestial", fr: "Bouclier Céleste", ru: "Небесный Щит", de: "Himmelsschild" },
  "shield-nebula": { zh: "星云盾", en: "Nebula Shield", ja: "星雲の盾", ko: "성운 방패", es: "Escudo Nebulosa", fr: "Bouclier Nébuleuse", ru: "Щит Туманности", de: "Nebelschild" },
  "acc-none": { zh: "无配饰", en: "No Accessory", ja: "装飾なし", ko: "장식 없음", es: "Sin Accesorio", fr: "Sans Accessoire", ru: "Без Аксессуара", de: "Kein Accessoire" },
  "acc-ribbon": { zh: "蝴蝶结", en: "Ribbon", ja: "リボン", ko: "리본", es: "Lazo", fr: "Ruban", ru: "Бант", de: "Schleife" },
  "acc-tophat": { zh: "小礼帽", en: "Top Hat", ja: "シルクハット", ko: "실크햇", es: "Sombrero de Copa", fr: "Haut-de-Forme", ru: "Цилиндр", de: "Zylinder" },
  "acc-glasses": { zh: "圆框眼镜", en: "Round Glasses", ja: "丸眼鏡", ko: "둥근 안경", es: "Gafas Redondas", fr: "Lunettes Rondes", ru: "Круглые Очки", de: "Runde Brille" },
  "acc-crown": { zh: "纸王冠", en: "Paper Crown", ja: "紙の王冠", ko: "종이 왕관", es: "Corona de Papel", fr: "Couronne de Papier", ru: "Бумажная Корона", de: "Papierkrone" },
  "acc-scarf": { zh: "围巾", en: "Scarf", ja: "マフラー", ko: "목도리", es: "Bufanda", fr: "Écharpe", ru: "Шарф", de: "Schal" },
  "acc-halo": { zh: "光环", en: "Halo", ja: "光輪", ko: "후광", es: "Halo", fr: "Auréole", ru: "Нимб", de: "Heiligenschein" },
  "acc-horns": { zh: "小角", en: "Horns", ja: "小さな角", ko: "작은 뿔", es: "Cuernos", fr: "Cornes", ru: "Рожки", de: "Hörner" },
  "acc-mask": { zh: "狐面", en: "Fox Mask", ja: "狐面", ko: "여우 가면", es: "Máscara de Zorro", fr: "Masque de Renard", ru: "Лисья Маска", de: "Fuchsmaske" },
  "acc-angel": { zh: "天使之翼", en: "Angel Wings", ja: "天使の翼", ko: "천사의 날개", es: "Alas de Ángel", fr: "Ailes d'Ange", ru: "Крылья Ангела", de: "Engelsflügel" },
};

// 装备描述翻译
export const EQUIP_DESCS: Record<string, Record<Lang, string>> = {
  "trail-basic": { zh: "最朴素的纸屑尾迹", en: "The simplest paper trail", ja: "最も素朴な紙片の軌跡", ko: "가장 소박한 종이 조각 궤적", es: "El rastro de papel más simple", fr: "La plus simple traînée de papier", ru: "Самый простой бумажный след", de: "Die einfachste Papierspur" },
  "trail-sakura": { zh: "飞舞的樱花花瓣尾迹", en: "Dancing sakura petals trail", ja: "舞う桜の花びらの軌跡", ko: "흩날리는 벚꽃잎 궤적", es: "Estela de pétalos de sakura danzantes", fr: "Traînée de pétales de sakura dansants", ru: "Танцующие лепестки сакуры", de: "Tanzende Sakura-Blütenspur" },
  "trail-stardust": { zh: "闪烁的星光尾迹", en: "Twinkling starlight trail", ja: "きらめく星の光の軌跡", ko: "반짝이는 별빛 궤적", es: "Estela de luz estelar centelleante", fr: "Traînée de lumière d'étoiles scintillante", ru: "Мерцающий звёздный след", de: "Funkelnde Sternenlichtspur" },
  "trail-aurora": { zh: "变幻的极光色尾迹", en: "Shifting aurora-colored trail", ja: "移ろう極光色の軌跡", ko: "변화하는 오로라 색 궤적", es: "Estela de color aurora cambiante", fr: "Traînée aux couleurs d'aurore changeantes", ru: "Переливающийся след цвета авроры", de: "Schillernde Aurora-Farbspur" },
  "trail-ember": { zh: "燃烧的余烬尾迹", en: "Burning ember trail", ja: "燃える残り火の軌跡", ko: "타오르는 불씨 궤적", es: "Estela de brasas ardientes", fr: "Traînée de braises ardentes", ru: "Горящий след углей", de: "Brennende Glutspur" },
  "trail-rainbow": { zh: "七色流转的尾迹", en: "Seven-color flowing trail", ja: "七色に流れる軌跡", ko: "일곱 빛깔 흐르는 궤적", es: "Estela de siete colores fluyentes", fr: "Traînée aux sept couleurs fluides", ru: "Семицветный струящийся след", de: "Siebenfarbige fließende Spur" },
  "trail-void": { zh: "暗紫色的虚空尾迹", en: "Dark purple void trail", ja: "暗紫色の虚空の軌跡", ko: "어두운 보라색 공허 궤적", es: "Estela de vacío púrpura oscuro", fr: "Traînée pourpre sombre du vide", ru: "Тёмно-фиолетовый след пустоты", de: "Dunkelviolette Leerenspur" },
  "trail-gold": { zh: "华贵的金粉尾迹", en: "Luxurious gold dust trail", ja: "華やかな金粉の軌跡", ko: "화려한 금가루 궤적", es: "Estela lujosa de polvo de oro", fr: "Traînée luxueuse de poussière d'or", ru: "Роскошный золотой след", de: "Luxuriöse Goldstaubspur" },
  "shield-paper": { zh: "最基础的和纸护盾", en: "Basic washi paper shield", ja: "最も基本的な和紙の盾", ko: "가장 기본적인 화지 방패", es: "Escudo básico de papel washi", fr: "Bouclier de base en papier washi", ru: "Базовый щит из бумаги васи", de: "Basis-Washi-Papierschild" },
  "shield-bamboo": { zh: "竹编纹理的护盾", en: "Bamboo-woven shield", ja: "竹編み模様の盾", ko: "대나무 엮음 무늬 방패", es: "Escudo tejido de bambú", fr: "Bouclier tressé en bambou", ru: "Плетёный бамбуковый щит", de: "Bambusgeflochtener Schild" },
  "shield-crystal": { zh: "透明的水晶护盾", en: "Transparent crystal shield", ja: "透明な水晶の盾", ko: "투명한 수정 방패", es: "Escudo de cristal transparente", fr: "Bouclier de cristal transparent", ru: "Прозрачный хрустальный щит", de: "Transparenter Kristallschild" },
  "shield-flame": { zh: "燃烧的火焰护盾", en: "Burning flame shield", ja: "燃え盛る炎の盾", ko: "타오르는 불꽃 방패", es: "Escudo de llamas ardientes", fr: "Bouclier de flammes ardentes", ru: "Пылающий огненный щит", de: "Brennender Flammenschild" },
  "shield-ice": { zh: "寒气逼人的冰盾", en: "Chilling ice shield", ja: "冷気漂う氷の盾", ko: "냉기 서린 얼음 방패", es: "Escudo de hielo glacial", fr: "Bouclier de glace glaçant", ru: "Леденящий ледяной щит", de: "Eisiger Frostschild" },
  "shield-celestial": { zh: "穹顶壁画的金色护盾", en: "Golden shield of celestial murals", ja: "天井画の金色の盾", ko: "천장 벽화의 금빛 방패", es: "Escudo dorado de murales celestiales", fr: "Bouclier doré des fresques célestes", ru: "Золотой щит небесных фресок", de: "Goldener Schild himmlischer Malereien" },
  "shield-nebula": { zh: "星云漩涡般的护盾", en: "Nebula vortex shield", ja: "星雲の渦のような盾", ko: "성운 소용돌이 같은 방패", es: "Escudo de vórtice de nebulosa", fr: "Bouclier en vortex de nébuleuse", ru: "Щит-вихрь туманности", de: "Nebelwirbel-Schild" },
  "acc-none": { zh: "素净的纸鸟本色", en: "Pure paper bird essence", ja: "素朴な紙の鳥の本色", ko: "소박한 종이새 본연의 모습", es: "Esencia pura del pájaro de papel", fr: "Essence pure de l'oiseau de papier", ru: "Чистая сущность бумажной птицы", de: "Reines Papier-Vogel-Wesen" },
  "acc-ribbon": { zh: "头顶的红色蝴蝶结", en: "A red ribbon on the head", ja: "頭の上の赤いリボン", ko: "머리 위의 빨간 리본", es: "Un lazo rojo en la cabeza", fr: "Un ruban rouge sur la tête", ru: "Красный бант на голове", de: "Eine rote Schleife auf dem Kopf" },
  "acc-tophat": { zh: "一顶精致的纸礼帽", en: "A delicate paper top hat", ja: "精巧な紙のシルクハット", ko: "정교한 종이 실크햇", es: "Un delicado sombrero de copa de papel", fr: "Un délicat haut-de-forme en papier", ru: "Изящный бумажный цилиндр", de: "Ein feiner Papierzylinder" },
  "acc-glasses": { zh: "学者风的圆框眼镜", en: "Scholarly round glasses", ja: "学者風の丸眼鏡", ko: "학자풍 둥근 안경", es: "Gafas redondas de estilo académico", fr: "Lunettes rondes de style savant", ru: "Академические круглые очки", de: "Gelehrte runde Brille" },
  "acc-crown": { zh: "金箔贴面的纸王冠", en: "Gold-leaf paper crown", ja: "金箔貼りの紙の王冠", ko: "금박을 입힌 종이 왕관", es: "Corona de papel con pan de oro", fr: "Couronne de papier à la feuille d'or", ru: "Бумажная корона с золотым листом", de: "Papierkrone mit Blattgold" },
  "acc-scarf": { zh: "冬日暖和的纸围巾", en: "A warm paper scarf for winter", ja: "冬の暖かい紙のマフラー", ko: "겨울 따뜻한 종이 목도리", es: "Una bufanda de papel cálida para el invierno", fr: "Une écharpe en papier chaude pour l'hiver", ru: "Тёплый бумажный шарф для зимы", de: "Ein warmer Papierschal für den Winter" },
  "acc-halo": { zh: "圣洁的环形光环", en: "A sacred circular halo", ja: "神聖な円形の光輪", ko: "신성한 원형 후광", es: "Un halo circular sagrado", fr: "Une auréole circulaire sacrée", ru: "Священный круглый нимб", de: "Ein heiliger kreisförmiger Heiligenschein" },
  "acc-horns": { zh: "俏皮的小恶魔角", en: "Playful little devil horns", ja: "お茶目な小悪魔の角", ko: "장난스러운 작은 악마 뿔", es: "Cuernos de diablillo juguetones", fr: "Petites cornes de diablotin espiègles", ru: "Игривые рожки дьяволёнка", de: "Verspielte kleine Teufelshörner" },
  "acc-mask": { zh: "祭典的狐面面具", en: "Festival fox mask", ja: "祭りの狐面", ko: "축제의 여우 가면", es: "Máscara de zorro de festival", fr: "Masque de renard de festival", ru: "Праздничная лисья маска", de: "Festliche Fuchsmaske" },
  "acc-angel": { zh: "纯白的天使翅膀", en: "Pure white angel wings", ja: "純白の天使の翼", ko: "순백의 천사 날개", es: "Alas de ángel de un blanco puro", fr: "Ailes d'ange d'un blanc pur", ru: "Чисто-белые крылья ангела", de: "Reinweiße Engelsflügel" },
};

// 任务标题翻译
export const TASK_TITLES: Record<string, Record<Lang, string>> = {
  play_1: { zh: "初试身手", en: "First Flight", ja: "初めての飛行", ko: "첫 비행", es: "Primer Vuelo", fr: "Premier Vol", ru: "Первый Полёт", de: "Erstflug" },
  play_3: { zh: "飞行练习", en: "Flight Practice", ja: "飛行練習", ko: "비행 연습", es: "Práctica de Vuelo", fr: "Entraînement au Vol", ru: "Лётная Практика", de: "Flugübung" },
  play_5: { zh: "折纸大师", en: "Origami Master", ja: "折り紙マスター", ko: "종이접기 마스터", es: "Maestro del Origami", fr: "Maître de l'Origami", ru: "Мастер Оригами", de: "Origami-Meister" },
  score_30: { zh: "小有成就", en: "Small Achievement", ja: "小さな成果", ko: "작은 성취", es: "Pequeño Logro", fr: "Petit Succès", ru: "Маленькое Достижение", de: "Kleiner Erfolg" },
  score_80: { zh: "展翅高飞", en: "Spread Your Wings", ja: "大きく羽ばたく", ko: "날개를 활짝 펴고", es: "Extiende tus Alas", fr: "Déploie tes Ailes", ru: "Расправь Крылья", de: "Breite die Flügel aus" },
  score_150: { zh: "云端漫步", en: "Cloud Walker", ja: "雲の上の散歩", ko: "구름 위 산책", es: "Caminante de Nubes", fr: "Marcheur des Nuages", ru: "Ходок по Облакам", de: "Wolkenwanderer" },
  single_10: { zh: "突破自我", en: "Break Through", ja: "自己ベスト突破", ko: "자기 돌파", es: "Supérate", fr: "Dépasse-toi", ru: "Превзойди Себя", de: "Durchbruch" },
  single_20: { zh: "穿越云霄", en: "Beyond the Clouds", ja: "雲を越えて", ko: "구름 너머로", es: "Más Allá de las Nubes", fr: "Au-delà des Nuages", ru: "За Облаками", de: "Über den Wolken" },
  single_40: { zh: "传奇飞行", en: "Legendary Flight", ja: "伝説の飛行", ko: "전설의 비행", es: "Vuelo Legendario", fr: "Vol Légendaire", ru: "Легендарный Полёт", de: "Legendärer Flug" },
  powerup_3: { zh: "道具收集者", en: "Power-Up Collector", ja: "アイテム収集家", ko: "아이템 수집가", es: "Coleccionista de Power-Ups", fr: "Collectionneur de Power-Ups", ru: "Собиратель Усилений", de: "Power-Up-Sammler" },
  powerup_8: { zh: "道具猎人", en: "Power-Up Hunter", ja: "アイテムハンター", ko: "아이템 헌터", es: "Cazador de Power-Ups", fr: "Chasseur de Power-Ups", ru: "Охотник за Усилениями", de: "Power-Up-Jäger" },
  pipes_10: { zh: "穿越管道", en: "Pipe Passer", ja: "パイプ通過", ko: "파이프 통과", es: "Pasador de Tubos", fr: "Passeur de Tuyaux", ru: "Проходчик Труб", de: "Röhrenpassierer" },
  pipes_30: { zh: "管道穿梭", en: "Pipe Runner", ja: "パイプ走者", ko: "파이프 질주", es: "Corredor de Tubos", fr: "Coureur de Tuyaux", ru: "Бегун по Трубам", de: "Röhrenläufer" },
  pipes_50: { zh: "管道之王", en: "Pipe King", ja: "パイプキング", ko: "파이프의 왕", es: "Rey de los Tubos", fr: "Roi des Tuyaux", ru: "Король Труб", de: "Röhrenkönig" },
  combo_5: { zh: "连续穿过", en: "Streak of 5", ja: "5連続通過", ko: "5연속 통과", es: "Racha de 5", fr: "Série de 5", ru: "Серия из 5", de: "5er-Serie" },
  combo_10: { zh: "手到擒来", en: "Easy Streak", ja: "10連続達成", ko: "10연속 달성", es: "Racha Fácil", fr: "Série Facile", ru: "Лёгкая Серия", de: "Leichte Serie" },
  stars_20: { zh: "星光收集者", en: "Star Collector", ja: "星の収集家", ko: "별 수집가", es: "Coleccionista de Estrellas", fr: "Collectionneur d'Étoiles", ru: "Собиратель Звёзд", de: "Sternensammler" },
  stars_50: { zh: "星河漫步", en: "Star River Walk", ja: "星の川を歩く", ko: "별의 강을 걷다", es: "Paseo por el Río de Estrellas", fr: "Promenade sur la Rivière d'Étoiles", ru: "Прогулка по Звёздной Реке", de: "Sternenflusswanderung" },
  stars_100: { zh: "星海遨游", en: "Star Ocean Voyage", ja: "星の海を旅する", ko: "별의 바다를 항해하다", es: "Viaje por el Océano de Estrellas", fr: "Voyage sur l'Océan d'Étoiles", ru: "Путешествие по Звёздному Океану", de: "Sternenozean-Reise" },
  die_early: { zh: "不屈不挠", en: "Never Give Up", ja: "不屈の精神", ko: "불굴의 의지", es: "Nunca te Rindas", fr: "Ne Jamais Abandonner", ru: "Никогда Не Сдавайся", de: "Niemals Aufgeben" },
  perfect: { zh: "完美无伤", en: "Perfect Run", ja: "完全無傷", ko: "완벽 무상", es: "Carrera Perfecta", fr: "Course Parfaite", ru: "Идеальный Забег", de: "Perfekter Lauf" },
};

// 任务描述翻译
export const TASK_DESCS: Record<string, Record<Lang, string>> = {
  play_1: { zh: "完成 1 局游戏", en: "Complete 1 game", ja: "ゲームを1回クリア", ko: "게임 1회 완료", es: "Completa 1 partida", fr: "Terminer 1 partie", ru: "Завершить 1 игру", de: "1 Spiel abschließen" },
  play_3: { zh: "完成 3 局游戏", en: "Complete 3 games", ja: "ゲームを3回クリア", ko: "게임 3회 완료", es: "Completa 3 partidas", fr: "Terminer 3 parties", ru: "Завершить 3 игры", de: "3 Spiele abschließen" },
  play_5: { zh: "完成 5 局游戏", en: "Complete 5 games", ja: "ゲームを5回クリア", ko: "게임 5회 완료", es: "Completa 5 partidas", fr: "Terminer 5 parties", ru: "Завершить 5 игр", de: "5 Spiele abschließen" },
  score_30: { zh: "累计获得 30 分", en: "Earn 30 points total", ja: "合計30ポイント獲得", ko: "누적 30점 획득", es: "Gana 30 puntos en total", fr: "Gagner 30 points au total", ru: "Набрать 30 очков", de: "Insgesamt 30 Punkte" },
  score_80: { zh: "累计获得 80 分", en: "Earn 80 points total", ja: "合計80ポイント獲得", ko: "누적 80점 획득", es: "Gana 80 puntos en total", fr: "Gagner 80 points au total", ru: "Набрать 80 очков", de: "Insgesamt 80 Punkte" },
  score_150: { zh: "累计获得 150 分", en: "Earn 150 points total", ja: "合計150ポイント獲得", ko: "누적 150점 획득", es: "Gana 150 puntos en total", fr: "Gagner 150 points au total", ru: "Набрать 150 очков", de: "Insgesamt 150 Punkte" },
  single_10: { zh: "单局获得 10 分", en: "Score 10 in one game", ja: "1ゲームで10ポイント", ko: "한 게임에서 10점", es: "Consigue 10 en una partida", fr: "Obtenir 10 en une partie", ru: "Набрать 10 за игру", de: "10 in einem Spiel" },
  single_20: { zh: "单局获得 20 分", en: "Score 20 in one game", ja: "1ゲームで20ポイント", ko: "한 게임에서 20점", es: "Consigue 20 en una partida", fr: "Obtenir 20 en une partie", ru: "Набрать 20 за игру", de: "20 in einem Spiel" },
  single_40: { zh: "单局获得 40 分", en: "Score 40 in one game", ja: "1ゲームで40ポイント", ko: "한 게임에서 40점", es: "Consigue 40 en una partida", fr: "Obtenir 40 en une partie", ru: "Набрать 40 за игру", de: "40 in einem Spiel" },
  powerup_3: { zh: "收集 3 个道具", en: "Collect 3 power-ups", ja: "アイテムを3つ集める", ko: "아이템 3개 수집", es: "Recoge 3 power-ups", fr: "Collecter 3 power-ups", ru: "Собрать 3 усиления", de: "3 Power-Ups sammeln" },
  powerup_8: { zh: "收集 8 个道具", en: "Collect 8 power-ups", ja: "アイテムを8つ集める", ko: "아이템 8개 수집", es: "Recoge 8 power-ups", fr: "Collecter 8 power-ups", ru: "Собрать 8 усилений", de: "8 Power-Ups sammeln" },
  pipes_10: { zh: "通过 10 根管道", en: "Pass 10 pipes", ja: "パイプを10本通過", ko: "파이프 10개 통과", es: "Pasa 10 tubos", fr: "Passer 10 tuyaux", ru: "Пройти 10 труб", de: "10 Röhren passieren" },
  pipes_30: { zh: "通过 30 根管道", en: "Pass 30 pipes", ja: "パイプを30本通過", ko: "파이프 30개 통과", es: "Pasa 30 tubos", fr: "Passer 30 tuyaux", ru: "Пройти 30 труб", de: "30 Röhren passieren" },
  pipes_50: { zh: "通过 50 根管道", en: "Pass 50 pipes", ja: "パイプを50本通過", ko: "파이프 50개 통과", es: "Pasa 50 tubos", fr: "Passer 50 tuyaux", ru: "Пройти 50 труб", de: "50 Röhren passieren" },
  combo_5: { zh: "达成 5 连击", en: "Get a 5-combo", ja: "5コンボ達成", ko: "5콤보 달성", es: "Consigue un combo de 5", fr: "Obtenir un combo de 5", ru: "Сделать комбо из 5", de: "5er-Kombo erreichen" },
  combo_10: { zh: "达成 10 连击", en: "Get a 10-combo", ja: "10コンボ達成", ko: "10콤보 달성", es: "Consigue un combo de 10", fr: "Obtenir un combo de 10", ru: "Сделать комбо из 10", de: "10er-Kombo erreichen" },
  stars_20: { zh: "收集 20 颗星芒", en: "Collect 20 stars", ja: "星を20個集める", ko: "별 20개 수집", es: "Recoge 20 estrellas", fr: "Collecter 20 étoiles", ru: "Собрать 20 звёзд", de: "20 Sterne sammeln" },
  stars_50: { zh: "收集 50 颗星芒", en: "Collect 50 stars", ja: "星を50個集める", ko: "별 50개 수집", es: "Recoge 50 estrellas", fr: "Collecter 50 étoiles", ru: "Собрать 50 звёзд", de: "50 Sterne sammeln" },
  stars_100: { zh: "收集 100 颗星芒", en: "Collect 100 stars", ja: "星を100個集める", ko: "별 100개 수집", es: "Recoge 100 estrellas", fr: "Collecter 100 étoiles", ru: "Собрать 100 звёзд", de: "100 Sterne sammeln" },
  die_early: { zh: "10 分以内结束一局", en: "Finish a game under 10 points", ja: "10ポイント未満で終了", ko: "10점 미만으로 게임 종료", es: "Termina una partida con menos de 10", fr: "Finir une partie sous 10 points", ru: "Закончить игру с менее чем 10 очками", de: "Spiel unter 10 Punkten beenden" },
  perfect: { zh: "不使用护盾获得 20 分", en: "Score 20 without using a shield", ja: "シールドなしで20ポイント", ko: "방패 없이 20점 달성", es: "Consigue 20 sin usar escudo", fr: "Obtenir 20 sans utiliser de bouclier", ru: "Набрать 20 без использования щита", de: "20 Punkte ohne Schild" },
};

// 道具翻译
export const POWERUP_NAMES: Record<string, Record<Lang, string>> = {
  umbrella: { zh: "纸伞", en: "Paper Umbrella", ja: "紙傘", ko: "종이 우산", es: "Paraguas de Papel", fr: "Parapluie en Papier", ru: "Бумажный Зонт", de: "Papierschirm" },
  boat: { zh: "纸船", en: "Paper Boat", ja: "紙船", ko: "종이배", es: "Barco de Papel", fr: "Bateau en Papier", ru: "Бумажный Кораблик", de: "Papierboot" },
  lantern: { zh: "纸灯", en: "Paper Lantern", ja: "紙灯籠", ko: "종이 등불", es: "Farol de Papel", fr: "Lanterne en Papier", ru: "Бумажный Фонарь", de: "Papierlaterne" },
  plane: { zh: "纸飞机", en: "Paper Plane", ja: "紙飛行機", ko: "종이비행기", es: "Avión de Papel", fr: "Avion en Papier", ru: "Бумажный Самолётик", de: "Papierflieger" },
  crane: { zh: "纸鹤", en: "Paper Crane", ja: "折り鶴", ko: "종이학", es: "Grulla de Papel", fr: "Grue en Papier", ru: "Бумажный Журавлик", de: "Papierkranich" },
};

export const POWERUP_DESCS: Record<string, Record<Lang, string>> = {
  umbrella: { zh: "抵消一次碰撞", en: "Negate one collision", ja: "衝突を1回無効化", ko: "충돌 1회 무효화", es: "Anula una colisión", fr: "Annule une collision", ru: "Отменить одно столкновение", de: "Eine Kollision negieren" },
  boat: { zh: "鸟体积减半", en: "Bird size halved", ja: "鳥のサイズ半分", ko: "새 크기 절반", es: "Tamaño del pájaro reducido a la mitad", fr: "Taille de l'oiseau réduite de moitié", ru: "Размер птицы уменьшен вдвое", de: "Vogelgröße halbiert" },
  lantern: { zh: "游戏速度减半", en: "Game speed halved", ja: "ゲーム速度半分", ko: "게임 속도 절반", es: "Velocidad del juego reducida a la mitad", fr: "Vitesse du jeu réduite de moitié", ru: "Скорость игры уменьшена вдвое", de: "Spielgeschwindigkeit halbiert" },
  plane: { zh: "分数翻倍", en: "Double score", ja: "スコア2倍", ko: "점수 2배", es: "Puntuación doble", fr: "Score doublé", ru: "Удвоение очков", de: "Doppelte Punktzahl" },
  crane: { zh: "自动吸附星芒", en: "Auto-attract stars", ja: "星を自動吸引", ko: "별 자동 흡수", es: "Atrae estrellas automáticamente", fr: "Attire les étoiles automatiquement", ru: "Авто-притяжение звёзд", de: "Sterne automatisch anziehen" },
};

// 构建完整 Translations 对象
export function buildTranslations(lang: Lang): Translations {
  return {
    common: {
      back: { zh: "返回", en: "Back", ja: "戻る", ko: "뒤로", es: "Volver", fr: "Retour", ru: "Назад", de: "Zurück" }[lang],
      confirm: { zh: "确认", en: "Confirm", ja: "確認", ko: "확인", es: "Confirmar", fr: "Confirmer", ru: "Подтвердить", de: "Bestätigen" }[lang],
      cancel: { zh: "取消", en: "Cancel", ja: "キャンセル", ko: "취소", es: "Cancelar", fr: "Annuler", ru: "Отмена", de: "Abbrechen" }[lang],
      stars: { zh: "星芒", en: "Stars", ja: "星芒", ko: "별빛", es: "Estrellas", fr: "Étoiles", ru: "Звёзды", de: "Sterne" }[lang],
      bestScore: { zh: "最高分", en: "Best Score", ja: "最高得点", ko: "최고 점수", es: "Mejor Puntuación", fr: "Meilleur Score", ru: "Лучший Счёт", de: "Bestpunktzahl" }[lang],
      equipped: { zh: "已装备", en: "Equipped", ja: "装備中", ko: "장착됨", es: "Equipado", fr: "Équipé", ru: "Экипировано", de: "Ausgerüstet" }[lang],
      clickToEquip: { zh: "点击装备", en: "Tap to equip", ja: "タップで装備", ko: "터치하여 장착", es: "Toca para equipar", fr: "Toucher pour équiper", ru: "Нажмите, чтобы экипировать", de: "Tippen zum Ausrüsten" }[lang],
      free: { zh: "免费", en: "Free", ja: "無料", ko: "무료", es: "Gratis", fr: "Gratuit", ru: "Бесплатно", de: "Kostenlos" }[lang],
      all: { zh: "全部", en: "All", ja: "すべて", ko: "전체", es: "Todo", fr: "Tout", ru: "Все", de: "Alle" }[lang],
      notEnoughStars: { zh: "星芒不足", en: "Not enough stars", ja: "星芒が足りません", ko: "별빛 부족", es: "Estrellas insuficientes", fr: "Pas assez d'étoiles", ru: "Недостаточно звёзд", de: "Nicht genug Sterne" }[lang],
      unlockFailed: { zh: "解锁失败", en: "Unlock failed", ja: "解除失敗", ko: "해금 실패", es: "Desbloqueo fallido", fr: "Déverrouillage échoué", ru: "Разблокировка не удалась", de: "Freischaltung fehlgeschlagen" }[lang],
      unlocked: { zh: "已解锁", en: "Unlocked", ja: "解除済み", ko: "해금됨", es: "Desbloqueado", fr: "Déverrouillé", ru: "Разблокировано", de: "Freigeschaltet" }[lang],
      claimSuccess: { zh: "领取成功", en: "Claimed!", ja: "受取成功", ko: "수령 성공", es: "¡Reclamado!", fr: "Réclamé !", ru: "Получено!", de: "Erhalten!" }[lang],
      inProgress: { zh: "进行中", en: "In Progress", ja: "進行中", ko: "진행 중", es: "En Progreso", fr: "En Cours", ru: "В Процессе", de: "In Bearbeitung" }[lang],
      claimed: { zh: "已领取", en: "Claimed", ja: "受取済み", ko: "수령 완료", es: "Reclamado", fr: "Réclamé", ru: "Получено", de: "Erhalten" }[lang],
      continue: { zh: "继续", en: "Continue", ja: "続ける", ko: "계속", es: "Continuar", fr: "Continuer", ru: "Продолжить", de: "Fortsetzen" }[lang],
      restart: { zh: "重新开始", en: "Restart", ja: "再スタート", ko: "다시 시작", es: "Reiniciar", fr: "Recommencer", ru: "Перезапуск", de: "Neustart" }[lang],
      home: { zh: "主菜单", en: "Main Menu", ja: "メインメニュー", ko: "메인 메뉴", es: "Menú Principal", fr: "Menu Principal", ru: "Главное Меню", de: "Hauptmenü" }[lang],
      start: { zh: "开始", en: "Start", ja: "開始", ko: "시작", es: "Comenzar", fr: "Commencer", ru: "Начать", de: "Starten" }[lang],
      pause: { zh: "暂停", en: "Pause", ja: "一時停止", ko: "일시정지", es: "Pausa", fr: "Pause", ru: "Пауза", de: "Pause" }[lang],
      resume: { zh: "继续", en: "Resume", ja: "再開", ko: "재개", es: "Reanudar", fr: "Reprendre", ru: "Продолжить", de: "Fortsetzen" }[lang],
      clear: { zh: "清空", en: "Clear", ja: "クリア", ko: "지우기", es: "Limpiar", fr: "Effacer", ru: "Очистить", de: "Löschen" }[lang],
      clearAll: { zh: "清空所有数据", en: "Clear All Data", ja: "全データ消去", ko: "모든 데이터 지우기", es: "Borrar Todos los Datos", fr: "Effacer Toutes les Données", ru: "Удалить Все Данные", de: "Alle Daten löschen" }[lang],
      save: { zh: "保存", en: "Save", ja: "保存", ko: "저장", es: "Guardar", fr: "Sauvegarder", ru: "Сохранить", de: "Speichern" }[lang],
      loading: { zh: "加载中", en: "Loading", ja: "読み込み中", ko: "로딩 중", es: "Cargando", fr: "Chargement", ru: "Загрузка", de: "Laden" }[lang],
    },
    home: {
      subtitle: { zh: "纸 艺 天 空 · vol.1", en: "Paper Sky · vol.1", ja: "紙芸天空 · vol.1", ko: "종이예술 하늘 · vol.1", es: "Cielo de Papel · vol.1", fr: "Ciel de Papier · vol.1", ru: "Бумажное Небо · vol.1", de: "Papierhimmel · vol.1" }[lang],
      title: { zh: "Paper Flap", en: "Paper Flap", ja: "Paper Flap", ko: "Paper Flap", es: "Paper Flap", fr: "Paper Flap", ru: "Paper Flap", de: "Paper Flap" }[lang],
      tagline: { zh: "折一只纸鸟，让它飞过和纸的早晨", en: "Fold a paper bird, let it fly through a washi morning", ja: "紙の鳥を折り、和紙の朝を飛ばせよう", ko: "종이새를 접어 화지의 아침을 날아보자", es: "Dobla un pájaro de papel, déjalo volar por una mañana washi", fr: "Plie un oiseau de papier, laisse-le voler dans un matin washi", ru: "Сложи бумажную птицу, пусть летит сквозь утро васи", de: "Falte einen Papiervogel, lass ihn durch einen Washi-Morgen fliegen" }[lang],
      begin: { zh: "BEGIN · 开始", en: "BEGIN · Start", ja: "BEGIN · 開始", ko: "BEGIN · 시작", es: "BEGIN · Comenzar", fr: "BEGIN · Commencer", ru: "BEGIN · Начать", de: "BEGIN · Starten" }[lang],
      collection: { zh: "收藏", en: "Collection", ja: "コレクション", ko: "컬렉션", es: "Colección", fr: "Collection", ru: "Коллекция", de: "Sammlung" }[lang],
      shop: { zh: "商城", en: "Shop", ja: "ショップ", ko: "상점", es: "Tienda", fr: "Boutique", ru: "Магазин", de: "Shop" }[lang],
      leaderboard: { zh: "排行", en: "Ranking", ja: "ランキング", ko: "랭킹", es: "Clasificación", fr: "Classement", ru: "Рейтинг", de: "Rangliste" }[lang],
      settings: { zh: "设置", en: "Settings", ja: "設定", ko: "설정", es: "Ajustes", fr: "Paramètres", ru: "Настройки", de: "Einstellungen" }[lang],
      hint: { zh: "Press · SPACE / TAP to begin", en: "Press · SPACE / TAP to begin", ja: "SPACE / タップ で開始", ko: "SPACE / 터치로 시작", es: "Presiona · ESPACIO / TOCA para comenzar", fr: "Appuyez · ESPACE / TAPEZ pour commencer", ru: "Нажмите · ПРОБЕЛ / КОСНИТЕСЬ чтобы начать", de: "Drücke · LEERTASTE / TIPPE zum Starten" }[lang],
      subtitleEn: { zh: "A paper-craft arcade", en: "A paper-craft arcade", ja: "A paper-craft arcade", ko: "A paper-craft arcade", es: "Un arcade de papel artesanal", fr: "Un jeu d'arcade en papier", ru: "Аркада из бумаги", de: "Eine Papierkunst-Arcade" }[lang],
    },
    game: {
      ready: { zh: "READY", en: "READY", ja: "READY", ko: "READY", es: "LISTO", fr: "PRÊT", ru: "ГОТОВ", de: "BEREIT" }[lang],
      readyHint: { zh: "轻点 / 空格 起飞", en: "Tap / Space to fly", ja: "タップ / スペースで飛ぶ", ko: "터치 / 스페이스로 날기", es: "Toca / Espacio para volar", fr: "Tapez / Espace pour voler", ru: "Коснитесь / Пробел чтобы лететь", de: "Tippe / Leertaste zum Fliegen" }[lang],
      paused: { zh: "PAUSED", en: "PAUSED", ja: "PAUSED", ko: "PAUSED", es: "PAUSADO", fr: "PAUSE", ru: "ПАУЗА", de: "PAUSIERT" }[lang],
      currentScore: { zh: "当前", en: "Current", ja: "現在", ko: "현재", es: "Actual", fr: "Actuel", ru: "Текущий", de: "Aktuell" }[lang],
      combo: { zh: "连击", en: "Combo", ja: "コンボ", ko: "콤보", es: "Combo", fr: "Combo", ru: "Комбо", de: "Kombo" }[lang],
      restart: { zh: "重新开始", en: "Restart", ja: "再スタート", ko: "다시 시작", es: "Reiniciar", fr: "Recommencer", ru: "Перезапуск", de: "Neustart" }[lang],
      home: { zh: "返回主菜单", en: "Return to Menu", ja: "メニューに戻る", ko: "메뉴로 돌아가기", es: "Volver al Menú", fr: "Retour au Menu", ru: "Вернуться в Меню", de: "Zurück zum Menü" }[lang],
    },
    gameOver: {
      newRecord: { zh: "NEW RECORD", en: "NEW RECORD", ja: "NEW RECORD", ko: "NEW RECORD", es: "NUEVO RÉCORD", fr: "NOUVEAU RECORD", ru: "НОВЫЙ РЕКОРД", de: "NEUER REKORD" }[lang],
      gameOver: { zh: "GAME OVER", en: "GAME OVER", ja: "GAME OVER", ko: "GAME OVER", es: "FIN DEL JUEGO", fr: "FIN DE PARTIE", ru: "ИГРА ОКОНЧЕНА", de: "SPIEL VORBEI" }[lang],
      subtitleNew: { zh: "A new chapter", en: "A new chapter", ja: "新しい章", ko: "새로운 장", es: "Un nuevo capítulo", fr: "Un nouveau chapitre", ru: "Новая глава", de: "Ein neues Kapitel" }[lang],
      subtitleEnd: { zh: "A quiet ending", en: "A quiet ending", ja: "静かな終わり", ko: "조용한 끝맺음", es: "Un final tranquilo", fr: "Une fin tranquille", ru: "Тихое завершение", de: "Ein ruhiges Ende" }[lang],
      score: { zh: "得分 · Score", en: "Score", ja: "スコア", ko: "점수", es: "Puntuación", fr: "Score", ru: "Очки", de: "Punktzahl" }[lang],
      best: { zh: "最高", en: "Best", ja: "最高", ko: "최고", es: "Mejor", fr: "Meilleur", ru: "Лучший", de: "Beste" }[lang],
      stars: { zh: "星芒", en: "Stars", ja: "星芒", ko: "별빛", es: "Estrellas", fr: "Étoiles", ru: "Звёзды", de: "Sterne" }[lang],
      combo: { zh: "连击", en: "Combo", ja: "コンボ", ko: "콤보", es: "Combo", fr: "Combo", ru: "Комбо", de: "Kombo" }[lang],
      quote: { zh: "折痕是飞翔的来路", en: "Creases are the path to flight", ja: "折り目は飛翔の道", ko: "접힌 자국은 비상의 길", es: "Los pliegues son el camino al vuelo", fr: "Les plis sont le chemin du vol", ru: "Сгибы — путь к полёту", de: "Falten sind der Weg zum Flug" }[lang],
      mainMenu: { zh: "主菜单", en: "Main Menu", ja: "メインメニュー", ko: "메인 메뉴", es: "Menú Principal", fr: "Menu Principal", ru: "Главное Меню", de: "Hauptmenü" }[lang],
      playAgain: { zh: "再来", en: "Play Again", ja: "もう一度", ko: "다시 하기", es: "Jugar de Nuevo", fr: "Rejouer", ru: "Играть Снова", de: "Nochmal Spielen" }[lang],
    },
    collection: {
      title: { zh: "收藏馆", en: "Collection", ja: "コレクション", ko: "컬렉션", es: "Colección", fr: "Collection", ru: "Коллекция", de: "Sammlung" }[lang],
      subtitle: { zh: "造型 · 主题", en: "Skins · Themes", ja: "スキン · テーマ", ko: "스킨 · 테마", es: "Skins · Temas", fr: "Skins · Thèmes", ru: "Скины · Темы", de: "Skins · Themen" }[lang],
      skins: { zh: "纸鸟造型", en: "Bird Skins", ja: "紙鳥スキン", ko: "종이새 스킨", es: "Skins de Pájaro", fr: "Skins d'Oiseau", ru: "Скины Птицы", de: "Vogel-Skins" }[lang],
      themes: { zh: "场景主题", en: "Scene Themes", ja: "背景テーマ", ko: "배경 테마", es: "Temas de Escena", fr: "Thèmes de Scène", ru: "Темы Сцен", de: "Szenen-Themen" }[lang],
      all: { zh: "全部", en: "All", ja: "すべて", ko: "전체", es: "Todo", fr: "Tout", ru: "Все", de: "Alle" }[lang],
      common: { zh: "普通", en: "Common", ja: "普通", ko: "일반", es: "Común", fr: "Commun", ru: "Обычный", de: "Gewöhnlich" }[lang],
      rare: { zh: "稀有", en: "Rare", ja: "レア", ko: "희귀", es: "Raro", fr: "Rare", ru: "Редкий", de: "Selten" }[lang],
      epic: { zh: "史诗", en: "Epic", ja: "エピック", ko: "에픽", es: "Épico", fr: "Épique", ru: "Эпический", de: "Episch" }[lang],
      legendary: { zh: "传说", en: "Legendary", ja: "レジェンド", ko: "전설", es: "Legendario", fr: "Légendaire", ru: "Легендарный", de: "Legendär" }[lang],
      equipped: { zh: "已装备", en: "Equipped", ja: "装備中", ko: "장착됨", es: "Equipado", fr: "Équipé", ru: "Экипировано", de: "Ausgerüstet" }[lang],
      clickEquip: { zh: "点击装备", en: "Tap to equip", ja: "タップで装備", ko: "터치하여 장착", es: "Toca para equipar", fr: "Toucher pour équiper", ru: "Нажмите, чтобы экипировать", de: "Tippen zum Ausrüsten" }[lang],
      notEnough: { zh: "星芒不足", en: "Not enough stars", ja: "星芒が足りません", ko: "별빛 부족", es: "Estrellas insuficientes", fr: "Pas assez d'étoiles", ru: "Недостаточно звёзд", de: "Nicht genug Sterne" }[lang],
      unlocked: { zh: "已解锁", en: "Unlocked", ja: "解除済み", ko: "해금됨", es: "Desbloqueado", fr: "Déverrouillé", ru: "Разблокировано", de: "Freigeschaltet" }[lang],
      unlockFail: { zh: "解锁失败", en: "Unlock failed", ja: "解除失敗", ko: "해금 실패", es: "Desbloqueo fallido", fr: "Déverrouillage échoué", ru: "Разблокировка не удалась", de: "Freischaltung fehlgeschlagen" }[lang],
      currentTheme: { zh: "当前主题", en: "Current Theme", ja: "現在のテーマ", ko: "현재 테마", es: "Tema Actual", fr: "Thème Actuel", ru: "Текущая Тема", de: "Aktuelles Thema" }[lang],
    },
    shop: {
      title: { zh: "商城", en: "Shop", ja: "ショップ", ko: "상점", es: "Tienda", fr: "Boutique", ru: "Магазин", de: "Shop" }[lang],
      subtitle: { zh: "装备 · 任务", en: "Equipment · Tasks", ja: "装備 · 任務", ko: "장비 · 임무", es: "Equipo · Tareas", fr: "Équipement · Tâches", ru: "Снаряжение · Задания", de: "Ausrüstung · Aufgaben" }[lang],
      equipment: { zh: "装备", en: "Equipment", ja: "装備", ko: "장비", es: "Equipo", fr: "Équipement", ru: "Снаряжение", de: "Ausrüstung" }[lang],
      dailyTasks: { zh: "每日任务", en: "Daily Tasks", ja: "デイリー任務", ko: "일일 임무", es: "Tareas Diarias", fr: "Tâches Quotidiennes", ru: "Ежедневные Задания", de: "Tägliche Aufgaben" }[lang],
      trail: { zh: "尾迹", en: "Trail", ja: "軌跡", ko: "궤적", es: "Estela", fr: "Traînée", ru: "След", de: "Spur" }[lang],
      shield: { zh: "护盾", en: "Shield", ja: "盾", ko: "방패", es: "Escudo", fr: "Bouclier", ru: "Щит", de: "Schild" }[lang],
      accessory: { zh: "配饰", en: "Accessory", ja: "装飾品", ko: "장식품", es: "Accesorio", fr: "Accessoire", ru: "Аксессуар", de: "Accessoire" }[lang],
      noTasks: { zh: "暂无任务", en: "No tasks available", ja: "任務はありません", ko: "임무 없음", es: "Sin tareas disponibles", fr: "Aucune tâche disponible", ru: "Нет заданий", de: "Keine Aufgaben verfügbar" }[lang],
      noTasksHint: { zh: "每日任务将在次日刷新", en: "Daily tasks will refresh tomorrow", ja: "デイリー任務は翌日更新されます", ko: "일일 임무는 다음 날 갱신됩니다", es: "Las tareas diarias se actualizarán mañana", fr: "Les tâches quotidiennes seront actualisées demain", ru: "Ежедневные задания обновятся завтра", de: "Tägliche Aufgaben werden morgen aktualisiert" }[lang],
    },
    leaderboard: {
      title: { zh: "排行榜", en: "Leaderboard", ja: "ランキング", ko: "리더보드", es: "Tabla de Clasificación", fr: "Classement", ru: "Таблица Лидеров", de: "Rangliste" }[lang],
      subtitle: { zh: "Local · Top 10", en: "Local · Top 10", ja: "ローカル · トップ10", ko: "로컬 · Top 10", es: "Local · Top 10", fr: "Local · Top 10", ru: "Локально · Топ 10", de: "Lokal · Top 10" }[lang],
      empty: { zh: "还没有飞行记录", en: "No flight records yet", ja: "まだ飛行記録がありません", ko: "아직 비행 기록이 없습니다", es: "Aún no hay registros de vuelo", fr: "Pas encore de records de vol", ru: "Пока нет записей полётов", de: "Noch keine Flugaufzeichnungen" }[lang],
      emptyHint: { zh: "Start your first paper flight", en: "Start your first paper flight", ja: "最初の紙飛行を始めよう", ko: "첫 번째 종이 비행을 시작하세요", es: "Comienza tu primer vuelo de papel", fr: "Commence ton premier vol en papier", ru: "Начни свой первый бумажный полёт", de: "Starte deinen ersten Papierflug" }[lang],
      startGame: { zh: "开始游戏", en: "Start Game", ja: "ゲームを始める", ko: "게임 시작", es: "Comenzar Juego", fr: "Commencer le Jeu", ru: "Начать Игру", de: "Spiel Starten" }[lang],
      rank: { zh: "名次", en: "Rank", ja: "順位", ko: "순위", es: "Puesto", fr: "Rang", ru: "Место", de: "Rang" }[lang],
      score: { zh: "得分", en: "Score", ja: "得点", ko: "점수", es: "Puntos", fr: "Points", ru: "Очки", de: "Punkte" }[lang],
      stars: { zh: "星芒", en: "Stars", ja: "星芒", ko: "별빛", es: "Estrellas", fr: "Étoiles", ru: "Звёзды", de: "Sterne" }[lang],
      date: { zh: "日期", en: "Date", ja: "日付", ko: "날짜", es: "Fecha", fr: "Date", ru: "Дата", de: "Datum" }[lang],
      bestScore: { zh: "最高分", en: "Best Score", ja: "最高得点", ko: "최고 점수", es: "Mejor Puntuación", fr: "Meilleur Score", ru: "Лучший Счёт", de: "Bestpunktzahl" }[lang],
      totalStars: { zh: "总星芒", en: "Total Stars", ja: "総星芒", ko: "총 별빛", es: "Estrellas Totales", fr: "Total Étoiles", ru: "Всего Звёзд", de: "Gesamtsterne" }[lang],
    },
    settings: {
      title: { zh: "设置", en: "Settings", ja: "設定", ko: "설정", es: "Ajustes", fr: "Paramètres", ru: "Настройки", de: "Einstellungen" }[lang],
      subtitle: { zh: "音频 · 画面 · 数据", en: "Audio · Video · Data", ja: "音声 · 画面 · データ", ko: "오디오 · 화면 · 데이터", es: "Audio · Video · Datos", fr: "Audio · Vidéo · Données", ru: "Аудио · Видео · Данные", de: "Audio · Video · Daten" }[lang],
      audio: { zh: "音频", en: "Audio", ja: "音声", ko: "오디오", es: "Audio", fr: "Audio", ru: "Аудио", de: "Audio" }[lang],
      sound: { zh: "音效", en: "Sound Effects", ja: "効果音", ko: "효과음", es: "Efectos de Sonido", fr: "Effets Sonores", ru: "Звуковые Эффекты", de: "Soundeffekte" }[lang],
      soundDesc: { zh: "跳跃、得分、拾取与失败的程序化声音", en: "Procedural sounds for flap, score, pickup, and death", ja: "ジャンプ、得点、取得、失敗の音", ko: "점프, 득점, 획득, 실패의 효과음", es: "Sonidos procedurales para saltar, puntuar, recoger y morir", fr: "Sons procéduraux pour saut, score, collecte et mort", ru: "Процедурные звуки прыжка, очков, сбора и смерти", de: "Prozedurale Klänge für Flügelschlag, Punkte, Aufnahme und Tod" }[lang],
      music: { zh: "背景音乐", en: "Background Music", ja: "BGM", ko: "배경음악", es: "Música de Fondo", fr: "Musique de Fond", ru: "Фоновая Музыка", de: "Hintergrundmusik" }[lang],
      musicDesc: { zh: "循环播放的和风禅意音乐", en: "Looping Japanese zen-style music", ja: "ループする和風禅の音楽", ko: "반복 재생되는 일본풍 선 음악", es: "Música zen japonesa en bucle", fr: "Musique zen japonaise en boucle", ru: "Цикличная японская дзен-музыка", de: "Schleifende japanische Zen-Musik" }[lang],
      graphics: { zh: "画面", en: "Graphics", ja: "画面", ko: "화면", es: "Gráficos", fr: "Graphismes", ru: "Графика", de: "Grafik" }[lang],
      quality: { zh: "画面质量", en: "Quality", ja: "画質", ko: "화질", es: "Calidad", fr: "Qualité", ru: "Качество", de: "Qualität" }[lang],
      paperTexture: { zh: "纸纹强度", en: "Paper Texture", ja: "紙の質感", ko: "종이 질감", es: "Textura de Papel", fr: "Texture du Papier", ru: "Текстура Бумаги", de: "Papiertextur" }[lang],
      language: { zh: "语言", en: "Language", ja: "言語", ko: "언어", es: "Idioma", fr: "Langue", ru: "Язык", de: "Sprache" }[lang],
      languageDesc: { zh: "选择界面显示语言", en: "Choose display language", ja: "表示言語を選択", ko: "표시 언어 선택", es: "Elige el idioma de la interfaz", fr: "Choisir la langue d'affichage", ru: "Выберите язык интерфейса", de: "Anzeigesprache wählen" }[lang],
      data: { zh: "数据", en: "Data", ja: "データ", ko: "데이터", es: "Datos", fr: "Données", ru: "Данные", de: "Daten" }[lang],
      dataDesc: { zh: "清空所有本地数据，包括星芒、造型、主题、排行榜与设置。", en: "Clear all local data including stars, skins, themes, leaderboard and settings.", ja: "星芒、スキン、テーマ、ランキング、設定を含むすべてのローカルデータを消去します。", ko: "별빛, 스킨, 테마, 리더보드, 설정을 포함한 모든 로컬 데이터를 지웁니다.", es: "Borra todos los datos locales incluyendo estrellas, skins, temas, clasificación y ajustes.", fr: "Efface toutes les données locales : étoiles, skins, thèmes, classement et paramètres.", ru: "Удалить все локальные данные: звёзды, скины, темы, рейтинг и настройки.", de: "Löscht alle lokalen Daten: Sterne, Skins, Themen, Rangliste und Einstellungen." }[lang],
      clearData: { zh: "清空所有数据", en: "Clear All Data", ja: "全データを消去", ko: "모든 데이터 지우기", es: "Borrar Todos los Datos", fr: "Effacer Toutes les Données", ru: "Удалить Все Данные", de: "Alle Daten Löschen" }[lang],
      qualityLow: { zh: "低", en: "Low", ja: "低", ko: "낮음", es: "Bajo", fr: "Bas", ru: "Низкое", de: "Niedrig" }[lang],
      qualityMed: { zh: "中", en: "Medium", ja: "中", ko: "중간", es: "Medio", fr: "Moyen", ru: "Среднее", de: "Mittel" }[lang],
      qualityHigh: { zh: "高", en: "High", ja: "高", ko: "높음", es: "Alto", fr: "Haut", ru: "Высокое", de: "Hoch" }[lang],
      reset: { zh: "已重置", en: "Reset", ja: "リセット済み", ko: "초기화됨", es: "Restablecido", fr: "Réinitialisé", ru: "Сброшено", de: "Zurückgesetzt" }[lang],
    },
    powerUps: Object.fromEntries(
      Object.keys(POWERUP_NAMES).map((k) => [
        k,
        { name: POWERUP_NAMES[k]?.[lang] ?? k, desc: POWERUP_DESCS[k]?.[lang] ?? "" },
      ]),
    ),
    rarity: {
      common: { zh: "普通", en: "Common", ja: "普通", ko: "일반", es: "Común", fr: "Commun", ru: "Обычный", de: "Gewöhnlich" }[lang],
      rare: { zh: "稀有", en: "Rare", ja: "レア", ko: "희귀", es: "Raro", fr: "Rare", ru: "Редкий", de: "Selten" }[lang],
      epic: { zh: "史诗", en: "Epic", ja: "エピック", ko: "에픽", es: "Épico", fr: "Épique", ru: "Эпический", de: "Episch" }[lang],
      legendary: { zh: "传说", en: "Legendary", ja: "レジェンド", ko: "전설", es: "Legendario", fr: "Légendaire", ru: "Легендарный", de: "Legendär" }[lang],
    },
    equipKinds: {
      trail: { zh: "尾迹", en: "Trail", ja: "軌跡", ko: "궤적", es: "Estela", fr: "Traînée", ru: "След", de: "Spur" }[lang],
      shield: { zh: "护盾", en: "Shield", ja: "盾", ko: "방패", es: "Escudo", fr: "Bouclier", ru: "Щит", de: "Schild" }[lang],
      accessory: { zh: "配饰", en: "Accessory", ja: "装飾品", ko: "장식품", es: "Accesorio", fr: "Accessoire", ru: "Аксессуар", de: "Accessoire" }[lang],
    },
  };
}