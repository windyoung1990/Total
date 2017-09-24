## 元素遍历
Element Traversal API为DOM元素增添流五个属性
* childElementCount:返回子元素（不包括文本节点和注释）的个数
* firstElementChild:第一个子元素
* lastElementChild:最后一个子元素
* previousElementChild:指向前一个同辈元素
* nextElementChild:指向后一个同辈元素
```javascript
//跨浏览器遍历某元素的所有子元素
//method1
var i,
  len,
  child = element.firstChild;
 while(child != element.lastChild){
  if(child.nodeType == 1){
    //执行某操作
    processChild(child);
  }
  child = child.nextSibling;
 }
 //method2
 var i,
  len,
  childe = element.firstElementChild;
 while(child != element.lastElementChild){
  processChild(child);//已知其是元素
  child = child.nextElementSibling;
 }
```
## HTML5　
### 与类相关的扩充
getElementsByClassName()  
classList属性  
```javascript
function deleteClassName(dom,class){
//取得类名字符串并拆分成数组
var classNames = dom.className.splite(/\s+/);
//找到要删除的类名
var pos = -1,
  i,
  len;
for(var i=0,len=classNames.length;i<len;i++){
  if(classNames[i] == class){
    pos = i;
    break;
  }
}
//删除类名
classNames.splice(i,1);
//把剩下的类名拼成字符串并重新设置
dom.className = classNames.join(" ");
}
```
HTML5新增一种操作类名的方式，那就是为所有元素增加classList属性
* add(value)
* contains(value)
* remove(value)
* toggle(value)
```javascript
//删除“disabled”
div.classList.remove("disabled");
//添加“current”
div.classList.add("current");
//切换“user”
div.classList.toggle("user");
//确定元素中是否包含既定的类名
if(div.classList.contains("bd")){
//执行某操作
}
```
## HTMLDocument的变化
### readyState
* loading 正在加载文档
* complete 已经加载完文档
```javascript
if(document.readyState == "complete"){
//执行操作
}
```
### 兼容模式
```javascript
if(document.compatMode == "CSS1Compat"){
alert("Standards mode");//标准模式
}else{
alert("Quirks mode");//混杂
}
```
### head属性
```javascript
var head = document.head || document.getElementsByTagName("head")[0];
```
## scrollIntoView()
如果给这个方法传入true作为参数，或者不传入任何参数，那么窗口滚动之后，会让调用元素的顶部与视口顶部尽可能平齐。如果传入false作为参数，调用元素会尽可能出现在视口中
### children属性
这个属性只包含元素中同样还是元素的子节点
```javascript
var childCount = element.children.length;
var firstChild = element.children[0];
```
### contains()
在实际开发中，经常需要知道某个节点是不是另一个节点的后代
```javascript
alert(document.documentElement.contains(document.body));//true
```
