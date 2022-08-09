import { useState } from "react";
import { Link } from "react-router-dom";
//import "./App.css";
import { FaStar } from "react-icons/fa";
const colors = {
  orange: "#FFBA5A",
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
  return (
   <>
    <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Map</Link> |{" "}
        <Link to="/Feedback">Feedback</Link> 
      </nav>
    <div style={styles.container}>
      <h2> React Ratings </h2>
      <div style={styles.stars}>
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
                  ? colors.orange
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
      <textarea placeholder="What's your experience?" style={styles.textarea} />
      <textarea placeholder="Charge Type" style={styles.textarea} />
      <button style={styles.button}>Submit</button>
    </div>
    </>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #A9A9A9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #A9A9A9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
export default Feedback;









