import { useEffect, useState } from 'react'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      false
    )
  })

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (isInstalled) {
    return (
      <section className="mt-5 rounded-[1.7rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700 shadow-soft">
        La app ya está instalada o se está ejecutando en modo standalone.
      </section>
    )
  }

  return (
    <section className="mt-5 rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            PWA
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Instálala en tu celular
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            En Android con Chrome podrás abrirla como app, sin barra del navegador y
            con acceso rápido desde la pantalla principal.
          </p>
        </div>

        <button
          type="button"
          onClick={handleInstall}
          disabled={!deferredPrompt}
          className="rounded-[1.2rem] bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Instalar
        </button>
      </div>

      {!deferredPrompt ? (
        <p className="mt-3 text-xs text-slate-400">
          Si no ves el botón activo, abre la app en Chrome Android y usa “Agregar a
          pantalla principal”.
        </p>
      ) : null}
    </section>
  )
}

export default InstallPrompt
