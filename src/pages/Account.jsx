import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaShoppingCart, FaHeart, FaSignOutAlt, FaEnvelope } from "react-icons/fa"
import { useSelector } from "react-redux"
import { AuthContext } from "../context/AuthContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function Account() {
  const { language } = useContext(Languagecontext)
  const { user, setUser } = useContext(AuthContext)
  const tr = t[language]
  const isRtl = language === "ar"
  const navigate = useNavigate()

  const cartCount   = useSelector((state) => state.cart.items.length)
  const wishlistCount = useSelector((state) => state.wishlist.items.length)

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : (user?.username?.[0] || "U").toUpperCase()

  const handleLogout = () => {
    setUser(null)
    navigate("/login")
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      {/* Avatar block */}
      <div className="flex flex-col items-center mb-10">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg"
          style={{ background: "linear-gradient(135deg, #A31621, #c52834)" }}
        >
          {initials}
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          {user?.name || user?.username}
        </h1>
        {user?.email && (
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            <FaEnvelope className="text-prime-400 w-3.5 h-3.5" />
            {user.email}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/cart")}
        >
          <div className="w-12 h-12 bg-prime-100 rounded-xl flex items-center justify-center">
            <FaShoppingCart className="text-prime-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{cartCount}</p>
            <p className="text-sm text-slate-500">{isRtl ? "في السلة" : "In Cart"}</p>
          </div>
        </div>

        <div
          className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/wishlist")}
        >
          <div className="w-12 h-12 bg-prime-100 rounded-xl flex items-center justify-center">
            <FaHeart className="text-prime-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{wishlistCount}</p>
            <p className="text-sm text-slate-500">{isRtl ? "في المفضلة" : "Wishlist"}</p>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-6 space-y-4">
        <h2 className="font-bold text-slate-900 text-lg mb-4">
          {isRtl ? "معلومات الحساب" : "Account Info"}
        </h2>
        {[
          { label: isRtl ? "الاسم الكامل" : "Full Name",  value: user?.name || "—" },
          { label: isRtl ? "اسم المستخدم" : "Username",   value: user?.username || "—" },
          { label: isRtl ? "البريد الإلكتروني" : "Email", value: user?.email || "—" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-semibold text-slate-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          { label: isRtl ? "الرئيسية" : "Browse Products", icon: <FaUser />, path: "/" },
          { label: isRtl ? "تواصل معنا" : "Contact Support", icon: <FaEnvelope />, path: "/contact" },
        ].map(({ label, icon, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-700 hover:bg-prime-100 hover:border-prime-300 transition-colors"
          >
            <span className="text-prime-500">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-prime-500 text-prime-500 font-semibold hover:bg-prime-500 hover:text-white transition-all duration-200"
      >
        <FaSignOutAlt />
        {tr.logout}
      </button>
    </div>
  )
}

export default Account
