import React from "react";
import CustomImage from "./CustomImage";
import HTMLBlock from "./HTMLBlock";
import LinkComponent from "./LinkComponent";
import "../styles/TwoColumn.css";

// ✅ map inner components
const innerMap = {
  CustomImage: CustomImage,
  htmlBlock: HTMLBlock,
  link: LinkComponent,
};

function TwoColumn({
  left,
  right,
  layout = "50-50",
  verticalAlign = "start",
  reverseOnMobile = false,
}) {

  // ✅ render nested items
  const renderItems = (items) => {
    return items?.map((item, i) => {
      const Component = innerMap[item._type];

      if (!Component) {
        console.warn("Missing inner component:", item._type);
        return null;
      }

      return <Component key={i} {...item} />;
    });
  };

  return (
    <section
      className={`two-column layout-${layout} align-${verticalAlign} ${
        reverseOnMobile ? "reverse-mobile" : ""
      }`}
    >
      <div className="column left">
        {renderItems(left)}
      </div>

      <div className="column right">
        {renderItems(right)}
      </div>
    </section>
  );
}

export default TwoColumn;