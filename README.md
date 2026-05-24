# Traductor IA

PWA movil creada con React + Vite + Tailwind CSS para traducir texto o voz con una integracion lista para usar, historial local y reproduccion hablada.

## Stack

- React + Vite
- Tailwind CSS
- vite-plugin-pwa
- Web Speech API
- SpeechSynthesis API
- LocalStorage

## Variables de entorno

No se requieren variables de entorno en esta version.

```bash
# archivo opcional, sin configuracion obligatoria
```

## Comandos

```bash
cd C:\react\traductor_ia
npm install
copy .env.example .env
npm run dev
```

Para produccion:

```bash
npm run build
npm run preview
```

## Como funciona

- El frontend realiza la traduccion de forma directa
- No necesitas backend propio
- La app mantiene historial local y soporte de voz

## Notas

- Evita usar la app con contenido sensible
- El reconocimiento de voz funciona mejor en Chrome para Android
