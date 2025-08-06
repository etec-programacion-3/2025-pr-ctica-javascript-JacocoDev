// EJERCICIO: Instala la dependencia dayjs con npm y úsala para mostrar la fecha, con TODOs y comentarios guía.
import dayjs from "dayjs";

// TODO: Usa dayjs para obtener la fecha y hora actual y mostrarla en el DOM
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
document.body.innerHTML = `<h1>Fecha y hora actual (con dayjs):</h1><p>${now}</p>`;

// Puedes ejecutar este archivo con Vite y ver el resultado en el navegador