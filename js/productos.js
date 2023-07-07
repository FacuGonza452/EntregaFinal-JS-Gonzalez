// Array de productos
const productos = [
  {
    id: 1,
    nombre: 'Arroz Oro',
    precio: 20
  },
  {
    id: 2,
    nombre: 'Coca Cola 2.25 L',
    precio: 15
  },
  {
    id: 3,
    nombre: 'Fideos Molto',
    precio: 18
  },
  {
    id: 4,
    nombre: 'Galletas Melba',
    precio: 10
  },
  {
    id: 5,
    nombre: 'Galletas Oreo',
    precio: 14
  },
  {
    id: 6,
    nombre: 'Salsa de tomate Salsati',
    precio: 22
  }
];

// Función para añadir productos al carrito
function addToCart(productId) {
  const producto = productos.find(p => p.id === productId);

  if (producto) {
    console.log(`Producto añadido al carrito: ${producto.nombre}`);
  }
}

// Filtrar productos por rango de precios
function filtrarProductos(precioMinimo, precioMaximo) {
  const productosFiltrados = productos.filter(p => p.precio >= precioMinimo && p.precio <= precioMaximo);
  console.log('Productos filtrados por rango de precios:');
  console.log(productosFiltrados);
}

// Buscar productos por nombre
function buscarProducto(nombre) {
  const productosEncontrados = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
  console.log('Productos encontrados:');
  console.log(productosEncontrados);
}
