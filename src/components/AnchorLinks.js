import React, { useEffect, useState, useMemo } from "react";
import "../styles/AnchorLinks.css";

const AnchorLinks = ({ items }) => {
  // ✅ helper: safely extract value
  const getText = (val) => {
    if (!val) return "";

    // if already string
    if (typeof val === "string") return val;

    // if Sanity localized object
    if (typeof val === "object" && "value" in val) {
      return val.value || "";
    }

    return "";
  };

  // ✅ sanitize items
  const safeItems = useMemo(() => {
    if (!Array.isArray(items)) return [];

    return items.map((item) => ({
      ...item,
      linkText: getText(item.linkText),
      componentId: item.componentId || "",
    }));
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const foundIndex = safeItems.findIndex(
      (item) => item.componentId === hash
    );

    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [safeItems]);

  if (!safeItems.length) return null;

  const scrollToSection = (componentId, index) => {
    const element = document.querySelector(componentId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveIndex(index);

      // ✅ clean URL update
      window.history.replaceState(null, "", componentId);
    }
  };

  return (
    <nav className="anchor-links">
      <div className="anchor-links-container">
        {safeItems.map((item, index) => (
          <button
            key={item.componentId || index}
            className={`anchor-link-item ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => scrollToSection(item.componentId, index)}
            type="button"
          >
            {item.linkText}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AnchorLinks;