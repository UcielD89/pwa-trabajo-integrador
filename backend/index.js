import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testConnection } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas se montan acá a medida que se creen

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
