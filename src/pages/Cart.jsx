import { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCartX, BsTrash } from "react-icons/bs"
import { FaTruck, FaLock, FaShoppingBag } from "react-icons/fa"
import { removeFromCart, increase, decrease } from "../redux/reducer/cartSlice"
import { useToast } from "../context/ToastContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function Cart() {
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const subtotal = cartItems.reduce((s, item) => s + item.price * item.quantity, 0)
  const tax      = subtotal * 0.05
  const total    = subtotal + tax

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id))
    showToast(
      isRtl ? `تمت إزالة "${item.title}"` : `"${item.title}" removed`,
      "error"
    )
  }

  if (cartItems.length === 0) return (
    <div dir={isRtl ? "rtl" : "ltr"} className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in text-center">
      <div className="w-24 h-24 bg-prime-100 rounded-full flex items-center justify-center mb-5">
        <BsCartX className="text-5xl text-prime-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">{tr.emptyCart}</h2>
      <p className="text-slate-500 max-w-xs mb-8 text-sm">{tr.emptyCartDesc}</p>
      <button onClick={() => navigate("/")} className="btn-primary px-8 py-3">
        {tr.startShopping}
      </button>
    </div>
  )

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <FaShoppingBag className="text-prime-500 text-xl" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{tr.shoppingCart}</h1>
          <p className="text-slate-500 text-sm">
            {cartItems.length} {cartItems.length === 1 ? tr.item : tr.items}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items list */}
        <div className="flex-1 flex flex-col gap-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white border border-stone-200/80 rounded-2xl p-4 shadow-sm group">
              {/* Image */}
              <div
                className="w-20 h-20 bg-prime-100 rounded-xl overflow-hidden p-2 shrink-0 cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold text-slate-800 truncate mb-0.5 cursor-pointer hover:text-prime-600 transition-colors"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.title}
                </p>
                <p className="text-prime-600 font-bold text-sm">${item.price}</p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center bg-stone-100 rounded-xl p-1 gap-1">
                <button
                  onClick={() => dispatch(decrease(item.id))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-600 text-lg font-medium flex items-center justify-center shadow-sm hover:text-prime-600 transition-colors"
                >−</button>
                <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increase(item.id))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-600 text-lg font-medium flex items-center justify-center shadow-sm hover:text-prime-600 transition-colors"
                >+</button>
              </div>

              {/* Line total */}
              <p className="text-sm font-bold text-slate-900 min-w-[64px] text-right hidden sm:block">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Delete */}
              <button
                onClick={() => handleRemove(item)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <BsTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-5">{tr.orderSummary}</h3>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-slate-600">
                <span>{tr.subtotal}</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{tr.shipping}</span>
                <span className="font-medium text-emerald-600">{tr.free}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{tr.tax} (5%)</span>
                <span className="text-slate-700">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-slate-900">{tr.total}</span>
              <span className="text-2xl font-bold text-prime-600">${total.toFixed(2)}</span>
            </div>

            <button className="btn-primary w-full py-3.5 text-base shadow-lg shadow-prime-500/20">
              {tr.checkout}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
              <FaLock className="text-slate-300 w-3 h-3" />
              <span>{isRtl ? "دفع آمن ومشفر" : "Secure & encrypted checkout"}</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
              <FaTruck className="text-slate-300" />
              <span>{t[language].freeShipping}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
