/**
 * Created by tcstory on 10/24/15.
 */

class EventEmitter {
    private _handlers;

    constructor() {
        this._handlers = {};
    }

    on(event:string, callback:Function) {
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [callback];
        } else {
            this._handlers[event].push(callback);
        }
    }

    once(event:string, callback:Function) {
        let event_str = event + '.once';
        if (this._handlers[event_str] === undefined) {
            this._handlers[event_str] = [callback]
        } else {
            this._handlers[event_str].push(callback);
        }
    }

    emit(event:string, ...args:Array<any>) {
        if (this._handlers[event + '.once'] != undefined) {
            setTimeout(()=> {
                let event_str = event + '.once';
                for (let _i in this._handlers[event_str]) {
                    this._handlers[event_str][_i](args);
                }
                this.removeAllListener(event_str);
            }, 0);
        } else if (this._handlers[event] != undefined) {
            setTimeout(()=> {
                let _funcs = Object.keys(this._handlers[event]);
                let _len = _funcs.length;
                for (let _i = 0; _i < _len; _i++) {
                    this._handlers[event][_i](args);
                }
            }, 0)
        } else {
            console.warn('未找到注册的事件')
        }
    }

    removeListener(event:string, func:Function) {
        if (this._handlers[event] != undefined) {
            let _len = this._handlers[event].length;
            for (let _i = 0; _i < _len; _i++) {
                if (func === this._handlers[event][_i]) {
                    this._handlers[event].splice(_i, 1);
                    if (this._handlers[event].length === 0) {
                        delete this._handlers[event];
                    }
                    break;
                }
            }
        } else if (this._handlers[event + '.once'] != undefined) {
            let len = this._handlers[event].length;
            let event_str = event + '.once';
            for (let _i = 0; _i < len; _i++) {
                if (func === this._handlers[event_str][_i]) {
                    this._handlers[event_str].splice(_i, 1);
                    if (this._handlers[event_str].length === 0) {
                        delete this._handlers[event_str];
                    }
                    break;
                }
            }
        }
    }

    removeAllListener(event:string) {
        if (this._handlers[event] != undefined) {
            delete this._handlers[event];
        } else {
            console.warn('未找到注册的事件')
        }
    }

}

