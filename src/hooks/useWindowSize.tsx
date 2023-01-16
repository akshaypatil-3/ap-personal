import React, { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

function getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
}

export const useWindowSize = (): [WindowSize, () => void] => {
  const [wSize, setWSize] = useState<WindowSize>(getWindowSize());

  function setWindowSize(size: WindowSize) {
    setWSize(size);
  }
  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return [wSize, handleWindowResize];
};
