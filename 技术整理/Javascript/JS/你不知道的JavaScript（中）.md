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
### 隐式强制类型转换为布尔值
