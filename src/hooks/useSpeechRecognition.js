import { useEffect, useRef, useState } from 'react'

export function useSpeechRecognition({ language, onResult, onError }) {
  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  const isSupported = Boolean(SpeechRecognition)

  useEffect(() => {
    if (!SpeechRecognition) {
      return undefined
    }

    const recognition = new SpeechRecognition()
    recognition.lang = language
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = (event) => {
      setIsListening(false)

      if (event.error === 'not-allowed') {
        onError?.('Activa el permiso del micrófono para usar el dictado por voz.')
        return
      }

      onError?.('No se pudo capturar la voz. Intenta nuevamente en un lugar silencioso.')
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join(' ')
        .trim()

      if (transcript) {
        onResult?.(transcript)
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
      recognitionRef.current = null
    }
  }, [SpeechRecognition, language, onError, onResult])

  const startListening = () => {
    recognitionRef.current?.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
  }

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  }
}
