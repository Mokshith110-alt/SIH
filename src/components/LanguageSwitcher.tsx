"use client";

import { useTranslation } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
        <Globe size={18} />
        <span className="text-xs font-medium uppercase">{lang}</span>
      </button>
      
      <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
        <div className="p-1 flex flex-col">
          <button 
            onClick={() => setLang("en")}
            className={\px-3 py-2 text-xs text-left rounded-lg transition \\}
          >
            English (EN)
          </button>
          <button 
            onClick={() => setLang("hi")}
            className={\px-3 py-2 text-xs text-left rounded-lg transition \\}
          >
            हिन्दी (HI)
          </button>
          <button 
            onClick={() => setLang("te")}
            className={\px-3 py-2 text-xs text-left rounded-lg transition \\}
          >
            తెలుగు (TE)
          </button>
        </div>
      </div>
    </div>
  );
}