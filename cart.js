document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById('cart');
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const cartProductsContainer = document.getElementById('cart-products');
    const buyNowButton = document.getElementById('buy-now');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar u ocultar el carrito desplegable
    cartIcon.addEventListener("click", (event) => {
        event.preventDefault();
        cartList.style.display = (cartList.style.display === "none" || cartList.style.display === "") ? "block" : "none";
    });

    // Actualizar la cantidad de productos en el carrito
    function updateCartCount() {
        if (cart.length > 0) {
            const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
            cartCount.textContent = totalQuantity;
            cartCount.style.display = "inline"; // Mostrar el contador
        } else {
            cartCount.style.display = "none"; // Ocultar el contador cuando está vacío
        }
    }

    // Actualizar la vista del carrito
    function updateCartView() {
        cartProductsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartProductsContainer.innerHTML = "<p>Tu carrito está vacío...</p>";
            return;
        }

        let totalPrice = 0; // Variable para calcular el precio total

        cart.forEach((item, index) => {
            const itemTotalPrice = item.quantity * item.price;
            totalPrice += itemTotalPrice; // Sumar el total al precio global

            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <span class="cart-product-quantity">${item.quantity}</span>
                <span class="cart-product-name">${item.title}</span>
                <span class="cart-product-price">${itemTotalPrice.toFixed(2)}$</span>
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartProductsContainer.appendChild(productDiv);
        });

        // Mostrar el total en el carrito
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total');
        totalDiv.innerHTML = `
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}$</span>
        `;
        cartProductsContainer.appendChild(totalDiv);

        // Agregar evento para eliminar productos o reducir la cantidad
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartView();
                updateCartCount();
            });
        });
    }

    // 📩 Evento para comprar por WhatsApp
    buyNowButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        let message = "Hola! Quiero comprar los siguientes productos:%0A";
        cart.forEach(item => {
            message += `${item.quantity} - ${item.title} - ${item.price}$%0A`;
        });

        // Vaciar el carrito en el localStorage después de hacer clic en comprar
        localStorage.removeItem('cart');
        
        // Actualizar la vista del carrito a vacío
        updateCartView();

        // Redirigir a WhatsApp
        window.location.href = `https://wa.me/584248309511?text=${message}`;
    });

    updateCartCount(); // Actualiza el contador al cargar la página
    updateCartView(); // Actualiza la vista del carrito
});
