import React from "react";

function ListingCard({ id, description, image, location, price, isFavorite, onToggleFavorite, onRemove }) {

  function handleRemove() {
    onRemove(id);
  }
  return (
    <li className="card">
      <div className="image">
        <span className="price">${price}</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        <button
          className={`emoji-button favorite ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(id)}
        >
          {isFavorite ? "★" : "☆"}
        </button>
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleRemove}>
          🗑
        </button>
      </div>
    </li>
  );
}

export default ListingCard;
