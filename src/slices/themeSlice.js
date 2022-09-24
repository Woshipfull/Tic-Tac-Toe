import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTheme: 'bright',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            state.current = payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
