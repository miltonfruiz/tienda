# App de Ecommerce con Carrito y Pagos
==========================

## Descripción
Este proyecto es una aplicación de ecommerce que permite a los usuarios agregar productos a un carrito y realizar pagos de manera segura.

## Stack Tecnológico
* **Backend:** Node.js con Express.js
* **Base de Datos:** MongoDB
* **Pagos:** Stripe
* **Autenticación:** JWT (JSON Web Tokens)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/usuario/repo.git`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.example .env` y editar según sea necesario
4. Iniciar servidor: `npm start`

## Docker
1. Construir imagen: `docker build -t app-ecommerce .`
2. Iniciar contenedor: `docker run -p 3000:3000 app-ecommerce`
3. Acceder a la aplicación: `http://localhost:3000`

## Endpoints
### Autenticación
* **POST /login**: Iniciar sesión
* **POST /register**: Registrarse
* **GET /me**: Obtener información del usuario autenticado

### Productos
* **GET /products**: Obtener lista de productos
* **GET /products/:id**: Obtener información de un producto
* **POST /products**: Crear un nuevo producto
* **PUT /products/:id**: Actualizar un producto
* **DELETE /products/:id**: Eliminar un producto

### Carrito
* **GET /cart**: Obtener lista de productos en el carrito
* **POST /cart**: Agregar un producto al carrito
* **PUT /cart/:id**: Actualizar la cantidad de un producto en el carrito
* **DELETE /cart/:id**: Eliminar un producto del carrito

### Pagos
* **POST /payment**: Realizar un pago

## Seguridad
* **Autenticación**: Se utiliza JWT para autenticar a los usuarios
* **Autorización**: Se utiliza middleware para autorizar acceso a rutas y acciones
* **Encriptación**: Se utiliza HTTPS para encriptar la comunicación entre el cliente y el servidor
* **Validación**: Se utiliza validación de datos para prevenir ataques de inyección SQL y cross-site scripting (XSS)