export function speakText(text, language) {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('La síntesis de voz no está disponible en este navegador.'))
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 0.95
    utterance.pitch = 1

    utterance.onend = () => resolve()
    utterance.onerror = () =>
      reject(new Error('Ocurrió un problema al reproducir la traducción.'))

    window.speechSynthesis.speak(utterance)
  })
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}
