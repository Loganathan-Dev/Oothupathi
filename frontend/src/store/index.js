import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import profileReducer from '../features/profile/profileSlice'
import enquiryReducer from '../features/enquiries/enquirySlice'
import cartReducer from '../features/cart/cartSlice'
import adminReducer from '../features/admin/adminSlice'  // ✅ ADD THIS

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    profile: profileReducer,
    enquiries: enquiryReducer,
    cart: cartReducer,
    admin: adminReducer,  // ✅ ADD THIS
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store