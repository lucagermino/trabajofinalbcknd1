# Entrega N° 1
## Descripción General
### Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra para tu API.

## Requisitos de la Primera Entrega
### Desarrollo del Servidor
El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080. Se deben disponer dos grupos de rutas: /products y /carts. Estos endpoints estarán implementados con el router de Express, con las siguientes especificaciones:

### Rutas para Manejo de Productos (/api/products/)
* GET /:
Debe listar todos los productos de la base de datos.

* GET /:pid:
Debe traer solo el producto con el id proporcionado.

* POST /:
Debe agregar un nuevo producto con los siguientes campos:
```
{
    id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).
    title: String
    description: String
    code: String
    price: Number
    status: Boolean
    stock: Number
    category: String
    thumbnails: Array de Strings (rutas donde están almacenadas las imágenes del producto).
}
```

* PUT /:pid:
Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el idal momento de hacer la actualización.

* DELETE /:pid:
Debe eliminar el producto con el pid indicado.

### Rutas para Manejo de Carritos (/api/carts/)
* POST /:
Debe crear un nuevo carrito con la siguiente estructura:
```
{
    id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).
    products: Array que contendrá objetos que representen cada producto.
}
```

* GET /:cid:
Debe listar los productos que pertenecen al carrito con el cid proporcionado.

* POST /:cid/product/:pid:
Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
```
{
    product: Solo debe contener el ID del producto.
    quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).
}
```
Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

### Persistencia de la Información
La persistencia se implementará utilizando el sistema de archivos, donde los archivos products.json y carts.json respaldarán la información.
Se debe utilizar el ProductManager desarrollado en el desafío anterior y crear un CartManager para gestionar el almacenamiento de estos archivos JSON.
Nota: No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

### Formato del Entregable
Proporcionar un enlace al repositorio de GitHub con el proyecto completo, sin la carpeta node_modules.

---

# Entrega N° 2
## Websockets
Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

## Consigna
- Configurar nuestro proyecto para que trabaje con Handlebars y websocket.
- Aspectos a incluir
- - Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
- - Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento

Sugerencias

- Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.

- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

Criterios de evaluación

---

# 🚀 Instalación y ejecución

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-api.git
   cd ecommerce-api
   ```

2. Instalá las dependencias:
   ```bash
   npm install
   ```

3. Iniciá el servidor:
   ```bash
   npm start
   ```

   El servidor se ejecutará en:  
   👉 [http://localhost:8080](http://localhost:8080)

---

## 📌 Endpoints disponibles

### 🌐 API REST

- `GET /api/products`  
  Lista todos los productos

- `GET /api/products/:pid`  
  Devuelve un producto por ID

- `POST /api/products`  
  Crea un nuevo producto (JSON en body)

- `PUT /api/products/:pid`  
  Actualiza un producto

- `DELETE /api/products/:pid`  
  Elimina un producto

---

- `POST /api/carts`  
  Crea un nuevo carrito

- `GET /api/carts/:cid`  
  Muestra los productos de un carrito

- `POST /api/carts/:cid/product/:pid`  
  Agrega un producto al carrito

---

### 👀 Vistas con Handlebars

- `GET /`  
  Muestra la lista de productos (renderizado estático)

- `GET /realtimeproducts`  
  Vista dinámica de productos con Websockets + formulario

---

### 🔌 Websockets

- `emit: "newProduct"`  
  Envía un nuevo producto desde la vista `/realtimeproducts`

- `on: "updateProducts"`  
  Escucha actualizaciones en tiempo real de la lista de productos

- `on: "productError"`  
  Recibe errores de validación al crear productos