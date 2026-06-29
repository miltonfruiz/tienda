Aquí te dejo un ejemplo de controlador CRUD para un app de ecommerce con carrito y pagos en JavaScript:
```javascript
// Controlador de Productos
class ProductoController {
  constructor() {
    this.productos = [];
  }

  // Crear producto
  crearProducto(req, res) {
    const { nombre, descripcion, precio, imagen } = req.body;
    const producto = {
      id: this.productos.length + 1,
      nombre,
      descripcion,
      precio,
      imagen
    };
    this.productos.push(producto);
    res.json(producto);
  }

  // Leer productos
  leerProductos(req, res) {
    res.json(this.productos);
  }

  // Leer producto por ID
  leerProductoPorId(req, res) {
    const id = req.params.id;
    const producto = this.productos.find((p) => p.id === parseInt(id));
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      res.json(producto);
    }
  }

  // Actualizar producto
  actualizarProducto(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, precio, imagen } = req.body;
    const producto = this.productos.find((p) => p.id === parseInt(id));
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      producto.nombre = nombre;
      producto.descripcion = descripcion;
      producto.precio = precio;
      producto.imagen = imagen;
      res.json(producto);
    }
  }

  // Eliminar producto
  eliminarProducto(req, res) {
    const id = req.params.id;
    const producto = this.productos.find((p) => p.id === parseInt(id));
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      this.productos = this.productos.filter((p) => p.id !== parseInt(id));
      res.json({ mensaje: 'Producto eliminado' });
    }
  }
}

// Controlador de Carrito
class CarritoController {
  constructor() {
    this.carrito = [];
  }

  // Agregar producto al carrito
  agregarProductoAlCarrito(req, res) {
    const { idProducto } = req.body;
    const producto = new ProductoController().leerProductoPorId(req, res);
    if (!producto) {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    } else {
      this.carrito.push(producto);
      res.json(this.carrito);
    }
  }

  // Leer carrito
  leerCarrito(req, res) {
    res.json(this.carrito);
  }

  // Eliminar producto del carrito
  eliminarProductoDelCarrito(req, res) {
    const { idProducto } = req.body;
    this.carrito = this.carrito.filter((p) => p.id !== parseInt(idProducto));
    res.json(this.carrito);
  }
}

// Controlador de Pagos
class PagoController {
  constructor() {
    this.pagos = [];
  }

  // Realizar pago
  realizarPago(req, res) {
    const { idCarrito, metodoPago } = req.body;
    const carrito = new CarritoController().leerCarrito(req, res);
    if (!carrito) {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    } else {
      const pago = {
        id: this.pagos.length + 1,
        idCarrito,
        metodoPago,
        fecha: new Date()
      };
      this.pagos.push(pago);
      res.json(pago);
    }
  }

  // Leer pagos
  leerPagos(req, res) {
    res.json(this.pagos);
  }
}

module.exports = {
  ProductoController,
  CarritoController,
  PagoController
};
```
Este código define tres controladores: `ProductoController`, `CarritoController` y `PagoController`. Cada controlador tiene métodos para crear, leer, actualizar y eliminar registros, según corresponda.

El `ProductoController` se encarga de gestionar los productos, el `CarritoController` se encarga de gestionar el carrito de compras y el `PagoController` se encarga de gestionar los pagos.

Es importante destacar que este código es solo un ejemplo y no incluye la lógica de negocio completa para un app de ecommerce. Además, no incluye la conexión a una base de datos, por lo que los datos se almacenan en memoria. En un entorno de producción, se debería utilizar una base de datos para almacenar los datos de manera persistente.