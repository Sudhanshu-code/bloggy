import React from "react";

import { darkMode, lightMode } from "../../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";

function ThemeToggle({ className }) {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();

  const changeTheme = (e) => {
    const currentStatus = e.currentTarget.checked;
    if (currentStatus) {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  };
  return (
    <div className={`${className}`}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={changeTheme}
          checked={themeMode === "dark"}
        />
        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
      </label>
    </div>
  );
}

export default ThemeToggle;
