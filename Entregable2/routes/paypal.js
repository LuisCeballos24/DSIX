const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
paypal.configure({
'mode': 'sandbox', // sandbox o live
'client_id': 'AUZAelN-hYgT8eTRIOnnKTLE58qgIWO8mZuUcXmTUA--IR_3yKkaG9ApcttVdnl9I_iS2G97cVDpMKsh',
'client_secret': 'EMsi8OloEDCogs9sC87QaUALxD8QabWS_mpxGvDzbdPXmQpi_L-LoVC2cq5TzerZABe_QaydVie0VOn7'
});
router.post('/pay', (req, res) => {
const create_payment_json = {
"intent": "sale",
"payer": {
"payment_method": "paypal"
},
"redirect_urls": {
"return_url": "http://localhost:3000/paypal/success",
"cancel_url": "http://localhost:3000/paypal/cancel"
},
"transactions": [{
"item_list": {
"items": req.session.cart.map((item) => ({
name: item.nombre,
sku: item.id,
price: item.precio.toString(),
currency: "USD",
quantity: 1
}))
},
"amount": {
"currency": "USD",
"total": req.session.cart.reduce((a, b) => a + b.precio,
0).toString()
},
"description": "This is the payment description."
}]
};
paypal.payment.create(create_payment_json, function (error, payment) {
if (error) {
throw error;
} else {
for(let i = 0; i < payment.links.length; i++){
if(payment.links[i].rel === 'approval_url'){
res.redirect(payment.links[i].href);
}
}
}
});
});
module.exports = router;