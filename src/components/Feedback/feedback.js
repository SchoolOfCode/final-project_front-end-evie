import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./feedback.css";
import { FaStar } from "react-icons/fa";
const colors = {
  cerulean: "#0092c5",
  grey: "#A9A9A9",
};
function Feedback() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const [formValue, setFormValue] = useState({
    title: "",
    models: "",
    socket: "",
    review: "",
  });
  console.log(formValue);

  useEffect(() => {
    axios
      .post("http://localhost:3001/Feedback", {
        title: formValue.title,
        models: formValue.models,
        socket: formValue.socket,
        review: formValue.review,
        stars: hoverValue,
      })
      .then((response) => {
        console.log(response);
      });
  }, [formValue, hoverValue]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormValue({
      title: e.target[0].value,
      models: e.target[1].value,
      socket: e.target[2].value,
      review: e.target[3].value,
    });
  };

  console.log(`${formValue} line 53 formValue`);
  console.log(`${formValue[0]} line 53 formValue]`);
  console.log(`${formValue.title} title`);
  console.log(`${formValue.models} models`);
  console.log(`${formValue.socket} socket`);
  console.log(`${formValue.review} review`);
  console.log(`${hoverValue} hover value star`);

  return (
    <>
      <nav
        className="navigation"
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          paddingTop: "1rem",
          backgroundColor: "#E8F6FF",
          textAlign: "center",
        }}
      >
        <Link to="/">Map</Link> | <Link to="/Feedback">Feedback</Link>
      </nav>
      <form onSubmit={onSubmit} id="submit-form">
        <div style={styles.container}>
          <h2> Rate this charge point</h2>
          <div style={styles.stars}>
            <br />
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.cerulean
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <br />
          Charge point:
          <textarea placeholder="Charge point" className="textarea" />
          <br />
          Model of charger:
          <textarea placeholder="Model of charger" className="textarea" />
          <br />
          Socket type:
          <textarea placeholder="Socket type" className="textarea" />
          <br />
          Leave your review:
          <textarea placeholder="Leave your review" className="textarea" />
          <br />
          <input
            className="submit-button"
            id="submit-button"
            type="submit"
            value="Submit Review"
          />
        </div>
      </form>
    </>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E8F6FF",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};
export default Feedback;
