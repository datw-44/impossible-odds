import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Lang, t } from "./translations";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ja",
  toggleLang: () => {},
  t: (path: string) => path,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("impossible-odds-lang");
    if (saved === "en" || saved === "ja") return saved;
    return navigator.language.startsWith("ja") ? "ja" : "en";
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "ja" ? "en" : "ja";
      localStorage.setItem("impossible-odds-lang", next);
      return next;
    });
  }, []);

  const translate = useCallback((path: string) => t(lang, path), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
