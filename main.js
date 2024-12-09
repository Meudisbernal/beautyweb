import { products } from "./productos.js";


const productContainer = document.getElementById("productContainer");


function renderProducts() {

  productContainer.innerHTML = "";

  // Recorrer el arreglo de productos y crear el HTML
  products.forEach((product) => {
    const productHTML = `
      <div class="new-product-box-wrapper ${product.category.toLowerCase()}">
        <div class="new-product-box">
           <!-- Imagen -->
          <a href="product_page.html?id=${product.id}" class="new-product-img" data-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" />
            <span>${product.category}</span>
          </a>
          <!-- Texto -->
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
  // Selecciona todos los enlaces de productos
  const productLinks = document.querySelectorAll(".new-product-img");

  productLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); 

      const productId = link.getAttribute("data-id");

      // Busca el producto correspondiente en el array
      const selectedProduct = products.find(
        (product) => product.id === parseInt(productId)
      );

      if (selectedProduct) {
        // Guarda el producto en localStorage
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

        // Redirige a la página del producto
        window.location.href = "product_page.html";
      }
    });
  });
});




