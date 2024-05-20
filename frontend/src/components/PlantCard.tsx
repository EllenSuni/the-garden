import "./plant-card.css";
import blueberry from "../assets/images/blueberry-bush.jpg";
import { IFullPlant } from "../../../backend/interfaces";

interface PropsType {
  plant: IFullPlant;
}

function PlantCard({ plant }: PropsType) {
  plant.event.forEach((event) => {
    switch (event.month) {
      case 1:
        event.month = "Januari";
        break;
      case 2:
        event.month = "Februari";
        break;
      case 3:
        event.month = "Mars";
        break;
      case 4:
        event.month = "April";
        break;
      case 5:
        event.month = "Maj";
        break;
      case 6:
        event.month = "Juni";
        break;
      case 7:
        event.month = "Juli";
        break;
      case 8:
        event.month = "Augisti";
        break;
      case 9:
        event.month = "September";
        break;
      case 10:
        event.month = "Oktober";
        break;
      case 11:
        event.month = "November";
        break;
      case 12:
        event.month = "December";
        break;
    }
  });

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
            <div
              className="plant-info__care"
              key={value.type}>
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
