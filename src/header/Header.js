import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import LanguageSwitcher from "../components/LanguageSwitcher";
import './Header.css';

function Header() {

  const [menuItems, setMenuItems] = useState([]);
  const [megaMenu, setMegaMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState('main');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const [menuItemsData, megaMenuData] = await Promise.all([

          // ✅ FIXED MENU QUERY (HOME INCLUDED)
          client.fetch(`
            *[
              _type == "page" &&
              showInHeaderMenu == true
            ]
            | order(menuOrder asc, title asc) {
              _id,
              title,
              slug,
              menuTitle,
              languageIndependent
            }
          `),

          client.fetch(`
            *[_type == "megaMenu"][0] {
              title,
              columns[] {
                title,
                links[] {
                  icon,
                  title,
                  description,
                  linkType,

                  internalLink->{
                    _type,
                    "slug": slug.current
                  },

                  externalLink,
                  target
                }
              }
            }
          `),
        ]);

        setMenuItems(menuItemsData);
        setMegaMenu(megaMenuData);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // ================= PAGE URL =================
  const buildPageUrl = (item) => {
    if (!item?.slug?.current) return "#";

    const slug = item.slug.current;

    if (slug === "home") return "/";

    if (item.languageIndependent) {
      return `/${slug}`;
    }

    return `/pages/${slug}`;
  };

  // ================= MEGA MENU URL =================
  const buildMegaUrl = (item) => {
    if (!item) return "#";

    if (item.linkType === "internal") {
      const slug = item.internalLink?.slug;
      const type = item.internalLink?._type;

      if (!slug) return "#";

      const map = {
        services: "services",
        landingpage: "landing",
        page: "pages",
      };

      const base = map[type] || "";

      return base ? `/${base}/${slug}` : `/${slug}`;
    }

    if (item.linkType === "external") {
      return item.externalLink || "#";
    }

    return "#";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobilePane('main');
    setIsMegaMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="nav-brand">
          LifeSecure
        </Link>

        <div className={`nav-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>

          {/* ================= DESKTOP ================= */}
          <div className="desktop-nav">
            <ul className="nav-menu">

              {/* ✅ FIXED: NO FILTER REMOVAL */}
              {!loading &&
                menuItems.map((item) => (
                  <li key={item._id}>
                    <Link to={buildPageUrl(item)}>
                      {item.menuTitle || item.title}
                    </Link>
                  </li>
                ))}

              {/* MEGA MENU */}
              <li
                className="mega-menu-item"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button
                  className="mega-menu-trigger"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                >
                  {megaMenu?.title || 'Menu'}
                </button>

                {isMegaMenuOpen && megaMenu?.columns && (
                  <div className="mega-menu">
                    <div className="mega-menu-inner">

                      <div className="mega-menu-intro">
                        <h3>{megaMenu.title}</h3>
                        <p>Browse categories</p>
                      </div>

                      {megaMenu.columns.map((column) => (
                        <div key={column.title} className="mega-menu-section">

                          <h4>{column.title}</h4>

                          <ul>
                            {(column.links || []).map((item) => (
                              <li key={item.title}>

                                {item.linkType === "external" ? (
                                  <a
                                    href={item.externalLink}
                                    target={item.target || "_self"}
                                  >
                                    {item.title}
                                  </a>
                                ) : (
                                  <Link to={buildMegaUrl(item)}>
                                    {item.title}
                                  </Link>
                                )}

                              </li>
                            ))}
                          </ul>

                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </li>

              <li>
                <Link to="/articles">Articles</Link>
              </li>

            </ul>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="mobile-nav">

            <div
              className="mobile-menu-slider"
              style={{
                transform:
                  mobilePane === 'main'
                    ? 'translateX(0)'
                    : 'translateX(-100%)',
              }}
            >

              {/* MAIN */}
              <div className="mobile-menu-panel">

                <ul className="mobile-menu-list">

                  {!loading &&
                    menuItems.map((item) => (
                      <li key={item._id}>
                        <Link
                          to={buildPageUrl(item)}
                          onClick={closeMobileMenu}
                        >
                          {item.menuTitle || item.title}
                        </Link>
                      </li>
                    ))}

                  <li>
                    <button onClick={() => setMobilePane('mega')}>
                      {megaMenu?.title || 'Menu'}
                    </button>
                  </li>

                  <li>
                    <Link to="/articles" onClick={closeMobileMenu}>
                      Articles
                    </Link>
                  </li>

                </ul>

                <LanguageSwitcher />

              </div>

              {/* MEGA */}
              <div className="mobile-menu-panel">

                <button onClick={() => setMobilePane('main')}>
                  ← Back
                </button>

                <h3>{megaMenu?.title}</h3>

                {(megaMenu?.columns || []).map((section) => (
                  <div key={section.title}>
                    <h4>{section.title}</h4>

                    <ul>
                      {(section.links || []).map((item) => (
                        <li key={item.title}>

                          {item.linkType === "external" ? (
                            <a href={item.externalLink}>
                              {item.title}
                            </a>
                          ) : (
                            <Link to={buildMegaUrl(item)}>
                              {item.title}
                            </Link>
                          )}

                        </li>
                      ))}
                    </ul>

                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Header;