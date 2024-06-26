import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setColor, setThemeSettings } from "../../redux/contextSlice";

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state) => state.context.currentMode);
  const currentColor = useSelector((state) => state.context.currentColor);
  const themeColors = useSelector((state) => state.context.themeColors);

  const handleModeChange = (mode) => {
    dispatch(setMode(mode));
    // Save the selected mode to local storage
    localStorage.setItem("themeMode", mode);
    // if (mode === "Dark") {
    //   console.log("Dark mode selected");
    // }x
  };
  const handleColorChange = (color) => {
    dispatch(setColor(color));
  };

  const handleCloseSettings = () => {
    dispatch(setThemeSettings(false));
  };

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={handleCloseSettings}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <ClearIcon />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl">Theme Option</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={() => handleModeChange("Light")}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={() => handleModeChange("Dark")}
              className="cursor-pointer"
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
