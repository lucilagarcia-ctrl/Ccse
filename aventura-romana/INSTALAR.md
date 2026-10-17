# 📲 Cómo crear e instalar la app (Android e iOS) desde GitHub

El repositorio tiene dos "fábricas" automáticas en **GitHub Actions**, cada una con su instalador:

| Plataforma | Flujo en GitHub | Archivo que genera | Tiempo aprox. |
|---|---|---|---|
| Android | **Android (APK)** | `AventuraRomana.apk` | 15-25 min |
| iOS | **iOS (IPA)** | `AventuraRomana-sin-firmar.ipa` | 25-40 min |

No hace falta instalar nada en tu ordenador para generarlos. Los dos son gratis dentro de los minutos
gratuitos de GitHub Actions. Una vez instalada, la app funciona **sin internet**.

---

## 1. Generar los instaladores

Se generan solos cada vez que cambia algo dentro de `aventura-romana/`. Para lanzarlos a mano:

1. Entra en el repositorio en GitHub → pestaña **Actions**.
2. En la columna de la izquierda elige **Android (APK)** o **iOS (IPA)**.
3. Pulsa **Run workflow** → elige la rama (normalmente `main`) → **Run workflow**.
   > El botón "Run workflow" solo aparece cuando los archivos `.github/workflows/*.yml` ya están en la rama principal (`main`).
   > Mientras estén en otra rama, los instaladores se generan solos al subir cambios a esa rama.
4. Espera a que salga el ✅ verde.
5. Abre la ejecución y baja hasta **Artifacts**:
   - `AventuraRomana-android-apk` → descarga un `.zip` con `AventuraRomana.apk` dentro.
   - `AventuraRomana-ios-ipa` → descarga un `.zip` con `AventuraRomana-sin-firmar.ipa` dentro.

**Truco: un enlace de descarga fijo (Releases).** Al pulsar **Run workflow** puedes escribir una versión
(por ejemplo `v1.0.1`) en el campo **Versión**: el flujo crea esa Release y le adjunta el instalador
(lanza los dos flujos con la misma versión para tener el APK y el IPA juntos). También vale crear
una etiqueta que empiece por `v`
(GitHub → **Releases** → **Draft a new release** → *Choose a tag* → escribe `v1.0.0` → **Publish release**),
los dos flujos se ejecutan y **adjuntan el APK y el IPA a esa Release**. Así puedes abrir la página de la
Release directamente desde el móvil y descargar el archivo sin descomprimir nada.

---

## 2. Instalar en Android (APK)

1. Pasa `AventuraRomana.apk` al móvil (o descárgalo desde la Release en el propio móvil).
2. Ábrelo. Android pedirá permiso para **"Instalar apps desconocidas"** para el navegador o el gestor de
   archivos: actívalo solo para esa app.
3. Pulsa **Instalar**. El icono del legionario aparecerá en el menú.

Notas:
- Este APK va firmado con la clave de pruebas de Android. Para instalarlo en casa vale; para Google Play
  hay que generar uno firmado con una clave propia (ver el punto 4).
- **Voz en catalán**: la lectura en voz alta usa el motor de voz del teléfono. Si en catalán no suena, ve a
  *Ajustes → Sistema → Idioma → Salida de texto a voz → Motor de Google → Instalar datos de voz →
  Català* (se descarga una vez y después funciona sin internet).

---

## 3. Instalar en iPhone / iPad (IPA)

Apple no deja instalar apps que no estén firmadas. El IPA sale **sin firmar** de GitHub y se firma en el
momento de instalarlo. Hay tres caminos:

### Opción A — Gratis, con tu Apple ID (Sideloadly)
1. Instala **Sideloadly** en un ordenador Windows o Mac (sideloadly.io) y, en Windows, también iTunes.
2. Conecta el iPhone por cable y desbloquéalo.
3. Arrastra `AventuraRomana-sin-firmar.ipa` a Sideloadly, escribe tu Apple ID y pulsa **Start**.
4. En el iPhone: *Ajustes → General → VPN y gestión de dispositivos* → toca tu Apple ID → **Confiar**.
5. En iOS 16 o posterior: *Ajustes → Privacidad y seguridad → Modo de desarrollador* → activar y reiniciar.

⚠️ Con un Apple ID gratuito la firma **caduca a los 7 días**: hay que repetir el paso 3 (Sideloadly puede
renovarla automáticamente si el ordenador está encendido y en la misma wifi).

### Opción B — Cuenta de Apple Developer (99 €/año), sin caducidad semanal
Con la cuenta de pago la firma dura 1 año y puedes usar TestFlight. La forma más sencilla es EAS (Expo):
```bash
cd aventura-romana
npm install
npx eas-cli@latest login            # cuenta gratuita de expo.dev
npx eas-cli@latest device:create    # registra el iPhone del niño (se abre un enlace en el iPhone)
npx eas-cli@latest build -p ios --profile preview
```
EAS pide tu Apple ID, crea los certificados y al terminar da un enlace/QR para instalar la app en el iPhone.
(El archivo `eas.json` ya está preparado. Con `--profile preview -p android` también genera el APK.)

### Opción C — Publicarla en el App Store
Necesita la cuenta de Apple Developer, capturas, política de privacidad y pasar la revisión de Apple para
la categoría "Niños". Se puede hacer con `npx eas-cli build -p ios --profile production` y
`npx eas-cli submit -p ios`.

---

## 4. (Opcional) Publicar en Google Play

1. Cuenta de Google Play Console (25 $ una sola vez).
2. `npx eas-cli build -p android --profile production` genera un `.aab` firmado (EAS guarda la clave).
3. Súbelo a Play Console. Al ser una app para niños, rellena el cuestionario de "Familias": la app no tiene
   anuncios, no recoge datos y no usa internet, así que el cuestionario es sencillo.

---

## 5. Probar cambios rápido sin generar instaladores

En un ordenador con Node.js 20 o superior:
```bash
cd aventura-romana
npm install
npx expo start
```
y escanea el QR con la app **Expo Go** (App Store / Google Play) con el móvil en la misma wifi.
Expo Go necesita que su versión coincida con la versión de Expo del proyecto (SDK 58).

---

## Si algo falla

- **El flujo de Android o iOS sale en rojo**: abre la ejecución, entra en el paso en rojo y copia las últimas
  líneas del registro. Suele ser una actualización de las herramientas de GitHub (Xcode, Java). Con ese
  texto se puede arreglar el archivo `.github/workflows/android-apk.yml` o `ios-ipa.yml`.
- **"Run workflow" no aparece**: los archivos de los flujos todavía no están en `main` (ver el paso 1.3).
- **El iPhone dice "Desarrollador no fiable"**: falta el paso 3.A.4.
