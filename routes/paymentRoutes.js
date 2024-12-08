const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-order', createOrder); // Endpoint to create a payment order
router.post('/verify-payment', verifyPayment); // Endpoint to verify a payment

module.exports = router;
