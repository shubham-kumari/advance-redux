import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui', // Unique name for the slice
    initialState: { cartIsVisible: false }, // Initial state
    reducers: { // Corrected key
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
