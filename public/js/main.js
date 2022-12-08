import { obtenerUsuarioDelLocalStorage } from "./servicios.js";
import { redireccionar } from "./utilidades.js";

window.onload = () => {
    const rutasProtegidas = [
        'actualizarperfil',
        'ayunos',
        'ejercicios',
        'subhome',
        'subhomeprogreso',
        'recetas',
        'logros',
        'perfil-informacion'
    ]

    const urlPathName = window.location.pathname.toLocaleLowerCase();
    const usuario = obtenerUsuarioDelLocalStorage();
    const esRutaProtegida = rutasProtegidas.some(ruta => urlPathName.includes(ruta));

    if(esRutaProtegida && !usuario) {
        return redireccionar('h-iniciarSesion.html');
    }

    if (!esRutaProtegida && usuario?.nombre && usuario?.altura && usuario?.peso) {
        return redireccionar('h-subHome.html');
    }
}
