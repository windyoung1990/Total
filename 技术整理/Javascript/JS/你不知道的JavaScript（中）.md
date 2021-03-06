# 前言
## 代码示例
* https://github.com/getify/You-Dont-Know-JS/tree/master/types%20&%20grammar
* https://github.com/getify/You-Dont-Know-JS/tree/master/async & performance
# 类型
## 内置类型
* 空值（null）
* 未定义（undefined）
* 布尔值（ boolean）
* 数字（number）
* 字符串（string）
* 对象（object）
* 符号（symbol,ES6中新增）
### 检测null 值的类型
```javascript
var a = null;
(!a && typeof a === "object") //true
```
### function
```javascript
typeof function(){/* */} === "function" //true
//"function"是“object”的一个子类型，
```
* 函数不仅是对象，还可以拥有属性
```javascript
function a(b,c){
}
a.length //2 函数对象的length属性，是其声明的参数的个数，arguments.length则代表的是实参的个数
```
* 数组也是“object”的一个子类型
## 值和类型
# 值
## 数组
* 使用delete运算符从数组中删除元素时，数组的length属性不会发生变化
* 数组通过数字进行索引，但有趣的是它们也是对象，所以也可以包含字符串键值和属性（但这些并不计算在数组长度内）：
```javascript
var arr = [];
arr[0] = 1;
arr["foo"] = 2;
arr.length //1
arr.foo //2
```
* 如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理
```javascript
var arr = [];
arr["12"] = 12;
arr.length //13
```
### 类数组
```javascript
function foo(){
  var arr = Array.prototype.slice.call(arguments);
  //var arr = Array.from(arguments)  ES6内置工具函数Array.from(..) 也能实现同样的功能
}
```
## 字符串
* 字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值上进行操作。
* 许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数组的非变更方法来处理字符串：
```javascript
var a = "foo";
var c = Array.prototype.join.call(a,"-"); //f-o-o
var d = Array.prototype.map.call(a,function(v){
  return v.toUpperCase() + "."
}); //["F.","o.","o."]  
```
* 字符串没有反转，可先将字符串转为数组，翻转后再返回字符串
```javascript
var a = "abcdef";
var c = a.split("").reverse().join("");//fedcba
```
## 数字
* 两个数字接近相等，ES6提供了Number.EPSILON方法
```javascript
if(!Number.EPSILON){
  Number.EPSILON = Math.pow(2,-52);
}
function numbersCloseEnoughToEqual(n1,n2){
  return Math.abs(n1-n2) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual(a,b); //true
```
* 整数检测，可以使用ES6 中的Number.isInteger(..) 方法：
```javascript
if (!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num == "number" && num % 1 == 0;
  };
}
Number.isInteger( 42 ); // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 ); // false
```
### NaN pollifill
```javascript 
//isNaN 导致的bug  isNaN("foo");
//利用isNaN自身和自身不相等的特性
if(!Number.isNaN){
  Number.isNaN = function(n){
    return n !== n;
  }
}
```
### 零值
```javascript
var a = 0 / -3;
// 至少在某些浏览器的控制台中显示是正确的
a; // -0
// 但是规范定义的返回结果是这样！
a.toString(); // "0"
a + ""; // "0"
String( a ); // "0"
// JSON也如此，很奇怪
JSON.stringify( a ); // "0"
```
* 有意思的是，反过来将其从字符串转换为数字，得到的结果是准确的：
```javascript
+"-0"; // -0
Number( "-0" ); // -0
JSON.parse( "-0" ); // -0
```
* 区分正0还是负0
```javascript
function isNegZero(n){
  n = Number(n);
  return n === 0 && (1/n === -Infinity);
}
```
* ES6 中新加入了一个工具方法Object.is(..) 来判断两个值是否绝对相等，可以用来处理,对于ES6 之前的版本，Object.is(..) 有一个简单的polyfill
```javascript
//能使用== 和===（参见第4 章）时就尽量不要使用Object.is(..)，因为前者效率更高、更为通用。Object.is(..) 主要用来处理那些特殊的相等比较。
if(!Object.is){
  Object.is = function(v1,v2){
    //判断是否是-0
    if(v1 === 0 && v2 ===0){
      return 1/v1 === 1/v2;
    }
    //判断是否是NaN
    if(v1 !== v1){
      return v2 !== v2;
    }
    //其他情况
    return v1 === v2;
  }
}
```
## 值和引用
# 原生函数（内建函数）
###常见的原生函数有
* String()
* Number()
* Boolean()
* Array()
* Object()
* Function()
* RegExp()
* Date()
* Symbol()--ES6新增
## 内部属性
* 所有typeof 返回值为"object" 的对象（如数组）都包含一个内部属性[[Class]]，这个属性无法直接访问，一般通过Object.prototype.toString(..) 来查看
```javascript
Object.prototype.toSting.call([1,2,3]); //"[object Array]"
Object.prototype.toString.call(/regex-literal/i); // "[object RegExp]"
```
### 对象的内部[[Class]] 属性和创建该对象的内建原生构造函数相对应（如下），但并非总是如此。那么基本类型值呢？下面先来看看null 和undefined：
```javascript
Object.prototype.toString.call( null );
// "[object Null]"
Object.prototype.toString.call( undefined );
// "[object Undefined]"
Object.prototype.toString.call( "abc" );
// "[object String]"
Object.prototype.toString.call( 42 );
// "[object Number]"
Object.prototype.toString.call( true );
// "[object Boolean]"
//基本类型值被各自的封装对象自动包装，所以它们的内部[[Class]] 属性值分别为"String"、"Number" 和"Boolean"。
```
## 拆封
* 如果想要得到封装对象中的基本类型值，可以使用valueOf() 函数：
```javascript
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );
a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```
//jquery更改类数组为数组 $(arguments).get();
### Date()和Error()
```javascript
if(!Date.now){
  Date.now = function(){
    return (new Date()).getTime();
  }
}
```
# 类型转换
## 转换规则
### ToString
* 基本类型值的字符串化规则为：null 转换为"null"，undefined 转换为"undefined"，true转换为"true"。数字的字符串化则遵循通用规则;
* 对普通对象来说，除非自行定义，否则toString()（Object.prototype.toString()）返回内部属性[[Class]] 的值（参见第3 章），如"[object Object]"
* 数组的默认toString() 方法经过了重新定义，将所有单元字符串化以后再用"," 连接起来：
```javacsript
var a = [1,2,3];
a.toString(); // "1,2,3"
```
* JSON.stringify(..) 在将JSON 对象序列化为字符串时也用到了ToString。
* 对大多数简单值来说，JSON 字符串化和toString() 的效果基本相同，只不过序列化的结果总是字符串：
```javascript
JSON.stringify( 42 ); // "42"
JSON.stringify( "42" ); // ""42"" （含有双引号的字符串）
JSON.stringify( null ); // "null"
JSON.stringify( true ); // "true"
```
* JSON.stringify(..) 在对象中遇到undefined、function 和symbol 时会自动将其忽略，在数组中则会返回null（以保证单元位置不变）。
```javascript
JSON.stringify( undefined ); // undefined
JSON.stringify( function(){} ); // undefined
JSON.stringify(
[1,undefined,function(){},4]
); // "[1,null,null,4]"
JSON.stringify(
{ a:2, b:function(){} }
); // "{"a":2}"
```
### 几个不太为人所知但却非常有用的功能
* 可以向JSON.stringify(..) 传递一个可选参数replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，
* 如果replacer 是一个数组，那么它必须是一个字符串数组，其中包含序列化要处理的对象的属性名称，除此之外其他的属性则被忽略。
* 如果replacer 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用一次，每次传递两个参数，键和值。
```javascript
var a = {
  b : 42,
  c : "42",
  d : [1,2,3]
};
JSON.stringify(a,["b","c"]);//"{"b":42,"c":"42"}"
JSON.stringify(a,function(k,v){
console.log(k,v);
if(k != "c"){
  return v;
}
})//"{"b":42,"d":[1,2,3]}"
```
* JSON.string 还有一个可选参数space，用来指定输出的缩进格式。space 为正整数时是指定每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进：
```javascript
var a = {
 b: 42,
 c: "42",
 d: [1,2,3]
};
JSON.stringify( a, null, 3 );
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"

```
### ToNumber
* 中true 转换为1，false 转换为0。undefined 转换为NaN，null 转换为0
* 为了将值转换为相应的基本类型值，检查该值是否有valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用toString()的返回值（如果存在）来进行强制类型转换。
* 如果valueOf() 和toString() 均不返回基本类型值，会产生TypeError 错误
* 从ES5 开始，使用Object.create(null) 创建的对象[[Prototype]] 属性为null，并且没有valueOf() 和toString() 方法，因此无法进行强制类型转换
```javascript
var a = {
valueOf: function(){
return "42";
}
};
var b = {
toString: function(){
return "42";
}
};
var c = [4,2];
c.toString = function(){
return this.join( "" ); // "42"
};
Number( a ); // 42
Number( b ); // 42
Number( c ); // 42
Number( "" ); // 0
Number( [] ); // 0
Number( [ "abc" ] ); // NaN
```
### ToBoolean
* 可以转换为假值 • undefined  • null  • false  • +0、-0 和NaN  • ""
## 显式类型转换
### 数字和字符串之间的显式类型转换
* 字符串和数字之间的转换是通过String(..) 和Number(..) 这两个内建函数来实现的，请注意它们前面没有new 关键字，并不创建封装对象。
* 日期显式转换为数字
```javascript
//获取当前时间戳
+ new Date();
(new Date()).getTime();
Date.now();//ES5
```
### 奇特的~运算符
* ~ 返回2 的补码。~x 大致等同于-(x+1)
```javascript
~42; // -(42+1) ==> -43
```
### 显式解析数字字符串
* 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字。但解析和转换两者之间还是有明显的差别。
``` javascript
var a = "42";
var b = "42px";
强制类型转换 ｜ 63
Number( a ); // 42
parseInt( a ); // 42
Number( b ); // NaN    转换不允许出现非数字字符，否则会失败并返回NaN。
parseInt(b); //42   解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。
```
* 从ES5 开始parseInt(..) 默认转换为十进制数，除非另外指定。如果你的代码需要在ES5之前的环境运行，请记得将第二个参数设置为10。
* 一些看起来奇怪但实际上解释的通的例子
```javascript
parseInt( 0.000008 ); // 0 ("0" 来自于 "0.000008")
parseInt( 0.0000008 ); // 8 ("8" 来自于 "8e-7")
parseInt( false, 16 ); // 250 ("fa" 来自于 "false")
parseInt( parseInt, 16 ); // 15 ("f" 来自于 "function..")
parseInt( "0x10" ); // 16
parseInt( "103", 2 ); // 2
```
### 显式转换为布尔值
* 在if(..).. 这样的布尔值上下文中，如果没有使用Boolean(..) 和!!，就会自动隐式地进行ToBoolean 转换。建议使用Boolean(..) 和!! 来进行显式转换以便让代码更清晰易读。
### 隐式地简化
* 如果+ 的其中一个操作数是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接；否则执行数字加法。
### 布尔值到数字的隐式强制类型转换
```javascript
function onlyOne() {
var sum = 0;
for (var i=0; i < arguments.length; i++) {
// 跳过假值，和处理0一样，但是避免了NaN
if (arguments[i]) {
sum += arguments[i];
}
}
return sum == 1;
}
var a = true;
var b = false;
onlyOne( b, a ); // true
onlyOne( b, a, b, b, b ); // true
```
### 假值的想等比较
```javascript
"0" == null;// false
"0" == undefined;//false
"0" == false;//true
"0" == NaN;//false
"0" == 0;//true
"0" == "";//false
false == null;//false
false == undefined;//false
false == NaN;//false
false == 0;//true
false == "";//true
false == [];//true
false == {};//false
"" == null;//false
"" == undefined;//false
"" == NaN;//false
"" == 0;//true
"" == [];//true
"" == {};//false
0 == null;//false
0 == undefined;//false
0 == NaN;//false
0 == [];//true
0 == {};//false
```
### 安全运用隐式强制类型转换
* 如果两边的值中有 true 或者 false,千万不要使用 ==。
* 如果两边的值中有 []、"" 或者 0,尽量不要使用 ==。
### 字符串比较
＊ 如果出现非字符串，规则将双方强制类型转换未数字来进行比较
｀｀｀javascript
var a = [42];
var b = ["43"];
a < b ;//true
｀｀｀
* 如果比较双方都是字符串，则按字母顺序来进行比较
｀｀｀javascript
var a = ["42"];
var b = ["043"];
a < b ;//false
｀｀｀
### 比较少见的情况
＊ 返回其他数字
```javascript
Number.prototype.valueOf = function(){
return 3;
}
new Number(43) == 3; //true
//更奇怪的
var i = 2;
Number.prototype.valueOf = function(){
return i++;
};
if(a == 2 && a == 3){
console.log("Yep.this happened.");
}
```
# 语法
* 代码块的结果值就如同一个隐式的返回,即返回最后一个语句的结果值 
* 语法不允许我们获得语句的结果值并将其赋值给另一个变量
```javascript
//下面的代码无法运行
var a,b;
a = if(true){
b = 50 + 20;
}
```
### 表达式的副作用
＊ 大部分表达式没有副作用，常见的有副作用的表达式是函数调用
```javascript
function foo() {
   a = a + 1;
}
var a = 1;
foo(); // 结果值:undefined。副作用:a的值被改变
```
* 提取元音字母
```javascript
function vowels(str){
var matches;
if(str){
  //提取所有元音字母
  matches = str.match(/[aeiou]/g);
  if(matches){
  return matches;
  }
}
}
```
＊ 可以利用赋值语句的副作用将两个if语句合二为一
```javascript
function vowels(str){
var matches;
if(str && (matches = str.match(/[aeiou]/g))){
  return matches;
}
}
```
### 代码块
```javascript
[] + {}; // "[object Object]"  
{} + []; // 0  {}被当作空代码块（不执行任何操作）
```
### 对象解构
```javascript
function getData(){
return {
a : 42,
b : "foo"
}
}
var {a,b} = getData();
console.log(a,b); //42 "foo"
```
* {...}还可以用作函数命名参数的对象解构，方便隐式地用对象属性赋值
```javascript
function foo({a,b}){
console.log(a,b);
}
foo({a:12,b:"foo"});
```
### 提前使用变量，暂时性死区（tdz）
* TDZ 指的是由于代码中的变量还没有初始化而不能被引用的情况。
```javascript
 {
          a = 2;      // ReferenceError!
          let a;
}
//a = 2试图在let a初始化a之前使用该变量(其作用域在{ .. }内),这里就是a的TDZ,会产生错误。
```
* 对未声明变量使用 typeof 不会产生错误(参见第 1 章),但在 TDZ 中却会报错
```javascript
{
typepf a; //undefined
typeof b; //ReferenceError! (TDZ)
let b;
}
```
### 函数参数
＊ 向函数传递参数时,arguments 数组中的对应单元会和命名参数建立关联(linkage)以得 到相同的值。相反,不传递参数就不会建立关联。但在严格模式中，没有建立关联这一说。
```javascript
function foo(a){
a = 42;
console.log(arguments[0]);
}
foo(0); //42 (linked)
foo(); //undefined (not linked)
```
### switch
```javascript
 var a = "hello world";
     var b = 10;
     switch (true) {
             case (a || b == 10):// 永远执行不到这里  
                     break;
             default:
                     console.log( "Oops" );
}
//因为(a || b == 10)的结果是"hello world"而非true,所以严格相等比较不成立。此时 可以通过强制表达式返回 true 或 false,如 case !!(a || b == 10)
```
# 混合环境javascript
* 在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量
```javascript
<div id="foo"></div>
if (typeof foo == "undefined") {
foo = 42; // 永远也不会运行
}
console.log( foo ); // HTML元素
```
* 一个广为人知的 JavaScript 的最佳实践是:不要扩展原生原型
# 异步 现在和将来
## 分块的程序
* 任何时候，只要把一段代码包装成一个函数，并指定它在响应某个事件（定时器、鼠标点击、Ajax 响应等）时执行，你就是在代码中创建了一个将来执行的块，也由此在这个程序中引入了异步机制。
## 异步控制台
* console.* 方法族并不是JavaScript 正式的一部分，而是由宿主环境（请参考本书的“类型和语法”部分）添加到JavaScript 中的。
* 控制台I/O 会延迟,如果遇到这种少见的情况，最好的选择是在JavaScript 调试器中使用断点，而不要依赖控制台输出。次优的方案是把对象序列化到一个字符串中，以强制执行一次“快照”，比如通过JSON.stringify(..)。
## 事件循环
* JavaScript 引擎本身并没有时间的概念，只是一个按需执行JavaScript 任意代码片段的环境。“事件”（JavaScript 代码执行）调度总是由包含它的环境进行。
### 回调函数的回调执行机制
* 举例： 程序发送AJAX请求，从服务器中获取数据
* 在回调函数中设置响应代码
* 引擎通知宿主环境：现在我要暂停执行，你一旦完成网络请求，拿到了数据，就请调用这个函数
* 浏览器就会设置侦听来自网络的响应，拿到要给你的数据之后，就会把回调函数插入到事件循环
### setTimeout并没有把你的回调函数挂在事件循环队列中。它所做的是设定一个定时器。当定时器到时后，环境会把你的回调函数放在事件循环中，这样，在未来某个时刻的tick 会摘下并执行这个回调
### 完整运行
* 由于JavaScript 的单线程特性，foo()（以及bar()）中的代码具有原子性。也就是说，一旦foo() 开始运行，它的所有代码都会在bar() 中的任意代码运行之前完成，或者相反。这称为完整运行（run-to-completion）特性。
```javascript
var a = 1;
var b = 2;
function foo(){
  a++;
  b = b*a;
  a = b + 3;
}
function bar(){
  b--;
  a = 8 + b;
  b = a * 2;
}
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
//由于foo() 不会被bar() 中断，bar() 也不会被foo() 中断，所以这个程序只有两个可能的输出，取决于这两个函数哪个先运行
```
### 并发
* 第一个“进程”在用户向下滚动页面触发onscroll 事件时响应这些事件（发起Ajax 请求要求新的内容）。第二个“进程”接收Ajax 响应（把内容展示到页面）
* 显然，如果用户滚动页面足够快的话，在等待第一个响应返回并处理的时候可能会看到两个或更多onscroll 事件被触发，因此将得到快速触发彼此交替的onscroll 事件和Ajax 响应事件。
### 非交互
```javascript
var res = {};
function foo(results) {
res.foo = results;
}
function bar(results) {
res.bar = results;
}
// ajax(..)是某个库提供的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
//foo() 和bar() 是两个并发执行的“进程”，按照什么顺序执行是不确定的。但是，我们构建程序的方式使得无论按哪种顺序执行都无所谓，因为它们是独立运行的，不会相互影响。
```
### 交互
```javascript
//两个并发的“进程”通过隐含的顺序相互影响，这个顺序有时会被破坏
var res = [];
function response(data) {
res.push( data );
}
// ajax(..)是某个库中提供的某个Ajax函数
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
//这里的并发“进程”是这两个用来处理Ajax 响应的response() 调用。它们可能以任意顺序运行。我们假定期望的行为是res[0] 中放调用"http://some.url.1" 的结果，res[1] 中放调用"http://some.url.2" 的结果。有时候可能是这样，但有时候却恰好相反，这要视哪个调用先完成而定。这种不确定性很有可能就是一个竞态条件bug。
```
```javascript
//可以协调交互顺序来处理这样的竞态条件
var res = [];
function response(data) {
if (data.url == "http://some.url.1") {
res[0] = data;
}
else if (data.url == "http://some.url.2") {
res[1] = data;
}
}
// ajax(..)是某个库中提供的某个Ajax函数
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
```
```javscript
//另外一种协调场景 门
var a, b;
function foo(x) {
a = x * 2;
if (a && b) {
baz();
}
}
function bar(y) {
b = y * 2;
if (a && b) {
baz();
}
}
function baz() {
console.log( a + b );
}
// ajax(..)是某个库中的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```
```javascript
//另外一种协调场景 闩
var a;
function foo(x) {
if (!a) {
a = x * 2;
baz();
}
}
function bar(x) {
if (!a) {
a = x / 2;
baz();
}
}
function baz() {
console.log( a );
}
// ajax(..)是某个库中的某个Ajax函数
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );
```
### 并发协作
```javascript
异步：现在与将来 ｜ 155
var res = [];
// response(..)从Ajax调用中取得结果数组
function response(data) {
// 一次处理1000个
var chunk = data.splice( 0, 1000 );
// 添加到已有的res组
res = res.concat(
// 创建一个新的数组把chunk中所有值加倍
chunk.map( function(val){
return val * 2;
} )
);
// 还有剩下的需要处理吗？
if (data.length > 0) {
// 异步调度下一次批处理
setTimeout( function(){
response( data );
}, 0 );
}
}
// ajax(..)是某个库中提供的某个Ajax函数
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response );
//我们把数据集合放在最多包含1000 条项目的块中。这样，我们就确保了“进程”运行时间会很短，即使这意味着需要更多的后续“进程”，因为事件循环队列的交替运行会提高站点/App 的响应（性能）。
```
### 任务
* 在ES6 中，有一个新的概念建立在事件循环队列之上，叫作任务队列（job queue）。这个概念给大家带来的最大影响可能是Promise 的异步特性
* 对于任务队列最好的理解方式就是，它是挂在事件循环队列的每个tick 之后的一个队列。在事件循环的每个tick 中，可能出现的异步动作不会导致一个完整的新事件
添加到事件循环队列中，而会在当前tick 的任务队列末尾添加一个项目（一个任务）。
* 事件循环队列类似于一个游乐园游戏：玩过了一个游戏之后，你需要重新到队尾排队才能再玩一次。而任务队列类似于玩过了游戏之后，插队接着继续玩。
* 任务和setTimeout(..0) hack 的思路类似，但是其实现方式的定义更加良好，对顺序的保证性更强：尽可能早的将来。
### 小结
* 一旦有事件需要运行，事件循环就会运行，直到队列清空。事件循环的每一轮称为一个tick。用户交互、IO 和定时器会向事件队列中加入事件。
* 任意时刻，一次只能从队列中处理一个事件。执行事件的时候，可能直接或间接地引发一个或多个后续事件。
* 并发是指两个或多个事件链随时间发展交替执行，以至于从更高的层次来看，就像是同时在运行（尽管在任意时刻只处理一个事件）。
* 通常需要对这些并发执行的“进程”（有别于操作系统中的进程概念）进行某种形式的交互协调，比如需要确保执行顺序或者需要防止竞态出现。这些“进程”也可以通过把自身分割为更小的块，以便其他“进程”插入进来。
# 回调
## continuation
* 回调函数包裹或者是封装了程序的延续
# Promise
* Promise.all([ .. ])接受一个promise数组并返回一个新的promise
### 回调编码的信任问题
* 调用回调过早
* 调用回调过晚（或不被调用）
* 调用回调次数过少或过多
* 未能传递所需的环境和参数
* 吞掉可能出现的错误和异常



