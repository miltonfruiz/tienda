```javascript
const jwt = require('jsonwebtoken');
const secretKey = 'tu-llave-secreta';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Por favor, inicia sesión para acceder.' });
  }
};

module.exports = auth;
```