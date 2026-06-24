import { useState, useEffect } from "react";

export function useCounter(target, startWhenVisible) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhenVisible) return;

    let current = 0;
    const step = Math.ceil(target / 50); // controls speed
    const updateCounter = () => {
      current += step;
      if (current >= target) {
        setCount(target);
      } else {
        setCount(current);
        setTimeout(updateCounter, 40); // every 40ms
      }
    };

    updateCounter();
  }, [startWhenVisible, target]);

  return count;
}
