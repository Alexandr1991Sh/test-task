import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import {mockApi} from "../store/api/api"

export const store = configureStore({
  reducer: {
    [mockApi.reducerPath]: mockApi.reducer,
    cart: cartReducer,
  },
  middleware:(getDefaultMiddleware=>getDefaultMiddleware().concat(mockApi.middleware)),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
