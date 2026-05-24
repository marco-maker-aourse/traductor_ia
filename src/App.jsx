import { useEffect, useMemo, useState } from 'react'
import HistoryList from './components/HistoryList'
import InstallPrompt from './components/InstallPrompt'
import LanguageSelector from './components/LanguageSelector'
import TranslationResult from './components/TranslationResult'
import VoiceInput from './components/VoiceInput'
import { useLocalStorage } from './hooks/useLocalStorage'
import { speakText, stopSpeaking } from './services/speechService'
import { translateText } from './services/translationService'

const LANGUAGES = [
  { code: 'es', locale: 'es-ES', label: 'Espanol', short: 'ES' },
  { code: 'en', locale: 'en-US', label: 'English', short: 'EN' },
  { code: 'pt', locale: 'pt-BR', label: 'Portugues', short: 'PT' },
  { code: 'fr', locale: 'fr-FR', label: 'Francais', short: 'FR' },
  { code: 'de', locale: 'de-DE', label: 'Deutsch', short: 'DE' },
  { code: 'it', locale: 'it-IT', label: 'Italiano', short: 'IT' },
]

const EMPTY_RESULT = {
  translatedText: '',
  detectedTone: '',
  notes: '',
}

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('es')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [inputText, setInputText] = useState('')
  const [translation, setTranslation] = useState(EMPTY_RESULT)
  const [history, setHistory] = useLocalStorage('traductor-ia-history', [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [copied, setCopied] = useState(false)

  const sourceLanguageMeta = useMemo(
    () => LANGUAGES.find((language) => language.code === sourceLanguage),
    [sourceLanguage],
  )

  const targetLanguageMeta = useMemo(
    () => LANGUAGES.find((language) => language.code === targetLanguage),
    [targetLanguage],
  )

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  const swapLanguages = () => {
    const nextSource = targetLanguage
    const nextTarget = sourceLanguage
    const nextInputText = translation.translatedText || inputText

    setSourceLanguage(nextSource)
    setTargetLanguage(nextTarget)
    setInputText(nextInputText)
    setTranslation({
      ...translation,
      translatedText: inputText,
    })
    setError('')
  }

  const handleTranslate = async (textToTranslate = inputText) => {
    const sanitizedText = textToTranslate.trim()

    if (!sanitizedText) {
      setError('Escribe o dicta una frase antes de traducir.')
      return
    }

    if (sourceLanguage === targetLanguage) {
      setError('Selecciona idiomas distintos para traducir.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await translateText({
        text: sanitizedText,
        sourceLanguage: sourceLanguageMeta,
        targetLanguage: targetLanguageMeta,
      })

      setTranslation(result)

      const nextHistoryEntry = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        sourceLanguage: sourceLanguageMeta,
        targetLanguage: targetLanguageMeta,
        inputText: sanitizedText,
        translatedText: result.translatedText,
      }

      setHistory((currentHistory) =>
        [nextHistoryEntry, ...currentHistory].slice(0, 5),
      )
    } catch (translationError) {
      setError(
        translationError.message ||
          'No fue posible completar la traduccion. Intenta nuevamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpeak = async () => {
    if (!translation.translatedText) {
      setError('Genera una traduccion antes de reproducirla.')
      return
    }

    try {
      setIsSpeaking(true)
      setError('')
      await speakText(translation.translatedText, targetLanguageMeta?.locale || 'en-US')
    } catch (speechError) {
      setError(
        speechError.message ||
          'No se pudo reproducir la traduccion en este dispositivo.',
      )
    } finally {
      setIsSpeaking(false)
    }
  }

  const handleCopy = async () => {
    if (!translation.translatedText) {
      return
    }

    try {
      await navigator.clipboard.writeText(translation.translatedText)
      setCopied(true)
    } catch {
      setError('No se pudo copiar automaticamente. Revisa los permisos del navegador.')
    }
  }

  const loadHistoryItem = (item) => {
    setSourceLanguage(item.sourceLanguage.code)
    setTargetLanguage(item.targetLanguage.code)
    setInputText(item.inputText)
    setTranslation({
      translatedText: item.translatedText,
      detectedTone: 'Recuperado del historial',
      notes: 'Puedes volver a traducir o escuchar esta version.',
    })
    setError('')
  }

  return (
    <main className="min-h-screen bg-app px-4 pb-10 pt-6 text-slate-900 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl animate-floatIn">
          <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-brand-200/60 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Traductor IA
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
              Traducciones rapidas para uso real.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Escribe o dicta una frase y obten una traduccion natural,
              con historial, voz y experiencia instalable tipo app.
            </p>
          </div>
        </header>

        <section className="mt-5 rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-soft animate-floatIn">
          <div className="flex items-center justify-between gap-3">
            <LanguageSelector
              id="source-language"
              label="Origen"
              value={sourceLanguage}
              onChange={setSourceLanguage}
              options={LANGUAGES}
            />

            <button
              type="button"
              onClick={swapLanguages}
              className="mt-6 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
              aria-label="Intercambiar idiomas"
            >
              <span className="text-lg">⇄</span>
            </button>

            <LanguageSelector
              id="target-language"
              label="Destino"
              value={targetLanguage}
              onChange={setTargetLanguage}
              options={LANGUAGES}
            />
          </div>

          <label
            htmlFor="translation-input"
            className="mt-5 block text-sm font-medium text-slate-700"
          >
            Texto a traducir
          </label>

          <div className="mt-2 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-3 shadow-inner-soft">
            <textarea
              id="translation-input"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Ejemplo: Necesito una mesa para dos personas esta noche."
              className="min-h-[160px] w-full resize-none border-none bg-transparent text-base leading-7 text-slate-900 outline-none placeholder:text-slate-400"
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">{inputText.trim().length} caracteres</p>

              <VoiceInput
                language={sourceLanguageMeta?.locale || 'es-ES'}
                onTranscript={(transcript) =>
                  setInputText((currentValue) =>
                    currentValue ? `${currentValue.trim()} ${transcript}` : transcript,
                  )
                }
                disabled={isLoading}
                onError={setError}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleTranslate()}
            disabled={isLoading}
            className="mt-4 inline-flex w-full items-center justify-center rounded-[1.4rem] bg-slate-950 px-4 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Traduciendo...' : 'Traducir ahora'}
          </button>

          {error ? (
            <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}
        </section>

        <TranslationResult
          result={translation}
          targetLanguageLabel={targetLanguageMeta?.label || 'Idioma de destino'}
          isSpeaking={isSpeaking}
          copied={copied}
          onSpeak={handleSpeak}
          onCopy={handleCopy}
          onStop={stopSpeaking}
        />

        <HistoryList history={history} onSelect={loadHistoryItem} />
        <InstallPrompt />
      </div>
    </main>
  )
}

export default App
