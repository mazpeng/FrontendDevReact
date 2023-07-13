import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function Rating({ value }) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={fullStars} />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={fullStars + i + 1} />);
    }

    return stars;
  };

  return <div className="rating">{renderStars()}</div>;
}

export default Rating;
