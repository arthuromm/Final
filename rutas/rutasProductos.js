var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, modificarProducto, autocompProducts } = require("../bd/productosBD");

ruta.get("/mostrarProductos", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

ruta.post("/autocompletar", async (req,res)=> res.json([req.body.hint,...await autocompProducts(req.body.hint)]));

ruta.put("/modificarProducto/:id", async (req, res) => {
    const productoModificado = await modificarProducto(req.params.id, req.body);
    res.json(productoModificado);
});

module.exports = ruta;
