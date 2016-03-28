# event-emitter

仿写`nodejs`的`events.EventEmitter`,实现了其中的大部分方法.
可以用的方法如下所示(具体用法和`nodejs`基本一样):

- `on(event:string, callback:Function):boolean`
- `once(event:string, callback:Function:boolean`
- `emit(event:string, ...args:Array<any>):boolean`
- `listenerCount(event:string):number`
- `removeListener(event:string, func:Function):boolean`
- `removeAllListener(event:string):boolean`
- `setDefaultListenerCount(n:number=10):boolean`
- `getDefaultListenerCount():number`

**传入参数**

```
var ev = new EventEmitter();
ev.on('test',function(x,y,z){
        console.log(x+y+z)
    }
)
ev.emit('test',1,2,3)
==> 6
```
简单的来说,就是传给事件处理程序的参数,会被收集到一个变量中

### 提示
- 不同于`nodejs`里的`events.EventEmitter`,使用该类注册的事件处理程序中的`this`并不会指向`EventEmitter`的实例(具体请看[nodejs文][1]档)


  [1]: https://nodejs.org/dist/latest-v5.x/docs/api/events.html#events_emitter_removelistener_event_listener