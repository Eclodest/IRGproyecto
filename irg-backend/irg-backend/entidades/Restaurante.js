const pool = require('../BBDD/db');

async function crearRestaurante(clave_acceso) {
  const query = `
    INSERT INTO restaurantes (clave_acceso)
    VALUES (?)
  `;
  const [resultado] = await pool.execute(query, [clave_acceso]);

  return {
    id: resultado.insertId,
    clave_acceso
  };
}

async function obtenerRestaurantes() {
  const [rows] = await pool.query('SELECT * FROM restaurantes');
  return rows;
}

module.exports = {
  crearRestaurante,
  obtenerRestaurantes,
};
