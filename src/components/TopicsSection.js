import React from "react";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../lib/sanityImage";

function TopicsSection({ mainTitle, items = [] }) {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (!link) return;

    // Internal link
    if (link.startsWith("/")) {
      navigate(link);
    } else {
      // External link
      window.open(link, "_blank");
    }
  };

  return (
    <section className="topics-section">
      <h2>{mainTitle}</h2>

      <div className="topics-grid">
        {items.map((item, index) => {
          const imageUrl = item?.icon
            ? urlFor(item.icon).width(80).height(80).fit("max").url()
            : null;

          return (
            <div
              key={index}
              className={`topic-card ${item?.link ? "clickable" : ""}`}
              onClick={() => handleClick(item?.link)}
            >
              {imageUrl && (
                <img src={imageUrl} alt={item.title} />
              )}

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TopicsSection;