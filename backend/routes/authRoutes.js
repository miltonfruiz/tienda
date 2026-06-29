```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Modelo de usuario
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token de autenticación
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Cerrar sesión
router.post('/logout', (req, res) => {
    try {
        // Eliminar la cookie de autenticación
        res.clearCookie('token');

        res.json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
});

module.exports = router;
```