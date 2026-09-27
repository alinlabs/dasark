export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

    const arrayBuffer = await fetched.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    return res.status(500).json({ error: 'Gagal mem-proxy sumber daya', details: error?.message });
  }
}
