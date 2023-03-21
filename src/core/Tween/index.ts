import { EventEmitter } from "../../events/EventEmitter";
import clamp from "../../utils/clamp";

type Interpolator = (progress: number) => number;

export class Tween extends EventEmitter {
  duration: number;
  easing: string;
  start: number;
  end: number;
  startTime: number;
  progress = 0;
  animationId: number;
  value: number;
  _interpolator: Interpolator;

  constructor(duration: number, easing: string, start: number, end: number) {
    super();
    this.startTime = performance.now()
    this.duration = duration*1000;
    this.easing = easing;
    this.start = start;
    this.end = end;
    this.value = start;
    this._interpolator = this._interpolate([0, 1], [this.start, this.end]);
    this.animationId = window.requestAnimationFrame(this.update.bind(this))
  }
  /*
    x1, x2: from this range
    y1, y2: to this range
    stiffness: how much the spring will stretch
    damping: how much the spring will bounce
    mass: how much the spring will bounce
  */
  _interpolate(
    [x1, x2]: number[],
    [y1, y2]: number[],
    ): Interpolator {
    const scalar = (y2 - y1)/(x2 - x1);
    return (progress: number) => {
      return Number((clamp(y1, ((progress - x1) * scalar + y1), y2).toFixed(4)));
    }
  }

  update() {
    const now = performance.now()
    this.progress = (now - this.startTime) / this.duration;
    this.value = this._interpolator(this.progress)
    
    this.emit('update', this.value);

    if (this.progress > 1) {
      window.cancelAnimationFrame(this.animationId);
    } else {
      this.animationId = window.requestAnimationFrame(this.update.bind(this))
    }
  }

  stop() {
    window.cancelAnimationFrame(this.animationId);
  }

  resume() {
    this.startTime = performance.now() - this.progress * this.duration;
    this.animationId = window.requestAnimationFrame(this.update.bind(this))
  }
}