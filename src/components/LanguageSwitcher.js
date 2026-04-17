import { useNavigate } from "react-router-dom";
import { reverseLangMap } from "../utilis/langMap";

function LanguageSwitcher({ currentLang, translations }) {
  const navigate = useNavigate();

  const changeLanguage = (newLang) => {
    if (newLang === currentLang) return;

    const match = translations.find((t) => {
      const short = reverseLangMap[t.language];
      return short === newLang;
    });

    if (!match || !match.slug) {
      console.warn("❌ Translation not found:", newLang, translations);
      return;
    }

    navigate(`/${newLang}/services/${match.slug}`);
  };

  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${currentLang === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>

      <button
        className={`lang-btn ${currentLang === "de" ? "active" : ""}`}
        onClick={() => changeLanguage("de")}
      >
        DE
      </button>
    </div>
  );
}

export default LanguageSwitcher;