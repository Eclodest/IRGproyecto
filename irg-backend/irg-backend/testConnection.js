// testConnection.js
const pool = require('./BBDD/db');

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión exitosa a MySQL');
    connection.release();  // Asegúrate de liberar la conexión después de usarla
  } catch (err) {
    console.error('Error al conectar a MySQL:', err.message);
  }
}

testConnection();