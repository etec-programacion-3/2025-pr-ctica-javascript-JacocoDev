// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL); // Realiza una petición GET
    const products = res.data; // Axios retorna los datos en la propiedad 'data'
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;
      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      // Crea el botón de eliminar y llama a deleteProduct
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = e => {
        e.stopPropagation(); // Evita que se dispare el evento de detalles
        deleteProduct(prod.id).then(fetchProducts);
      };
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error al obtener productos');
  }
}

// EJERCICIO 1: Crear producto
// Completa esta función para enviar los datos del formulario usando axios POST
async function createProduct(name, price, description) {
  try {
    // Envia los datos al backend con POST
    await axios.post(BASE_URL, { name, price, description });
  } catch (err) {
    // Muestra mensaje si hay error
    alert('Error al crear producto');
  }
}

// EJERCICIO 2: Eliminar producto
// Completa esta función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    // Hace DELETE a /api/products/:id
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    // Muestra mensaje si hay error
    alert('Error al eliminar producto');
  }
}

// EJERCICIO 3: Ver detalles de producto
// Completa esta función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    // Hace GET a /api/products/:id y guarda la respuesta
    const res = await axios.get(`${BASE_URL}/${id}`);
    const prod = res.data;

    // Muestra los detalles con un alert
    alert(`Producto: ${prod.name}\nPrecio: $${prod.price}\nDescripción: ${prod.description}`);
  } catch (err) {
    // Muestra mensaje si hay error
    alert('Error al obtener detalles del producto');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // Llama a la función de crear producto
  await createProduct(name, price, description);
  form.reset();
  fetchProducts();
};

// Llama a la función para mostrar los productos al cargar la página
fetchProducts(); 