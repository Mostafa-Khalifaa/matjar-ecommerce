import { Outlet, Link } from "react-router-dom"
import { useEffect, useContext } from "react"
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"
import { SiShopware } from "react-icons/si"
import Navbar from "./Navbar"
import { Languagecontext } from "../context/languageContext"

function Layout() {
  const { language } = useContext(Languagecontext)
  const isRtl = language === "ar"

  useEffect(() => {
    document.body.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  return (
    <div className="min-h-screen flex flex-col bg-prime-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        dir={isRtl ? "rtl" : "ltr"}
        className="border-t border-stone-200 bg-white mt-16"
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-prime-500 flex items-center justify-center shadow-md">
                  <SiShopware className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-lg">Matjar</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {isRtl
                  ? "متجرك الإلكتروني الموثوق لأفضل المنتجات بأسعار لا تقاوم."
                  : "Your trusted online store for the best products at unbeatable prices."}
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-prime-100 flex items-center justify-center text-prime-500 hover:bg-prime-500 hover:text-white transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop links */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                {isRtl ? "التسوق" : "Shop"}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: isRtl ? "أحدث المنتجات" : "New Arrivals", path: "/" },
                  { label: isRtl ? "العروض" : "Sale", path: "/" },
                  { label: isRtl ? "المفضلة" : "Wishlist", path: "/wishlist" },
                  { label: isRtl ? "السلة" : "Cart", path: "/cart" },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm text-slate-500 hover:text-prime-500 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                {isRtl ? "المساعدة" : "Support"}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: isRtl ? "تواصل معنا" : "Contact Us", path: "/contact" },
                  { label: isRtl ? "سياسة الإرجاع" : "Returns Policy", path: "/contact" },
                  { label: isRtl ? "تتبع طلبك" : "Track Order", path: "/contact" },
                  { label: isRtl ? "الأسئلة الشائعة" : "FAQ", path: "/contact" },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm text-slate-500 hover:text-prime-500 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                {isRtl ? "تواصل" : "Contact"}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li>support@matjar.com</li>
                <li>+20 100 000 0000</li>
                <li>{isRtl ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>© 2025 Matjar. {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-prime-500 transition-colors">
                {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href="#" className="hover:text-prime-500 transition-colors">
                {isRtl ? "الشروط والأحكام" : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout