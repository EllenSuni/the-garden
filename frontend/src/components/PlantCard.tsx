import "./plant-card.css";
import blueberry from "../assets/images/blueberry-bush.jpg";

function PlantCard() {
  return (
    <section className="plant-card">
      <img
        src={blueberry}
        alt="Blåbär"
        className="plant-card__image"
      />
      <div className="plant-info">
        <div>
          <h2 className="plant-info__name">Namn</h2>
          <h6 className="plant-info__sci-name">"Vetenskapligt namn"</h6>
        </div>
        <div className="plant-info__care">
          <h3 className="plant-info__care__heading">Gödsel</h3>
          <p className="plant-info__care-timespan">Maj-Juli</p>
        </div>
        <p className="plant-info__notes">Anteckningar</p>
      </div>
    </section>
  );
}

export default PlantCard;
