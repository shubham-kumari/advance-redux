import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui', // Unique name for the slice
    initialState: { cartIsVisible: false, notification: null }, // Initial state
    reducers: { // Corrected key
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action) {
            state.notification = { 
                status: action.payload.status,
                title: action.payload.title, 
                message: action.payload.message 
            }
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
