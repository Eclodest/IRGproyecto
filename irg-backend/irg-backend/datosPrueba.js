const pool = require('./BBDD/db');
const generarClaveUnica = require('./servicios/generadorClaves');

async function insertarDatosPrueba() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a MySQL');

    // Usuarios
    const usuarios = [
      { nombre: 'Ana', apellidos: 'Pérez', telefono: '123456789', ciudad: 'Madrid' },
      { nombre: 'Luis', apellidos: 'García', telefono: '987654321', ciudad: 'Barcelona' },
      { nombre: 'Marta', apellidos: 'López', telefono: '555555555', ciudad: 'Valencia' },
    ];

    for (const u of usuarios) {
      try {
        await connection.query(
          'INSERT INTO Usuario (nombre, apellidos, telefono, ciudad) VALUES (?, ?, ?, ?)',
          [u.nombre, u.apellidos, u.telefono, u.ciudad]
        );
        console.log(`✔ Usuario insertado: ${u.nombre}`);
      } catch (err) {
        console.error(`❌ Error insertando usuario ${u.nombre}:`, err.message);
      }
    }

    // Restaurantes
    const restaurantes = ['La Trattoria', 'El Asador', 'Sushi World'];

    for (const nombre of restaurantes) {
      const clave = generarClaveUnica();
      try {
        await connection.query(
          'INSERT INTO Restaurante (clave_acceso) VALUES (?)',
          [clave]
        );
        console.log(`✔ Restaurante insertado (referencia): ${nombre} | Clave generada: ${clave}`);
      } catch (err) {
        console.error(`❌ Error insertando restaurante ${nombre}:`, err.message);
      }
    }

    connection.release();
    console.log('🎉 Inserción de datos de prueba completada');
  } catch (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
  }
}

insertarDatosPrueba();
