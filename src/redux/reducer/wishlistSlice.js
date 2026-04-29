import { createSlice } from "@reduxjs/toolkit"

// Load wishlist from localStorage on startup
const loadWishlist = () => {
  try {
    const saved = localStorage.getItem("matjar_wishlist")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveWishlist = (items) => {
  localStorage.setItem("matjar_wishlist", JSON.stringify(items))
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
      saveWishlist(state.items)
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveWishlist(state.items)
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
