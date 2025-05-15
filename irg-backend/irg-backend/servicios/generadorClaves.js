const crypto = require('crypto');

// Función para generar una clave única aleatoria
const generarClaveUnica = () => {
  return crypto.randomBytes(16).toString('hex'); // Esto genera un string de 32 caracteres aleatorios
};

module.exports = generarClaveUnica;