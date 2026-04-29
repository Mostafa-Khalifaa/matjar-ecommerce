import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function Login() {
  const { setUser } = useContext(AuthContext)
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      setError(tr.required)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const stored = localStorage.getItem("registered_user")
    if (stored) {
      const parsed = JSON.parse(stored)
      if (
        (parsed.username === form.username || parsed.email === form.username) &&
        parsed.password === form.password
      ) {
        setUser(parsed)
        navigate("/")
        return
      }
    }
    setError(tr.invalidCredentials)
    setLoading(false)
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen flex bg-prime-50">

      {/* LEFT — brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[42%] shrink-0 bg-gradient-to-br from-prime-500 to-prime-400"
      >
        <div>
          <span className="text-white font-bold text-xl tracking-tight">
            {tr.brandName}
          </span>
        </div>
        <div>
          <p className="text-white/50 text-sm font-medium uppercase tracking-widest mb-4">
            {isRtl ? "تسجيل الدخول" : "Sign in"}
          </p>
          <h1 className="text-white text-5xl font-bold leading-tight mb-6">
            {isRtl
              ? <>مرحباً<br />بعودتك</>
              : <>Good to<br />see you<br />again.</>}
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xs">
            {isRtl
              ? "ادخل بياناتك وتسوق بكل سهولة في أي وقت."
              : "Sign in to your account and pick up right where you left off."}
          </p>
        </div>
        <p className="text-white/30 text-xs">© 2025 {tr.brandName}</p>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12">
        {/* mobile logo */}
        <div className="lg:hidden mb-10">
          <span className="font-bold text-lg text-prime-500">{tr.brandName}</span>
        </div>

        <div className="max-w-sm w-full mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{tr.loginTitle}</h2>
          <p className="text-gray-500 text-sm mb-8">{tr.loginSub}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.username}</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder={isRtl ? "اسم المستخدم أو البريد" : "Username or email"}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:bg-white focus:border-prime-500 focus:ring-1 focus:ring-prime-500 transition-colors"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.password}</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:bg-white transition-colors pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPass
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-prime-500 text-white font-semibold text-sm transition-opacity hover:bg-prime-600 active:opacity-80 disabled:opacity-60"
            >
              {loading ? (isRtl ? "جارٍ الدخول…" : "Signing in…") : tr.loginBtn}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6">
            {tr.noAccount}{" "}
            <Link to="/register" className="font-semibold text-prime-500 hover:text-prime-600 hover:underline">
              {tr.registerLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
