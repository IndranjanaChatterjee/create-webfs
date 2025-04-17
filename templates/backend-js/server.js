const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Make sure you have @prisma/client

// No need to explicitly require('dotenv').config() here if using dotenv-cli in scripts
// const dotenv = require('dotenv');
// dotenv.config(); // Default .env loading if not using dotenv-cli

const app = express();
const prisma = new PrismaClient(); // Instantiate Prisma Client

const PORT = process.env.PORT || 3001; // Default port if not in .env

// --- Middleware ---
app.use(cors()); // Allow requests from frontend (configure origin in production)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// --- Routes ---
// Example basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Backend! (JavaScript)' });
});

// Import and use your modular routes (example)
// const itemRoutes = require('./routes/itemRoutes'); // Assuming you create this
// app.use('/api/items', itemRoutes);

// --- Basic Error Handling (Example) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server (JS) running on http://localhost:${PORT}`);
});

// Optional: Graceful shutdown for Prisma
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});