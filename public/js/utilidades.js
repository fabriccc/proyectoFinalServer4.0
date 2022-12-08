
//CAMBIO FORMATO DE FECHA
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function generarInformacion(usuario){
    Object.keys(usuario).forEach(key =>{
        const input= document.getElementById(key);

        if(input){
            switch(key) {
                case 'nacimiento':
                    input.value = formatDate(usuario[key]);
                    break;
                case 'foto':
                    input.src = usuario[key].secure_url || "../img/icono_equipo.png";
                    break;
                default:
                    input.value = usuario[key];
                    break;
            }
        }
    })
}

export function redireccionar(url) {
    return window.location.href = `http://localhost:3000/html/${url}`;
}

export function alertaLogroObtenido(logro){
    console.log('Notification.permission', Notification.permission)
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission();
    }

    if (Notification.permission === 'granted') {
        // Si está bien vamos a crear una notificación
        // Primero vamos a crear una variables las
        // cuales forman nuestra norificación
        var body = `Haz alcanzado ${logro.nombre} a ${logro.pesoObjetivo}. Felicidades!! Click para ver tus logros.`;
        // var icon = "https://www.quecodigo.com/img/qc_logo.jpg";
        var title = "Notificación";
        var options = {
            body: body,      //El texto o resumen de lo que deseamos notificar.
            // icon: icon,      //El URL de una imágen para usarla como icono.
            lang: "ES",      //El idioma utilizado en la notificación.
            tag: 'notify',   //Un ID para el elemento para hacer get/set de ser necesario.
            // dir: 'auto',     // izquierda o derecha (auto).
            renotify: "true" //Se puede volver a usar la notificación, default: false.
        }
        // Creamos la notificación con las opciones que pusimos arriba.
        var notification = new Notification(title,options);
        console.log('notification',notification)
        notification.onclick= function() {
            redireccionar('h-logros.html');
        }
        // Cerramos la notificación.
        setTimeout(notification.close.bind(notification), 6000);
    }
}
