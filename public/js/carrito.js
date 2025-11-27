document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-container");
    const totalTexto = document.getElementById("total");

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        totalTexto.textContent = "";
        return;
    }

    fetch("/api/products")
        .then(res => res.json())
        .then(productos => {

            function actualizarTotal() {
                let total = carrito.reduce((acc, item) => {
                    const prod = productos.find(p => p.id === item.id);
                    return acc + (prod.precio * item.cantidad);
                }, 0);

                totalTexto.textContent = "TOTAL: $" + total;
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }

            function renderCarrito() {
                contenedor.innerHTML = "";

                carrito.forEach(itemCarrito => {
                    const producto = productos.find(p => p.id === itemCarrito.id);
                    if (!producto) return;

                    const div = document.createElement("div");
                    div.classList.add("carrito-item");

                    div.innerHTML = `
                        <img src="${producto.imagen}" class="img-item">

                        <div class="info">
                            <h3>${producto.nombre}</h3>
                            <p class="precio">$${producto.precio}</p>

                            <div class="cantidad-box">
                                <button class="btn-cantidad" data-id="${producto.id}" data-op="restar">–</button>
                                <span>${itemCarrito.cantidad}</span>
                                <button class="btn-cantidad" data-id="${producto.id}" data-op="sumar">+</button>
                            </div>

                            <p class="subtotal">Subtotal: $${producto.precio * itemCarrito.cantidad}</p>
                        </div>
                    `;

                    contenedor.appendChild(div);
                });

                actualizarTotal();
            }

            contenedor.addEventListener("click", e => {

                if (!e.target.classList.contains("btn-cantidad")) return;

                const id = parseInt(e.target.dataset.id);
                const operacion = e.target.dataset.op;

                const item = carrito.find(p => p.id === id);

                if (operacion === "sumar") {
                    item.cantidad++;
                } else if (operacion === "restar" && item.cantidad > 1) {
                    item.cantidad--;
                }

                renderCarrito();
            });

            renderCarrito();
        });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        window.location.reload();
    });

    document.getElementById("finalizar").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
});
