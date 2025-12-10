document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------- CARRITO ---------------------------- */

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        const cartCount = document.getElementById("cart-count");

        if (cartCount) {
            const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
            cartCount.textContent = total;
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    actualizarCarrito();


    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("add-to-cart")) {

            const id = parseInt(e.target.dataset.id);

            let prod = carrito.find(p => p.id === id);

            if (prod) {
                prod.cantidad++;
            } else {
                carrito.push({ id, cantidad: 1 });
            }

            actualizarCarrito();
        }
    });


    /* ---------------------------- CARRUSEL ---------------------------- */

    const slides = document.querySelectorAll(".carousel-item");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let index = 0;

    function mostrarSlide(n) {
        slides.forEach(s => s.classList.remove("active"));
        slides[n].classList.add("active");
    }

    if (slides.length > 0) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            mostrarSlide(index);
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            mostrarSlide(index);
        });

        // AUTO-SLIDE cada 3 segundos
        setInterval(() => {
            index = (index + 1) % slides.length;
            mostrarSlide(index);
        }, 3000);
    }

});

