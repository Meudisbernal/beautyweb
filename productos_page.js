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
  document.querySelector('.buy').href = `https://wa.me/584248309511?text=☆Hola!%20Quiero%20comprar%20el%20producto%20${product.title}%20con%20precio%20de%20${product.price}$`;
} else {
  // Si no se encuentra el producto, mostrar un mensaje de error
  document.querySelector('.d-product-text').innerHTML = "<p>Producto no encontrado.</p>";
  document.querySelector('.d-product-img img').src = "";
}







// Sección del Shopping Cart 🛒

// Referencia a los elementos del carrito
const cartButton = document.getElementById('add-to-cart');
const cartIcon = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartProductsContainer = document.getElementById('cart-products');
const buyNowButton = document.getElementById('buy-now');

// Obtener el carrito del localStorage o inicializarlo vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el contador del carrito
function updateCartCount() {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;  // Contar todas las unidades de productos
    });
    cartCount.textContent = totalItems;
}

// Función para actualizar la vista del carrito  🔄🛒
function updateCartView() {
    console.log("Actualizando la vista del carrito"); // Consola de depuración
    cartProductsContainer.innerHTML = ""; // Limpiar la vista
    let totalPrice = 0; // Variable para acumular el total
  
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        console.log("El carrito está vacío"); // Consola de depuración
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-cart-message');
        emptyMessage.innerHTML = 'Tu carrito está vacío...';
        cartProductsContainer.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            // Calcular totalPrice si no existe
            if (!item.totalPrice) {
                item.totalPrice = item.quantity * item.price;
            }
  
            // Sumar el precio total
            totalPrice += item.totalPrice;
  
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <span class="cart-product-quantity">${item.quantity}</span>
                <span class="cart-product-name">${item.title}</span>
                <span class="cart-product-price">${item.totalPrice.toFixed(2)}$</span>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartProductsContainer.appendChild(productDiv);
        });
  
        // Agregar el total al final
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total');
        totalDiv.innerHTML = `
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}$</span>
        `;
        cartProductsContainer.appendChild(totalDiv);
    }
  
    // Guardar carrito corregido en localStorage para evitar futuros errores
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Agregar eventos para eliminar productos
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemIndex = event.target.getAttribute('data-index');
  
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
                cart[itemIndex].totalPrice = cart[itemIndex].quantity * cart[itemIndex].price;
            } else {
                cart.splice(itemIndex, 1);
            }
  
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartView();
        });
    });
}

// Asegurarse de que la vista del carrito y el contador se actualicen después de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Actualizar el contador total de productos
    updateCartView();  // Actualizar la vista del carrito
});

// Evento para agregar un producto al carrito 🧴🛒
cartButton.addEventListener('click', (event) => {
    event.preventDefault();

    const productId = product.id;
    const productTitle = product.title;
    const productPrice = parseFloat(product.price); // Convertir el precio a número

    // Buscar si el producto ya está en el carrito
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Si el producto ya existe, aumentar cantidad y actualizar precio total
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * productPrice;
    } else {
        // Si es un producto nuevo, agregarlo con cantidad 1 y totalPrice
        cart.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            quantity: 1,
            totalPrice: productPrice // Asegurar que totalPrice tenga valor
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage

    updateCartCount(); // Actualizar el contador total de productos
    updateCartView();  // Actualizar la vista del carrito
});

// Evento para mostrar/ocultar el carrito al hacer clic en el icono ✔🛒❌
cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    // Asegurar que la vista del carrito se actualice cada vez que se abra
    updateCartView();
    cartList.style.display = (cartList.style.display === 'none' || cartList.style.display === '') ? 'block' : 'none';
});

// ** NUEVO: Evento para vaciar el carrito cuando se haga clic en el botón de WhatsApp **

document.addEventListener("DOMContentLoaded", () => {
    const buyButton = document.querySelector('.buy'); 

    if (buyButton) {
        buyButton.addEventListener('click', () => {
            setTimeout(() => {
                cart = [];  // Vaciar el carrito
                localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito vacío en localStorage
                updateCartCount();  // Actualizar el contador
                updateCartView();   // Reflejar que el carrito está vacío
            }, 1000); // 1 segundo de retraso para permitir la redirección
        });
    }
});


// Evento para comprar por WhatsApp 📩
document.addEventListener("DOMContentLoaded", () => {
    const buyNowButton = document.querySelector('#buy-now'); // Asegúrate de que el selector es correcto

    if (!buyNowButton) {
        console.error("Error: No se encontró el botón #buy-now");
        return;
    }

    buyNowButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        let message = "☆ Hola! Quiero comprar los siguientes productos:%0A";

        cart.forEach(item => {
            message += `- ${item.quantity} : ${item.title} - ${item.price}$%0A`;
        });

        // Guardar el carrito vacío ANTES de redirigir a WhatsApp
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartView();

        // Redirigir a WhatsApp después de 1 segundo
        setTimeout(() => {
            window.location.href = `https://wa.me/584148362822?text=${message}`;
        }, 500);
    });
});











