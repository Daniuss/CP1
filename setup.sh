#!/bin/bash

# =========================================================
# FIAP Cantina App — Script de Setup Inicial
# Execute: bash setup.sh
# =========================================================

set -e

echo ""
echo "🍴  FIAP Cantina App — Setup Inicial"
echo "======================================"
echo ""

# Verifica Node
if ! command -v node &> /dev/null; then
  echo "❌ Node.js não encontrado. Instale em: https://nodejs.org/"
  exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js detectado: $NODE_VERSION"

# Instala dependências
echo ""
echo "📦 Instalando dependências..."
npm install

echo ""
echo "🔧 Inicializando repositório Git..."
git init
git add .
git commit -m "feat: estrutura inicial do projeto FIAP Cantina App"

echo ""
echo "======================================"
echo "✅ Setup concluído com sucesso!"
echo ""
echo "👉 Para iniciar o app, execute:"
echo "   npx expo start"
echo ""
echo "📱 Escaneie o QR Code com o Expo Go no celular."
echo ""
echo "🔗 Para publicar no GitHub:"
echo "   git remote add origin https://github.com/SEU_USUARIO/fiap-mdi-cp1-cantina-app.git"
echo "   git push -u origin main"
echo "======================================"
