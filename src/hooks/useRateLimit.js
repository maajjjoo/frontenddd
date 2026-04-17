import { useState, useEffect, useRef } from 'react';

export function useRateLimit() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const timerRef = useRef(null);

  const block = (seconds) => {
    setIsBlocked(true);
    setRetryAfter(seconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRetryAfter(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsBlocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { isBlocked, retryAfter, block };
}
