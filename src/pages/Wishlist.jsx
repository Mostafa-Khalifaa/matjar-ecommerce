import { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa"
import { BsHeartbreak } from "react-icons/bs"
import { removeFromWishlist } from "../redux/reducer/wishlistSlice"
import { addToCart } from "../redux/reducer/cartSlice"
import { useToast } from "../context/ToastContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function Wishlist() {
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const items = useSelector((state) => state.wishlist.items)
  const cartItems = useSelector((state) => state.cart.items)

  const handleRemove = (id, title) => {
    dispatch(removeFromWishlist(id))
    showToast(
      isRtl ? `تمت إزالة "${title}" من المفضلة` : `"${title}" removed from wishlist`,
      "error"
    )
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail, quantity: 1 }))
    showToast(isRtl ? "تمت الإضافة إلى السلة ✓" : "Added to cart ✓", "success")
  }

  const isInCart = (id) => cartItems.some((item) => item.id === id)

  if (items.length === 0) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in text-center">
        <div className="w-24 h-24 bg-prime-100 rounded-full flex items-center justify-center mb-5">
          <BsHeartbreak className="text-4xl text-prime-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          {isRtl ? "قائمة المفضلة فارغة" : "Your Wishlist is Empty"}
        </h2>
        <p className="text-slate-500 max-w-xs mb-8 text-sm">
          {isRtl
            ? "احفظ المنتجات التي تعجبك بالضغط على أيقونة القلب."
            : "Save products you love by clicking the heart icon on any product."}
        </p>
        <button onClick={() => navigate("/")} className="btn-primary px-8 py-3">
          {tr.startShopping}
        </button>
      </div>
    )
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          {isRtl ? "المفضلة" : "My Wishlist"}
        </h1>
        <p className="text-slate-500 text-sm">
          {items.length} {isRtl ? "منتج محفوظ" : items.length === 1 ? "saved item" : "saved items"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.id} className="card flex flex-col group animate-slide-up">
            {/* Image */}
            <div
              className="relative bg-prime-100 rounded-t-2xl h-44 flex items-center justify-center p-3 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/products/${item.id}`)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              {/* Remove from wishlist */}
              <button
                onClick={(e) => { e.stopPropagation(); handleRemove(item.id, item.title) }}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <FaHeart className="text-prime-500 w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
              <h3
                className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1 leading-snug cursor-pointer hover:text-prime-600 transition-colors"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                {item.title}
              </h3>

              {/* Stars */}
              {item.rating && (
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) =>
                    s <= Math.round(item.rating)
                      ? <FaStar key={s} className="text-amber-400 w-3 h-3" />
                      : <FaRegStar key={s} className="text-stone-300 w-3 h-3" />
                  )}
                  <span className="text-[11px] text-slate-400 ml-1">{item.rating}</span>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="text-base font-bold text-prime-600">${item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                    isInCart(item.id)
                      ? "bg-emerald-500 text-white"
                      : "bg-prime-500 hover:bg-prime-600 text-white"
                  }`}
                >
                  <FaShoppingCart className="w-3 h-3" />
                  {isInCart(item.id)
                    ? (isRtl ? "في السلة" : "In Cart")
                    : (isRtl ? "أضف للسلة" : "Add")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
