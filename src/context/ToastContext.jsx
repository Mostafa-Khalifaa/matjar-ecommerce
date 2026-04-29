import { createContext, useContext, useState, useCallback } from "react"

export const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = "success") => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium
              pointer-events-auto animate-slide-up min-w-[220px] max-w-xs
              ${toast.type === "success" ? "bg-slate-900 text-white" : ""}
              ${toast.type === "error"   ? "bg-red-600 text-white"   : ""}
              ${toast.type === "wishlist" ? "bg-prime-500 text-white" : ""}
            `}
          >
            <span className="text-base leading-none">
              {toast.type === "success"  && "✓"}
              {toast.type === "error"    && "✕"}
              {toast.type === "wishlist" && "♥"}
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
