import { useEffect, useState } from "react";

function useWindowSize() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024 ? true : false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1024 ? setIsMobile(true) : setIsMobile(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return isMobile;
}

export default useWindowSize;
