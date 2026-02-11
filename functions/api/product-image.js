/**
 * GET /api/product-image?id=608266  (JSON)
 * GET /api/product-image?id=608266&redirect=1  (302 a la imagen, para <img src>)
 * Obtiene la imagen real del producto desde la página de Sanborns (og:image).
 * Cache 24h en edge para no saturar Sanborns.
 */
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  const productUrl = url.searchParams.get('url');
  const redirect = url.searchParams.get('redirect') === '1';

  const cors = { 'Access-Control-Allow-Origin': '*' };
  const cache24 = { 'Cache-Control': 'public, max-age=86400' };

  let targetUrl = productUrl;
  if (!targetUrl && id) {
    targetUrl = `https://www.sanborns.com.mx/producto/${id}`;
  }
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Falta id o url' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      redirect: 'follow',
    });
    const html = await res.text();
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    const imageUrl = ogMatch ? ogMatch[1].trim() : null;

    if (imageUrl) {
      if (redirect) {
        return new Response(null, {
          status: 302,
          headers: { Location: imageUrl, 'Cache-Control': 'public, max-age=86400' },
        });
      }
      return new Response(JSON.stringify({ image: imageUrl }), {
        status: 200,
        headers: { ...cors, ...cache24, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'No og:image' }), { status: 404, headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
}
