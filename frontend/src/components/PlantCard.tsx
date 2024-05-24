import "./plant-card.css";
import blueberry from "../assets/images/blueberry-bush.jpg";
import { IFullPlant } from "../../../backend/interfaces";

interface PropsType {
  plant: IFullPlant;
  displayModal: (id: number) => void;
}

function PlantCard({ plant, displayModal }: PropsType) {
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
        event.month = "Augusti";
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

    switch (event.type) {
      case "dressingMonth":
        event.type = "Torv";
        break;
      case "fertilizerMonth":
        event.type = "Gödsel";
        break;
      case "pruningMonth":
        event.type = "Beskär";
        break;
      case "bloomMonth":
        event.type = "Blommar";
        break;
      case "harvestMonth":
        event.type = "Skördas";
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

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="14px"
          onClick={() => displayModal(plant.id)}>
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </div>
    </section>
  );
}

export default PlantCard;
