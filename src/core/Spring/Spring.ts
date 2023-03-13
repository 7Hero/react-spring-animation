import { EventEmitter } from '@/core/EventEmitter';

type SpringConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  autostart?: boolean;
}
export class Spring extends EventEmitter {
  _start: number;
  _end: number;
  stiffness: number;
  damping: number;
  mass: number;
  _value: number;
  velocity: number = 0
  acceleration: number = 0;
  animationId: number = 0;
  hasStopped: boolean = true;

  constructor(start: number, end: number = start, config: SpringConfig) {
    super();
    this._start = start;
    this._end = end;
    // config
    this.stiffness = config.stiffness || 100;
    this.damping = config.damping || 4;
    this.mass = config.mass || 3;
    this._value = start;
    this.hasStopped = !config.autostart;
    if(config.autostart) {
      this.animationId = window.requestAnimationFrame(this._update.bind(this))
    }
    // start spring animation
    this.start();
  }
  private _update()  {
    // F = -kx # force equals negative spring constant times new position
    const force = -this.stiffness * (this._value - this._end); // (this._value - this.end) is the displacement from the equilibrium position, every frame we get closer to it.
    // F = ma # force equals mass times acceleration
    const damping = -this.damping * this.velocity;
    this.acceleration = (force + damping) / this.mass;
    this.velocity += this.acceleration * 0.016;
    this._value += this.velocity * 0.016;
    // emit the updated value.
    this.emit('update', this._value);

    if (Math.abs(this.velocity) < 0.5 && Math.abs(this.value - this._end) < 0.5) {
      window.cancelAnimationFrame(this.animationId);
      this.hasStopped = true;
      this.emit('stop', this.value);
    } else {
      this.animationId = window.requestAnimationFrame(this._update.bind(this))
    }
  }

  get value() {
    return this._value
  }

  set value(value: number) {
    this._end = value;
    this.start();
  }
  
  start()  {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = window.requestAnimationFrame(this._update.bind(this))
  }

  stop() {

  }

  resume() {

  }
}