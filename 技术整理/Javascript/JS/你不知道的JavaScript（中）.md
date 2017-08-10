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
