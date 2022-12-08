import { actualizarUsuario, editarUsuarioEnLocalStorage } from "./servicios.js";
import { redireccionar } from "./utilidades.js";

const imageInput = document.querySelector("#image-input");
const btnEnviar=document.getElementById("btn-aceptar");


btnEnviar.addEventListener("click", async() => {
 await modificarUsuario();
})

imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

async function modificarUsuario() {
  const correo = JSON.parse(localStorage.getItem("usuario")).correo//se obtiene el usuario por medio del almacenamiento local
  const datos = {
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    nacimiento: document.getElementById("nacimiento").value,
    genero: document.getElementById("genero").value,
    peso: document.getElementById("peso").value,
    altura: document.getElementById("altura").value,
    foto_usuario: imageInput?.files[0],
    correo //los datos se guardan en el local, ligado al correo
  }

  //Validacion de ingreso de datos, que todos los campos esten llenos
  if(!datos.nombre || !datos.apellidos || !datos.nacimiento || !datos.genero || !datos.peso|| !datos.altura ) {
    document.getElementById("mensaje").innerText= "*Todos lo campos son obligatorios*"
    nombre.style.borderColor="red"
    apellidos.style.borderColor="red"
    nacimiento.style.borderColor="red"
    genero.style.borderColor="red"
    peso.style.borderColor="red"
    altura.style.borderColor="red"
    return
  }

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]); //Agrega los datos en el mongo
  })

  const usuario= await actualizarUsuario(body)
  editarUsuarioEnLocalStorage(usuario) //se envian los datos del usuario al almacenamiento local(localStorage)
  return redireccionar('h-subHome.html');
}
