import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'AgriTech API', timestamp: new Date().toISOString() });
});

app.get('/api/overview', (_req, res) => {
  res.json({
    message: 'Welcome to the AgriTech API',
    features: ['farm-management', 'crop-tracking', 'soil-health', 'weather', 'pest-alerts'],
    note: 'Starter endpoint: connect MongoDB and implement authenticated CRUD routes before production use.'
  });
});

app.use((req, res) => res.status(404).json({ error: 'API route not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

app.listen(port, () => console.log(`AgriTech API listening on port ${port}`));
