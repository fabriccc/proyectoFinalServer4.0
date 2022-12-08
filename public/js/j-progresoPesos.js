import { formatDate, alertaLogroObtenido} from "./utilidades.js";
import { actualizarUsuario, obtenerUsuario, obtenerUsuarioDelLocalStorage, editarUsuarioEnLocalStorage } from "./servicios.js";

//GRAFICA DE PESOS
document.querySelector(".agregar-peso").addEventListener("click",agregarParametro);
document.querySelector(".mostrar-resultados").addEventListener("click", async (evento) => {
  evento.preventDefault();
  const usuario = obtenerUsuarioDelLocalStorage();
  const usuarioActualizado = await modificarProgreso();
  agregarParametro();
  mostrarResultados(usuarioActualizado.progresos);
  mostrarGraficaLogros(usuarioActualizado.logros);
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
});

async function modificarProgreso(){
  const usuarioActual = await obtenerUsuario();
  const progresosActuales = usuarioActual?.progresos || [];
  const fechasNuevas = document.querySelectorAll('#fecha-nueva');
  const pesosNuevos = document.querySelectorAll('#peso-nuevo');
  if (fechasNuevas?.length && pesosNuevos?.length) {
    const nuevosProgresos = []
    fechasNuevas.forEach((fechaInput, indice) => {
      const inputPeso = pesosNuevos[indice]
      const nuevoProgreso = {
        fecha: fechaInput?.value,
        peso: parseFloat(inputPeso?.value)
      }
      nuevoProgreso.fecha && nuevoProgreso.peso && nuevosProgresos.push(nuevoProgreso)
    })

    if (nuevosProgresos?.length) {
      const datos = {
        ...usuarioActual,
        progresos: [...progresosActuales, ...nuevosProgresos],
      }
      const headers = { 'Content-Type': 'application/json' }
      const usuario = await actualizarUsuario(JSON.stringify(datos), headers);
      editarUsuarioEnLocalStorage(usuario);
      return usuario;
    }
  }
}

//genera los datos ya existentes del usuario
function generarParametros(progresos){
  const contenedor = document.querySelector(".contenedor");

  if (progresos?.length) {
    progresos.forEach(({ peso, fecha }) => {
      const nuevoHTML = `<div><input type="date" class="fecha" placeholder="Ingrese una fecha" value="${formatDate(fecha)}"><input type="number" class="peso" placeholder="Peso/Kg" value="${peso}"></div>`;
      contenedor.insertAdjacentHTML('beforeend', nuevoHTML);
    })
    agregarParametro();
  } else {
    for (let i = 0; i < 2; i++) {
      agregarParametro();
    }
  }
}

function agregarParametro(){
    let contenedor = document.querySelector(".contenedor");
    let nuevoHTML = '<div><input id="fecha-nueva" type="date" class="fecha" placeholder="Ingrese una fecha"><input id="peso-nuevo" type="number" class="peso" placeholder="Peso/Kg"></div>';
    contenedor.insertAdjacentHTML('beforeend', nuevoHTML);
}

function mostrarResultados(progresos) {
    const pesos = progresos?.map(({ peso }) => peso);
    const fechas = progresos?.map(({ fecha }) => formatDate(fecha));
    var data = [{
      x: fechas,
      y: pesos,
      backgroundColor:"black",
      borderColor:"black",
      type: "linear"
    }];

    Plotly.newPlot("grafico",data);
}


//GRAFICA DE METAS

function mostrarGraficaLogros (logros = []) {
  const grafica = document.getElementById("grafica-metas").getContext("2d");
  const labels = logros.map(({ logro }) => logro.nombre);
  const data = logros.map(({ realizado }) => realizado ? 100 : 0);
  new Chart(grafica,{
    type:"bar",
    data:{
      labels,
      datasets:[
        {
          label:"grafica de metas",
          backgroundColor:"#09CaDE",
          data
        }
      ]
    }
  })
}


//Cargar datos apenas carga la pagina
const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  generarParametros(usuario.progresos);
  mostrarResultados(usuario.progresos);
  mostrarGraficaLogros(usuario.logros);
};

cargarDatos();
