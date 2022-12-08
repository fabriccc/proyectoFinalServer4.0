
// Tarea pendientes:
// 1. agregar logro a usuario
// 2. modificar logro y notificar cuando se logra la meta
// 3. cargar grafica de metas en progreso
import { obtenerLogro, obtenerLogros, obtenerUsuario, actualizarUsuario } from "./servicios.js";

const inputSelect = document.getElementById('select');
const inputPesoObjetivo = document.getElementById('peso-objetivo');
const historialLogros = document.getElementById('historial-logros');
const agregarLogroBoton = document.getElementById('agregar-logro');

agregarLogroBoton.addEventListener('click', async () => {
  await agregarLogroUsuario();
  inputPesoObjetivo.value = '';
})

const generarTiposDeLogros = async (usuarioLogros) => {
  inputSelect.innerHTML = '';
  const logros = await obtenerLogros();
  logros.forEach(logro => {
    const existeLogroEnUsuario = usuarioLogros?.find(({ logro: logroUsuario }) => logroUsuario?.nombre === logro.nombre);
    if (!existeLogroEnUsuario) {
        const nuevoHTML = `<option id="${logro.nombre}}">${logro.nombre}</option>`;
        inputSelect.insertAdjacentHTML('beforeend', nuevoHTML);
    }
  });

  if (!inputSelect.childElementCount) {
    inputSelect.disabled = true;
    inputPesoObjetivo.disabled = true;
  }
}

const generarHistorialLogros = async (usuarioLogros) => {
  historialLogros.innerHTML = '';
  usuarioLogros?.forEach(logroUsuario => {
    const nuevoHTML = `<div>${logroUsuario?.logro?.nombre} a ${logroUsuario.pesoObjetivo} - ${logroUsuario?.realizado ? 'logrado' : 'sin lograr'}</div>`
    historialLogros.insertAdjacentHTML('beforeend', nuevoHTML);
  });
}

const agregarLogroUsuario = async () => {
  if (inputSelect.value && inputPesoObjetivo.value) {
    const nombre = inputSelect.value;
    const pesoObjetivo = inputPesoObjetivo.value;
    const datosUsuario = await obtenerUsuario();
    const logro = await obtenerLogro(nombre);
    const existeLogroEnUsuario = datosUsuario?.logros?.find(({ logro: logroUsuario }) => logroUsuario?.nombre === logro?.nombre);
    if (!existeLogroEnUsuario) {
      datosUsuario.logros.push({
        logro,
        pesoObjetivo,
        realizado: false
      });
    }

    const headers = { 'Content-Type': 'application/json' }
    const usuario = await actualizarUsuario(JSON.stringify(datosUsuario), headers);
    await generarTiposDeLogros(usuario?.logros);
    await generarHistorialLogros(usuario?.logros);
  }
}

const cargarDatos = async () => {
  const usuario = await obtenerUsuario();
  await generarTiposDeLogros(usuario?.logros);
  await generarHistorialLogros(usuario?.logros);
}

cargarDatos();
