"use client";

import { useEffect, useRef, useState } from "react";

export function useOverflow<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T | null>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function checkOverflow() {
      if (!ref.current) return;
      const element = ref.current;
      setIsOverflowed(
        element.scrollWidth > element.clientWidth ||
          element.scrollHeight > element.clientHeight,
      );
    }

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(checkOverflow);
    mutationObserver.observe(el, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", checkOverflow);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return [ref, isOverflowed];
}
