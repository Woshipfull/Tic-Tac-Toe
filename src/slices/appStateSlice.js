import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: "start",
  userName: "",
  starts: "",
  level: "",
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setState: (state, action) => {
      const { payload } = action;
      state.currentState = payload;
    },
    setUserName: (state, action) => {
      const { payload } = action;
      state.userName = payload;
    },
    setStarts: (state, action) => {
      const { payload } = action;
      state.starts = payload;
    },
    setLevel: (state, action) => {
      const { payload } = action;
      state.level = payload;
    },
  },
});

export const { setState, setUserName, setStarts, setLevel } =
  appStateSlice.actions;
export default appStateSlice.reducer;
