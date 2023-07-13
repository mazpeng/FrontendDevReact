import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Button, Badge, Col, Image } from "react-bootstrap";
import icon from "../images/superhero.png";
import Rating from "../components/rating";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productResponse, commentsResponse] = await Promise.all([
        fetch(`https://fakestoreapi.com/products/${productId}`),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      const productData = await productResponse.json();
      const commentsData = await commentsResponse.json();

      setProduct(productData);
      setComments(commentsData.slice(0, 9)); // Limit comments to the first 10 items
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (!product) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <div className="detail-container">
        <div className="home-box-detail mb-3 rounded border">
          <div className="row detail-title">
            <div className="col-md-4">
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "300px",
                  height: "380px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <div className="col-md-8 detail-product">
              <Badge bg="info">New</Badge>
              <h1 style={{ borderBottom: "1px solid black" }}>
                {product.title}
              </h1>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <Button className="btn-order" variant="success">
                Order Now
              </Button>{" "}
            </div>
          </div>
        </div>
        <div className="review-product">
          <h2>Review</h2>
          <div className="comment-product">
            {comments.map((comment) => (
              <div className="comment-all">
                <div className="comment-title" key={comment.id}>
                  <h4>
                    <Col xs={1} md={1}>
                      <Image src={icon} roundedCircle />
                    </Col>
                    {comment.name}
                    <Rating value={comment.rating} />
                  </h4>
                  <h6>Email: {comment.email}</h6>
                  <p> {comment.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
