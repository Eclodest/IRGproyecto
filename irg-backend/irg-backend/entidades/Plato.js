const pool = require('../BBDD/db');

async function crearPlato({ nombre_plato, tipo, id_categoria, id_restaurante }) {
  const query = `
    INSERT INTO platos (nombre_plato, tipo, id_categoria, id_restaurante)
    VALUES (?, ?, ?, ?)
  `;
  const [resultado] = await pool.execute(query, [nombre_plato, tipo, id_categoria, id_restaurante]);

  return {
    id: resultado.insertId,
    nombre_plato,
    tipo,
    id_categoria,
    id_restaurante
  };
}

async function obtenerPlatos() {
  const [rows] = await pool.query('SELECT * FROM platos');
  return rows;
}

module.exports = {
  crearPlato,
  obtenerPlatos,
};
