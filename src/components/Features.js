import React from "react";
import "../styles/FeaturesSection.css";

const FeaturesSection = ({
  title,
  subtitle,
  features = [],
  columns = 3,
  anchorId,
}) => {
  // ✅ SAFE IMAGE HANDLER (Sanity compatible)
  const getImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") return image;

    // If GROQ already gives full URL
    if (image?.asset?.url) return image.asset.url;

    // If only asset ref exists (_ref)
    if (image?.asset?._ref) {
      const ref = image.asset._ref;

      // Example: image-abc123-800x600-jpg
      const parts = ref.split("-");
      const id = parts[1];
      const size = parts[2];
      const format = parts[3];

      const projectId = "lyl5ivou"; // 👈 your sanity project id
      const dataset = "production"; // 👈 your dataset

      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${size}.${format}`;
    }

    return "";
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns || 3}, 1fr)`,
  };

  return (
    <section
      id={anchorId || ""}
      className="features-section"
    >
      {/* Title */}
      {title && <h2 className="features-title">{title}</h2>}

      {/* Subtitle */}
      {subtitle && (
        <p className="features-subtitle">{subtitle}</p>
      )}

      {/* Grid */}
      <div className="features-grid" style={gridStyle}>
        {(features || []).map((f, idx) => {
          const imageUrl = getImageUrl(f.image);

          return (
            <div key={idx} className="feature-item">

              {/* Icon */}
              {f.icon && (
                <div className="feature-icon">
                  {f.icon}
                </div>
              )}

              {/* Image */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={f.title || "feature"}
                  className="feature-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              {/* Title */}
              {f.title && (
                <h3 className="feature-item-title">
                  {f.title}
                </h3>
              )}

              {/* Description */}
              {f.description && (
                <p className="feature-item-desc">
                  {f.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;