import { Tween } from "../core/Tween"
import { useEffect, useRef, useState } from "react";

export default function useTween(start: number, end: number, duration: number) {
  const [value, setValue] = useState(start);
  const valueRef = useRef<Tween>(new Tween(duration, 'linear', start, end));
  
  useEffect(() => {
    valueRef.current.on('update', setValue);
  }, []);

  return value;
}