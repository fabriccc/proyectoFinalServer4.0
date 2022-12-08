

const btnEnviar=document.getElementById("registrar");


btnEnviar.addEventListener("click", function(evento) {
  evento.preventDefault (); 
  insertarAyuno();
  document.getElementById("tipo").value="tipo"
  document.getElementById("inicio").value="inicio"
  document.getElementById("fin").value="fin"
  document.getElementById("fecha").value ="fecha"
 })
 


function cargarTabla() {
  fetch("http://localhost:3000/ayunos/")
    .then(
      function(response){
        return response.json();
      }
    )
    .then (
      function(ayuno) {
        for(var cont = 0;ayuno.length > cont; cont++) {
          var linea = "<tr><td>"+ayuno[cont].tipo+"</td><td>"+ayuno[cont].inicio+"</td><td>"+ayuno[cont].fin+"</td><td>"+ayuno[cont].fecha+"</td></tr>";
          document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
        }
      }
    ) 
}


function insertarAyuno() {
  var datos = {
    tipo: document.getElementById("tipo").value,
    inicio: document.getElementById("inicio").value,
    fin: document.getElementById("fin").value,
    fecha: document.getElementById("fecha").value
  }
  
  if(!datos.tipo || !datos.inicio || !datos.fin|| !datos.fecha ) {
    document.getElementById("mensaje").innerText= "*Todos lo campos son obligatorios*"
    tipo.style.borderColor="red"
    inicio.style.borderColor="red"
    fin.style.borderColor="red"
    fecha.style.borderColor="red"
    return
  }

  const body = new FormData();
  Object.keys(datos).forEach(key => {
    if (datos[key]) body.append(key, datos[key]); //Agrega los datos en el mongo
  })


  fetch("http://localhost:3000/ayunos/insertar", {
    method: 'POST',
    body
  })
    .then(
      function(response){
        return response.json();
        
      }
    )
    .then(
      function(ayuno){
        var linea = "<tr><td>"+ayuno.tipo+"</td><td>"+ayuno.inicio+"</td><td>"+ayuno.fin+"</td><td>"+ayuno.fecha+"</td></tr>";
        document.getElementById("tablaHistorial").insertAdjacentHTML("beforeend", linea);
      }
    ).catch((error) => console.log(error))
}

cargarTabla();
  