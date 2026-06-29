```tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Carrito {
  productos: Producto[];
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<Carrito>({ productos: [] });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState<string | null>(localStorage.getItem('usuario'));

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/productos', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setProductos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito({ productos: [...carrito.productos, producto] });
  };

  const eliminarDelCarrito = (producto: Producto) => {
    setCarrito({
      productos: carrito.productos.filter((p) => p.id !== producto.id),
    });
  };

  const realizarPago = () => {
    if (token) {
      axios.post(
        'http://localhost:5000/pagos',
        { carrito: carrito.productos },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response.data);
          setCarrito({ productos: [] });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleLogin = (usuario: string, password: string) => {
    axios.post('http://localhost:5000/login', { usuario, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setToken(token);
        setUsuario(usuario);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <div>
      {usuario ? (
        <div>
          <h1>Productos</h1>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} - {producto.precio}
                <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
              </li>
            ))}
          </ul>
          <h2>Carrito</h2>
          <ul>
            {carrito.productos.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} - {producto.precio}
                <button onClick={() => eliminarDelCarrito(producto)}>Eliminar del carrito</button>
              </li>
            ))}
          </ul>
          <button onClick={realizarPago}>Realizar pago</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button onClick={() => handleLogin('usuario', 'password')}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
}

export default App;
```