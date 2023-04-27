import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "cart",
  initialState: {
    change: true,
  },
  reducers: {
    changeMode: (state, actions) => {
      return {
        ...state,
        change: !state.change,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;
