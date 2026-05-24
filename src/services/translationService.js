const API_URL = 'https://api.mymemory.translated.net/get'

function inferTone(text) {
  const loweredText = text.toLowerCase()

  if (loweredText.includes('por favor') || loweredText.includes('please')) {
    return 'Cortes'
  }

  if (text.includes('!')) {
    return 'Expresivo'
  }

  if (text.trim().split(/\s+/).length <= 3) {
    return 'Breve'
  }

  return 'Natural'
}

export async function translateText({
  text,
  sourceLanguage,
  targetLanguage,
}) {
  const params = new URLSearchParams({
    q: text,
    langpair: `${sourceLanguage.code}|${targetLanguage.code}`,
  })

  const response = await fetch(`${API_URL}?${params.toString()}`)

  let data

  try {
    data = await response.json()
  } catch {
    throw new Error('El servicio de traduccion devolvio una respuesta no valida.')
  }

  if (!response.ok) {
    throw new Error('No fue posible comunicarse con el servicio de traduccion.')
  }

  if (data?.responseStatus !== 200) {
    throw new Error(
      data?.responseDetails || 'No se pudo resolver la traduccion en este momento.',
    )
  }

  const translatedText = data?.responseData?.translatedText?.trim()

  if (!translatedText) {
    throw new Error('No se devolvio una traduccion para este texto.')
  }

  return {
    translatedText,
    detectedTone: inferTone(text),
    notes: 'Traduccion generada por el motor de traduccion disponible en linea.',
  }
}
