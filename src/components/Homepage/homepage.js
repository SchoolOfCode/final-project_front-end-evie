import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div>
      <div className="background-image"></div>
      <div className="content-container">
        <img className="logo-home" src="/transparent-bg-logo.png" alt="Evie logo" />
        <h1 className="homepage-title">Welcome to EVie Chargers</h1>
        <h3 className="intro">
          We provide a smart solution for users in need of electrical charging
          points for their vehicles.{" "}
        </h3>
        <h3 className="homepage-description">
          Rest assured, the quality of your experience is at the core of our
          service. Together with the location of the charging point you can also
          find user reviews and the opportunity to leave your own.
        </h3>
        <h3 className="homepage-description">
          We made it easy, all you have to think about is where you
          want to travel next.
        </h3>
        <Link to="/maps">
          <button className='go-to-maps-button'>Find charging points</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
