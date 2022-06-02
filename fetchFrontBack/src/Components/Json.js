const fetch = () => {
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
      redirect: "follow",
    };

    // const requestOptionsGET = {
    //   method: "GET",
    //   headers: myHeadersToken,
    //   body: raw,
    //   redirect: "follow",
    // };

    fetch("http://35.88.250.238:8080/auth/signin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        window.localStorage.setItem("isLoggedIn", true);
        const resultJSON = JSON.parse(result);
        console.log(resultJSON);
      });
    }
const Jsonfile = () =>{
    return(
        <div>
            <h1>Hello Amazon</h1>
            <button onClick={fetch()} >Send</button>
        </div>
    );
}


export default Jsonfile;