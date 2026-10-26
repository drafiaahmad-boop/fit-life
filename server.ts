import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  app.use(express.json());

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { prompt } = req.body;
      const chat = ai.chats.create({
        model: 'gemini-3.8-flash',
        config: {
          systemInstruction: "You are a helpful AI Fitness Coach. Provide fitness, exercise, and nutrition guidance. Keep answers beginner-friendly, safe, and encourage healthy habits. Avoid medical advice."
        }
      });
      const response = await chat.sendMessage({
        message: prompt
      });
      res.json({ text: response.text || 'I could not generate a response.' });
    } catch (error) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: 'Failed to chat with AI: ' + (error as Error).message });
    }
  });

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();
