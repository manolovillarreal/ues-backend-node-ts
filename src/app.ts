import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.get('/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// error handler al final
app.use(errorHandler);

export default app;
