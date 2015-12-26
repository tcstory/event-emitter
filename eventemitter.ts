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
        let _flag = true;
        if (this._handlers[event + '.once'] != undefined) {
            _flag = false;
            let event_str = event + '.once';
            let _len = this._handlers[event_str].length;
            for (let _i = 0; _i < _len; _i++) {
                this._handlers[event_str][_i](args);
            }
            this.removeAllListener(event_str);
        }
        if (this._handlers[event] != undefined) {
            _flag = false;
            let _len = this._handlers[event].length;
            for (let _i = 0; _i < _len; _i++) {
                this._handlers[event][_i](args);
            }
        }
        if (_flag) {
            console.warn('未找到注册的事件')
        }
    }

    removeListener(event:string, func:Function) {
        let _flag = true;
        if (this._handlers[event] != undefined) {
            _flag = false;
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
        }
        if (this._handlers[event + '.once'] != undefined) {
            _flag = false;
            let event_str = event + '.once';
            let len = this._handlers[event_str].length;
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
        if (_flag) {
            console.warn('未找到注册的事件');
        }
    }

    removeAllListener(event:string) {
        let _flag = true;
        if (this._handlers[event] != undefined) {
            _flag = false;
            delete this._handlers[event];
        }
        if (this._handlers[event + '.once'] != undefined) {
            _flag = false;
            delete this._handlers[event + '.once'];
        }
        if (_flag) {
            console.warn('未找到注册的事件')
        }
    }

}

