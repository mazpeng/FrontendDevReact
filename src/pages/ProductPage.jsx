import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../pages/global.css";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
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
    <div>
      <div className="card-container">
        {data.length > 0 ? (
          data.map((product) => (
            <Card
              style={{ width: "18rem" }}
              key={product.id}
              className="product-card"
            >
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ width: "150px", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>
                  {truncateDescription(product.title, 50)}
                </Card.Title>
                <Card.Text>
                  {truncateDescription(product.description, 50)}
                </Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className="btn-container">
                  <Button
                    className="btn-card"
                    variant="primary"
                    onClick={() => handleLearnMore(product.id)}
                  >
                    LEARN MORE
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
