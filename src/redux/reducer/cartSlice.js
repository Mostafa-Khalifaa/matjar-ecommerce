
import { createSlice } from "@reduxjs/toolkit"


export const CartSlice = createSlice({
  name: "cart",
  initialState:{
    items: [],
  },
  reducers:{

    addToCart: (state, action)=>{
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push(action.payload)
      }
    },

    removeFromCart: (state, action)=>{
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    increase: (state, action)=>{
      const item = state.items.find(item => item.id === action.payload)
      item.quantity += 1
    },

    decrease: (state, action)=>{
      const item = state.items.find(item => item.id === action.payload)
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    },

  }
})

export const { addToCart, removeFromCart, increase, decrease } = CartSlice.actions
export default CartSlice.reducer