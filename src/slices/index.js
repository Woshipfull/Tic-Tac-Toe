import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateSlice.js";
import themeReducer from './themeSlice.js';

export default configureStore ({
    reducer: {
        appState: appStateReducer,
        theme: themeReducer,
    }
});
