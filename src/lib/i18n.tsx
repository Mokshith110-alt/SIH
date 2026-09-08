"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "te" | "hi";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.support": "Customer Care",
    "nav.profile": "Profile",
    "btn.create": "Create Request",
    "btn.login": "Log In",
    "hero.title": "Local Services, Cooperative Power",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.services": "సేవలు",
    "nav.support": "కస్టమర్ కేర్",
    "nav.profile": "ప్రొఫైల్",
    "btn.create": "అభ్యర్థనను సృష్టించండి",
    "btn.login": "లాగిన్",
    "hero.title": "స్థానిక సేవలు, సహకార శక్తి",
  },
  hi: {
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.support": "ग्राहक सेवा",
    "nav.profile": "प्रोफ़ाइल",
    "btn.create": "अनुरोध बनाएं",
    "btn.login": "लॉग इन",
    "hero.title": "स्थानीय सेवाएं, सहकारी शक्ति",
  }
};

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);