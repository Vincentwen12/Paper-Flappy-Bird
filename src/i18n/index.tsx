import { createContext, useContext, useCallback, useMemo } from "react";
import { useProfileStore } from "@/store/profileStore";
import type { Lang, Translations } from "./translations";
import { buildTranslations, SKIN_NAMES, SKIN_DESCS, THEME_NAMES, THEME_DESCS, EQUIP_NAMES, EQUIP_DESCS, TASK_TITLES, TASK_DESCS, POWERUP_NAMES, POWERUP_DESCS, LANG_LABELS } from "./translations";

export type { Lang };
export { LANG_LABELS };

interface I18nContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  // 数据翻译辅助函数
  skinName: (id: string) => string;
  skinDesc: (id: string) => string;
  themeName: (id: string) => string;
  themeDesc: (id: string) => string;
  equipName: (id: string) => string;
  equipDesc: (id: string) => string;
  taskTitle: (id: string) => string;
  taskDesc: (id: string) => string;
  powerUpName: (id: string) => string;
  powerUpDesc: (id: string) => string;
  rarityLabel: (r: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const lang = useProfileStore((s) => s.profile.settings.language as Lang);
  const setLangProfile = useProfileStore((s) => s.setSetting);

  const setLang = useCallback(
    (l: Lang) => {
      setLangProfile("language", l as never);
    },
    [setLangProfile],
  );

  const value = useMemo<I18nContextValue>(() => {
    const t = buildTranslations(lang);
    return {
      lang,
      t,
      setLang,
      skinName: (id: string) => SKIN_NAMES[id]?.[lang] ?? id,
      skinDesc: (id: string) => SKIN_DESCS[id]?.[lang] ?? "",
      themeName: (id: string) => THEME_NAMES[id]?.[lang] ?? id,
      themeDesc: (id: string) => THEME_DESCS[id]?.[lang] ?? "",
      equipName: (id: string) => EQUIP_NAMES[id]?.[lang] ?? id,
      equipDesc: (id: string) => EQUIP_DESCS[id]?.[lang] ?? "",
      taskTitle: (id: string) => TASK_TITLES[id]?.[lang] ?? id,
      taskDesc: (id: string) => TASK_DESCS[id]?.[lang] ?? "",
      powerUpName: (id: string) => POWERUP_NAMES[id]?.[lang] ?? id,
      powerUpDesc: (id: string) => POWERUP_DESCS[id]?.[lang] ?? "",
      rarityLabel: (r: string) => {
        const map: Record<string, Record<Lang, string>> = {
          common: { zh: "普通", en: "Common", ja: "普通", ko: "일반", es: "Común", fr: "Commun", ru: "Обычный", de: "Gewöhnlich" },
          rare: { zh: "稀有", en: "Rare", ja: "レア", ko: "희귀", es: "Raro", fr: "Rare", ru: "Редкий", de: "Selten" },
          epic: { zh: "史诗", en: "Epic", ja: "エピック", ko: "에픽", es: "Épico", fr: "Épique", ru: "Эпический", de: "Episch" },
          legendary: { zh: "传说", en: "Legendary", ja: "レジェンド", ko: "전설", es: "Legendario", fr: "Légendaire", ru: "Легендарный", de: "Legendär" },
        };
        return map[r]?.[lang] ?? r;
      },
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}