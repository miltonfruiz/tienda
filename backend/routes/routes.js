Aquí te muestro un ejemplo de rutas Express protegidas con JWT para un app de ecommerce con carrito y pagos:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de usuario
const Usuario = mongoose.model('Usuario', {
  nombre: String,
  email: String,
  password: String
});

// Modelo de producto
const Producto = mongoose.model('Producto', {
  nombre: String,
  descripcion: String,
  precio: Number
});

// Modelo de carrito
const Carrito = mongoose.model('Carrito', {
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]
});

// Middleware para autenticación con JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado');
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
};

// Ruta para registro de usuario
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  const usuario = new Usuario({ nombre, email, password: await bcrypt.hash(password, 10) });
  try {
    await usuario.save();
    res.send('Usuario registrado con éxito');
  } catch (error) {
    res.status(400).send('Error al registrar usuario');
  }
});

// Ruta para inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).send('Usuario no encontrado');
  const isValidPassword = await bcrypt.compare(password, usuario.password);
  if (!isValidPassword) return res.status(400).send('Contraseña inválida');
  const token = jwt.sign({ _id: usuario._id }, 'secretkey', { expiresIn: '1h' });
  res.send(token);
});

// Ruta para obtener productos
app.get('/productos', authenticate, async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

// Ruta para agregar producto al carrito
app.post('/carrito', authenticate, async (req, res) => {
  const { productoId } = req.body;
  const carrito = await Carrito.findOne({ usuario: req.usuario._id });
  if (!carrito) {
    const nuevoCarrito = new Carrito({ usuario: req.usuario._id, productos: [productoId] });
    try {
      await nuevoCarrito.save();
      res.send('Producto agregado al carrito');
    } catch (error) {
      res.status(400).send('Error al agregar producto al carrito');
    }
  } else {
    carrito.productos.push(productoId);
    try {
      await carrito.save();
      res.send('Producto agregado al carrito');
    } catch (error) {
      res.status(400).send('Error al agregar producto al carrito');
    }
  }
});

// Ruta para obtener carrito
app.get('/carrito', authenticate, async (req, res) => {
  const carrito = await Carrito.findOne({ usuario: req.usuario._id });
  if (!carrito) return res.status(400).send('Carrito vacío');
  res.send(carrito);
});

// Ruta para realizar pago
app.post('/pago', authenticate, async (req, res) => {
  const { carritoId } = req.body;
  const carrito = await Carrito.findById(carritoId);
  if (!carrito) return res.status(400).send('Carrito no encontrado');
  // Proceso de pago...
  res.send('Pago realizado con éxito');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
```
Este código incluye las siguientes rutas:

*   `/registro`: para registrar un nuevo usuario
*   `/login`: para iniciar sesión y obtener un token JWT
*   `/productos`: para obtener una lista de productos (requiere autenticación)
*   `/carrito`: para agregar un producto al carrito (requiere autenticación)
*   `/carrito`: para obtener el carrito del usuario (requiere autenticación)
*   `/pago`: para realizar un pago (requiere autenticación)

Recuerda que este es solo un ejemplo y debes adaptarlo a tus necesidades específicas. También es importante mencionar que la seguridad es un tema importante y debes considerarla al momento de implementar tu aplicación.