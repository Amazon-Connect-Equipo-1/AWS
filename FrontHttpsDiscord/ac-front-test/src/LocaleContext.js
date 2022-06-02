/* LocalContext
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React from "react";

const defaultValue = {
  locale: "en",
  setLocale: () => {},
};

export default React.createContext(defaultValue);
