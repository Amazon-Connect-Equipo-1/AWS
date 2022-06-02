import './App.css';
import Jsonfile from './Components/Json';

function App() {
  const fetchBack = () => {
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        // const myHeadersToken = new Headers();
        // myHeadersToken.append("Authorization", `Bearer ${token}`);
    
        const raw = JSON.stringify({
          email: "mikeperezlopez15@hotmail.com",
          password: "123456@aA",
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          //redirect: "follow",
        };
    
        // const requestOptionsGET = {
        //   method: "GET",
        //   headers: myHeadersToken,
        //   body: raw,
        //   redirect: "follow",
        // };
    
        fetch("https://35.88.250.238:8443/auth/signin", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            //window.localStorage.setItem("isLoggedIn", true);
            console.log(result)
            const resultJSON = JSON.parse(result);
            console.log(resultJSON);
          });
        }
  return (
    <div className="App">
      <h1>Hello Amazon</h1>
      <button onClick={fetchBack} >Send again</button>
    </div>
  );
}

export default App;
