const express = require('express');
const router = express.Router();
const db = require('../db/db');
router.post('/agregar', (req, res) => {
 const productId = req.body.id;
 const query = 'SELECT * FROM productos WHERE id = ?';
 db.query(query, productId, (error, results) => {
 if (error) {
 throw error;
 }
 if (results.length == 0) {
 res.status(404).send('Producto no encontrado');
 } else {
 if (!req.session.cart) {
 req.session.cart = [];
 }
 req.session.cart.push(results[0]);
 res.redirect('/carrito');
 }
 });
});
router.get('/', (req, res) => {
 res.render('carrito', {productos: req.session.cart});
});
module.exports = router;