```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asumiendo que tienes un modelo de usuario

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear usuario' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  },

  logout: async (req, res) => {
    try {
      // En este caso, solo necesitamos devolver un mensaje de éxito, ya que el token ya no será válido después de un cierto tiempo
      return res.status(200).json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
  },
};

module.exports = authController;
```