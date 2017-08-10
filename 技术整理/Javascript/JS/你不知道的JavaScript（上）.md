# 前言
* 作用域和闭包 http://bit.ly/1c8HEWF
* this 和对象原型 http://bit.ly/ydkjs-this-code
# 作用域是什么
# 一次失误，没有保存
# 第二章
```javascript
function foo(el) {
console.log( el, this.id );
}
var obj = {
id: "awesome"
};
// 调用foo(..) 时把this 绑定到obj
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```
### bind(..) 的功能之一就是可以把除了第一个参数（第一个参数用于绑定this）之外的其他参数都传给下层的函数
```javascript
function foo(p1,p2) {
this.val = p1 + p2;
}
// 之所以使用null 是因为在本例中我们并不关心硬绑定的this 是什么
// 反正使用new 时this 会被修改
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1p2
```
## 判断this
* 函数是否在new 中调用（new 绑定）？如果是的话this 绑定的是新创建的对象。
* 函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。
* 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
* 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。
### apply或者call传入null的情况
* 一种非常常见的做法是使用apply(..) 来“展开”一个数组，并当作参数传入一个函数。类似地，bind(..) 可以对参数进行柯里化（预先设置一些参数）
```javascript
function foo(a,b) {
console.log( "a:" + a + ", b:" + b );
}
// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```
### 在JavaScript 中创建一个空对象最简单的方法都是Object.create(null)。Object.create(null) 和{} 很像， 但是并不会创建Object.prototype 这个委托，所以它比{}“更空”：
```javascript
function foo(a,b) {
console.log( "a:" + a + ", b:" + b );
}
// 我们的DMZ 空对象
var ø = Object.create( null );
// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
### 间接引用
function foo() {
console.log( this.a );
}
98 ｜ 第2 章
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2   赋值表达式p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是foo() 而不是p.foo() 或者o.foo()。
```
### 检查对象类型
* Object.prototype.toString.call( strObject ).slice(8,-1)
### Object.create
```javascript
if(!Object.create){
  Object.create = function(o){
    function F(){
    };
    F.prototype = o;
    return new F();
  }
}
```
### 如果你需要自我引用的话，那最好使用传统的具名函数表达式来定义对应的函数（ · baz: function baz(){..}· ），不要使用简洁方法。
