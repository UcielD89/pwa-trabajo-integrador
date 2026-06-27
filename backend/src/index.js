import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testConnection } from './config/database.js';
import productosRoutes from './routes/productosRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/productos', productosRoutes);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
