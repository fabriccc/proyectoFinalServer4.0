import { generarInformacion } from "./utilidades.js";
import { obtenerUsuario } from "./servicios.js";

const cargarDatos = async () => {
    const usuario = await obtenerUsuario();
    generarInformacion(usuario)
}

cargarDatos();
