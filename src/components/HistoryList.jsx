function HistoryList({ history, onSelect }) {
  return (
    <section className="mt-5 rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Historial
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Últimas 5 traducciones
          </h2>
        </div>
      </div>

      {history.length ? (
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {item.sourceLanguage.short} → {item.targetLanguage.short}
                </p>
                <span className="text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <p className="mt-3 overflow-hidden text-sm font-medium leading-6 text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {item.inputText}
              </p>
              <p className="mt-2 overflow-hidden text-sm leading-6 text-slate-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {item.translatedText}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-sm text-slate-500">
          Tu historial aparecerá aquí después de la primera traducción.
        </div>
      )}
    </section>
  )
}

export default HistoryList
