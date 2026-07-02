// 装备系统：尾迹 / 护盾 / 配饰
export type EquipmentKind = "trail" | "shield" | "accessory";

export interface Equipment {
  id: string;
  kind: EquipmentKind;
  name: string;
  price: number;
  desc: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  // 尾迹颜色列表
  colors?: string[];
  // 护盾特效色
  shieldColor?: string;
  // 配饰图标描述
  icon?: string;
}

export const EQUIPMENT: Equipment[] = [
  // === 尾迹 ===
  {
    id: "trail-basic",
    kind: "trail",
    name: "素色纸屑",
    price: 0,
    desc: "最朴素的纸屑尾迹",
    rarity: "common",
    colors: ["#fafaf7", "#e8e3d6"],
  },
  {
    id: "trail-sakura",
    kind: "trail",
    name: "樱花瓣",
    price: 200,
    desc: "飞舞的樱花花瓣尾迹",
    rarity: "common",
    colors: ["#f4d4d8", "#e8b4b8", "#f8d0e0"],
  },
  {
    id: "trail-stardust",
    kind: "trail",
    name: "星尘",
    price: 350,
    desc: "闪烁的星光尾迹",
    rarity: "rare",
    colors: ["#ffe8a0", "#ffdd99", "#fff8e0"],
  },
  {
    id: "trail-aurora",
    kind: "trail",
    name: "极光之尘",
    price: 500,
    desc: "变幻的极光色尾迹",
    rarity: "epic",
    colors: ["#80e8c0", "#40b890", "#80d8f0", "#c0e8ff"],
  },
  {
    id: "trail-ember",
    kind: "trail",
    name: "余烬",
    price: 400,
    desc: "燃烧的余烬尾迹",
    rarity: "rare",
    colors: ["#f0a060", "#e88040", "#ffcc80"],
  },
  {
    id: "trail-rainbow",
    kind: "trail",
    name: "彩虹轨迹",
    price: 800,
    desc: "七色流转的尾迹",
    rarity: "legendary",
    colors: ["#f4a8c8", "#f8d878", "#80d8f0", "#a8e8a0", "#c8a8e8"],
  },
  {
    id: "trail-void",
    kind: "trail",
    name: "虚空裂痕",
    price: 1000,
    desc: "暗紫色的虚空尾迹",
    rarity: "legendary",
    colors: ["#8080c0", "#4020a0", "#180840"],
  },
  {
    id: "trail-gold",
    kind: "trail",
    name: "金粉飘落",
    price: 600,
    desc: "华贵的金粉尾迹",
    rarity: "epic",
    colors: ["#f0e0a0", "#d4b870", "#ffe8c0"],
  },

  // === 护盾 ===
  {
    id: "shield-paper",
    kind: "shield",
    name: "纸盾",
    price: 0,
    desc: "最基础的和纸护盾",
    rarity: "common",
    shieldColor: "#fafaf7",
  },
  {
    id: "shield-bamboo",
    kind: "shield",
    name: "竹编盾",
    price: 300,
    desc: "竹编纹理的护盾",
    rarity: "common",
    shieldColor: "#a8c098",
  },
  {
    id: "shield-crystal",
    kind: "shield",
    name: "水晶盾",
    price: 500,
    desc: "透明的水晶护盾",
    rarity: "rare",
    shieldColor: "#c0e0f0",
  },
  {
    id: "shield-flame",
    kind: "shield",
    name: "火焰盾",
    price: 600,
    desc: "燃烧的火焰护盾",
    rarity: "epic",
    shieldColor: "#f0a060",
  },
  {
    id: "shield-ice",
    kind: "shield",
    name: "冰霜盾",
    price: 550,
    desc: "寒气逼人的冰盾",
    rarity: "epic",
    shieldColor: "#c0e8f8",
  },
  {
    id: "shield-celestial",
    kind: "shield",
    name: "天穹之盾",
    price: 900,
    desc: "穹顶壁画的金色护盾",
    rarity: "legendary",
    shieldColor: "#f0e0a0",
  },
  {
    id: "shield-nebula",
    kind: "shield",
    name: "星云盾",
    price: 1200,
    desc: "星云漩涡般的护盾",
    rarity: "legendary",
    shieldColor: "#8898e8",
  },

  // === 配饰 ===
  {
    id: "acc-none",
    kind: "accessory",
    name: "无配饰",
    price: 0,
    desc: "素净的纸鸟本色",
    rarity: "common",
    icon: "circle",
  },
  {
    id: "acc-ribbon",
    kind: "accessory",
    name: "蝴蝶结",
    price: 150,
    desc: "头顶的红色蝴蝶结",
    rarity: "common",
    icon: "ribbon",
  },
  {
    id: "acc-tophat",
    kind: "accessory",
    name: "小礼帽",
    price: 250,
    desc: "一顶精致的纸礼帽",
    rarity: "rare",
    icon: "hat",
  },
  {
    id: "acc-glasses",
    kind: "accessory",
    name: "圆框眼镜",
    price: 200,
    desc: "学者风的圆框眼镜",
    rarity: "common",
    icon: "glasses",
  },
  {
    id: "acc-crown",
    kind: "accessory",
    name: "纸王冠",
    price: 500,
    desc: "金箔贴面的纸王冠",
    rarity: "epic",
    icon: "crown",
  },
  {
    id: "acc-scarf",
    kind: "accessory",
    name: "围巾",
    price: 300,
    desc: "冬日暖和的纸围巾",
    rarity: "rare",
    icon: "scarf",
  },
  {
    id: "acc-halo",
    kind: "accessory",
    name: "光环",
    price: 700,
    desc: "圣洁的环形光环",
    rarity: "epic",
    icon: "halo",
  },
  {
    id: "acc-horns",
    kind: "accessory",
    name: "小角",
    price: 450,
    desc: "俏皮的小恶魔角",
    rarity: "rare",
    icon: "horns",
  },
  {
    id: "acc-mask",
    kind: "accessory",
    name: "狐面",
    price: 600,
    desc: "祭典的狐面面具",
    rarity: "epic",
    icon: "mask",
  },
  {
    id: "acc-angel",
    kind: "accessory",
    name: "天使之翼",
    price: 1000,
    desc: "纯白的天使翅膀",
    rarity: "legendary",
    icon: "wings",
  },
];

export const findEquipment = (id: string): Equipment =>
  EQUIPMENT.find((e) => e.id === id) ?? EQUIPMENT[0];

export const RARITY_COLORS_EQUIP: Record<string, string> = {
  common: "#a8a192",
  rare: "#6080b0",
  epic: "#8060b0",
  legendary: "#c8a030",
};