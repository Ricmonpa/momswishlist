# ⚡ Quick Start - Deploy en Cloudflare Pages

## 🎯 Pasos Rápidos (5 minutos)

### 1️⃣ Crear Repositorio Git

```bash
# Si ya tienes git inicializado, solo haz commit y push
git add .
git commit -m "Ready for Cloudflare Pages deploy"
git push
```

Si no tienes git:
```bash
git init
git add .
git commit -m "Initial commit: Sanborns Wishlist San Valentín"
# Crea repo en GitHub y luego:
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 2️⃣ Deploy en Cloudflare Pages

#### Opción A: Dashboard (Recomendado - Más Fácil)

1. Ve a: https://dash.cloudflare.com/
2. Click en **Pages** → **Create a project**
3. **Connect to Git** → Selecciona tu repositorio
4. Configuración:
   - **Project name**: `sanborns-wishlist`
   - **Framework preset**: `None`
   - **Build command**: (vacío)
   - **Build output directory**: `/`
5. Click **Save and Deploy**
6. ✅ Listo! Tu URL: `https://sanborns-wishlist.pages.dev`

#### Opción B: CLI (Rápido)

```bash
# Instalar Wrangler (solo primera vez)
npm install -g wrangler

# Login
wrangler login

# Deploy
npm run deploy
# o
./deploy.sh
```

### 3️⃣ Compartir con Cliente

Tu banner estará disponible en:
- **URL de producción**: `https://sanborns-wishlist.pages.dev`
- **URL personalizada**: (si configuras dominio)

## 📋 Checklist Pre-Deploy

- [x] ✅ Archivos principales en la raíz
- [x] ✅ `.gitignore` configurado
- [x] ✅ `index.html` en la raíz
- [x] ✅ Imágenes incluidas
- [x] ✅ Sin rutas a localhost

## 🎉 ¡Listo para Mostrar!

Tu banner está deployado y listo para compartir.

**Próximos pasos opcionales:**
- Configurar dominio personalizado
- Agregar variables de entorno (si necesitas API)
- Configurar analytics

---

📖 **Documentación completa**: Ver `DEPLOY.md` o `README.md`

