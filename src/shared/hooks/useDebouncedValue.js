import { useEffect, useState } from "react";

// Returns `value` only after it stopped changing for `delay` ms.
// Used so typing in a search box does not fire a request per keystroke.
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
