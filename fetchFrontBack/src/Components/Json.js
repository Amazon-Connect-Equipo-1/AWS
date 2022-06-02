(async () => {
const response = await fetch("https://35.88.250.238:8443/auth/signIn",{
    method:'POST',
    mode: 'cors',
    body: JSON.stringify({
        email: "mikeperezlopez15@hotmail.com",
        password: "123456@aA"
    })
    }).then(response => response.json())
    .then(data =>{
    console.log(data); 
    return data; 
    });
})();
const Jsonfile = () =>{
    return(
        <div>
            <h1>Hola</h1>
        </div>
    );
}


export default Jsonfile;