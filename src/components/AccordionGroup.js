  import React, { useState } from "react";
  import { PortableText } from "@portabletext/react"; // ✅ import this
  import "../styles/AccordionGroup.css";

  function AccordionGroup({ items = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleItem = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <section className="accordion-group">
        {items.map((item, index) => (
          <div
            className="accordion-item"
            key={item.componentId || index}
            id={item.componentId}
          >
            
            {/* Header */}
            <button
              className={`accordion-header ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleItem(index)}
            >
              <div className="accordion-title">
                {item.icon?.asset?.url && (
                  <img
                    src={item.icon.asset.url}
                    alt={item.title}
                    className="accordion-icon"
                  />
                )}
                <span>{item.title}</span>
              </div>

              <span className="accordion-toggle">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>

            {/* Content */}
            <div
              className={`accordion-content ${
                activeIndex === index ? "open" : ""
              }`}
            >
              {/* ✅ FIX HERE */}
              {typeof item.description === "string" ? (
                <p>{item.description}</p> // fallback for old data
              ) : (
                <PortableText value={item.description} />
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }

  export default AccordionGroup;