import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartState, Product, CartItem} from '../common/types/types'

const initialState: CartState = {
    items: [],
    isOpen: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<Product>) => {
            const existingItem = state.items.find((item: CartItem) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
        },
        removeFromCart: (state: CartState, action: PayloadAction<string>) => {
            state.items = state.items.filter((item: CartItem) => item.id !== action.payload)
        },
        toggleCart: (state: CartState) => {
            state.isOpen = !state.isOpen
        },
    },
})

export const {addToCart, removeFromCart, toggleCart} =
    cartSlice.actions

export default cartSlice.reducer
