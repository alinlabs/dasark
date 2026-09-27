import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing (CORS) with full wildcard permissions
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Range'],
  exposedHeaders: ['Content-Range', 'X-Content-Range', 'Content-Length', 'Accept-Ranges'],
  credentials: false,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Global Header Middleware to ensure Chrome never blocks requests due to CORP/COEP/CORS
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.removeHeader('X-Frame-Options');
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve public directory explicitly with permissive CORS & CORP headers
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
}));

// Dedicated CORS Proxy Endpoint for fetching any external or internal asset safely
app.get('/api/cors-proxy', async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Parameter "url" wajib diisi' });
  }

  try {
    const fetched = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 DASAR-Audit/2.0',
      },
    });

    const contentType = fetched.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    const arrayBuffer = await fetched.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('[CORS Proxy Error]', error);
    return res.status(500).json({ error: 'Gagal mem-proxy sumber daya', details: error?.message });
  }
});

// Pure deterministic health & status endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ONLINE',
    engine: 'DETERMINISTIC_EXPERT_SYSTEM',
    version: '2.0.0',
    company: 'PT. DAME ALAM SEJAHTERA (DAS GROUP)',
    description: 'Sistem Audit Otomatis K3-HR Berbasis Logika Terprogram Tanpa AI'
  });
});

// Setup Vite dev server or static files
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (Deterministic Expert Engine)`);
  });
}

setupServer();
