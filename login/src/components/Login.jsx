import { useState } from "react";
import axios from "axios";

function Login({ enviaData }) {
    const [userData, setUserData] = useState({userName: '', password: ''});
    // const [responseBody, setResponseBody] = useState({});

    const handleChange = (event, field) => {
        setUserData({
            ...userData,
            [field]: event.target.value
        })
    }

    const handleBody = (body) => {
        // Guardar en TOKEN en caché
        const token = body.token; 

        if(token) {
            localStorage.setItem('token', token);
            console.log(token)
            enviaData(true);
        } else {
            enviaData(false);
        }
    }

    const handleClick = (event) => {
        event.preventDefault()

        const body = {
            "email": userData.userName,
            "password": userData.password
        }

        axios.post('http://localhost:3001/api/user/login', body)
            .then(response => handleBody(response.data))
            .catch(error => console.log(error));
        
        
    }

    return (
        <form>
            <div>
                <label>Email del usuario: </label>
                <input type="text" onChange={(event) => handleChange(event, 'userName')}/>
            </div>

            <div>
                <label>Contraseña: </label>
                <input type="password" onChange={(event) => handleChange(event, 'password')} />
            </div>

            <br />

            <button onClick={handleClick} className="boton-formulario">INICIAR SESIÓN</button>
        </form>
    )
}

export default Login;