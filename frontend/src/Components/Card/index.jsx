import "./card.css";

const Card = ({ image, name, description, price }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-details">
        <h2 className="card-name">{name}</h2>
        <p className="card-description">{description}</p>
        <p className="card-price">${price}</p>
        <button className="buy-now-button">Buy Now</button>
      </div>
    </div>
  );
};

export default Card;
