

const btnEnviar=document.getElementById("registrar");


btnEnviar.addEventListener("click", function(evento) {
  evento.preventDefault (); 
  insertarEjercicio();
  document.getElementById("nombre").value=""
  document.getElementById("inicio").value=""
  document.getElementById("fin").value=""
  document.getElementById("tipo").value=""
  document.getElementById("fecha").value =""
 })
 


 function cargarTabla() {
    fetch("http://localhost:3000/ejercicios/")
      .then(
        function(response){
          return response.json();
        }
      )
      .then (
        function(ejercicio) {
          for(var cont = 0;ejercicio.length > cont; cont++) {
            var linea = "<tr><td>"+ejercicio[cont].nombre+"</td><td>"+ejercicio[cont].inicio+"</td><td>"+ejercicio[cont].fin+"</td><td>"+ejercicio[cont].tipo+"</td><td>"+ejercicio[cont].fecha+"</td></tr>";
            document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
          }
        }
      ) 
  }


function insertarEjercicio() {
  var datos = {
    nombre: document.getElementById("nombre").value,
    inicio: document.getElementById("inicio").value,
    fin: document.getElementById("fin").value,
    tipo: document.getElementById("tipo").value,
    fecha: document.getElementById("fecha").value
  }
  
  /*if(!datos.nombre||!datos.tipo || !datos.inicio || !datos.fin|| !datos.fecha ) {
    document.getElementById("mensaje").innerText= "*Todos lo campos son obligatorios*"
    nombre.style.borderColor="red"
    tipo.style.borderColor="red"
    inicio.style.borderColor="red"
    fin.style.borderColor="red"
    fecha.style.borderColor="red"
    return
  }*/

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]); //Agrega los datos en el mongo
  })


  fetch("http://localhost:3000/ejercicios/insertar", {
    method: 'POST',
    body
  })
    .then(
      function(response){
        return response.json();
        
      }
    )
    .then(
      function(ejercicio){
        var linea = "<tr><td>"+ejercicio.nombre+"</td><td>"+ejercicio.inicio+"</td><td>"+ejercicio.fin+"</td><td>"+ejercicio.tipo+"</td><td>"+ejercicio.fecha+"</td></tr>";
        document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
      }
    ).catch((error) => console.log(error))
}

cargarTabla();