const carrito = [];

const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 },
  { id: 4, nombre: 'Producto 4', precio: 40 },
  { id: 5, nombre: 'Producto 5', precio: 50 },
  { id: 6, nombre: 'Producto 6', precio: 60 }
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
      const fila = document.createElement('tr');

      const celdaProducto = document.createElement('td');
      celdaProducto.innerText = producto.nombre;
      fila.appendChild(celdaProducto);

      const celdaCantidad = document.createElement('td');
      celdaCantidad.innerText = 1;
      fila.appendChild(celdaCantidad);

      const celdaPrecio = document.createElement('td');
      celdaPrecio.innerText = `$${producto.precio}`;
      fila.appendChild(celdaPrecio);

      const celdaTotal = document.createElement('td');
      celdaTotal.innerText = `$${producto.precio}`;
      fila.appendChild(celdaTotal);

      const celdaEliminar = document.createElement('td');
      const botonEliminar = document.createElement('button');
      botonEliminar.innerText = 'Eliminar';
      botonEliminar.addEventListener('click', () => eliminarProducto(producto.id));
      celdaEliminar.appendChild(botonEliminar);
      fila.appendChild(celdaEliminar);

      carritoContainer.appendChild(fila);

      total += producto.precio;
    });
    const totalElement = document.getElementById('total');
    totalElement.innerText = `$${total.toFixed(2)}`;
  }
}

function eliminarProducto(e) {
  console.log('eliminarProducto');
  const id = e;
  console.log('id', id);
  const index = carrito.findIndex(producto => producto.id === id);
  console.log('index', index);
  if (index !== -1) {
    carrito.splice(index, 1);
    console.log('carrito', carrito);
    actualizarCarrito();
  }
}
// Agregar evento click a los botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', agregarProducto);
});