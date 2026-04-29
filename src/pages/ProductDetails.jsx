import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaStar, FaRegStar, FaTruck, FaShieldAlt, FaUndo, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/reducer/cartSlice"
import { toggleWishlist } from "../redux/reducer/wishlistSlice"
import { useToast } from "../context/ToastContext"
import { Languagecontext } from "../context/languageContext"
import t from "../translations"

function ProductDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const { showToast } = useToast()

  const [product, setProduct]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded]       = useState(false)
  const [quantity, setQuantity] = useState(1)

  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted  = product ? wishlistItems.some((item) => item.id === product.id) : false

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((r) => { setProduct(r.data); setActiveImg(0); setQuantity(1) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, quantity }))
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
    showToast(isRtl ? "تمت الإضافة إلى السلة ✓" : "Added to cart ✓", "success")
  }

  const handleWishlist = () => {
    dispatch(toggleWishlist({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, rating: product.rating }))
    showToast(
      isWishlisted
        ? (isRtl ? "تمت الإزالة من المفضلة" : "Removed from wishlist")
        : (isRtl ? "تمت الإضافة إلى المفضلة ♥" : "Added to wishlist ♥"),
      isWishlisted ? "error" : "wishlist"
    )
  }

  if (loading) return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 bg-stone-200 rounded-3xl h-96" />
        <div className="w-full md:w-1/2 space-y-4">
          {[3, 2, 4, 1].map((w, i) => <div key={i} className={`h-6 bg-stone-200 rounded w-${w}/4`} />)}
        </div>
      </div>
    </div>
  )

  if (!product) return <div className="text-center py-20 text-slate-500">Product not found</div>

  const images    = product.images?.length > 0 ? product.images : [product.thumbnail]
  const origPrice = product.price / (1 - product.discountPercentage / 100)

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="text-sm text-slate-500 hover:text-prime-600 transition-colors mb-8 flex items-center gap-1.5 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
        {tr.backToProducts}
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-14 items-start">

        {/* ── Images ── */}
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-6 shadow-sm relative">
            <img
              src={images[activeImg]}
              alt={product.title}
              className="w-full h-full object-contain transition-all duration-300"
            />
            {/* Wishlist on image */}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-stone-100"
            >
              {isWishlisted
                ? <FaHeart className="text-prime-500 w-5 h-5" />
                : <FaRegHeart className="text-slate-400 w-5 h-5" />}
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden bg-white transition-all ${
                    activeImg === i ? "border-prime-500 shadow-md" : "border-stone-200 hover:border-prime-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details ── */}
        <div className="w-full md:w-1/2">

          {/* Category & brand chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-semibold bg-prime-100 text-prime-600 px-3 py-1 rounded-full uppercase tracking-wide">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-xs font-semibold bg-stone-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wide">
                {product.brand}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-lg">
              {[1, 2, 3, 4, 5].map((s) =>
                s <= Math.round(product.rating)
                  ? <FaStar key={s} className="text-amber-400 w-3.5 h-3.5" />
                  : <FaRegStar key={s} className="text-amber-200 w-3.5 h-3.5" />
              )}
              <span className="text-amber-700 text-sm font-bold ml-1.5">{product.rating}</span>
            </div>
            <a
              href={`https://dummyjson.com/products/${id}/reviews`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-prime-500 hover:underline"
            >
              {tr.reviews}
            </a>
            <span className="text-sm text-slate-400">({product.stock} {isRtl ? "في المخزون" : "in stock"})</span>
          </div>

          <p className="text-slate-600 text-[15px] leading-relaxed mb-6">{product.description}</p>

          {/* Price box */}
          <div className="bg-prime-100 border border-stone-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{tr.price}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                  {product.discountPercentage > 2 && (
                    <span className="text-base font-medium text-slate-400 line-through mb-0.5">
                      ${origPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <span className={product.availabilityStatus === "In Stock" ? "badge-green text-xs" : "badge-red text-xs"}>
                {product.availabilityStatus === "In Stock" ? tr.inStock : tr.outOfStock}
              </span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-sm font-medium text-slate-600">{isRtl ? "الكمية" : "Qty"}:</p>
              <div className="flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-stone-100 transition-colors text-lg font-medium"
                >−</button>
                <span className="px-4 text-sm font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-stone-100 transition-colors text-lg font-medium"
                >+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  added
                    ? "bg-emerald-500 text-white scale-[.98]"
                    : "bg-prime-500 hover:bg-prime-600 text-white shadow-lg shadow-prime-500/25"
                }`}
              >
                <FaShoppingCart className="w-4 h-4" />
                {added ? (isRtl ? "✓ تمت الإضافة" : "✓ Added!") : tr.addToCartPrice}
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                  isWishlisted
                    ? "border-prime-500 bg-prime-500 text-white"
                    : "border-stone-200 bg-white text-slate-400 hover:border-prime-400"
                }`}
              >
                {isWishlisted ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Perks */}
          <div className="flex flex-col gap-2.5 text-sm text-slate-600">
            {[
              { icon: <FaTruck className="text-prime-400" />,    text: tr.freeShipping },
              { icon: <FaShieldAlt className="text-prime-400" />, text: isRtl ? "ضمان لمدة سنة" : "1 Year warranty" },
              { icon: <FaUndo className="text-prime-400" />,      text: isRtl ? "إرجاع مجاني خلال 30 يومًا" : "30-day free returns" },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {icon} <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
