/**
 * Created by tcstory on 10/24/15.
 */
"use strict";
function EventEmitter() {
    this._defaultMaxListener = 10;
    this._handlers = {};
}
EventEmitter.prototype.on = function (event, callback) {
    if (typeof callback !== 'function') {
        throw new Error('请添加函数');
    } else {
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [callback];
        }
        else {
            this._handlers[event].push(callback);
        }
        this._checkListenerNumber(event);
        return true;
    }
};
EventEmitter.prototype.once = function (event, callback) {
    if (typeof callback !== 'function') {
        throw new Error('请添加函数');
    } else {
        callback['__once'] = true;
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [callback];
        }
        else {
            this._handlers[event].push(callback);
        }
        this._checkListenerNumber(event);
        return true;
    }
};
EventEmitter.prototype.emit = function (event) {
    var args = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        args[_a - 1] = arguments[_a];
    }
    var _flag = true;
    if (this._handlers[event] != undefined) {
        _flag = false;
        var _len = this._handlers[event].length;
        for (var _i = 0; _i < _len; _i++) {
            var cur_func = this._handlers[event][_i];
            cur_func.apply(void 0, args);
            if (cur_func.__once) {
                this.removeListener(event, cur_func);
            }
        }
    }
    if (_flag) {
        console.warn('未找到注册的事件 |' + event + '|');
        return false;
    }
    else {
        return true;
    }
};
EventEmitter.prototype.listenerCount = function (event) {
    if (this._handlers[event]) {
        return this._handlers[event].length;
    }
    else {
        return 0;
    }
};
EventEmitter.prototype.removeListener = function (event, func) {
    var _flag = true;
    if (this._handlers[event] != undefined) {
        _flag = false;
        var _len = this._handlers[event].length;
        for (var _i = 0; _i < _len; _i++) {
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
        console.warn('未找到注册的事件 |' + event + '|');
        return false;
    }
    else {
        return true;
    }
};
EventEmitter.prototype.removeAllListener = function (event) {
    var _flag = true;
    if (this._handlers[event] != undefined) {
        _flag = false;
        delete this._handlers[event];
    }
    if (_flag) {
        console.warn('未找到注册的事件 |' + event + '|');
        return false;
    }
    else {
        return true;
    }
};
EventEmitter.prototype.setDefaultListenerCount = function (n) {
    if (n === void 0) {
        n = 10;
    }
    if (typeof n === 'number') {
        if (!isNaN(n) && isFinite(n)) {
            this._defaultMaxListener = n;
            return true;
        }
        else {
            throw new Error('请传入有效的数值');
        }
    }
    else {
        throw new Error('参数类型不是number');
    }
};
EventEmitter.prototype.getDefaultListenerCount = function () {
    return this._defaultMaxListener;
};
EventEmitter.prototype._checkListenerNumber = function (event) {
    if (this._handlers[event].length >= this._defaultMaxListener) {
        console.log('请注意, 当前已经为事件|' + event + '|' + '添加了' +
            this._handlers[event].length + '个事件处理程序');
        return true;
    }
    else {
        return false;
    }
};

if (typeof module === 'object') {
    module.exports = EventEmitter;
}