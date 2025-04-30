export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const targetUrl = req.query.url;
  if (!targetUrl) {
    res.status(400).json({ error: 'Falta la URL de destino' });
    return;
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer proxy', detalle: error.message });
  }
}
