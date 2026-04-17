import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveQuery } from "@sanity/preview-kit";

import { client } from "../sanityClient";
import { langMap, reverseLangMap } from "../utilis/langMap";

import Sidebar from "../components/Sidebar";
import { componentMap } from "../components/componentMapper";

import "./PageDetail.css";

// ✅ get current page
const pageQuery = `*[
  _type == "services" &&
  slug.current == $slug &&
  language == $fullLang
][0]{
  _id,
  title,
  slug,
  showTitle,
  language,
  groupId,
  components[]{...}
}`;

// ✅ get translations
const translationsQuery = `*[
  _type == "services" &&
  groupId == $groupId
]{
  title,
  "slug": slug.current,
  "language": coalesce(language, __i18n_lang)
}`;

function ServicesPageDetail() {
  const { slug, lang } = useParams();
  const navigate = useNavigate();

  const fullLang = langMap[lang] || lang;

  const [translations, setTranslations] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false); // ✅ NEW

  // 🔥 LIVE QUERY
  const [page, loading] = useLiveQuery(
    null,
    pageQuery,
    { slug, fullLang }
  );
useEffect(() => {
  if (page?.title) {
    document.title = page.title;
  }
}, [page]);
  // ✅ Detect route change (language switch / slug change)
  useEffect(() => {
    setIsNavigating(true);
  }, [slug, lang]);

  // ✅ Stop loader when page data arrives
  useEffect(() => {
    if (page) {
      setIsNavigating(false);
    }
  }, [page]);

  // ✅ FIXED: fetch translations correctly
  useEffect(() => {
    if (!page?.groupId) return;

    client
      .fetch(translationsQuery, { groupId: page.groupId })
      .then((res) => setTranslations(res || []))
      .catch(console.error);
  }, [page?.groupId]);

  // ❌ no page found
  if (!page && !loading) {
    return (
      <div className="no-page">
        <h3>No page found</h3>
        <p>{slug}</p>

        <button onClick={() => navigate(`/en/services/${slug}`)}>
          Go English
        </button>
      </div>
    );
  }

  return (
    <div className="services-layout">

      {/* Sidebar */}
      <Sidebar
        currentLang={reverseLangMap[page?.language] || "en"}
        translations={translations}
      />

      <div className="services-content">

        {/* Title */}
        {page?.showTitle === true && (
          <h1 className="page-title">{page?.title}</h1>
        )}

        {/* ✅ Loader (combined) */}
        {(loading || isNavigating) && (
          <div className="page-loader overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* Content */}
        <div className={(loading || isNavigating) ? "content loading" : "content"}>
          {page?.components?.map((comp, i) => {
            const Component = componentMap[comp._type];
            const key = comp._key || i;

            if (!Component) return null;

            return <Component key={key} {...comp} />;
          })}
        </div>

      </div>
    </div>
  );
}

export default ServicesPageDetail;