document.addEventListener("headerCargado", () => {

    // ------ Abrir/cerrar menú Productos ------
    const productoDropdown = document.getElementById("productosDropdown");
    const productosBtn = productoDropdown.querySelector(".drop-btn");

    productosBtn.addEventListener("click", (e) => {
        e.preventDefault();
        productoDropdown.classList.toggle("open");
    });

    // ------ Abrir/cerrar submenús internos ------
    document.querySelectorAll(".sub-drop-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            btn.parentElement.classList.toggle("open");
        });
    });

    // ------ Cerrar menú si clickeás afuera ------
    document.addEventListener("click", (e) => {
        if (!productoDropdown.contains(e.target)) {
            productoDropdown.classList.remove("open");
            document.querySelectorAll(".sub-item.open")
                .forEach(i => i.classList.remove("open"));
        }
    });
});
