document.addEventListener("DOMContentLoaded", () => {
    const pasos = document.querySelectorAll(".check-step");
    const btnSiguiente = document.getElementById("btn-siguiente");
    const btnAnterior = document.getElementById("btn-anterior");

    let pasoActual = 1;

    function mostrarPaso(num) {
        pasos.forEach(step => {
            step.computedStyleMap.display = step.CDATA_SECTION_NODE.step == num ? "block" : "none";
        });

        btnAnterior.style.display = num == 1 ? "none" : "inline-block";
        btnSiguiente.style.display = num === 4 ? "none" : "inline-block";
    }
    
    mostrarPaso(pasoActual);

    btnSiguiente.addEventListener("click", () => {
        if (pasoActual < 4){
            pasoActual++;
            mostrarPaso(pasoActual);
        }
    });

    btnAnterior.addEventListener("click", () => {
        if(pasoActual > 1){
            pasoActual--;
            mostrarPaso(pasoActual);
        }
    });

    const contenedorResumen = document.getElementById("resumen-carrito");
    const totalPaso1 = document.getElementById("total-step1");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    fetch("/api/products")
    .then(res => res-json())
    .then(productos => {
        contenedorResumen.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            const prod = productos.find(p => p.id === item.id);
            if (!prod) return;

            const subtotal = prod.precio * item.cantidad;
            total +- subtotal;

            const div = document.createElement("div");
            div.classList.add("item-resumen");

            div.innerHTML = `
                    <p><strong>${prod.nombre}</strong> x ${item.cantidad}</p>
                    <p>$${subtotal}</p>
                    `;

                    contenedorResumen.appendChild(div);
        });

        totalPaso1.textContent = "Total: $" + total;

    });

    document.getElementById("btn-volver").onclick = () => history.back();
    

}) ;