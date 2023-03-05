import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useProduct } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const sortedSearchResults = searchResults.sort((resultA, resultB) => {
    return resultA.score - resultB.score;
  });

  const { products, getProducts } = useProduct();
  const { user } = useAuth();
  console.log('SEARCH BAR: ', user);

  useEffect(() => {
    getProducts()
  }, []);

  const searchIndex = new Fuse(products, {
    includeScore: true,
    keys: ["title"],
  });

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const results = searchIndex.search(searchQuery);
    setSearchResults(results);
  };

  const handleCloseList = () => {
    setSearchResults([]);
  };

  return (
    <div className="position-relative">
      <Form className="d-flex" id="search-bar">
      <FormControl
        type="search"
        placeholder="SEARCH..."
        aria-label="Search"
        id="search-bar-input"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button variant="success" id="search-bar-button">
        <i className="bi bi-search"></i>
      </Button>
    </Form>
    {
      sortedSearchResults.length > 0 && (
        <ol className="list-group position-absolute search-results">
          {sortedSearchResults.slice(0, 4).map(({ item }) => {
            return (
              <li
                className="list-group-item search-results-item"
                key={item.title}
              >
                <Link to={`/detail/${item._id}`} onClick={handleCloseList}>
                  <div className="d-flex w-100 justify-content-between align-items-center search-results-item-container">
                    <p className="search-results-item-title">{item.title}</p>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="search-results-item-image"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )
    }
    </div>
  );
};

export default SearchBar;
