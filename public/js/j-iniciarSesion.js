import { obtenerUsuario } from "./servicios.js";
import { redireccionar } from "./utilidades.js";

const btnEnviar=document.getElementById("enviar");
const mensaje=document.getElementById("mensaje");

btnEnviar.addEventListener("click", async function(evento) {
    evento.preventDefault();
    const correo = document.getElementById("correo").value;
    const usuario = await obtenerUsuario(correo);
    if (usuario) {
        if (usuario?.correo) {
            localStorage.setItem("usuario", JSON.stringify(usuario));//Se envia al usuario en el almacenamiento local
            if (usuario?.nombre && usuario?.apellidos && usuario?.altura && usuario?.peso ) {
                return redireccionar('h-subHome.html');
            } else {
                return redireccionar('h-registroDatos.html');
            }
        }

        if (usuario?.mensaje) {
            mensaje.innerText = usuario.mensaje;//mensaje de usuario no encontrado en inicio de sesion
        }
    } else {
        mensaje.innerText = "Error al iniciar sesion";
    }
})
