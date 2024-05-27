import Navigation from "../components/Navigation";
import House from "../assets/images/huset1.png";

import "./home.css";

function Home() {
  return (
    <div className="home-page">
      <h1>Växterna på Vickersrudstorp där Oppe</h1>
      <img
        src={House}
        alt="Huset på Vickersrudstorp där oppe"
        className="house-img"
      />
      <Navigation />
    </div>
  );
}

export default Home;
