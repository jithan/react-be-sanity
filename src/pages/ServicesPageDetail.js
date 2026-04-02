import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveQuery } from "@sanity/preview-kit";
import { client } from "../sanityClient";

import HeroImage from "../components/HeroImage";
import AnchorLinks from "../components/AnchorLinks";
import FullwidthImage from "../components/FullwidthImage";
import SpotlightContentService from "../components/SpotlightContentService";
import TwoColumn from "../components/TwoColumn";
import TopicsSection from "../components/TopicsSection";
import AccordionGroup from "../components/AccordionGroup";
import SearchBlock from "../components/SearchBlock";
import Sidebar from "../components/Sidebar";

import "./PageDetail.css";

// ✅ Updated Query with language support
const servicesPageQuery = `*[_type == "Services" 
  && slug.current == $slug 
  && language == $lang][0]{
  _id,
  title,
  slug,
  language,
  translationGroupId,
  publishedAt,
  excerpt,
  components[]{
    ...,
    field_link{ label, url, openInNewTab },
    image_field{ asset->{url}, alt },
    logo_service_pillar_sm{ asset->{url}, alt },
    image_full_width{ asset->{url}, alt },
    image{ asset->{url}, alt },
    logo_or_service_pillar{ asset->{url}, alt },
    link{ label, url, openInNewTab },
    left_section[]{ ..., image{ asset->{url}, alt } },
    right_section[]{ ..., image{ asset->{url}, alt } },
    items[]{
      ...,
      icon{ asset->{url} }
    }
  }
}`;

function ServicesPageDetail() {
  let { slug, lang } = useParams();
  const navigate = useNavigate();

  // ✅ Default fallback
  if (!slug) slug = "services";
  if (!lang) lang = "en";

  const [initialData, setInitialData] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchPage = async () => {
      try {
        const data = await client.fetch(servicesPageQuery, { slug, lang });

        // 🔥 Fallback to English if translation missing
        if (!data && lang !== "en") {
          navigate(`/en/services/${slug}`);
          return;
        }

        if (!cancelled) {
          setInitialData(data);
          setLoadingInitial(false);
        }
      } catch (err) {
        if (!cancelled) {
          setInitialData(null);
          setLoadingInitial(false);
        }
      }
    };

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [slug, lang, navigate]);

  // ✅ Live preview support
  const [page, loadingLive] = useLiveQuery(
    initialData,
    servicesPageQuery,
    { slug, lang }
  );

  const loading = loadingInitial || loadingLive;

  if (loading) return <div>Loading...</div>;

  if (!page) {
    return (
      <div>
        <p>Services page not found</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  // 🔁 Language Switch
  const changeLanguage = (newLang) => {
    navigate(`/${newLang}/services/${slug}`);
  };

  // 🔧 Component Renderer
  const renderComponent = (component, index) => {
    const key = component?._key || `${component?._type}-${index}`;

    switch (component?._type) {
      case "Heroimage":
        return <HeroImage key={key} {...component} />;

      case "Anchor_links":
        return <AnchorLinks key={key} {...component} />;

      case "FullwidthImage":
        return <FullwidthImage key={key} {...component} />;

      case "SpotlightContentService":
        return <SpotlightContentService key={key} {...component} />;

      case "accordionGroup":
        return <AccordionGroup key={key} {...component} />;

      case "TwoColumn":
        return <TwoColumn key={key} {...component} />;

      case "searchBlock":
        return <SearchBlock key={key} {...component} />;

      case "topicsSection":
        return <TopicsSection key={key} {...component} />;

      default:
        return null;
    }
  };

  return (
    <div className="services-layout">

      {/* 🌐 Language Switcher */}
      <div className="lang-switcher">
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("ta")}>TA</button>
        <button onClick={() => changeLanguage("hi")}>HI</button>
      </div>

      {/* LEFT SIDEBAR */}
      <Sidebar currentLang={lang} />

      {/* RIGHT CONTENT */}
      <div className="services-content">
        {page.components?.map((comp, i) => renderComponent(comp, i))}
      </div>

    </div>
  );
}

export default ServicesPageDetail;