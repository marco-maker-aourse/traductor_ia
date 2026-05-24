# Traductor IA

PWA móvil creada con React + Vite + Tailwind CSS para traducir texto o voz con Gemini, guardar historial local y reproducir el resultado con voz.

## Stack

- React + Vite
- Tailwind CSS
- vite-plugin-pwa
- Web Speech API
- SpeechSynthesis API
- LocalStorage
- Gemini API

## Variables de entorno

1. Copia `.env.example` a `.env`
2. Agrega tu clave:

```bash
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

## Comandos npm

```bash
npm install
npm run dev
npm run build
npm run preview
npm run deploy
```

## Ejecución local

```bash
cd C:\react\traductor_ia
npm install
copy .env.example .env
npm run dev
```

Luego abre la URL que te entregue Vite, normalmente:

```bash
http://localhost:5173
```

## Deploy en GitHub Pages

1. Crea un repositorio y sube el proyecto.
2. Instala dependencias si aún no lo hiciste:

```bash
npm install
```

3. Publica:

```bash
npm run deploy
```

4. En GitHub, ve a `Settings > Pages`.
5. Verifica que la rama publicada sea `gh-pages`.

La configuración usa `base: './'`, así que funciona bien al desplegarse en GitHub Pages sin depender del nombre exacto del repositorio.

## Uso en Android

- Abre la app en Chrome.
- Acepta permisos de micrófono para el dictado.
- Usa `Instalar` o `Agregar a pantalla principal`.
- Una vez instalada, correrá en modo standalone como app real.

## Notas

- El reconocimiento de voz funciona mejor en Chrome para Android.
- Si Gemini no está configurado, la app mostrará un mensaje de error claro.
- El historial guarda solo las últimas 5 traducciones en LocalStorage.
