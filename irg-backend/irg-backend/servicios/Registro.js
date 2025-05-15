// servicios/usuarioService.js
const { registrarUsuario: registrarEnDB, obtenerUsuarios: obtenerDeDB } = require('../entidades/Usuario');


// Registrar un nuevo usuario
async function registrarUsuario(data) {
  // Validación de los datos
  if (!data.nombre || !data.apellidos || !data.telefono || !data.ciudad) {
    throw new Error('Todos los campos son requeridos: nombre, apellidos, telefono y ciudad');
  }

  try {
    // Insertar usuario en MySQL
    return await registrarEnDB(data);
  } catch (error) {
    throw new Error('Error al guardar el usuario: ' + error.message);
  }
}

async function obtenerUsuarios() {
  try {
    return await obtenerDeDB();
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
}

module.exports = {
  registrarUsuario,
  obtenerUsuarios,
};
