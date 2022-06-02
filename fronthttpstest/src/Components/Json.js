import { useEffect, useState } from "react";

const Jsonfile = () =>{
    const [cargando, setCargando] = useState(true);
    const [msg, setMsg]  = useState("");
    const [Error, setError]  = useState(false);
    useEffect(() => {
        fetch('https://35.88.250.238:8082/principal')
        .then(response => response.json())
        .then(data => {
        if (data !== undefined){
            const mensajeJson = data.Mensaje;
            setCargando(false);
            setMsg(mensajeJson);
            window.alert(mensajeJson)
        } else {
            window.alert("Error")
            setError(true);
            setCargando(false);
        }
    })
    });

    return(
        <div>
            <h1>Hola</h1>
            <h1>{msg}</h1>
            { cargando && <p>Descargando Información</p>}
            <h1>{ Error }</h1>
        </div>
    );
}

export default Jsonfile;