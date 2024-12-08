require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Payment routes
app.use('/api/payments', paymentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
