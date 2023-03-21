export class EventEmitter {
  events: Map<string, Function> = new Map();

  constructor(){}

  on(event: string, callback: Function): void{
    this.events.set(event, callback)
  }

  emit(event: string, ...args: any[]){
    const callback = this.events.get(event);
    if (callback) {
      callback(...args);
    }
  }
}