import { products } from "./productos.js";  // Asegúrate de que el array de productos esté correctamente importado

// Obtener el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log("Product ID:", productId); // Esto te ayudará a verificar si el ID se está pasando correctamente

// Buscar el producto correspondiente
const product = products.find(p => p.id === Number(productId));
console.log(product);

if (product) {
  // Cargar la información del producto en la página
  document.querySelector('.d-product-img img').src = product.image;
  document.querySelector('.d-product-img img').alt = product.title;
  document.querySelector('.category').textContent = `${product.category} >`;
  document.querySelector('strong').textContent = product.title;
  document.querySelector('.details').textContent = product.description || "Descripción no disponible";
  document.querySelector('.price').textContent = `${product.price}$`;
  // colocale Hola quiero comprar el producto y el nombre del producto y el precio
  document.querySelector('.buy').href = `https://wa.me/584121179225?text=Hola!%20Quiero%20comprar%20el%20producto%20${product.title}%20con%20precio%20de%20${product.price}$`;
} else {
  // Si no se encuentra el producto, mostrar un mensaje de error
  document.querySelector('.d-product-text').innerHTML = "<p>Producto no encontrado.</p>";
}
