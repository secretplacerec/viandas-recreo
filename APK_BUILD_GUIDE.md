# 📱 Guía para Generar APK - Viandas Recreo

## Requisitos Previos

Para generar un APK de la aplicación Viandas Recreo, necesitas:

### 1. **Java Development Kit (JDK)**
- Descargar: https://www.oracle.com/java/technologies/downloads/
- Versión recomendada: JDK 17 o superior
- Asegúrate de que `JAVA_HOME` esté configurado en las variables de entorno

### 2. **Android SDK**
- Opción A: Descargar Android Studio: https://developer.android.com/studio
- Opción B: Descargar solo SDK: https://developer.android.com/studio#command-tools
- Necesitas `ANDROID_SDK_ROOT` configurado en variables de entorno

### 3. **Gradle**
- Normalmente viene incluido con Android Studio
- O descargar desde: https://gradle.org/releases/

### 4. **Node.js y npm**
- Ya deberías tener instalado (para ejecutar el proyecto)

## Pasos para Generar el APK

### Paso 1: Verificar Requisitos
```bash
# Verificar Java
java -version

# Verificar Gradle
gradle --version

# Verificar Android SDK
echo %ANDROID_SDK_ROOT%  (Windows)
echo $ANDROID_SDK_ROOT   (Mac/Linux)
```

### Paso 2: Compilar el Frontend
```bash
cd frontend
npm run build
```

### Paso 3: Sincronizar Capacitor
```bash
# Desde la carpeta frontend
npx cap sync android
```

### Paso 4: Generar el APK

#### Opción A: APK en modo Debug (para pruebas)
```bash
cd frontend/android
./gradlew assembleDebug
```

El APK se generará en:
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

#### Opción B: APK en modo Release (para publicar)
```bash
cd frontend/android
./gradlew assembleRelease
```

El APK se generará en:
```
frontend/android/app/build/outputs/apk/release/app-release.apk
```

### Paso 5: Instalar en Dispositivo Android

```bash
# Asegúrate de que tienes un dispositivo Android conectado o emulador ejecutándose

# Ver dispositivos disponibles
adb devices

# Instalar el APK
adb install -r frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

## ⚠️ Importante: Configuración del Backend

La aplicación móvil necesita conectarse al backend. Por defecto, intenta conectarse a `http://localhost:3000`.

### Para que la app móvil funcione:

**Opción 1: Backend en la misma red local**
1. Identifica la IP de tu máquina (ej: 192.168.1.100)
2. Edita `frontend/src/services/api.ts`:
   ```typescript
   const API_URL = 'http://192.168.1.100:3000/api'
   ```
3. Recompila el frontend y genera el APK nuevamente

**Opción 2: Backend en servidor remoto**
1. Despliega el backend en un servidor (Railway, Render, Heroku)
2. Actualiza `api.ts` con la URL del servidor remoto
3. Recompila y genera el APK

**Opción 3: API Mock (para pruebas)**
- La app tiene fallbacks que muestran datos de demostración si el API no responde

## 🚀 Alternativas: Buildear en la Nube

Si no quieres instalar todas las herramientas localmente:

### EAS Build (Expo)
```bash
npm install -g eas-cli
eas build --platform android
```

### GitHub Actions
- Configura un workflow de GitHub que buildee el APK automáticamente
- El APK se descarga como artifact

## 📦 Estructura Generada

Después de ejecutar `npx cap add android`, se crea:

```
frontend/
├── android/                 # Proyecto Android nativo
│   ├── app/
│   │   ├── build/          # Aquí se genera el APK
│   │   ├── src/
│   │   └── build.gradle
│   └── gradle/
├── dist/                    # Código compilado del frontend
└── capacitor.config.ts      # Configuración de Capacitor
```

## 🐛 Troubleshooting

### "JAVA_HOME not set"
```bash
# Windows
setx JAVA_HOME "C:\Program Files\Java\jdk-17"

# Mac/Linux
export JAVA_HOME=/path/to/jdk
```

### "Android SDK not found"
```bash
# Windows
setx ANDROID_SDK_ROOT "C:\Users\%USERNAME%\AppData\Local\Android\Sdk"

# Mac
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk

# Linux
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
```

### "Gradle build fails"
```bash
# Limpiar y reconstruir
cd frontend/android
./gradlew clean
./gradlew assembleDebug
```

## 📝 Resumen Rápido

```bash
# 1. Build del frontend
cd frontend && npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Generar APK
cd android && ./gradlew assembleDebug

# 4. Instalar en dispositivo
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## 📱 Especificaciones de la App

- **Nombre**: Viandas Recreo
- **Package**: com.viandas.recreo
- **Versión**: 0.1.0
- **Mínimo SDK**: Android 24 (7.0)
- **Target SDK**: Android 14

## 🔗 Enlaces Útiles

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Setup](https://developer.android.com/studio/install)
- [ADB Commands](https://developer.android.com/studio/command-line/adb)
- [Gradle Build System](https://gradle.org/)

---

**¿Necesitas ayuda?** Revisa los logs de Gradle para más detalles sobre el error.
