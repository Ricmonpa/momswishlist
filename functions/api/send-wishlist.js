/**
 * Cloudflare Pages Function: envía la wishlist por email vía Resend.
 * POST body: { to: string, items: Array<{ name: string, url: string, price?: string }> }
 * Env vars (Cloudflare Pages): RESEND_API_KEY. Opcional: FROM_EMAIL (ej: "Sanborns <noreply@tudominio.com>")
 */
const RESEND_API = 'https://api.resend.com/emails';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function buildEmailHtml(items) {
  const listItems = items
    .map(
      (item, i) =>
        `<li style="margin-bottom:10px"><a href="${escapeHtml(item.url)}" style="color:#FF1493">${escapeHtml(item.name)}</a>${item.price ? ` – ${escapeHtml(item.price)}` : ''}</li>`
    )
    .join('');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
  <p>Hola ❤️</p>
  <p>Alguien te compartió su wishlist de San Valentín desde Sanborns:</p>
  <ol style="padding-left:20px">${listItems}</ol>
  <p>¡Revisa los productos y sorpréndele!</p>
  <p style="color:#888;font-size:12px">— Sanborns Gift Finder San Valentín</p>
</body>
</html>`;
}

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function onRequestPost(context) {
  try {
    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return new Response(
        JSON.stringify({ ok: false, error: 'RESEND_API_KEY no configurada' }),
        { status: 503, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
      );
    }

    const body = await context.request.json();
    const to = typeof body.to === 'string' ? body.to.trim() : '';
    const items = Array.isArray(body.items) ? body.items : [];

    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Email de destino inválido' }),
        { status: 400, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
      );
    }

    const cleanItems = items.slice(0, 50).map((it) => ({
      name: typeof it.name === 'string' ? it.name : 'Producto',
      url: typeof it.url === 'string' && it.url.startsWith('http') ? it.url : 'https://www.sanborns.com.mx/',
      price: typeof it.price === 'string' ? it.price : undefined,
    }));

    const fromEmail = context.env.FROM_EMAIL || 'Sanborns Gift Finder <onboarding@resend.dev>';
    const html = buildEmailHtml(cleanItems);

    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: '💝 Mi wishlist de San Valentín – Sanborns',
        html,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: data.message || data.error || 'Error al enviar' }),
        { status: 502, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message || 'Error interno' }),
      { status: 500, headers: { ...corsHeaders(), 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders() });
}
