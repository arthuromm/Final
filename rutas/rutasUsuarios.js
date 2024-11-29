var ruta = require("express").Router();//nombre que quiera a la variable
const { usuarios } = require("../bd/conexion");
//var {Router} = require("express"); //aqui esta la estructuracion llamando a una funcion Router
var { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, modificarUsuario, login, autocompUsers } = require("../bd/usuariosBD");


ruta.post("/login",async(req,res)=>{
    //console.log("rutas");
    
    const usuario=await login(req,req.body.usuario,req.body.password);
    res.json(usuario)//si es de un formulario de req.body si buscas con id es params
});

ruta.get("/mostrarUsuarios",async(req,res)=>{
    //res.send("hola estas en la raiz");las apis es para que una aplicacion la use otro aplicacion
    const usuarios=await mostrarUsuarios();//todas las rutas deben tener un res
    //console.log(usuarios);
    res.json(usuarios);
});

ruta.get("/buscarPorId/:id", async(req, res)=>{//con la /:id es que estoy declarando una varible.
    var usuarioValido= await buscarPorId(req.params.id);//para recuperar una variable en el url es params.
    res.json(usuarioValido);
});
//el metodo get es el que se puede usar en el navegador
ruta.delete("/borrarUsuario/:id",async(req,res)=>{
    var borrado=await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

ruta.post("/autocompletar", async (req,res)=> res.json([req.body.hint,...await autocompUsers(req.body.hint)]));

ruta.put("/modificarUsuario/:id", async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const resultado = await modificarUsuario(id, datosNuevos);
    res.json(resultado);
});


module.exports=ruta; 