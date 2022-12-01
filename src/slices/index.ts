import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './appStateSlice';

export default configureStore({
  reducer: {
    appState: appStateReducer,
  },
});
