import { useState, useRef, useEffect } from "react";

export const useTimer = ({ maxTime }) => {
  const [timer, setTimer] = useState(maxTime);
  let intervalRef = useRef<any>(null);
  const reduceTimer = () => {
    setTimer((prev) => {
      if (prev === 0) {
        clearInterval(intervalRef.current);
        return prev;
      } else {
        return prev - 1;
      }
    });
  };
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(maxTime);
    intervalRef.current = setInterval(reduceTimer, 1000);
  };
  return { startTimer, timer };
};
