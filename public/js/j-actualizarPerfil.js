import { generarInformacion } from "./utilidades.js";
import { obtenerUsuarioDelLocalStorage, obtenerUsuario, actualizarUsuario, editarUsuarioEnLocalStorage } from "./servicios.js";
const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("enviar");

btnEnviar.addEventListener("click", async(evento) => {
  evento.preventDefault();
  const usuario = obtenerUsuarioDelLocalStorage();
  const usuarioActualizado = await modificarUsuario();

  if (usuarioActualizado?.logros?.length) {
    usuarioActualizado.logros.forEach(logro => {
      const logroUsuario = usuario?.logros?.find(({ logro: { nombre } }) => nombre?.toLowerCase().trim() === logro.logro.nombre?.toLowerCase().trim());
      if ((!logroUsuario || !logroUsuario?.realizado) && logro?.realizado) {
        alertaLogroObtenido({
          nombre: logro.logro.nombre,
          pesoObjetivo: logro.pesoObjetivo
        });
      }
    });
  }
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});


/*async function mensajeU(){
    //alert("Perfil correctamente actualizado")
     document.getElementById("mensaje").innerText= "*Datos actualizados*"
 }*/

async function modificarUsuario() {
    const correo = obtenerUsuarioDelLocalStorage().correo
    const datos = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      nacimiento: document.getElementById("nacimiento").value,
      genero: document.getElementById("genero").value,
      peso: document.getElementById("peso").value,
      altura: document.getElementById("altura").value,
      foto_usuario: imageInput?.files[0],
      correo
    }
    const body = new FormData();
    Object.keys(datos).forEach(key => {
      if (datos[key]) body.append(key, datos[key]);
    })

    const usuario = await actualizarUsuario(body);
    editarUsuarioEnLocalStorage(usuario);
    generarInformacion(usuario);
    return usuario;
}

const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  generarInformacion(usuario)
}

cargarDatos();
