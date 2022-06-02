/* Loading
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import { SpinnerCircular } from "spinners-react";
// Hola sara
function Loading() {
  return (
    <SpinnerCircular role="status">
      <span className="visually-hidden">Loading...</span>
    </SpinnerCircular>
  );
}

export default Loading;
