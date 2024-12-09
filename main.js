import { products } from "./productos.js";

const productContainer = document.getElementById("productContainer");

function renderProducts() {
  productContainer.innerHTML = "";
  
  products.forEach((product) => {
    const productHTML = `
      <div class="new-product-box-wrapper ${product.category.toLowerCase()}">
        <div class="new-product-box">
          <a href="product_page.html?id=${product.id}" class="new-product-img">
            <img src="${product.image}" alt="${product.title}" />
            <span>${product.category}</span>
          </a>
          <div class="new-product-text">
            <a href="product_page.html?id=${product.id}" class="new-product-title">${product.title}</a>
            <span class="new-producto-price">${product.price}$</span>
            <a href="#" class="new-p-cart-btn">Add To Cart</a>
          </div>
        </div>
      </div>
    `;
    
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}

renderProducts();


//Evento para capturar el clic del producto y guarda los datos del producto 


document.addEventListener("DOMContentLoaded", () => {
  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')); // Convertir a número
  
  // Buscar el producto
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Actualizar el contenido de la página
    const productImg = document.querySelector('.d-product-img img');
    const category = document.querySelector('.category');
    const title = document.querySelector('.d-product-text strong');
    const details = document.querySelector('.details');
    const price = document.querySelector('.price');
    const buy = document.querySelector('.buy');
    
    productImg.src = product.image;
    productImg.alt = product.title;
    category.textContent = `${product.category} >`;
    title.textContent = product.title;
    details.textContent = product.description || "Sin descripción disponible";
    price.textContent = `${product.price}$`;
    buy.href = `https://wa.me/5491123456789?text=Hola!%20Quiero%20comprar%20el%20producto%20${product.title}`;
  } else {
    console.error('Producto no encontrado');
    // Mostrar mensaje de error en la página
    document.querySelector('.d-product-text').innerHTML = 
      '<p>Lo sentimos, no se encontró el producto.</p>';
  }
});



