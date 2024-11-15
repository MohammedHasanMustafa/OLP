const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./config/connect');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Database connection
DBConnection();

// Set the server port, defaulting to 5000 if not specified in .env
const PORT = process.env.PORT || 5000;

////// Middleware //////

// Enable CORS with specific options
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from frontend at this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));

// Parse incoming JSON requests
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/// ROUTES ///
// Define routes for admin and user APIs
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
