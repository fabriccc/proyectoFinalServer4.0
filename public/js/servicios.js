const URL_BASE = 'http://localhost:3000'

export function obtenerUsuarioDelLocalStorage() {
  return JSON.parse(localStorage.getItem("usuario"));
}

export function editarUsuarioEnLocalStorage(usuario) {
  return localStorage.setItem("usuario", JSON.stringify(usuario));
}

export function borrarUsuarioDelLocalStorage() {
  return localStorage.removeItem("usuario");
}

export async function obtenerUsuario(correo) {
  let url = `${URL_BASE}/usuarios/buscar-por/`
  if (correo) {
    url = url + correo;
  } else {
    const usuarioActual = obtenerUsuarioDelLocalStorage();
    url = url + usuarioActual?.correo;
  }
  const usuario = await (await fetch(url)).json();
  return usuario;
}

export async function actualizarUsuario(body, headers) {
  const usuario = await (await fetch(`${URL_BASE}/usuarios/modificar`, {
    method: 'PUT',
    body,
    headers
  })).json();
  return usuario;
}

export async function obtenerLogros() {
  const logros = await (await fetch(`${URL_BASE}/logros`)).json();
  return logros;
}

export async function obtenerLogro(nombreLogro) {
  const logro = await (await fetch(`${URL_BASE}/logros/${nombreLogro}`)).json();
  return logro;
}
