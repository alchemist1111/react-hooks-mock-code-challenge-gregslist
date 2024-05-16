import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ searchTerm }) {
  const [listings, setListings] = useState([]); // state for setListings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [favorites, setFavorites] = useState({}); // state for favorites and unfavorites

  useEffect(() => {
    fetch("https://json-server-6-lhjq.onrender.com/listings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  };

  function handleRemoveListing(id) {
    fetch(`https://json-server-6-lhjq.onrender.com/listings/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }
      // Update state to reflect removal
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
    })
    .catch((error) => {
      console.error("Error deleting listing:", error);
    });
  };

  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <main>
      <ul className="cards">
        {filteredListings.map((item) => (
          <ListingCard
            key={item.id}
            id={item.id}
            description={item.description}
            image={item.image}
            location={item.location}
            price={item.price}
            isFavorite={!!favorites[item.id]}
            onToggleFavorite={toggleFavorite}
            onRemove={handleRemoveListing}
          />
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;
