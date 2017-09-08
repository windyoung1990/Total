## Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例
## EventEmitter 类
### vents 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
## EventEmitter类的应用实例
```javscript
var events = require("events");
var eventEmitter = new events.EventEmitter();
var listener1 = function listener1(){
	console.log("监听器listener1执行。");
};
var listener2 = function listener2(){
	console.log("监听器listener2执行。");
};
// 绑定connection事件，处理函数为listener1
eventEmitter.addListener("connection",listener1);
// 绑定connection事件，处理函数为listener2
eventEmitter.on("connection",listener2);
var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners + "个监听器监听连接事件");
// 处理connection事件
eventEmitter.emit("connection");
// 移除绑定的listener1事件
eventEmitter.removeListener("connection",listener1);
console.log("listener1不再受监听");
// 触发连接事件
eventEmitter.emit("connection");
eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners + "个监听器监听连接事件");
console.log("程序执行完毕！");
```

## error 事件
我们在遇到 异常的时候通常会触发 error 事件。当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。
## 继承 EventEmitter
* 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类
### 使用对象继承EventEmitter的原因
＊ 具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法
＊ avaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。
