import { useState } from "react";
import axios from "axios";

function Register({ enviaData }) {
    const [userData, setUserData] = useState(
        {userName: '',
        password: '',
        email: '',
        edad: 0,
        ciudad: '',
        intereses: ["beisbol", "tenis"] // TODO Temporal hasta que configure la forma correcta de añadir los intereses
    });

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
            "nombre": userData.userName,
            "email": userData.email,
            "password": userData.password,
            "edad": userData.edad.t,
            "ciudad": userData.ciudad,
            "intereses": userData.intereses
        }

        axios.post('http://localhost:3001/api/user/register', body)
            .then(response => handleBody(response.data))
            .catch(error => console.log(error));
    }

    return (
        <form>
            <div>
                <label>Nombre: </label>
                <input type="text" onChange={(event) => handleChange(event, 'userName')}/>
            </div>

            <div>
                <label>Email: </label>
                <input type="text" onChange={(event) => handleChange(event, 'email')} />
            </div>
            
            <div>
                <label>Edad: </label>
                <input type="number" onChange={(event) => handleChange(event, 'edad')} />
            </div>

            <div>
                <label>Ciudad: </label>
                <input type="text" onChange={(event) => handleChange(event, 'ciudad')} />
            </div>

            <div>
                <label>Intereses: </label>
                <input type="text" onChange={(event) => handleChange(event, 'intereses')} />
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

export default Register;