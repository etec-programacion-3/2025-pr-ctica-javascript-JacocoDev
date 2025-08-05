// Componente Tarjeta: genera un elemento visual para mostrar información
export function Tarjeta({ titulo, contenido }) {
  const div = document.createElement('div');
  div.className = 'tarjeta';
  div.innerHTML = `<h2>${titulo}</h2><p>${contenido}</p>`;
  return div;
}

// EJERCICIO: Completa el componente Formulario para que sea reutilizable
export function Formulario({ onSubmit }) {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" name="dato" placeholder="Dato" required />
    <button type="submit">Enviar</button>
  `;
  form.onsubmit = e => {
    e.preventDefault();
    const dato = form.dato.value;
    onSubmit(dato);
    form.reset();
  };
  return form;
}

// Montaje de componentes en la página
const app = document.getElementById('app');

// EJERCICIO: Crea una función mostrarTarjeta que reciba un dato y agregue una tarjeta al DOM
function mostrarTarjeta(dato) {
  app.appendChild(Tarjeta({ titulo: 'Dato enviado', contenido: dato }));
}

// EJERCICIO: Monta el formulario en la página y pásale la función mostrarTarjeta como callback
app.appendChild(Formulario({ onSubmit: mostrarTarjeta }));