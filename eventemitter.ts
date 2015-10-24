/**
 * Created by tcstory on 10/24/15.
 */

class EventEmitter {
    private handlers;

    constructor() {
        this.handlers = {};
    }

    on(event:string, callback:Function) {
        if (this.handlers[event] === undefined) {
            this.handlers[event] = [callback];
        } else {
            this.handlers[event].push(callback);
        }
    }

    once(event:string, callback:Function) {
        var event_str = event + '.once';
        if (this.handlers[event_str] === undefined) {
            this.handlers[event_str] = [callback]
        } else {
            this.handlers[event_str].push(callback);
        }
    }

    emit(event:string, ...args:Array<any>) {
        if (this.handlers[event + '.once'] != undefined) {
            setTimeout(()=> {
                var event_str = event + '.once';
                for (var _i in this.handlers[event_str]) {
                    this.handlers[event_str][_i](args);
                }
                this.removeAllListener(event_str);
            }, 0);
        } else if (this.handlers[event] != undefined) {
            setTimeout(()=> {
                for (var _i in this.handlers[event]) {
                    this.handlers[event][_i](args);
                }
            }, 0)
        } else {
            console.warn('未找到注册的事件')
        }
    }

    removeListener(event:string, callback:Function) {
        if (this.handlers[event] != undefined) {
            var len = this.handlers[event].length;
            for (var _i = 0; _i < len; _i++) {
                if (callback === this.handlers[event][_i]) {
                    this.handlers[event].splice(_i, 1);
                    if (this.handlers[event].length === 0) {
                        delete this.handlers[event];
                    }
                    break;
                }
            }
        } else if (this.handlers[event + '.once'] != undefined) {
            var len = this.handlers[event].length;
            var event_str = event + '.once';
            for (var _i = 0; _i < len; _i++) {
                if (callback === this.handlers[event_str][_i]) {
                    this.handlers[event_str].splice(_i, 1);
                    if (this.handlers[event_str].length === 0) {
                        delete this.handlers[event_str];
                    }
                    break;
                }
            }
        }
    }

    removeAllListener(event:string) {
        if (this.handlers[event] != undefined) {
            delete this.handlers[event];
        } else {
            console.warn('未找到注册的事件')
        }
    }

}

