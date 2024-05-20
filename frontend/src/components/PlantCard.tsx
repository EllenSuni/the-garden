import "./plant-card.css";
import blueberry from "../assets/images/blueberry-bush.jpg";
import { IFullPlant } from "../../../backend/interfaces";

interface PropsType {
  plant: IFullPlant;
}

function PlantCard({ plant }: PropsType) {
  console.log(plant);
  return (
    <section className="plant-card">
      <img
        src={blueberry}
        alt="Blåbär"
        className="plant-card__image"
      />
      <div className="plant-info">
        <div>
          {/* Färger!!! */}
          {plant.area.map((value) => (
            <h4 key={value}>{value}</h4>
          ))}

          <h2 className="plant-info__name">{plant.name}</h2>
          {plant.scientific_name && (
            <h6 className="plant-info__sci-name">"{plant.scientific_name}"</h6>
          )}
        </div>

        <div>
          {plant.event.map((value) => (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">{value.type}</h3>
              <p className="plant-info__care-timespan">{value.month}</p>
            </div>
          ))}
        </div>
        {plant.text && <p className="plant-info__notes">{plant.text}</p>}
      </div>
    </section>
  );
}

export default PlantCard;
