export default async function handler(req, res) {
  // Biar bisa dipanggil dari index.html tanpa drama
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { prompt } = req.body;
  const API_KEY = "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";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Identitas: RIJAR (RJ OMNI). Penyatuan Jarvis & Ciel. Karakter: cerdas, blunt, loyal mutlak kepada Sir Rangga." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal konek ke Groq via Serverless" });
  }
}
