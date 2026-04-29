import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Languagecontext } from "../context/languageContext"

function HeroBanner() {
  const { language } = useContext(Languagecontext)
  const isRtl = language === "ar"
  const navigate = useNavigate()

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden rounded-3xl mx-4 mt-6 mb-8"
      style={{ background: "linear-gradient(135deg, #A31621 0%, #c52834 50%, #A31621 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10"
        style={{ background: "#BFDBF7" }} />
      <div className="absolute -bottom-16 -left-10 w-80 h-80 rounded-full opacity-10"
        style={{ background: "#BFDBF7" }} />
      <div className="absolute top-4 right-32 w-24 h-24 rounded-full opacity-5"
        style={{ background: "#BFDBF7" }} />

      <div className="relative z-10 px-8 py-10 sm:py-14 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Text */}
        <div className="text-center sm:text-start">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(191,219,247,0.2)", color: "#BFDBF7" }}
          >
            {isRtl ? "وصل حديثاً" : "New Collection"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            {isRtl ? (
              <>اكتشف أحدث<br />منتجاتنا</>
            ) : (
              <>Discover The<br />Best Products</>
            )}
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xs">
            {isRtl
              ? "تسوق من بين آلاف المنتجات بأسعار لا تقاوم وشحن مجاني."
              : "Shop thousands of products at unbeatable prices with free shipping."}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-2xl font-bold text-prime-500 text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: "#BFDBF7" }}
          >
            {isRtl ? "تسوق الآن" : "Shop Now →"}
          </button>
          <p className="text-white/50 text-xs">
            {isRtl ? "شحن مجاني على الطلبات فوق $50" : "Free shipping over $50"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
