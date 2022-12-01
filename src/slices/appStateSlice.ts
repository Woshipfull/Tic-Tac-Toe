import { createSlice } from '@reduxjs/toolkit';

type State = {
  currentState: string;
  userName: string;
  starts: string;
  level: string;
};

type Action = {
  payload: string;
  type: string;
};

const initialState: State = {
  currentState: 'start',
  userName: '',
  starts: '',
  level: '',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setState: (state: State, action: Action) => {
      const { payload } = action;
      state.currentState = payload;
    },
    setUserName: (state: State, action: Action) => {
      const { payload } = action;
      state.userName = payload;
    },
    setStarts: (state: State, action: Action) => {
      const { payload } = action;
      state.starts = payload;
    },
    setLevel: (state: State, action: Action) => {
      const { payload } = action;
      state.level = payload;
    },
  },
});

export const { setState, setUserName, setStarts, setLevel } =
  appStateSlice.actions;
export default appStateSlice.reducer;
