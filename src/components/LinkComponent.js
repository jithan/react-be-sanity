import React from "react";
import { Link } from "react-router-dom";
import "../styles/Link.css";

const LinkComponent = ({ label, url, openInNewTab }) => {
  if (!label || !url) return null;

  const isExternal =
    url.startsWith("http") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:");

  const content = (
    <>
      <span>{label}</span>
      <span className="arrow">→</span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={url}
        className="custom-link-btn"
        target={openInNewTab ? "_blank" : "_self"}
        rel={openInNewTab ? "noopener noreferrer" : ""}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={url} className="custom-link-btn">
      {content}
    </Link>
  );
};

export default LinkComponent;