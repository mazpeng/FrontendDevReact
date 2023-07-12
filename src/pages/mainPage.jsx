import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import icon from "../images/main-background.jpg";
import sales from "../images/sales.jpg";
import stores from "../images/stores.jpg";
import ProductPage from "./ProductPage";

function MainPage() {
  return (
    <>
      <Carousel className="slide-items">
        <Carousel.Item>
          <img className="d-block w-100" src={stores} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={icon} alt="Second slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={sales} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <ProductPage />
      <div className="main-filter"></div>
    </>
  );
}

export default MainPage;
