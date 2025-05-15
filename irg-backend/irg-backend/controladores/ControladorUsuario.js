// Valida datos
// Peticiones HTTP
// Guardar o buscar datos

const usuarioService = require('../servicios/Registro');

async function crearUsuario(req, res) {
  const { nombre, apellidos, telefono, ciudad } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !apellidos || !telefono || !ciudad) {
    return res.status(400).json({
      error: 'Todos los campos son necesarios: nombre, apellidos, teléfono, y ciudad.',
    });
  }

  try {
    const usuario = await usuarioService.registrarUsuario({ nombre, apellidos, telefono, ciudad });
    res.status(201).json({ success: true, data: usuario }); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message }); 
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.status(200).json({ success: true, data: usuarios }); 
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  crearUsuario,
  listarUsuarios,
};
