http://regexper.com  
## 预定义类
＊ .   除了回车和换行的任意字符
＊ \d 数字
＊ \D 

## 边界字符
＊ \b 单词边界
＊ \B 非单词边界
＊ ^ 以。。。开始
＊ $ 以。。。结束
## 量词
＊ ？ ｛0次或者1次｝
＊ ＋ ｛至少出现一次｝
＊ ＊｛出现任意次｝
＊ ｛n｝ ｛出现n次｝
＊ ｛n，m｝ ｛出现n到m次｝
＊ ｛n，｝｛至少出现n次｝
## 贪婪模式
* \d{3,6} 尽可能多的匹配 "12345678".replace(/\d{3,6}/g,"X")  //X78
## 非贪婪模式  在量词后面加上？就可以
＊ "12345678".replace(/\d{3,6}?/g,"X")  //X78

## 分组
＊ 出现bonry3次的情况  (bonry){3}
## 或 |
* Bonry|Casper
## 反向引用
* "2013-12-30".replace(/(\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1")
## 忽略分组  不希望捕获某些分组  只需要在分组内加上(?:)就可以了

## 前瞻 （正则表达式是从文本头部向文本尾部开始解析，文本尾部方向称为“前”）javascript不支持后顾
＊ 前瞻就是正则表达式在匹配到规则的时候，向前检查是否符合断言
### 正向前瞻（exp(?=assert)） 
* "a2*3".replace(/\w(?=\d)/,"A")  //"A2*3"
### 负向前瞻（exp(?!assert)）
## 对象属性
* lastIndex当前表达式匹配内容的最后一个字符的下一个位置
* source 正则表达式的文本字符串
## 正则表达式方法
＊ test()
* exec()
### 非全局下调用exec()
* 非全局下，lastIndex不生效  
* 第一个元素是与正则表达式相匹配的文本
＊ 第二个元素是与正则表达式的第一个子表达式相匹配的内容（既分组）（如果有的话）
```javascript
var reg3 = /\d(\w)\d/;var ts = "$1a2b3c4d5e";
var ret = reg3.exec(ts);
console.log(ret.toString())//1a2,a
//ret    ["1a2", "a", index: 1, input: "$1a2b3c4d5e"]
## 字符串方法
### search()
* search方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
＊ 方法返回第一个匹配结果index，查找不到返回－1
＊ search方法不执行全局匹配，它将忽略标志g，并且总是从字符串的开始检索
### match()
* match()方法将检索字符串，以找到一个或多个与regexp匹配的文本
* regexp是否具有标志g对结果影响很大
＊ 非全局调用
match方法只能在字符串中执行一次匹配  
如果没有找到任何匹配的文本，将返回null  
否则它将返回一个数组，其中存放了与它找到的匹配文本  
返回数组的第一个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本  
除了常规的数组元素之外，返回的数组还有两个对象属性  
index 声明匹配文本的起始字符串的字符串的位置
input 
* 全局调用
如果没有找到，返回null  
如果找到了一个或者多个匹配子串，则返回一个数组  
数组元素中存放的是字符串中所有的匹配子串，而且也没有index属性和input属性
### split()
### replace()
```javascript
var str = "a1b2c3d4";
str.replace(/\d/,function(matchStr,groupContent,index,str){//1.匹配字符串2.正则表达式分组内容，没有分组则没有该参数3.匹配项在字符串中的index4.原字符串
return parseInt(matchStr) + 1;
})
```


```javscript
"a1b2c3d4e5".replace(/(\d)(\w)(\d)/g,function(match,group1,group2,group3,index,origin){
console.log(match);
return group1 + group3;
})
//"1b2" "3d4"  "a12c34e5"
```

