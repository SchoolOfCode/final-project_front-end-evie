import { useState, useEffect } from "react";
import axios from "axios";
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
}, [formValue,hoverValue]
)

const onSubmit = (e) => {
  e.preventDefault();
  setFormValue({
    title: e.target[0].value,
    models: e.target[1].value,
    socket: e.target[2].value,
    review: e.target[3].value,
   
  });
  
}

console.log(`${formValue} line 53 formValue`)
console.log(`${formValue[0]} line 53 formValue]`)
console.log(`${formValue.title} title`)
console.log(`${formValue.models} models`)
console.log(`${formValue.socket} socket`)
console.log(`${formValue.review} review`)
console.log(`${hoverValue} hover value star`)


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
      <form onSubmit={onSubmit} id="submit-form">
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
      Charge point:
      <textarea placeholder="Charge point" style={styles.textarea} />
      Model of charger:
      <textarea placeholder="Model of charger" style={styles.textarea} />
      Socket type:
      <textarea placeholder="Socket type" style={styles.textarea} />
      Leave your review:
      <textarea placeholder="Review" style={styles.textarea} />
      <input id="submit-button" type="submit" value="Submit Review" style={styles.button}/>
    </div>
    </form>
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









