import { createSlice } from '@reduxjs/toolkit'

const loadCart = () => {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveCart = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (e) {
    console.error('Save cart error:', e)
  }
}

const initialState = {
  items: loadCart(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const existing = state.items.find((item) => item._id === product._id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || '',
          quantity,
          stock: product.stock,
        })
      }
      saveCart(state.items)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      saveCart(state.items)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item._id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
        saveCart(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      saveCart(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart?.items || []
export const selectCartCount = (state) =>
  (state.cart?.items || []).reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = (state) =>
  (state.cart?.items || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

export default cartSlice.reducer
