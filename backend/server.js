```javascript
// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

const app = express();
const port = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet());
app.use(cors());

// Límite de solicitudes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // 100 solicitudes
});
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', require('./routes/api'));

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
```