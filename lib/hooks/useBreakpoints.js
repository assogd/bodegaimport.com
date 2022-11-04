import { useWindowWidth } from "@react-hook/window-size/throttled";

export default function useBreakpoints() {
  const width = useWindowWidth();

  const breakpoints = [
    { name: "sm", min: 640 },
    { name: "md", min: 768 },
    { name: "lg", min: 1024 },
  ];

  return breakpoints.filter((b) => b.min <= width).map((n) => n.name);
}
