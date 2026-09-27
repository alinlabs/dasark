export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'ONLINE',
    engine: 'DETERMINISTIC_EXPERT_SYSTEM',
    version: '2.0.0',
    company: 'PT. DAME ALAM SEJAHTERA (DAS GROUP)',
    description: 'Sistem Audit Otomatis K3-HR Berbasis Logika Terprogram Tanpa AI'
  });
}
