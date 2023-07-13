import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../pages/global.css";
import { useNavigate } from "react-router-dom";
import Rating from "../components/rating";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Mengurutkan produk berdasarkan harga
        const sortedProducts = data.sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  const handleLearnMore = (productId) => {
    localStorage.setItem("productId", productId.toString());
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <div className="title-deals">
        <h1>
          "Dapatkan Penawaran Terbaik di Produk Today Deals! Harga Spesial Hari
          Ini!"
        </h1>
      </div>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
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
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
