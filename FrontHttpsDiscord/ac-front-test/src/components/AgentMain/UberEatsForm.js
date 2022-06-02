/* Uber Eats Form
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import "../../styles/AgentMain/ThirdParty.css";
import ThirdParty from "./ThirdParty";
import { saveKeys, saveClick } from "../MonitorModule.js";
import { GiSodaCan } from "react-icons/gi";
import Order from "./Order";
import { useState } from "react";

const UberEatsForm = (props) => {
  const INPUT_NAME = "Uber Eats form";
  const [soda, setSoda] = useState(0);
  const [chips, setChips] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [hotDog, setHotDog] = useState(0);
  const [aspirin, setAspirin] = useState(0);
  const [chocolate, setChocolate] = useState(0);
  const sodaForm = () => {
    setSoda += 1;
  };
  const chipsForm = () => {
    setChips += 1;
  };
  const coffeeForm = () => {
    setCoffee += 1;
  };
  const hotDogForm = () => {
    setHotDog += 1;
  };
  const aspirinForm = () => {
    setAspirin += 1;
  };
  const chocolateForm = () => {
    setChocolate += 1;
  };

  return (
    <div>
      <div className="tp-title">Uber Eats Service</div>
      <form>
        <label className="tp-name-label">
          Client:
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          Email:
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          Cellphone:
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <label className="tp-name-label">
          Client location:
          <input
            type="text"
            onKeyDown={saveKeys}
            onClick={() => saveClick(`${INPUT_NAME} input`)}
            className="tp-input-label"
          />
        </label>
        <h1>Order:</h1>
        <div className="tp-order">
          <Order product={"Soda"} quantity={soda} function={sodaForm} />
          <Order product={"Chips"} quantity={chips} function={chipsForm} />
          <Order product={"Coffee"} quantity={coffee} function={coffeeForm} />
          <Order product={"HotDog"} quantity={hotDog} function={hotDogForm} />
          <Order
            product={"Aspirin"}
            quantity={aspirin}
            function={aspirinForm}
          />
          <Order
            product={"Chocolate"}
            quantity={chocolate}
            function={chocolateForm}
          />
        </div>

        <div className="tp-submit">
          <input
            type="submit"
            onKeyDown={saveKeys}
            onClick={(e) => {
              e.preventDefault();
              props.onChange();
              saveClick(`${INPUT_NAME} input`);
            }}
            value="Ask for service"
            className="tp-submit-button"
          />
        </div>
      </form>
    </div>
  );
};
export default UberEatsForm;
