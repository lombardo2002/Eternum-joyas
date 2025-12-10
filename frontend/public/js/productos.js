document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // ELEMENTOS DEL DOM
    // ================================
    const titulo = document.getElementById("titulo-catalogo");
    const contenedor = document.getElementById("lista-productos");

    // ================================
    // LEER PARÁMETROS DE LA URL
    // ================================
    const params = new URLSearchParams(window.location.search);
    const materialParam = params.get("material");
    const tipoParam = params.get("tipo");

    // ================================
    // CARGAR PRODUCTOS
    // ================================
    fetch("data/products.json")
        .then(res => res.json())
        .then(productos => {

            // Filtrado dinámico escalable
            const filtrados = productos.filter(prod => {
                return (!materialParam || prod.material === materialParam) &&
                       (!tipoParam || prod.tipo === tipoParam);
            });

            // Título dinámico
            if (!materialParam && !tipoParam) {
                titulo.textContent = "Todos los productos";
            } else {
                let t = "";
                if (materialParam) t += materialParam.toUpperCase() + " ";
                if (tipoParam) t += tipoParam.charAt(0).toUpperCase() + tipoParam.slice(1);
                titulo.textContent = t.trim();
            }

            mostrarProductos(filtrados);
        })
        .catch(err => {
            console.error("Error cargando productos:", err);
            titulo.textContent = "Error cargando productos.";
        });
});


// ========================================
// FUNCIÓN PARA MOSTRAR PRODUCTOS
// ========================================
function mostrarProductos(lista) {

    contenedor.innerHTML += `
    <div class="card-producto">
        <img src="${prod.imagen}" alt="${prod.nombre}"
             onclick="location.href='producto.html?id=${prod.id}'"
             class="click-img">

        <h3 onclick="location.href='producto.html?id=${prod.id}'"
            class="click-titulo">${prod.nombre}</h3>

        <p class="desc">${prod.descripcion}</p>
        <p class="precio">$${prod.precio}</p>

        <button onclick="agregarAlCarrito(${prod.id})">
            Agregar al carrito
        </button>
    </div>
`;

}


// ========================================
// ACTIVAR HEADER DESPUÉS DE CARGARLO
// ========================================
document.addEventListener("headerCargado", () => {

    console.log("Header cargado en productos.html");

    // Menú Principal
    const dropdown = document.getElementById("productosDropdown");
    const btn = dropdown?.querySelector(".drop-btn");

    if (btn) {
        btn.addEventListener("click", e => {
            e.preventDefault();
            dropdown.classList.toggle("open");
        });
    }

    // Submenús internos
    document.querySelectorAll(".sub-drop-btn").forEach(boton => {
        boton.addEventListener("click", e => {
            e.preventDefault();
            boton.parentElement.classList.toggle("open");
        });
    });
});
