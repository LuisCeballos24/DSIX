const carrito = [];

const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Función para agregar productos al carrito
function agregarProducto(e) {
  console.log('agregarProducto');
  e.preventDefault();
  const id = parseInt(e.target.getAttribute('data-id'));
  console.log('id', id);
  const producto = productos.find(producto => producto.id === id);
  console.log('producto', producto);
  carrito.push(producto);
  console.log('carrito', carrito);
  actualizarCarrito();
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
  console.log('actualizarCarrito');
  const carritoContainer = document.getElementById('carrito');
  console.log('carritoContainer', carritoContainer);
  if (carritoContainer) {
    let total = 0;
    carritoContainer.innerHTML = '';
    carrito.forEach(producto => {
      const item = document.createElement('li');
      item.innerText = `${producto.nombre} - $${producto.precio}`;
      carritoContainer.appendChild(item);
      total += producto.precio;
    });
    const totalElement = document.createElement('li');
    totalElement.innerText = `Total: $${total}`;
    carritoContainer.appendChild(totalElement);
  }
}

// Agregar evento click a los botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', agregarProducto);
});