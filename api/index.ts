import express from 'express';
import dotenv from 'dotenv';
import { runMultiAgentAudit } from '../server/orchestrator.ts';

dotenv.config();

const app = express();
app.use(express.json({ limit: '20mb' }));

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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    time: new Date().toISOString(),
  });
});

export default app;
