import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveQuery } from "@sanity/preview-kit";
import { client } from "../sanityClient";

import HeroImage from "../components/HeroImage";
import AnchorLinks from "../components/AnchorLinks";
import FullwidthImage from "../components/FullwidthImage";
import SpotlightContentService from "../components/SpotlightContentService";
import TwoColumn from "../components/TwoColumn";
import Features from "../components/Features";
import ContactCallout from "../components/ContactCallout"; // ✅ ADDED

import "./PageDetail.css";

const landingPageQuery = `*[
  _type == "landingpage" &&
  slug.current == $slug &&
  isPublished == true
][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  components[]{
    ...,
    field_link{ label, url, openInNewTab },
    image_field{ asset->{url}, alt },
    image_full_width{ asset->{url}, alt },
    image{ asset->{url}, alt },
    link{ label, url, openInNewTab },
    left_section[]{ ..., image{ asset->{url}, alt } },
    right_section[]{ ..., image{ asset->{url}, alt } }
  }
}`;

function LandingPageDetail() {
  let { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) slug = "home";

  const [initialData, setInitialData] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchLandingPage = async () => {
      const data = await client.fetch(landingPageQuery, { slug });
      if (cancelled) return;

      setInitialData(data);
      setLoadingInitial(false);
    };

    fetchLandingPage().catch(() => {
      if (!cancelled) {
        setInitialData(null);
        setLoadingInitial(false);
      }
    });

    const interval = setInterval(() => {
      fetchLandingPage().catch(() => {});
    }, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [slug]);

  const [page, loadingLive] = useLiveQuery(
    initialData,
    landingPageQuery,
    { slug }
  );

  const loading = loadingInitial || loadingLive;

  useEffect(() => {
    if (page?.title) {
      document.title = page.title;
    }
  }, [page]);

  if (loading) return <div className="loading">Loading page...</div>;

  if (!page) {
    return (
      <div className="error">
        <p>Landing page not found</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  // ✅ COMPONENT RENDERER (ALL FIXED)
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

      case "TwoColumn":
        return <TwoColumn key={key} {...component} />;

      case "features":
        return <Features key={key} {...component} />;

      case "contactCallout": // ✅ FIXED
        return <ContactCallout key={key} {...component} />;

      default:
        return null;
    }
  };

  return (
    <div className="page-detail-container landingpage">
      <article className="page-detail">
        <div className="page-content">
          {page.components?.map((component, index) =>
            renderComponent(component, index)
          )}
        </div>
      </article>
    </div>
  );
}

export default LandingPageDetail;