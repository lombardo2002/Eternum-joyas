document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("detalle-producto");

    // Obtener ID desde la URL
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        contenedor.innerHTML = "<p>ID de producto no encontrado.</p>";
        return;
    }

    // Cargar todos los productos
    fetch("data/products.json")
        .then(res => res.json())
        .then(productos => {
            const prod = productos.find(p => p.id == id);

            if (!prod) {
                contenedor.innerHTML = "<p>Producto no encontrado.</p>";
                return;
            }

            // Mostrar info
            contenedor.innerHTML = `
                <div class="producto-detalle">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    
                    <div class="info">
                        <h2>${prod.nombre}</h2>
                        <p class="descripcion">${prod.descripcion}</p>
                        <p class="precio">$${prod.precio}</p>

                        <button onclick="agregarAlCarrito(${prod.id})">
                            Agregar al carrito
                        </button>

                        <a href="productos.html">
                            <button class="volver">Volver</button>
                        </a>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            contenedor.innerHTML = "<p>Error al cargar el producto.</p>";
        });
});
