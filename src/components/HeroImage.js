import React from "react";
import { PortableText } from "@portabletext/react";
import "../styles/HeroSection.css";

// ✅ helper
const resolveField = (field, lang = "en") => {
  if (!field) return "";

  if (Array.isArray(field)) {
    const match = field.find((f) => f.language === lang);
    return match?.value || "";
  }

  if (typeof field === "object" && field.value) {
    return field.value;
  }

  return field;
};

const HeroImage = ({
  field_component_title,
  field_component_title_eyebrow,
  field_component_description,
  field_link,
  field_component_list_image_alignment,
  image_field,
  logo_service_pillar_sm,
  data_id_for_anchor_linking,
  lang = "en" // ✅ important
}) => {

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.asset?.url) return image.asset.url;

    const ref = image.asset?._ref;
    if (ref) {
      const cleaned = ref
        .replace("image-", "")
        .replace(/-([a-z]+)$/, ".$1");

      return `https://cdn.sanity.io/images/lyl5ivou/production/${cleaned}`;
    }

    return "";
  };

  const heroImage = getImageUrl(image_field);
  const logoUrl = getImageUrl(logo_service_pillar_sm);

  // ✅ FIXED
  const eyebrow = resolveField(field_component_title_eyebrow, lang);
  const title = resolveField(field_component_title, lang);
  const ctaText = resolveField(field_link?.label, lang);

  const ctaUrl = field_link?.url;
  const newTab = field_link?.openInNewTab;

  const alignment = field_component_list_image_alignment || "right";

  return (
    <section
      className={`heroimage-section hero-${alignment}`}
      id={data_id_for_anchor_linking}
    >

      <div className="hero-content">

        {logoUrl && (
          <img
            src={logoUrl}
            alt={logo_service_pillar_sm?.alt || ""}
            className="hero-logo"
          />
        )}

        {/* ✅ FIXED */}
        {eyebrow && (
          <span className="hero-eyebrow">
            {eyebrow}
          </span>
        )}

        {/* ✅ FIXED */}
        {title && (
          <h1 className="hero-title">
            {title}
          </h1>
        )}

        {field_component_description && (
          <div className="hero-description">
            <PortableText value={field_component_description} />
          </div>
        )}

        {/* ✅ FIXED */}
        {ctaText && ctaUrl && (
          <a
            href={ctaUrl}
            className="hero-cta"
            target={newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {ctaText}
          </a>
        )}

      </div>

      {heroImage && (
        <div className="hero-image">
          <img src={heroImage} alt={image_field?.alt || ""} />
        </div>
      )}

    </section>
  );
};

export default HeroImage;