// Actualiza el contador del carrito cuando el header es cargado vía include.js
document.addEventListener("DOMContentLoaded", () => {
    function actualizarContador() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cartCount = document.getElementById("cart-count");

        if (cartCount) {
            cartCount.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        }
    }

    // Esperar un pequeño tiempo a que include.js inserte el header
    setTimeout(actualizarContador, 100);
});
