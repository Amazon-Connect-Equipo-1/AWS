/* Card
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import classes from "../../styles/UI/Card.css";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
