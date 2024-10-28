import { useState } from "react";

const useMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return {
    isDarkMode,
    setIsDarkMode,

    toggleDarkMode,
  };
};

export default useMode;
