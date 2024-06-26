import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  screenSize: undefined,
  currentColor: "#03C9D7",
  currentMode: "Light",
  themeSettings: false,
  activeMenu: true,
  isClicked: {},
 
};

const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setScreenSize(state, action) {
      state.screenSize = action.payload;
    },
    setCurrentColor(state, action) {
      state.currentColor = action.payload;
    },
    setCurrentMode(state, action) {
      state.currentMode = action.payload;
    },
    setThemeSettings(state, action) {
      state.themeSettings = action.payload;
    },
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
    setIsClicked(state, action) {
      state.isClicked = action.payload;
    },
    setMode(state, action) {
      state.currentMode = action.payload;
    },
    setColor(state, action) {
      state.currentColor = action.payload;
    },
    handleClick(state, action) {
      const clicked = action.payload;
      state.isClicked = { ...initialState, [clicked]: true };
    },
  },
});

export const {
  setScreenSize,
  setCurrentColor,
  setCurrentMode,
  setThemeSettings,
  setActiveMenu,
  setIsClicked,
  setMode,
  setColor,
  handleClick,
} = contextSlice.actions;

export default contextSlice.reducer;
