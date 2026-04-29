import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaStar, FaRegStar, FaShoppingCart, FaSearch, FaHeart, FaRegHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/reducer/cartSlice"
import { toggleWishlist } from "../redux/reducer/wishlistSlice"
import { useToast } from "../context/ToastContext"
import { Languagecontext } from "../context/languageContext"
import HeroBanner from "../components/HeroBanner"
import t from "../translations"

const LIMIT = 12

function ProductsList() {
  const { language } = useContext(Languagecontext)
  const tr = t[language]
  const isRtl = language === "ar"
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory]     = useState("all")
  const [page, setPage]             = useState(1)
  const [total, setTotal]           = useState(0)
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState("")
  const [addedId, setAddedId]       = useState(null)

  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted  = (id) => wishlistItems.some((item) => item.id === id)

  // Fetch categories once
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(res.data.map((c) => (typeof c === "string" ? c : c.slug))))
      .catch(console.error)
  }, [])

  // Fetch products when page or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const skip = (page - 1) * LIMIT
      try {
        const url =
          category === "all"
            ? `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
            : `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`
        const res = await axios.get(url)
        setProducts(res.data.products)
        setTotal(res.data.total)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page, category])

  const handleAdd = (e, product) => {
    e.stopPropagation()
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, quantity: 1 }))
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1400)
    showToast(isRtl ? `تمت إضافة "${product.title}" إلى السلة ✓` : `"${product.title}" added to cart ✓`, "success")
  }

  const handleWishlist = (e, product) => {
    e.stopPropagation()
    const wasWishlisted = isWishlisted(product.id)
    dispatch(toggleWishlist({ id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, rating: product.rating }))
    showToast(
      wasWishlisted
        ? (isRtl ? "تمت الإزالة من المفضلة" : "Removed from wishlist")
        : (isRtl ? "تمت الإضافة إلى المفضلة ♥" : "Added to wishlist ♥"),
      wasWishlisted ? "error" : "wishlist"
    )
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    setPage(1)
    setSearch("")
  }

  const filtered = search.trim()
    ? products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : products

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero banner */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 pb-12 animate-fade-in">

        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{tr.latestArrivals}</h1>
            <p className="text-slate-500 text-sm">
              {tr.showing} {filtered.length} {tr.of} {total} {tr.products}
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-xs pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tr.searchPlaceholder}
              className="input-field pl-8 py-2 text-sm"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              category === "all"
                ? "bg-prime-500 text-white shadow-md"
                : "bg-white text-slate-600 border border-stone-200 hover:border-prime-300"
            }`}
          >
            {isRtl ? "الكل" : "All"}
          </button>
          {categories.slice(0, 18).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                category === cat
                  ? "bg-prime-500 text-white shadow-md"
                  : "bg-white text-slate-600 border border-stone-200 hover:border-prime-300"
              }`}
            >
              {cat.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(LIMIT)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-stone-200 animate-pulse h-80" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-24">{tr.noResults}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="card cursor-pointer group flex flex-col animate-slide-up"
                style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {/* Image */}
                <div className="relative bg-prime-100 rounded-t-2xl overflow-hidden h-44 flex items-center justify-center p-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist heart */}
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    {isWishlisted(product.id)
                      ? <FaHeart className="text-prime-500 w-4 h-4" />
                      : <FaRegHeart className="text-slate-400 w-4 h-4" />}
                  </button>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className={product.availabilityStatus === "In Stock" ? "badge-green" : "badge-red"}>
                      {product.availabilityStatus === "In Stock" ? tr.inStock : tr.outOfStock}
                    </span>
                    {product.discountPercentage > 10 && (
                      <span className="badge-amber">{tr.sale} {Math.round(product.discountPercentage)}%</span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1 leading-snug">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) =>
                      s <= Math.round(product.rating)
                        ? <FaStar key={s} className="text-amber-400 w-3 h-3" />
                        : <FaRegStar key={s} className="text-stone-300 w-3 h-3" />
                    )}
                    <span className="text-[11px] text-slate-400 ml-1">{product.rating}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-prime-600">${product.price}</span>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
                        addedId === product.id
                          ? "bg-emerald-500 text-white scale-95"
                          : "bg-prime-500 hover:bg-prime-600 text-white"
                      }`}
                    >
                      <FaShoppingCart className="w-3 h-3" />
                      {addedId === product.id ? "✓" : tr.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              {tr.prev}
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                    page === p
                      ? "bg-prime-500 text-white shadow-md"
                      : "bg-white text-slate-600 border border-stone-200 hover:border-prime-300"
                  }`}
                >
                  {p}
                </button>
              )
            })}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              {tr.next}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsList
