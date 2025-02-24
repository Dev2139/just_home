// Frontend/vite-project/src/Components/PropertyDetails/PropertyDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Property not found");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading property details...</p>;
  if (error || !property) return <p className="error">Property not found.</p>;

  return (
    <div className="property-container">
      {/* Left Section - Property Details */}
      <div className="property-info">
        <h1 className="property-title">{property.title}</h1>
        <p className="property-location">📍 {property.location}, {property.state}</p>

        {/* Key Details */}
        <div className="property-details">
          <span>🏡 {property.size}</span>
          <span>🛏️ {property.bedrooms} Bedrooms</span>
          <span>🛁 {property.bathrooms} Bathrooms</span>
          <span>🛠️ Built in {property.yearBuilt}</span>
          <span>🚗 {property.parking}</span>
          {property.petFriendly && <span>🐶 Pet-Friendly</span>}
          {property.furnished && <span>🛋️ {property.furnished}</span>}
        </div>

        {/* Status Button */}
        <div className="property-status">
          {property.status.toLowerCase() === "for sale" ? (
            <button className="sale-button">For Sale</button>
          ) : (
            <button className="rent-button">For Rent</button>
          )}
        </div>

        {/* Price & Discount */}
        <h2 className="property-price">
          💰 {property.price} {property.priceUnit}
        </h2>
        {property.discountOffer && <p className="discount-offer">🎉 {property.discountOffer}</p>}

        {/* Owner Information */}
        <div className="property-owner">
          <h3>Owned by {property.owner}</h3>
          <p>📧 {property.ownerEmail}</p>
          <p>📞 {property.contact}</p>
        </div>

        {/* Facilities Section */}
        <div className="property-facilities">
          <h2>What this place offers?</h2>
          <div className="facilities-grid">
            {property.facilities?.map((facility, index) => (
              <div key={index} className="facility-item">
                {facility}
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Landmarks */}
        {property.nearbyLandmarks?.length > 0 && (
          <div className="property-landmarks">
            <h2>Nearby Landmarks</h2>
            <ul>
              {property.nearbyLandmarks.map((landmark, index) => (
                <li key={index}>📍 {landmark}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews Section */}
        {property.reviews?.length > 0 && (
          <div className="property-reviews">
            <h2>Reviews</h2>
            {property.reviews.map((review, index) => (
              <div key={index} className="review">
                <strong>{review.user}</strong> ⭐ {review.rating}
                <p>"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section - Property Image */}
      <div className="property-image-section">
        <img src={property.coverimg} alt={property.title} className="main-image" />
        <div className="other-images">
          {property.images?.map((img, index) => (
            <img key={index} src={img} alt={`Property image ${index + 1}`} className="small-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
