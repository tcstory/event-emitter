/**
 * Created by tcstory on 10/24/15.
 */

"use strict";
class EventEmitter {
    private _handlers;
    private _defaultMaxListener = 10;

    constructor() {
        this._handlers = {};
    }

    on(event:string, callback:Function):boolean {
        if (typeof callback !== 'function') {
            throw new Error('请添加函数');
        }
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [callback];
        } else {
            this._handlers[event].push(callback);
        }
        this._checkListenerNumber(event);
        return true;
    }

    once(event:string, callback:Function):boolean {
        if (typeof callback !== 'function') {
            throw new Error('请添加函数');
        }
        callback['__once'] = true;
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [callback]
        } else {
            this._handlers[event].push(callback);
        }
        this._checkListenerNumber(event);
        return true;
    }

    emit(event:string, ...args:Array<any>):boolean {
        let _flag = true;
        if (this._handlers[event] != undefined) {
            _flag = false;
            let _len = this._handlers[event].length;
            for (let _i = 0; _i < _len; _i++) {
                let cur_func = this._handlers[event][_i];
                cur_func(args);
                if (cur_func.__once) {
                    this.removeListener(event, cur_func)
                }
            }
        }
        if (_flag) {
            console.warn('未找到注册的事件');
            return false;
        } else {
            return true;
        }
    }

    listenerCount(event:string):number {
        if (this._handlers[event]) {
            return this._handlers[event].length;
        } else {
            return 0;
        }
    }

    removeListener(event:string, func:Function):boolean {
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
        if (_flag) {
            console.warn('未找到注册的事件');
            return false;
        } else {
            return true;
        }
    }

    removeAllListener(event:string):boolean {
        let _flag = true;
        if (this._handlers[event] != undefined) {
            _flag = false;
            delete this._handlers[event];
        }
        if (_flag) {
            console.warn('未找到注册的事件');
            return false;
        } else {
            return true;
        }
    }

    setDefaultListenerCount(n:number=10):boolean {
        if (typeof n === 'number') {
            if (!isNaN(n) && isFinite(n)) {
                this._defaultMaxListener = n;
                return true;
            } else {
                throw new Error('请传入有效的数值');
            }
        }  else {
            throw new Error('参数类型不是number');
        }

    }
    getDefaultListenerCount():number {
        return this._defaultMaxListener;
    }
    private _checkListenerNumber(event:string) {
        if (this._handlers[event].length >= this._defaultMaxListener) {
            console.log('请注意, 当前已经为事件|' + event +'|' + '添加了' +
                this._handlers[event].length +'个事件处理程序');
            return true;
        } else {
            return false;
        }
    }
}

