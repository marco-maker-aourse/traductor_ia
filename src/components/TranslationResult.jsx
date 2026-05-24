function TranslationResult({
  result,
  targetLanguageLabel,
  isSpeaking,
  copied,
  onSpeak,
  onCopy,
  onStop,
}) {
  const hasTranslation = Boolean(result.translatedText)

  return (
    <section className="mt-5 overflow-hidden rounded-[2rem] bg-slate-950 p-[1px] shadow-soft">
      <div className="rounded-[calc(2rem-1px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Traducción
            </p>
            <h2 className="mt-2 text-xl font-semibold">{targetLanguageLabel}</h2>
          </div>
          {result.detectedTone ? (
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
              {result.detectedTone}
            </span>
          ) : null}
        </div>

        <div className="mt-5 min-h-[148px] rounded-[1.6rem] bg-white/6 p-4 text-[1.05rem] leading-8 text-white/92">
          {hasTranslation ? (
            result.translatedText
          ) : (
            <p className="text-white/50">
              La traducción aparecerá aquí con un tono más natural y contextual.
            </p>
          )}
        </div>

        {result.notes ? (
          <p className="mt-4 text-sm leading-6 text-white/70">{result.notes}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSpeak}
            disabled={!hasTranslation || isSpeaking}
            className="inline-flex flex-1 items-center justify-center rounded-[1.2rem] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSpeaking ? 'Reproduciendo...' : 'Escuchar traducción'}
          </button>

          <button
            type="button"
            onClick={onCopy}
            disabled={!hasTranslation}
            className="inline-flex min-w-[112px] items-center justify-center rounded-[1.2rem] border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copied ? 'Copiado' : 'Copiar'}
          </button>

          <button
            type="button"
            onClick={onStop}
            disabled={!hasTranslation}
            className="inline-flex min-w-[96px] items-center justify-center rounded-[1.2rem] border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Detener
          </button>
        </div>
      </div>
    </section>
  )
}

export default TranslationResult
