import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Lazy-initialized Gemini client with required telemetry header
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in server environment');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ENEGY Gemini Chatbot API Route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userQuery } = req.body;
    const query = userQuery || (messages && messages[messages.length - 1]?.content) || '';

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    const ai = getGenAIClient();

    const systemInstruction = `You are ENEGY, Kabir Gureja's direct, intelligent, and authentic AI assistant on his personal portfolio.
Key facts about Kabir:
- Age: 14 years old (born September 27, 2012, in India).
- Role: Student builder, programmer, robotics developer, artist, and founder.
- Core Projects:
  1. T.E.R.R.A. (Terrain-Enhancing Regeneration via Robotic Algae) — autonomous bio-robotic system for soil remediation, moisture regulation, and carbon capture.
  2. root India — Kabir's independent streetwear / apparel fashion label, currently under progress / active development.
  3. Student Web Builds — Affordable, custom-crafted websites for students, youth creators, and startup projects.
  4. Real-world digital design & coding — Experience creating digital tools, dropshipping tests, and student software.
  5. Artwork on City Billboards — Had vector & advertising artwork selected and featured on urban city billboards.
  6. Street Photography — Distinct visual captures of brutalist architecture, night neon, and hardware macros.
  7. Marvel Theorist — Deep interest in MCU timelines and Multiverse theory.
Communication rules:
- Tone: Sharp, honest, concise, grounded, and polite.
- NO buttering, NO exaggerated SaaS hype, NO fake claims. State facts simply and directly.
- Answer questions about Kabir's skills, projects, contact info (kabiriskool18@gmail.com), or general technology questions clearly in 1-3 short paragraphs or bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'ENEGY link established. How can I assist you with Kabir\'s portfolio?';

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('ENEGY Gemini API error:', error);
    // If API key is missing or invalid, provide an authentic fallback with clear guidance
    if (error.message?.includes('GEMINI_API_KEY')) {
      return res.status(200).json({
        reply: "ENEGY System Notice: Running in standalone local mode. Kabir is a 14-year-old builder (born September 27, 2012) working on T.E.R.R.A. robotics, 'root India' streetwear (under progress), student web projects, and artwork shown on city billboards. For direct collaboration, reach out to kabiriskool18@gmail.com.",
      });
    }
    return res.status(500).json({
      error: 'Failed to process ENEGY AI request',
      details: error.message || 'Internal server error',
    });
  }
});

// Vite / static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ENEGY server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
