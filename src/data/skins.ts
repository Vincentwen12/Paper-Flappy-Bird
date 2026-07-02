// 皮肤（纸鸟造型）目录
export interface Skin {
  id: string;
  name: string;
  // 2 个颜色：主色 / 阴影
  colors: string[];
  // 体型半径缩放
  scale: number;
  // 价格（星芒）
  price: number;
  // 描述
  desc: string;
  // 稀有度标签
  rarity?: "common" | "rare" | "epic" | "legendary";
}

export const SKINS: Skin[] = [
  // === 免费 ===
  {
    id: "classic",
    name: "原色",
    colors: ["#fafaf7", "#d8d3c5"],
    scale: 1.0,
    price: 0,
    desc: "和纸本色，温润如初",
    rarity: "common",
  },
  {
    id: "cloud",
    name: "云白",
    colors: ["#ffffff", "#e0e0e0"],
    scale: 1.0,
    price: 0,
    desc: "如云似絮，一尘不染",
    rarity: "common",
  },
  // === 50-200 星芒 ===
  {
    id: "sakura",
    name: "樱粉",
    colors: ["#f4d4d8", "#e8b4b8"],
    scale: 1.0,
    price: 100,
    desc: "春风拂过的花瓣色",
    rarity: "common",
  },
  {
    id: "cream",
    name: "奶油",
    colors: ["#f5f0e8", "#e0d4c0"],
    scale: 1.0,
    price: 80,
    desc: "午后阳光里的奶油甜",
    rarity: "common",
  },
  {
    id: "peach",
    name: "蜜桃",
    colors: ["#fce4d6", "#f0c4a8"],
    scale: 1.0,
    price: 120,
    desc: "初夏枝头的蜜桃色",
    rarity: "common",
  },
  {
    id: "lavender",
    name: "薰衣草",
    colors: ["#e8dff0", "#d0b8e0"],
    scale: 1.0,
    price: 150,
    desc: "普罗旺斯山谷的淡紫",
    rarity: "common",
  },
  {
    id: "mint",
    name: "薄荷",
    colors: ["#d4ece4", "#b8d8cc"],
    scale: 1.0,
    price: 130,
    desc: "清凉沁心的薄荷绿",
    rarity: "common",
  },
  // === 200-400 星芒 ===
  {
    id: "mistblue",
    name: "雾蓝",
    colors: ["#d4dde6", "#b8c9d8"],
    scale: 1.0,
    price: 200,
    desc: "清晨山岚中的远空",
    rarity: "rare",
  },
  {
    id: "sage",
    name: "鼠尾草",
    colors: ["#c8d4c0", "#a8b898"],
    scale: 1.0,
    price: 220,
    desc: "地中海边的鼠尾草绿",
    rarity: "rare",
  },
  {
    id: "terracotta",
    name: "赤陶",
    colors: ["#e8c8b0", "#d4a888"],
    scale: 1.0,
    price: 250,
    desc: "托斯卡纳的赤陶色",
    rarity: "rare",
  },
  {
    id: "coral",
    name: "珊瑚",
    colors: ["#f0a898", "#e08870"],
    scale: 1.0,
    price: 280,
    desc: "海面下的珊瑚礁色",
    rarity: "rare",
  },
  {
    id: "matcha",
    name: "抹茶",
    colors: ["#d4dcc8", "#b8c4a0"],
    scale: 1.0,
    price: 300,
    desc: "茶室檐下的嫩叶",
    rarity: "rare",
  },
  {
    id: "oat",
    name: "米杏",
    colors: ["#ece2d0", "#d4c4a8"],
    scale: 1.0,
    price: 320,
    desc: "秋天麦田的暖意",
    rarity: "rare",
  },
  {
    id: "sand",
    name: "沙丘",
    colors: ["#e8dcc8", "#d4c8a8"],
    scale: 1.0,
    price: 350,
    desc: "撒哈拉的沙丘金",
    rarity: "rare",
  },
  {
    id: "clay",
    name: "陶土",
    colors: ["#d8c0a8", "#c0a080"],
    scale: 1.0,
    price: 380,
    desc: "手工陶艺的泥土色",
    rarity: "rare",
  },
  // === 400-700 星芒 ===
  {
    id: "midnight",
    name: "午夜",
    colors: ["#4a5568", "#2d3748"],
    scale: 1.0,
    price: 400,
    desc: "午夜深蓝的静谧",
    rarity: "epic",
  },
  {
    id: "rose",
    name: "玫瑰",
    colors: ["#f4c4d0", "#e898a8"],
    scale: 1.0,
    price: 420,
    desc: "花店里刚剪下的玫瑰",
    rarity: "epic",
  },
  {
    id: "goldleaf",
    name: "金箔",
    colors: ["#f0e0a0", "#d4b870"],
    scale: 1.0,
    price: 450,
    desc: "和纸贴上的24K金箔",
    rarity: "epic",
  },
  {
    id: "ocean",
    name: "深海",
    colors: ["#406080", "#284858"],
    scale: 1.0,
    price: 480,
    desc: "马里亚纳海沟的颜色",
    rarity: "epic",
  },
  {
    id: "amethyst",
    name: "紫晶",
    colors: ["#c8a8e8", "#a880d0"],
    scale: 1.0,
    price: 520,
    desc: "水晶洞里的紫晶簇",
    rarity: "epic",
  },
  {
    id: "forest",
    name: "苔藓",
    colors: ["#4a6848", "#305830"],
    scale: 1.0,
    price: 550,
    desc: "雨后森林的苔藓绿",
    rarity: "epic",
  },
  {
    id: "copper",
    name: "赤铜",
    colors: ["#c88060", "#a86040"],
    scale: 1.0,
    price: 600,
    desc: "老式铜器的岁月色",
    rarity: "epic",
  },
  // === 700+ 星芒 ===
  {
    id: "ink",
    name: "墨色",
    colors: ["#3a3a3a", "#1a1a1a"],
    scale: 1.0,
    price: 700,
    desc: "水墨晕染的剪影",
    rarity: "legendary",
  },
  {
    id: "nebula",
    name: "星云",
    colors: ["#8898e8", "#5068c8"],
    scale: 1.0,
    price: 800,
    desc: "猎户座星云的紫蓝",
    rarity: "legendary",
  },
  {
    id: "aurora",
    name: "极光",
    colors: ["#80e8c0", "#40b890"],
    scale: 1.0,
    price: 900,
    desc: "冰岛夜空的极光绿",
    rarity: "legendary",
  },
  {
    id: "rainbow",
    name: "彩虹",
    colors: ["#f4a8c8", "#f8d878", "#80d8f0"],
    scale: 1.05,
    price: 1200,
    desc: "雨后初晴的七色光芒",
    rarity: "legendary",
  },
  {
    id: "celestial",
    name: "天穹",
    colors: ["#f8f0e0", "#ffe8a0"],
    scale: 1.1,
    price: 1500,
    desc: "穹顶壁画的金色穹光",
    rarity: "legendary",
  },
  {
    id: "void",
    name: "虚空",
    colors: ["#1a1030", "#0a0820"],
    scale: 1.0,
    price: 2000,
    desc: "宇宙深空的虚无黑",
    rarity: "legendary",
  },
];

export const findSkin = (id: string): Skin =>
  SKINS.find((s) => s.id === id) ?? SKINS[0];

export const RARITY_COLORS: Record<Skin["rarity"], string> = {
  common: "#a8a192",
  rare: "#6080b0",
  epic: "#8060b0",
  legendary: "#c8a030",
};
