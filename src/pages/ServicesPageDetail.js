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
import "./PageDetail.css";

const servicesPageQuery = `*[_type == "Services" && slug.current == $slug][0]{
  _id,
  title,
  slug,
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
  let { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) slug = "services"; // default fallback

  const [initialData, setInitialData] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchPage = async () => {
      const data = await client.fetch(servicesPageQuery, { slug });
      if (cancelled) return;
      setInitialData(data);
      setLoadingInitial(false);
    };

    fetchPage().catch(() => {
      if (!cancelled) {
        setInitialData(null);
        setLoadingInitial(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const [page, loadingLive] = useLiveQuery(initialData, servicesPageQuery, { slug });
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
        return <SearchBlock key={index} {...component} />;

      case "topicsSection":
        return <TopicsSection key={key} {...component} />;

      default:
        return null;
    }
  };

  return (
    <div className="page-detail-container services">
      <article className="page-detail">
        <div className="page-content">
          {page.components?.map((comp, i) => renderComponent(comp, i))}
        </div>
      </article>
    </div>
  );
}

export default ServicesPageDetail;
