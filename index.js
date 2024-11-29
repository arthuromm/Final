const express = require("express");
const cors = require("cors");
const session = require("express-session");

// Importación de rutas existentes
const usuariosRutas = require("./rutas/rutasUsuarios");
const productosRutas = require("./rutas/rutasProductos");

// Importación de la nueva ruta para ventas
const ventasRutas = require("./rutas/rutasVentas");

const app = express();

// Configuración de middlewares
app.use(express.urlencoded({ extended: true })); // Aceptar datos de formulario
app.use(express.json()); // Aceptar JSON en el cuerpo de la solicitud
app.use(cors()); // Permitir peticiones desde cualquier origen
app.use(session({
    secret:"dfghjkjhgftgy",
    resave:true,
    saveUninitialized: true,
    cookie: {secure:true}
}));
// Rutas
app.use("/usu", usuariosRutas);  // Rutas para usuarios
app.use("/prod", productosRutas); // Rutas para productos
app.use("/vent", ventasRutas);  // Rutas para ventas

// Configuración del puerto del servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
