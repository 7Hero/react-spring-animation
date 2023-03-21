export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
    return function(t: number): number {
      const cx = 3 * x1;
      const bx = 3 * (x2 - x1) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * y1;
      const by = 3 * (y2 - y1) - cy;
      const ay = 1 - cy - by;
      return (ax * (t ** 3)) + (bx * (t ** 2)) + (cx * t) + (ay * (t ** 3)) + (by * (t ** 2)) + (cy * t);
    };
}

// ease-in 
export const easeIn = cubicBezier(0.42, 0, 1, 1);
// ease-out
export const easeOut = cubicBezier(0, 0, 0.58, 1);
// ease-in-out
export const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
