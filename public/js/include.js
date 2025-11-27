// Cargar el header automaticamente en cada página
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header");

    if(headerContainer){
        fetch("/partials/header.html")
        .then(res => res.text())
        .then(html => {
            headerContainer.innerHTML = html;
        });
    }
});