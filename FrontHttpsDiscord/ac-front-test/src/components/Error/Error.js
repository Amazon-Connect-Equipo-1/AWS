/* Error
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React from "react";
import "../../styles/Error/Error.css";

const Error = (props) => {
  const errorType = props.interface === "Login" ? "lerr" : "";

  return (
    <div className={`err-container ${errorType}`}>
      <h1 className={`err-title ${errorType}`}>404</h1>
      <h2 className={`err-subtitle ${errorType}`}>Not found</h2>
      <p className={`err-description ${errorType}`}>
        The source requested could not be found on this server!
      </p>
    </div>
  );
};

export default Error;
