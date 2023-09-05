const jwt = require('jsonwebtoken');
const secretKey = '123456789'; // Cambia esto a tu propia clave secreta

function autenticarJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const usuario = jwt.verify(token, secretKey);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Acceso prohibido. Token inválido.' });
  }
}

module.exports = autenticarJWT;
