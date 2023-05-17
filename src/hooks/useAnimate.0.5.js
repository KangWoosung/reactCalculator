import { useState, useEffect } from "react";

const useAnimate = (dependency, duration) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (dependency) {
      setAnimate(true);
      const timeoutId = setTimeout(() => setAnimate(false), duration);
      return () => clearTimeout(timeoutId);
    }
  }, [dependency, duration]);

  return animate;
};

export { useAnimate };
