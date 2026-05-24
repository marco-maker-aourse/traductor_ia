import { GoogleGenerativeAI } from '@google/generative-ai'

const MODEL_NAME = 'gemini-1.5-flash'

function createPrompt({ text, sourceLanguage, targetLanguage }) {
  return `
Eres un traductor profesional impulsado por IA.
Traduce el texto del idioma ${sourceLanguage.label} al idioma ${targetLanguage.label}.
Mantén el contexto, la intención y el tono natural.
Si el texto es corto, no agregues explicaciones innecesarias.
Devuelve solo un JSON válido con esta forma:
{
  "translatedText": "traducción final",
  "detectedTone": "formal, casual, profesional, amistoso o neutro",
  "notes": "observación breve opcional sobre contexto o matiz"
}

Texto original:
"""${text}"""
`.trim()
}

function parseGeminiResponse(rawText) {
  const normalizedText = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim()

  const parsed = JSON.parse(normalizedText)

  return {
    translatedText: parsed.translatedText?.trim() || '',
    detectedTone: parsed.detectedTone?.trim() || 'Tono natural',
    notes: parsed.notes?.trim() || '',
  }
}

export async function translateWithGemini({
  text,
  sourceLanguage,
  targetLanguage,
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('No se encontró VITE_GEMINI_API_KEY en el entorno.')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })

  const response = await model.generateContent(createPrompt({
    text,
    sourceLanguage,
    targetLanguage,
  }))

  const rawText = response.response.text()

  if (!rawText) {
    throw new Error('Gemini no devolvió contenido para esta traducción.')
  }

  try {
    return parseGeminiResponse(rawText)
  } catch {
    return {
      translatedText: rawText.trim(),
      detectedTone: 'Tono natural',
      notes: 'Gemini respondió en formato libre, así que se usó la salida directa.',
    }
  }
}
