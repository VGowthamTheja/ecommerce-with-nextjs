import React from "react";
import PropTypes from "prop-types";
import { IconStar, IconStarHalf } from "@/icons/StarIcon";

const StarRating = ({ rating, totalStars }: any) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      // Calculate the fractional part of the rating
      const isHalfStar = i === Math.ceil(rating) && !Number.isInteger(rating);
      const isFullStar = i <= rating;

      let className = "w-4 h-4 text-gray-400";
      if (isFullStar || isHalfStar) {
        className = "w-4 h-4 text-yellow-600";
      }

      stars.push(
        <span key={i} className={className}>
          {isHalfStar ? <IconStarHalf /> : <IconStar />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <span className="ml-4 rounded-md bg-gray-600 px-2">
        {rating} / {totalStars}
      </span>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
};

export default StarRating;
