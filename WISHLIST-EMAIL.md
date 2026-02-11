# Envío real de Wishlist por email

El popup de “Enviar Wishlist por email” ahora puede **enviar el correo de verdad** al destinatario que el usuario ingrese.

## Cómo funciona

1. **Con API configurada (recomendado):** Si en Cloudflare Pages tienes configurada la variable `RESEND_API_KEY`, el banner llama a `/api/send-wishlist` y el correo se envía desde el servidor. El destinatario recibe un email con la lista de productos y enlaces.
2. **Sin API (fallback):** Si la API no está configurada o falla, se abre el cliente de correo del usuario (`mailto:`) con el destinatario y el cuerpo ya rellenados; el usuario solo tiene que pulsar “Enviar” en Gmail/Outlook.

## Configurar envío real (Resend)

1. Crea una cuenta en [resend.com](https://resend.com) (tienen plan gratuito).
2. En el dashboard, crea una **API Key** y cópiala.
3. En **Cloudflare Dashboard** → tu proyecto **Pages** → **Settings** → **Environment variables**:
   - Añade `RESEND_API_KEY` = `re_xxxxxxxx` (tu API key).
   - (Opcional) `FROM_EMAIL` = `"Sanborns <noreply@tudominio.com>"` si verificas un dominio en Resend; si no, se usa `onboarding@resend.dev` para pruebas.
4. Redespliega el sitio para que la función use la nueva variable.

Tras eso, al enviar la wishlist desde el banner, el correo se enviará por Resend y llegará a la bandeja (revisa también spam la primera vez).

## Archivos involucrados

- **Backend:** `functions/api/send-wishlist.js` (Cloudflare Pages Function que usa Resend).
- **Frontend:** En `main.js`, el `onsubmit` del formulario hace `fetch('/api/send-wishlist', …)` y, si falla, usa `mailto:` como respaldo.
