// Definir las rutas y conectar con controladores
// Centralizar todas las rutas

const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controladores/ControladorUsuario');

// Ruta para crear un nuevo usuario
router.post('/', usuarioControlador.crearUsuario); // POST /usuarios

// Ruta para listar todos los usuarios
router.get('/', usuarioControlador.listarUsuarios); // GET /usuarios

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioControlador.obtenerUsuarioPorId); // GET /usuarios/:id

// Eliminar usuario por ID
router.delete('/:id', usuarioControlador.borrarUsuario); // DELETE /usuarios/:id

module.exports = router;