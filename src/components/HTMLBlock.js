import React from "react";
import { PortableText } from "@portabletext/react";
import "../styles/HTMLBlock.css";

const HTMLBlock = ({
  title,
  tag, // ✅ NEW
  format,
  contentRich,
  contentHtml,
  anchorId
}) => {
  return (
    <section className="html-block" id={anchorId}>
      
      {/* 🏷️ Tag / Badge */}
      {tag?.text && (
        <div className={`html-block-tag tag--${tag.style || "default"}`}>
          {tag.icon && <span className="tag-icon">{tag.icon}</span>}
          <span className="tag-text">{tag.text}</span>
        </div>
      )}

      {/* 📝 Title */}
      {title && <h2 className="html-block-title">{title}</h2>}

      <div className="html-block-content">

        {format === "rich" && contentRich && (
          <PortableText value={contentRich} />
        )}

        {format === "html" && contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        )}

      </div>

    </section>
  );
};

export default HTMLBlock;