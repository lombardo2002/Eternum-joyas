const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
const productsRoutes = require("./routes/products");

app.use("/api/products", productsRoutes);
// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

