const pool = require('../BBDD/db');
const generarClaveUnica = require('../servicios/generadorClaves');

// Registrar restaurante con clave única
const registrarRestaurante = async (req, res) => {
  const { nombre, direccion, ciudad } = req.body; // Añade los datos que quieras guardar
  if (!nombre || !direccion || !ciudad) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios (nombre, dirección, ciudad)' });
  }

  try {
    const clave = generarClaveUnica();

    const [resultado] = await pool.query(
      'INSERT INTO Restaurante (nombre, direccion, ciudad, clave_acceso) VALUES (?, ?, ?, ?)',
      [nombre, direccion, ciudad, clave]
    );

    res.status(201).json({
      mensaje: 'Restaurante registrado con éxito',
      id_restaurante: resultado.insertId,
      clave_acceso: clave
    });
  } catch (error) {
    console.error('Error al registrar restaurante:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Login con clave
const loginRestaurante = async (req, res) => {
  const { clave_acceso } = req.body;

  if (!clave_acceso) {
    return res.status(400).json({ mensaje: 'La clave de acceso es obligatoria' });
  }

  try {
    const [restaurantes] = await pool.query(
      'SELECT * FROM Restaurante WHERE clave_acceso = ?',
      [clave_acceso]
    );

    if (restaurantes.length === 0) {
      return res.status(400).json({ mensaje: 'Clave de acceso incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      id_restaurante: restaurantes[0].id_restaurante
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarRestaurante,
  loginRestaurante
};
