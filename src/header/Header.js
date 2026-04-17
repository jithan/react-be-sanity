import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from '../sanityClient';
import LanguageSwitcher from "../components/LanguageSwitcher";
import './Header.css';

function Header() {
  const { lang = "en" } = useParams(); // 🌐 CURRENT LANGUAGE

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
          client.fetch(`
            *[_type == "page" && showInHeaderMenu == true] 
            | order(menuOrder asc, title asc) {
              _id,
              title,
              slug,
              menuTitle
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
                  link->{
                    _type,
                    "slug": slug.current
                  }
                }
              }
            }
          `),
        ]);

        setMenuItems(menuItemsData);
        setMegaMenu(megaMenuData);
      } catch (err) {
        console.error('Error fetching menu data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // 🌐 CENTRAL ROUTING WITH LANGUAGE
  const buildUrl = (link) => {
    if (!link?.slug) return "#";

    const map = {
      Services: "services",
      Landingpage: "landing",
      page: "pages",
    };

    const base = map[link._type] || "";

    return base
      ? `/${lang}/${base}/${link.slug}`
      : `/${lang}/${link.slug}`;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobilePane('main');
    setIsMegaMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setMobilePane('main');
      return next;
    });
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to={`/${lang}`} className="nav-brand">
          Lorum Ipsum
        </Link>

        <div className={`nav-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>

          {/* ================= DESKTOP ================= */}
          <div className="desktop-nav">
            <ul className="nav-menu">

              {/* NORMAL MENU */}
              {!loading &&
                menuItems.map((item) => (
                  <li key={item._id}>
                    <Link to={`/${lang}/pages/${item.slug?.current}`}>
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
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMegaMenu();
                  }}
                >
                  {megaMenu?.title || 'Menu'}
                </button>

                {isMegaMenuOpen && megaMenu?.columns && (
                  <div className="mega-menu">
                    <div className="mega-menu-inner">

                      <div className="mega-menu-intro">
                        <h3>{megaMenu.title}</h3>
                        <p>Select a section below to browse.</p>
                      </div>

                      {megaMenu.columns.map((column) => (
                        <div key={column.title} className="mega-menu-section">
                          <h4>{column.title}</h4>

                          <ul>
                            {(column.links || []).map((link) => (
                              <li key={`${column.title}-${link.title}`}>
                                <Link to={buildUrl(link.link)}>
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>

                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </li>

              {/* ARTICLES */}
              <li>
                <Link to={`/${lang}/articles`}>Articles</Link>
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

              {/* MAIN PANEL */}
              <div className="mobile-menu-panel">
                <ul className="mobile-menu-list">

                  {!loading &&
                    menuItems.map((item) => (
                      <li key={item._id}>
                        <Link
                          to={`/${lang}/pages/${item.slug?.current}`}
                          onClick={closeMobileMenu}
                        >
                          {item.menuTitle || item.title}
                        </Link>
                      </li>
                    ))}

                  <li>
                    <button
                      className="mobile-submenu-button"
                      onClick={() => setMobilePane('mega')}
                    >
                      {megaMenu?.title || 'Menu'}
                    </button>
                  </li>

                  <li>
                    <Link to={`/${lang}/articles`} onClick={closeMobileMenu}>
                      Articles
                    </Link>
                  </li>

                </ul>

                {/* 🌐 LANGUAGE SWITCH (MOBILE) */}
                <LanguageSwitcher />
              </div>

              {/* MEGA PANEL */}
              <div className="mobile-menu-panel">

                <div className="mobile-submenu-header">
                  <button
                    className="mobile-back"
                    onClick={() => setMobilePane('main')}
                  >
                    ← Back
                  </button>
                  <h3>{megaMenu?.title || 'Menu'}</h3>
                </div>

                <div className="mobile-submenu-sections">
                  {(megaMenu?.columns || []).map((section) => (
                    <div key={section.title} className="mobile-submenu-section">

                      <h4>{section.title}</h4>

                      <ul>
                        {(section.links || []).map((link) => (
                          <li key={`${section.title}-${link.title}`}>
                            <Link
                              to={buildUrl(link.link)}
                              onClick={closeMobileMenu}
                            >
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>

                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Header;