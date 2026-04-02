import React, { useState, useEffect } from "react";
import { client } from "../sanityClient";
import "../styles/SearchBlock.css";
// import { Link } from "react-router-dom";

const SearchBlock = ({
  title,
  placeholder,
  description,
  searchTypes
}) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔗 Dynamic URL builder
  const getPath = (type, slug) => {
    switch (type) {
      case "Landingpage":
        return `/landing/${slug}`;
      case "Services":
        return `/services/${slug}`;
      case "article":
        return `/articles/${slug}`;
      case "page":
        return `/pages/${slug}`;
      default:
        return `/${slug}`;
    }
  };

  // 🔍 Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔍 Fetch results
const fetchResults = async (value) => {
  setLoading(true);

  try {
    const res = await client.fetch(`*[
      _type in ["Landingpage","Services","article","page"]
    ]{
      _id,
      _type,
      title,
      excerpt,
      description,
      "bodyText": pt::text(body),
      "slug": slug.current
    }[0...50]`);

    console.log("RAW:", res);

    const filtered = res.filter((item) => {
      const text = `
        ${item.title || ""}
        ${item.excerpt || ""}
        ${item.description || ""}
        ${item.bodyText || ""}
      `.toLowerCase();

      return text.includes(value.toLowerCase());
    });

    console.log("FILTERED:", filtered);

    setResults(filtered.slice(0, 10));

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // 🔥 Highlight text
  const highlightText = (text) => {
    if (!text) return "";
    try {
      const regex = new RegExp(`(${query})`, "gi");
      return text.replace(regex, `<mark>$1</mark>`);
    } catch {
      return text;
    }
  };

  return (
    <section className="search-section">
      <div className="search-content">

        {title && <h2 className="search-title">{title}</h2>}

        {description && (
          <p className="search-description">{description}</p>
        )}

        {/* 🔍 Search Input */}
        <input
          type="text"
          className="search-input"
          placeholder={placeholder || "Search..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 🔄 Loading */}
        {loading && <p className="loading">Searching...</p>}

        <div className="search-results">

          {/* ❌ No Results */}
          {query && !loading && results.length === 0 && (
            <p className="no-results">No results found</p>
          )}

          {/* ✅ Results */}
          {results.map((item) => (
            <div key={item._id} className="search-item">

              {/* 🔖 Type */}
              <span className="type-tag">{item._type}</span>

              {/* 📝 Title */}
              <h4
                dangerouslySetInnerHTML={{
                  __html: highlightText(item.title)
                }}
              />

              {/* 📄 Description */}
              <p
                dangerouslySetInnerHTML={{
                  __html: highlightText(
                    item.excerpt || item.description || ""
                  )
                }}
              />

              {/* 🔗 Link */}
              <a
                href={getPath(item._type, item.slug)}
                className="search-link"
              >
                View
              </a>

              {/* React Router (optional) */}
              {/*
              <Link
                to={getPath(item._type, item.slug)}
                className="search-link"
              >
                View
              </Link>
              */}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default SearchBlock;