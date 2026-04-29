
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./reducer/cartSlice"
import wishlistReducer from "./reducer/wishlistSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})