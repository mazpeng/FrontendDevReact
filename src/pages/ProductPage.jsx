import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import "../pages/global.css";
import { useNavigate } from "react-router-dom";
import Rating from "../components/rating";

function ProductPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = data;

    if (minPrice && maxPrice) {
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    } else if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    } else if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOption === "1") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "2") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortOption("");
    setSelectedCategory("");
    setFilteredData(data);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  const handleLearnMore = (productId) => {
    localStorage.setItem("productId", productId.toString());
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <div>
        <>
          <div className="filter-container">
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Minimum Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Maximum Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="input-select">
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort Option</option>
                <option value="1">Low to High</option>
                <option value="2">High to Low</option>
              </select>

              <select
                className="form-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-selection">
              <button className="btn btn-primary" onClick={handleFilter}>
                Filter
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </>
        <div className="card-container">
          {isLoading ? (
            <div className="spinner-container">
              <Spinner animation="border" />
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((product) => (
              <Card
                style={{ width: "18rem" }}
                key={product.id}
                className="product-card"
              >
                <Card.Img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "150px",
                    height: "170px",
                    objectFit: "contain",
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    {truncateDescription(product.title, 50)}
                  </Card.Title>
                </Card.Body>
                <Card.Text style={{ textAlign: "left" }}>
                  <div className="rating">
                    <Rating value={product.rating} />
                  </div>
                  <strong>Price: ${product.price}</strong>
                </Card.Text>

                <Button
                  className="btn-card"
                  variant="primary"
                  onClick={() => handleLearnMore(product.id)}
                >
                  LEARN MORE
                </Button>
              </Card>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
