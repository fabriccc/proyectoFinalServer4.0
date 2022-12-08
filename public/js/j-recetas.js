
const imageInput = document.querySelector("#image-receta");
const btnEnviar=document.getElementById("btn-aceptar");
const cargar = document.querySelector("#tabla");

btnEnviar.addEventListener("click", function(evento) {
  evento.preventDefault (); 
  insertarReceta();
  document.getElementById("nombre").value=""
  document.getElementById("ingredientes").value=""
  document.getElementById("pasos").value=""
 })
 
 
imageInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});


function cargarTabla() {
  fetch("http://localhost:3000/recetas/")
    .then(
      function(response){
        return response.json();
      }
    )
    .then (
      function(receta) {
        for(var cont = 0;receta.length > cont; cont++) {
          var linea = "<tr><td>"+receta[cont].nombre+"</td><td>"+receta[cont].ingredientes+"</td><td>"+receta[cont].pasos+"</td><td>"+receta[cont].horaComida+"<br>"+receta[cont].tipoComida+"</td><td>"+`<img class="fotos-receta" id="foto_receta" src="${receta[cont]?.foto_receta?.secure_url}">`+"</td></tr>";
          document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
        }
      }
    ) 
}


function insertarReceta() {
  var datos = {
    nombre: document.getElementById("nombre").value,
    ingredientes: document.getElementById("ingredientes").value,
    pasos: document.getElementById("pasos").value,
    horaComida: document.getElementById("horaComida").value,
    tipoComida: document.getElementById("tipoComida").value,
    foto_receta: imageInput?.files[0]
  }
  
  if(!datos.nombre || !datos.ingredientes || !datos.horaComida|| !datos.tipoComida ) {
    document.getElementById("mensaje").innerText= "*Todos lo campos son obligatorios*"
    nombre.style.borderColor="red"
    ingredientes.style.borderColor="red"
    pasos.style.borderColor="red"
    horaComida.style.borderColor="red"
    tipoComida.style.borderColor="red"
    peso.style.borderColor="red"
    return
  }

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]); //Agrega los datos en el mongo
  })

  fetch("http://localhost:3000/recetas/insertar", {
    method: 'POST',
    body
  })
    .then(
      function(response){
        return response.json();
        
      }
    )
    .then(
      function(receta){
        var linea = "<tr><td>"+receta.nombre+"</td><td>"+receta.ingredientes+"</td><td>"+receta.pasos+"</td><td>"+receta.horaComida+"<br>"+receta.tipoComida+"</td><td>"+`<img class="fotos-receta" id="foto_receta" src="${receta?.foto_receta?.secure_url}">`+"</td></tr>";
        document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
      }
    ).catch((error) => console.log(error))
}

cargarTabla();