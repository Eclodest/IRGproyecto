const express = require('express');
const router = express.Router();
const {
  registrarRestaurante,
  loginRestaurante
} = require('../controladores/ControladorRestaurante');

// Ruta para registrar restaurante
router.post('/registro', registrarRestaurante);

// Ruta para login de restaurante
router.post('/login', loginRestaurante);

module.exports = router;
