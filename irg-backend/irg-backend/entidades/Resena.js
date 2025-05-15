const pool = require('../BBDD/db');

async function crearResenia(data) {
  const {
    id_usuario, id_plato,
    p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
    p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
  } = data;

  const total = p1_satisfaccion + p2_satisfaccion + p3_satisfaccion + p4_satisfaccion + p5_satisfaccion;
  const promedio = parseFloat((total / 5).toFixed(2));

  const query = `
    INSERT INTO resenas (
      id_usuario, id_plato,
      p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
      p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
      promedio_estrellas
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id_usuario, id_plato,
    p1_satisfaccion, p2_satisfaccion, p3_satisfaccion, p4_satisfaccion, p5_satisfaccion,
    p1_texto, p2_texto, p3_texto, p4_texto, p5_texto,
    promedio
  ];

  const [resultado] = await pool.execute(query, values);

  return {
    id: resultado.insertId,
    ...data,
    promedio_estrellas: promedio
  };
}

async function obtenerResenias() {
  const [rows] = await pool.query('SELECT * FROM resenas');
  return rows;
}

module.exports = {
  crearResenia,
  obtenerResenias,
};
