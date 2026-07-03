# 📱 Generar APK en la Nube (GitHub Actions)

## Opción Más Fácil - Sin Instalar Nada

Si no quieres instalar Java 11+, puedes generar el APK automáticamente en la nube usando GitHub Actions.

## Pasos:

### 1. Subir el proyecto a GitHub

```bash
# Desde la carpeta raíz del proyecto
git remote add origin https://github.com/TU_USUARIO/viandas-recreo.git
git branch -M main
git push -u origin main
```

### 2. Ejecutar el Workflow

1. Abre: https://github.com/TU_USUARIO/viandas-recreo/actions
2. Haz click en el workflow "Build APK"
3. Click en "Run workflow"
4. Click en "Run workflow" nuevamente

### 3. Esperar a que se compile

- El workflow tardará unos 10-15 minutos en compilar
- Verás el progreso en la pantalla

### 4. Descargar el APK

1. Ve a: https://github.com/TU_USUARIO/viandas-recreo/actions
2. Haz click en el workflow que acaba de completarse (con ✓ verde)
3. Baja hasta "Artifacts"
4. Descarga: `viandas-recreo-debug`
5. Extrae el ZIP y obtendrás `app-debug.apk`

## Instalar en tu Teléfono

### Opción A: Desde una Computadora (Recomendado)

1. Conecta tu teléfono por USB
2. Abre una terminal:
   ```bash
   adb install -r app-debug.apk
   ```

### Opción B: Directamente en el Teléfono

1. Descarga el APK en tu teléfono
2. Abre el archivo con tu gestor de archivos
3. Haz click para instalar
4. Confirma la instalación

## ⚠️ Importante: Configurar Backend

**La app necesita conectarse al backend.** Por defecto intenta `http://localhost:3000`.

### Si quieres usar la app:

1. Edita `frontend/src/services/api.ts`
2. Cambia:
   ```typescript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
   ```
3. Por tu IP local (ej: `http://192.168.1.100:3000/api`)
4. Push a GitHub
5. Espera a que GitHub Actions compile de nuevo
6. Descarga el nuevo APK

## Alternativa: Usar Backend en Línea

Sube el backend a un servidor (Railway, Render, Heroku) y usa esa URL.

---

**¿No quieres GitHub?** Mira `APK_BUILD_GUIDE.md` para generar localmente.
