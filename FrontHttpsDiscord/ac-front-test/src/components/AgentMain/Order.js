/* O
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/ThirdParty.css";
import uberlogo from "../../images/uber.png";
import ubereatslogo from "../../images/uber-eats.png";
import oxxologo from "../../images/oxxo.jpg";
import policelogo from "../../images/Policia.png";
import {
  GiSodaCan,
  GiChipsBag,
  GiHotDog,
  GiChocolateBar,
} from "react-icons/gi";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaPills } from "react-icons/fa";
const Order = (props) => {
  if (props.product == "Soda") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <GiSodaCan />
        </button>
        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
  if (props.product == "Chips") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <GiChipsBag />
        </button>

        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
  if (props.product == "Coffee") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <BiCoffeeTogo />
        </button>

        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
  if (props.product == "HotDog") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <GiHotDog />
        </button>

        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
  if (props.product == "Aspirin") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <FaPills />
        </button>

        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
  if (props.product == "Chocolate") {
    return (
      <div>
        <button className="tp-order-button" onClick={props.function}>
          <GiChocolateBar />
        </button>

        <div>
          {props.product} Quantity: {props.quantity}
        </div>
      </div>
    );
  }
};
export default Order;
