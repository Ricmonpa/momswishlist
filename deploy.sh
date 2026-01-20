#!/bin/bash

# Script de deploy rápido para Cloudflare Pages
# Uso: ./deploy.sh

echo "🚀 Deploying to Cloudflare Pages..."

# Verificar que wrangler esté instalado
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI no está instalado."
    echo "📦 Instalando Wrangler..."
    npm install -g wrangler
fi

# Verificar login
echo "🔐 Verificando login en Cloudflare..."
wrangler whoami

if [ $? -ne 0 ]; then
    echo "⚠️  No estás logueado. Ejecutando login..."
    wrangler login
fi

# Deploy
echo "📤 Haciendo deploy..."
wrangler pages deploy . --project-name=sanborns-wishlist

if [ $? -eq 0 ]; then
    echo "✅ Deploy exitoso!"
    echo "🌐 Tu sitio está disponible en: https://sanborns-wishlist.pages.dev"
else
    echo "❌ Error en el deploy. Revisa los logs arriba."
    exit 1
fi

