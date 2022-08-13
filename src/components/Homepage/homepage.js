import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div>
      <div className="background-image"></div>
      <div className="content-container">
        <img src="/transparent-bg-logo.png" alt="Evie logo" />
        <h1>Welcome to EVie Chargers</h1>
        <h3>
          We provide a smart solution for users in need of eletrical charging
          points for their vehicles.{" "}
        </h3>
        <h3>
          Rest assured, the quality of your experience is at the core of our
          service. Together with the location of the charging point you can also
          find out what other users before you have experienced. You can read
          their reviews or leave one for people after you.
        </h3>
        <h3>
          We made it easy, all you have to think about is where you
          want to travel next.
        </h3>
        <Link to="/maps">
          <button className='go-to-maps-button'>Find Charging Point</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
