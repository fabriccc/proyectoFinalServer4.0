import { borrarUsuarioDelLocalStorage } from "./servicios.js";

const cerrarSesionBtn = document.getElementById('cerrar-sesion');

function cerrarSesion(){
    borrarUsuarioDelLocalStorage(); //Se remueve el usuario del almacenamiento Local
}

cerrarSesionBtn.addEventListener('click', cerrarSesion);
