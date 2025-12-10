// Cargar el header automaticamente en cada página
document.addEventListener("DOMContentLoaded", () => {

    const headerEl = document.getElementById("header");
    if (headerEl) {
        fetch("./partials/header.html")
        .then(res => res.text())
        .then(html => {
            headerEl.innerHTML = html;

            document.dispatchEvent(new Event ("headerCargado"));
        })

    }

    const footerEl = document.getElementById("footer");
    if (footerEl) {
        fetch("./partials/footer.html")
        .then(res => res.text())
        .then(html => {
            footerEl.innerHTML = html;
        })
        .catch(err => console.error("Error cargando FOOTER:", err));
    }

});