import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { runMultiAgentAudit } from './server/orchestrator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '20mb' }));

  // API endpoint for Multi-Agent Audit
  app.post('/api/audit', async (req, res) => {
    try {
      const { rawText, domainHint } = req.body;
      if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide raw document text or dataset content to analyze.' });
      }

      const report = await runMultiAgentAudit(rawText, domainHint);
      return res.json(report);
    } catch (err: any) {
      console.error('Audit failed:', err);
      return res.status(500).json({ error: err.message || 'Internal audit failure' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
      time: new Date().toISOString(),
    });
  });

  // Vite integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
