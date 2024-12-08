const razorpayInstance = require('../config/razorpayConfig');
const crypto = require('crypto');

// Create a Razorpay order
exports.createOrder = async (req, res) => {
    /* Alway fetch prise database */
    const { amount, currency = 'INR' } = req.body; // Dynamically passed amount & currency

    try {
        // Razorpay order options
        const options = {
            amount: amount,
            currency,
            payment_capture: 1,   // Automatically capture payment
        };

        const order = await razorpayInstance.orders.create(options); // Create order
        console.log("OrderData ====",order)
            
        res.status(200).json({
            success: true,
            orderId: order.id,

        });
    } catch (error) {
        console.log(`[ERROR]-[CREATE]-[ORDER]`,error)        
        res.status(500).json({
            success: false,
            message: "Failed to create Razorpay order",
            error: error.message,
        });
    }
};

// Verify the payment signature
exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(`req========?`,req.body)
    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).json({ success: true,message:"payment verified😊." });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
};
