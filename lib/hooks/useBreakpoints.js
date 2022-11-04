import { useState, useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";

export default function useBreakpoints() {
  const onlyWidth = useWindowWidth();
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => setWindowWidth(onlyWidth), [onlyWidth]);

  const breakpoints = [
    { name: "sm", min: 640 },
    { name: "md", min: 768 },
    { name: "lg", min: 1024 },
  ];

  return breakpoints.filter((b) => b.min <= windowWidth).map((n) => n.name);
}
