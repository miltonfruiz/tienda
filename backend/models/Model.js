```javascript
// Importaciones
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Esquema de productos
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true }
});

// Modelo de productos
const Producto = mongoose.model('Producto', productoSchema);

// Esquema de usuarios
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  direccion: { type: String, required: true }
});

// Modelo de usuarios
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Esquema de carritos
const carritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }],
  fechaCreacion: { type: Date, default: Date.now }
});

// Modelo de carritos
const Carrito = mongoose.model('Carrito', carritoSchema);

// Esquema de pedidos
const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  carrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrito', required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaEntrega: { type: Date },
  total: { type: Number, required: true },
  estado: { type: String, required: true }
});

// Modelo de pedidos
const Pedido = mongoose.model('Pedido', pedidoSchema);

// Esquema de pagos
const pagoSchema = new mongoose.Schema({
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  metodoPago: { type: String, required: true },
  fechaPago: { type: Date, default: Date.now },
  monto: { type: Number, required: true }
});

// Modelo de pagos
const Pago = mongoose.model('Pago', pagoSchema);

// Exportación de modelos
module.exports = {
  Producto,
  Usuario,
  Carrito,
  Pedido,
  Pago
};
```