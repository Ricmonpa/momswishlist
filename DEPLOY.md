# 🚀 Guía de Deploy - Cloudflare Pages

## Pasos Rápidos

### 1. Preparar el Repositorio Git

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Sanborns Wishlist San Valentín"

# Crear repositorio en GitHub/GitLab y agregar remote
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Push al repositorio
git branch -M main
git push -u origin main
```

### 2. Deploy en Cloudflare Pages

#### Opción A: Desde el Dashboard (Más Fácil)

1. **Ve a Cloudflare Dashboard**
   - https://dash.cloudflare.com/
   - Inicia sesión o crea cuenta

2. **Navega a Pages**
   - Menú lateral → **Pages**
   - Click en **Create a project**

3. **Conecta tu Repositorio**
   - Selecciona **Connect to Git**
   - Autoriza Cloudflare con GitHub/GitLab/Bitbucket
   - Selecciona tu repositorio

4. **Configura el Build**
   - **Project name**: `sanborns-wishlist` (o el que prefieras)
   - **Production branch**: `main` (o `master`)
   - **Framework preset**: **None** (o Static HTML)
   - **Build command**: (dejar vacío)
   - **Build output directory**: `/` (raíz)
   - **Root directory**: `/` (raíz)

5. **Deploy**
   - Click en **Save and Deploy**
   - Espera 1-2 minutos
   - Tu sitio estará en: `https://sanborns-wishlist.pages.dev`

#### Opción B: Con Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy . --project-name=sanborns-wishlist
```

### 3. Configurar Dominio Personalizado (Opcional)

1. En Cloudflare Pages → Tu proyecto → **Custom domains**
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

### 4. Variables de Entorno (Si necesitas API)

Si necesitas configurar la API de Gemini:

1. En Cloudflare Pages → Tu proyecto → **Settings** → **Environment variables**
2. Agrega:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Tu API key
   - **Environment**: Production, Preview, etc.

### 5. Verificar el Deploy

1. Abre la URL de tu proyecto
2. Verifica que el banner se carga correctamente
3. Prueba la funcionalidad:
   - Búsqueda de productos
   - Agregar a wishlist
   - Envío de email

## 🔗 URLs Importantes

- **Dashboard Cloudflare**: https://dash.cloudflare.com/
- **Documentación Pages**: https://developers.cloudflare.com/pages/
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/

## ✅ Checklist Pre-Deploy

- [ ] Todos los archivos están en el repositorio
- [ ] `.gitignore` está configurado
- [ ] `index.html` está en la raíz
- [ ] No hay rutas absolutas a localhost
- [ ] Las imágenes están incluidas
- [ ] El código no tiene console.logs de debug (opcional)

## 🐛 Problemas Comunes

### El sitio no carga
- Verifica que `index.html` esté en la raíz
- Revisa los logs en Cloudflare Pages → Deployments

### Las imágenes no se ven
- Verifica que las rutas sean relativas (no absolutas)
- Asegúrate de que los archivos estén en el repo

### El API no funciona
- Verifica que el endpoint esté en `functions/api/`
- Revisa las variables de entorno
- Usa el fallback a `mailto:` si no hay backend

## 📊 Monitoreo

Cloudflare Pages incluye:
- Analytics básicos
- Logs de deploy
- Preview deployments para PRs
- Custom domains con SSL automático

## 🎉 ¡Listo!

Tu banner está deployado y listo para compartir con tu socio y cliente.

**URL de ejemplo**: `https://sanborns-wishlist.pages.dev`

