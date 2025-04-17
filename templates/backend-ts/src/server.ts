import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient();

const PORT: number = parseInt(process.env.PORT || '3001', 10);

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Backend! (TypeScript)' });
});

// Import and use your modular routes (example)
// import itemRoutes from './routes/itemRoutes'; // Assuming you create this
// app.use('/api/items', itemRoutes);

// --- Basic Error Handling (Example) ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server (TS) running on http://localhost:${PORT}`);
});

 // Optional: Graceful shutdown for Prisma
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});