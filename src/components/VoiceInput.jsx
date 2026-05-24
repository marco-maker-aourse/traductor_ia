import { useSpeechRecognition } from '../hooks/useSpeechRecognition'

function VoiceInput({ language, onTranscript, onError, disabled }) {
  const { isSupported, isListening, startListening, stopListening } =
    useSpeechRecognition({
      language,
      onResult: onTranscript,
      onError,
    })

  const handleClick = () => {
    if (!isSupported) {
      onError?.(
        'Tu navegador no soporta reconocimiento de voz. Usa Chrome en Android para esta función.',
      )
      return
    }

    if (isListening) {
      stopListening()
      return
    }

    startListening()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
        isListening
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
          : 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200'
      } disabled:cursor-not-allowed disabled:opacity-60`}
      aria-pressed={isListening}
    >
      <span className="text-base">{isListening ? '●' : '🎙'}</span>
      <span>{isListening ? 'Detener' : 'Dictar'}</span>
    </button>
  )
}

export default VoiceInput
