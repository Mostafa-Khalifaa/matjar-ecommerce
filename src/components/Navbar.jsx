import { NavLink, Link, useNavigate } from "react-router-dom"
import { BsCart3 } from "react-icons/bs"
import { FaHeart, FaUser } from "react-icons/fa"
import { SiShopware } from "react-icons/si"
import { useSelector } from "react-redux"
import { useContext, useState } from "react"
import { Languagecontext } from "../context/languageContext"
import { AuthContext } from "../context/AuthContext"
import t from "../translations"

function Navbar() {
  const { language, setLanguage } = useContext(Languagecontext)
  const { user, setUser } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const tr = t[language]
  const isRtl = language === "ar"

  const cartCount     = useSelector((state) => state.cart.items.length)
  const wishlistCount = useSelector((state) => state.wishlist.items.length)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 pb-0.5 border-b-2 ${
      isActive
        ? "text-prime-600 border-prime-500"
        : "text-slate-600 border-transparent hover:text-prime-500"
    }`

  const IconBtn = ({ to, count, icon: Icon, id }) => (
    <NavLink
      id={id}
      to={to}
      className={({ isActive }) =>
        `relative p-2 rounded-xl transition-colors ${
          isActive ? "bg-prime-50 text-prime-600" : "text-slate-500 hover:bg-stone-100"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-prime-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pop">
          {count}
        </span>
      )}
    </NavLink>
  )

  return (
    <nav dir={isRtl ? "rtl" : "ltr"} className="glass-header px-5 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-prime-500 flex items-center justify-center shadow-md shadow-prime-500/30">
            <SiShopware className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-lg hidden sm:block tracking-tight">
            {tr.brandName}
          </span>
        </Link>

        {/* Desktop nav links */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>{tr.home}</NavLink>
            <NavLink to="/contact" className={navLinkClass}>{tr.contact}</NavLink>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-slate-600 hover:bg-stone-100 transition-colors"
          >
            {language === "en" ? "عربي" : "English"}
          </button>

          {user ? (
            <>
              {/* Wishlist */}
              <IconBtn id="nav-wishlist" to="/wishlist" count={wishlistCount} icon={FaHeart} />

              {/* Cart */}
              <IconBtn id="nav-cart" to="/cart" count={cartCount} icon={BsCart3} />

              {/* Account avatar */}
              <button
                onClick={() => navigate("/account")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #A31621, #c52834)" }}
                title={user.name || user.username}
              >
                {(user.name?.[0] || user.username?.[0] || "U").toUpperCase()}
              </button>

              {/* Desktop user info + logout */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-stone-200">
                <span className="text-sm font-medium text-slate-600 max-w-[90px] truncate">
                  {tr.hi}, {user.name || user.username}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  {tr.logout}
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden p-2 rounded-lg hover:bg-stone-100 text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login"    className="btn-ghost py-2 text-xs px-4">{tr.login}</NavLink>
              <NavLink to="/register" className="btn-primary py-2 text-xs px-4">{tr.register}</NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && user && (
        <div className="md:hidden border-t border-stone-100 mt-3 pt-3 pb-2 flex flex-col gap-2 animate-fade-in">
          <NavLink to="/"        end className="text-sm font-medium text-slate-600 px-2 py-1.5 rounded-lg hover:bg-stone-100" onClick={() => setMenuOpen(false)}>{tr.home}</NavLink>
          <NavLink to="/contact"     className="text-sm font-medium text-slate-600 px-2 py-1.5 rounded-lg hover:bg-stone-100" onClick={() => setMenuOpen(false)}>{tr.contact}</NavLink>
          <NavLink to="/wishlist"    className="text-sm font-medium text-slate-600 px-2 py-1.5 rounded-lg hover:bg-stone-100" onClick={() => setMenuOpen(false)}>{isRtl ? "المفضلة" : "Wishlist"}</NavLink>
          <NavLink to="/account"     className="text-sm font-medium text-slate-600 px-2 py-1.5 rounded-lg hover:bg-stone-100" onClick={() => setMenuOpen(false)}>{isRtl ? "حسابي" : "My Account"}</NavLink>
          <div className="flex items-center justify-between px-2 pt-2 border-t border-stone-100 mt-1">
            <span className="text-sm text-slate-500">{tr.hi}, {user.name || user.username}</span>
            <button onClick={() => { setUser(null); setMenuOpen(false) }} className="text-xs text-red-500 font-semibold">{tr.logout}</button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
