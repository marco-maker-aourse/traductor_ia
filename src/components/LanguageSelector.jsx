function LanguageSelector({ id, label, value, onChange, options }) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-600">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand-400 focus:bg-white"
        >
          {options.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          ▾
        </span>
      </div>
    </div>
  )
}

export default LanguageSelector
