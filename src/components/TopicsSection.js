// src/components/TopicsSection.jsx

import React from "react";

function TopicsSection({ mainTitle, items = [] }) {
  return (
    <section className="topics-section">
      <h2>{mainTitle}</h2>

      <div className="topics-grid">
        {items.map((item, index) => (
          <div key={index} className="topic-card">
            {item.icon?.asset?.url && (
              <img src={item.icon.asset.url} alt={item.title} />
            )}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopicsSection;