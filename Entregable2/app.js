const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
// Esto nos permite usar archivos estáticos como CSS, imágenes, etc.
app.use(express.static('public'));
// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Configuración de la sesión
app.use(session({
 secret: 'my secret',
 resave: false,
 saveUninitialized: false,
 cookie: { secure: false } // cambiar a true si estás en un entorno https
}));
// Rutas
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const paypalRoutes = require('./routes/paypal');
app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);
app.use('/paypal', paypalRoutes);
app.get('/', (req, res) => {
 res.redirect('/productos');
});
app.listen(port, () => {
 console.log(`El servidor se está ejecutando en
http://localhost:${port}`);
});