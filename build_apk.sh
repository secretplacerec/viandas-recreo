#!/bin/bash

# ========================================
# Script para buildear APK - Viandas Recreo
# ========================================

set -e  # Exit if any command fails

echo ""
echo "===== VIANDAS RECREO - APK BUILD ====="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "frontend" ]; then
    echo "ERROR: No se encontró la carpeta 'frontend'"
    echo "Asegúrate de estar en el directorio raíz del proyecto"
    exit 1
fi

# Paso 1: Compilar el frontend
echo "[1/4] Compilando frontend..."
cd frontend
npm run build
cd ..

# Paso 2: Sincronizar Capacitor
echo ""
echo "[2/4] Sincronizando Capacitor..."
cd frontend
npx cap sync android
cd ..

# Paso 3: Buildear el APK
echo ""
echo "[3/4] Generando APK..."
cd frontend/android

echo ""
echo "¿Qué tipo de APK deseas generar?"
echo "1) Debug (para pruebas)"
echo "2) Release (para publicar)"
echo ""

read -p "Selecciona (1 o 2): " choice

if [ "$choice" = "1" ]; then
    echo "Generando APK de Debug..."
    ./gradlew assembleDebug
    echo ""
    echo "✓ APK generado exitosamente en:"
    echo "  app/build/outputs/apk/debug/app-debug.apk"
elif [ "$choice" = "2" ]; then
    echo "Generando APK de Release..."
    echo "NOTA: Necesitarás un keystore para firmar la app"
    ./gradlew assembleRelease
    echo ""
    echo "✓ APK generado exitosamente en:"
    echo "  app/build/outputs/apk/release/app-release.apk"
else
    echo "ERROR: Selección inválida"
    cd ../..
    exit 1
fi

cd ../..

# Paso 4: Información final
echo ""
echo "[4/4] ¡Completado!"
echo ""
echo "===== RESUMEN ====="
echo ""
echo "✓ Frontend compilado"
echo "✓ Capacitor sincronizado"
echo "✓ APK generado"
echo ""
echo "Próximos pasos:"
echo "1. Conecta tu dispositivo Android por USB"
echo "2. Ejecuta: adb devices"
echo "3. Instala la app con: adb install -r [ruta-al-apk]"
echo ""
echo "Para obtener más información, ver APK_BUILD_GUIDE.md"
echo ""
