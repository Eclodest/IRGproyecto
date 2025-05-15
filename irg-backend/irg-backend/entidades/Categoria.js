const pool = require('../BBDD/db');

async function crearCategoria(nombre_categoria) {
  const query = 'INSERT INTO categorias (nombre_categoria) VALUES (?)';
  const [resultado] = await pool.execute(query, [nombre_categoria]);

  return {
    id: resultado.insertId,
    nombre_categoria
  };
}

async function obtenerCategorias() {
  const [rows] = await pool.query('SELECT * FROM categorias');
  return rows;
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
};
