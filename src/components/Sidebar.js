import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../sanityClient";
import { iconMap } from "../icons";
import LanguageSwitcher from "./LanguageSwitcher";

import "../styles/Sidebar.css";

const sidebarQuery = `*[_type == "sidebar"][0]{
  title,
  sections[]{
    heading,
    links[]{
      label,
      url,
      icon
    }
  },
  footerLinks[]{
    label,
    url,
    icon
  }
}`;

function Sidebar({ currentLang, translations }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    client.fetch(sidebarQuery).then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-header">
        <div className="logo-box"></div>
        <h2>{data.title}</h2>
      </div>

      {/* ✅ LANGUAGE SWITCHER (ONLY IF MULTI LANG) */}
      {translations && translations.length > 1 && (
        <div className="sidebar-lang">
          <LanguageSwitcher
            currentLang={currentLang}
            translations={translations}
          />
        </div>
      )}

      {/* SECTIONS */}
      {data.sections?.map((section, i) => (
        <div className="sidebar-section" key={i}>
          <p className="sidebar-heading">{section.heading}</p>

          {section.links?.map((link, j) => {
            const Icon = iconMap[link.icon];

            return (
              <Link to={link.url || "#"} key={j} className="sidebar-item">
                {Icon && <Icon size={18} />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {/* FOOTER */}
      <div className="sidebar-footer">
        {data.footerLinks?.map((link, i) => {
          const Icon = iconMap[link.icon];

          return (
            <Link to={link.url || "#"} key={i} className="sidebar-item settings">
              {Icon && <Icon size={18} />}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

    </aside>
  );
}

export default Sidebar;