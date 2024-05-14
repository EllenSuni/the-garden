import "./plant-card.css";
import blueberry from "../assets/images/blueberry-bush.jpg";
import { PlantType } from "../interfaces";

interface PropsType {
  plant: PlantType;
}

function PlantCard({ plant }: PropsType) {
  return (
    <section className="plant-card">
      <img
        src={blueberry}
        alt="Blåbär"
        className="plant-card__image"
      />
      <div className="plant-info">
        <div>
          <h2 className="plant-info__name">{plant.plantname}</h2>
          {plant.sciname !== null && (
            <h6 className="plant-info__sci-name">"{plant.sciname}"</h6>
          )}
        </div>
        <div>
          {plant.needsfertilizer && (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">Gödsel</h3>
              <p className="plant-info__care-timespan">
                {plant.fertilizertime}
              </p>
            </div>
          )}
          {plant.needstrimming && (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">Beskär</h3>
              <p className="plant-info__care-timespan">{plant.trimmingtime}</p>
            </div>
          )}
          {plant.needsdressing && (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">Torv</h3>
              <p className="plant-info__care-timespan">{plant.dressingtime}</p>
            </div>
          )}
        </div>
        <div>
          {plant.bloomtime && (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">Blommar</h3>
              <p className="plant-info__care-timespan">{plant.bloomtime}</p>
            </div>
          )}
          {plant.harvesttime && (
            <div className="plant-info__care">
              <h3 className="plant-info__care__heading">Skördas</h3>
              <p className="plant-info__care-timespan">{plant.harvesttime}</p>
            </div>
          )}
        </div>
        {plant.notes && <p className="plant-info__notes">{plant.notes}</p>}
      </div>
    </section>
  );
}

export default PlantCard;
