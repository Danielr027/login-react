import logo from './logo.svg';
import './App.css';
import './estilos/styles.css'
import Login from './components/Login';
import Mensaje from './components/Mensaje';
import { useState } from 'react';
import Register from './components/Register';

function App() {

  const [autenticado, setAutenticado] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [toggle, setToggle] = useState(false); // Con false se muestra iniciar sesión


  const handleLogin = (resultado) => {
    setAutenticado(resultado);
    setVisibility(!resultado);
    console.log(resultado);
  }

  const handleRegister = (resultado) => {
    console.log(resultado)
  }



  return (
    <div className="App">
      <h1>INICIAR SESIÓN</h1>
      
      <div className='contenedor contenedor-formulario'>
        
        {visibility && 

        <Login enviaData={handleLogin} />
        
        }

        <Mensaje login={autenticado} /> 

      </div>
      
      <h1>REGISTRARSE</h1>

      <div className='contenedor contenedor-formulario'>

        <Register enviaData={handleRegister} />
      </div>

    </div>
  );
}

export default App;
