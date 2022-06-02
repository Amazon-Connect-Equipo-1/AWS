/* Monitor Module
Authors:
        A01777771 Stephen Strange*/

// This module helps to register the
// clicks and pressed keys of the user

export const giveTimestamp = () => {
  const timestamp = Date.now();
  const fecha = new Date(timestamp);
  return fecha;
};

export const saveKeys = (event) => {
  console.log(event.key, giveTimestamp());
  //plus additional functionality of filtering
};

export const saveClick = (elementName) => {
  console.log(`Click in ${elementName}`, giveTimestamp());
};
