import React, { useState } from "react";
import { client } from "../sanityClient";
import "../styles/SearchBlock.css";

const SearchBlock = ({
  title,
  placeholder,
  description,
  searchTypes
}) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    const queryStr = `*[_type in $types && (
      title match $search ||
      excerpt match $search
    )]{
      _id,
      title,
      excerpt,
      "slug": slug.current
    }[0...10]`;

    const res = await client.fetch(queryStr, {
      types: searchTypes?.length ? searchTypes : ["Services"],
      search: `*${value}*`
    });

    setResults(res);
  };

  return (
    <section className="search-section">

      <div className="search-content">

        {title && <h2 className="search-title">{title}</h2>}

        {description && (
          <p className="search-description">{description}</p>
        )}

        <input
          type="text"
          className="search-input"
          placeholder={placeholder || "Search..."}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="search-results">

          {query && results.length === 0 && (
            <p className="no-results">No results found</p>
          )}

          {results.map((item) => (
            <div key={item._id} className="search-item">
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
              <a href={`/${item.slug}`} className="search-link">
                View
              </a>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default SearchBlock;