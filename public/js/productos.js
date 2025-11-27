document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("lista-productos");

        // Crear las tarjetas de producto
        data.forEach(producto => {

            const item = document.createElement("div");
            item.classList.add("producto-card");

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>${producto.descripcion}</p>
                
                <button class="btn-agregar" data-id="${producto.id}">
                Agregar al carrito
                </button>
                `;


                contenedor.appendChild(item);
             });

                    document.addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-agregar")) {
                    const idProducto = e.target.getAttribute("data-id");
                    agregarAlCarrito(idProducto);
                }
            });

            function agregarAlCarrito(id) {
                //convertimos el id en num para evitar errores de comparacion
                id = Number(id)

                //1. Leer el carrito actual (si no existe, crear uno al vacío)
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                
                //2.Buscar si ya existe ese prod en el carrito
                const productoExiste = carrito.find(item => item.id === id);

                if (productoExiste) {
                    // Si ya esta, aumentamos la cantidad
                    productoExiste.cantidad +=1 ;
                } else{
                    //Si no esta, lo agregamos con cantidad 1 
                    carrito.push({
                        id: id,
                        cantidad: 1
                    });
                }

                //3. guardar de nuevo en el localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));

                console.log("Carrito actualizado:", carrito);

                
            }
    });
});