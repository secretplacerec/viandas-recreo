@echo off
REM ========================================
REM Script para buildear APK - Viandas Recreo
REM ========================================

echo.
echo ===== VIANDAS RECREO - APK BUILD =====
echo.

REM Verificar que estamos en el directorio correcto
if not exist "frontend" (
    echo ERROR: No se encontró la carpeta 'frontend'
    echo Asegúrate de estar en el directorio raíz del proyecto
    pause
    exit /b 1
)

REM Paso 1: Compilar el frontend
echo [1/4] Compilando frontend...
cd frontend
call npm run build
if errorlevel 1 (
    echo ERROR: El build del frontend falló
    pause
    exit /b 1
)
cd ..

REM Paso 2: Sincronizar Capacitor
echo.
echo [2/4] Sincronizando Capacitor...
cd frontend
call npx cap sync android
if errorlevel 1 (
    echo ERROR: La sincronización de Capacitor falló
    pause
    exit /b 1
)
cd ..

REM Paso 3: Buildear el APK
echo.
echo [3/4] Generando APK...
cd frontend\android

echo.
echo ¿Qué tipo de APK deseas generar?
echo 1) Debug (para pruebas)
echo 2) Release (para publicar)
echo.

set /p choice="Selecciona (1 o 2): "

if "%choice%"=="1" (
    echo Generando APK de Debug...
    call gradlew assembleDebug
    if errorlevel 1 (
        echo ERROR: La generación del APK Debug falló
        cd ..\..
        pause
        exit /b 1
    )
    echo.
    echo ✓ APK generado exitosamente en:
    echo   app\build\outputs\apk\debug\app-debug.apk
) else if "%choice%"=="2" (
    echo Generando APK de Release...
    echo NOTA: Necesitarás un keystore para firmar la app
    call gradlew assembleRelease
    if errorlevel 1 (
        echo ERROR: La generación del APK Release falló
        cd ..\..
        pause
        exit /b 1
    )
    echo.
    echo ✓ APK generado exitosamente en:
    echo   app\build\outputs\apk\release\app-release.apk
) else (
    echo ERROR: Selección inválida
    cd ..\..
    pause
    exit /b 1
)

cd ..\..

REM Paso 4: Información final
echo.
echo [4/4] ¡Completado!
echo.
echo ===== RESUMEN =====
echo.
echo ✓ Frontend compilado
echo ✓ Capacitor sincronizado
echo ✓ APK generado
echo.
echo Próximos pasos:
echo 1. Conecta tu dispositivo Android por USB
echo 2. Ejecuta: adb devices
echo 3. Instala la app con: adb install -r [ruta-al-apk]
echo.
echo Para obtener más información, ver APK_BUILD_GUIDE.md
echo.

pause
