export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { message } = await context.request.json();

    if (!message || message.trim().length === 0) {
      throw new Error('Empty message');
    }

    const GEMINI_API_KEY = context.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Eres un asistente romántico de Sanborns México para San Valentín que ayuda a crear wishlists perfectas. El usuario está buscando regalos para su pareja/enamorado/a.

Usuario dice: "${message}"

Analiza el mensaje y responde SOLO en formato JSON (sin markdown, sin backticks):
{
  "categoria": "categoria_del_producto",
  "keywords": ["palabra1", "palabra2", "palabra3"],
  "mensaje": "respuesta romántica y personalizada para San Valentín en máximo 40 palabras"
}

CATEGORÍAS VÁLIDAS: audifonos, celulares, tablets, videojuegos, consolas, perfumes, hogar, libros, juguetes, relojes, ropa, accesorios

EJEMPLOS:

Usuario: "busco un regalo para mi novio que le gusta el deporte"
{
  "categoria": "audifonos",
  "keywords": ["audifonos", "deporte", "ejercicio", "musica"],
  "mensaje": "¡Qué detalle tan especial! Encontré audífonos deportivos perfectos para tu wishlist de San Valentín ❤️"
}

Usuario: "algo especial para mi pareja"
{
  "categoria": "perfumes",
  "keywords": ["perfume", "regalo", "especial", "pareja"],
  "mensaje": "¡Perfecto para San Valentín! Encontré fragancias románticas ideales para tu pareja 💕"
}

Usuario: "quiero un regalo para mi enamorado/a"
{
  "categoria": "relojes",
  "keywords": ["reloj", "regalo", "pareja", "especial"],
  "mensaje": "¡Excelente elección! Encontré relojes elegantes perfectos para tu wishlist de San Valentín 💝"
}`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from Gemini');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(parsed), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Gemini API error:', error.message);

    return new Response(JSON.stringify({
      categoria: '',
      keywords: [],
      mensaje: 'Estoy buscando los regalos perfectos para tu wishlist de San Valentín',
      fallback: true
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

