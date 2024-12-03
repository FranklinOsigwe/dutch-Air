import { useEffect } from "react";

/**
 * Hook to handle clicks outside a specific element.
 * @param ref - React ref of the element to detect outside clicks for.
 * @param handler - Function to call when a click outside is detected.
 */
const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the element
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
