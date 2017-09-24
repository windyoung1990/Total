## Node类型
```javascript
if(someNode.nodeTyoe == Node.ELEMENT_NODE){//IE中无效
alert("Node is an element");
}
if(someNode.nodeType == 1){//适用于所有浏览器
alert("Node is an element");
}
```
### nodeName和nodeValue属性
```javascript
if(someNode.nodeType == 1){
value = someNode.nodeName;//nodeName的值是元素的标签名
}
```
### 节点关系
每一个节点都有一个childNodes属性，其中保存着一个NodeList对象  
 ```javascript
 var firstChild = someNode.childNodes[0];
 var count = someNode.childNodes.length;
 //将NodeList对象转换为数组
 //在IE8及之前版本无效
 var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
 function converToArray(nodes){
  var array = null;
  try{
    array = Array.prototype.slice.call(nodes,0);//针对非IE浏览器
  }catch(ex){
    array = new Array();
    for(var i=0,len=nodes.length;i<len;i++){
      array.push(nodes[i]);
    }
  }
 }
 ```
 每个节点都有一个parentNode属性，该节点执行文档树中的父节点；包含在childeNodes列表中的每个节点相互之间都是同胞节点。  
 ```javascript
 if(someNode.nextSibling === null){
  alert("Last node in the parent's childNodes list");
 }else if(someNode.previousSibling === null){
  alert("First node in the parent's childNodes list");
 }
 ```
 hasChildNode()是一个非常有用的方法，这个方法在节点包含一个或多个子节点的情况下会返回true，这比查询childNodes列表的length属性更简单  
 所有节点都有的最后一个属性是ownerDocument，该属性指向表示整个文档的文档节点  
 ### 操作节点
 appendChild()方法用于向childNodes列表的末尾添加一个节点,添加节点后，childNodes的新增节点、父节点以及最后一个子节点的关系指针都会得到更新  
 ```javascript
 var returnedNode = someNode.appendChild(newNode);
 alert(returnedNode == newNode);//true
 alert(someNode.lastChild == newNode);//true
 ```
 如果传入到appendChild()中的节点已经是文档的一部分，那结果就是将该节点从原来的位置转移到新的位置  
 ```javascript
 var returnedNode = someNode.appendChild(someNode.firstChild);
 alert(returnedNode == someNode.firstNode);//false
 alert(returnedNode == someNode.lastNode);//true                       
```
如果需要把节点放在某个特定的位置，可以使用insertBefore()方法，如果参照节点是null，则insertBefore()与appendChild()执行相同的操作
```javascript
//插入后成为最后一个子节点
var returnedNode = someNode.insertBefore(newNode,null);
alert(newNode == someNode.lastChild);//true
//插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode,someNode.firstNode);
alert(returnedNode == newNode);//true
alert(newNode == someNode.firstChild);//true
//插入到最后一个子节点前面
var returnedNode = someNode.insertBefore(newNode,someNode.lastNode);
alert(newNode == someNode.childNodes[someNode.childNodes.length - 2]);//true
```
替换节点replaceChild()  
```javascript
//替换第一个子节点
var returnedNode = someNode.replaceChild(newNode,someNode.firstChild);
```
移除子节点
```javascript
var returnedNode = omeNode.removeChild(someNode.firstChild);
```
cloneNode()，创建调用这个方法的节点的一个完全相同的副本，接受一个布尔值，表示是否执行深复制
```javascript
<ul>
 <li>item1</li>
 <li>item2</li>
 <li>item3</li>
</ul>
//深复制
var deepList = myList.cloneNode(true);
alert(deepList.childNodes.length);//3(IE<9)或7（其他浏览器）
//浅复制
var shadowList = myList.cloneNode(false);
alert(shadowList.childNodes.length);//0
```
## Document类型
### 文档的子节点
```javascript
var html = document.documentElement;//取得对<html>的引用
alert(html == document.childNodes[0]);//true
alert(html == document.firstChild);//true
//documentElement、childNodes[0]、firstChild都指向<html>元素
```
### 文档信息
```javascript
//取得文档标题
var title = document.title;
// 设置文档标题
document.title = "new page title";
//取得完整的URL
 var url = document.URL;
 //取得域名
 var domain = document.domain;
 //取得来源页面的URL
 var referrer = document.referrer;
```
##  Element类型
```javascript
//标签名比较
if(element.nodeName.toLowerCase() == "div"){
//适用于任何文档
}
```
### 规范化文本节点
```javascript
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);
document.body.appendChild(element);
alert(element.childNodes.length);//2
element.normalize();
alert(element.childNodes.length);//1
alert(element.firstChild.nodeValue);//"Hello world!Yippee!"
```
### 分割文本节点
```javascript
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
document.body.appendChild(element);
var newNode = element.firstChild.spliteText(5);
alert(element.firstChild.nodeValue);//"Hello";
alert(newNode.nodeValue);" world!";
alert(element.childNode.length);//2
```
## DOM操作技术
### 动态脚本
```javscript
function loadScript(url){
 var script = document.createElement("script");
 script.type = "text/javascript";
 script.src = url;
 document.body.appendChild(script);
}
function loadScriptString(code){
 var script = document.createElement("script");
 script.type = "text/javascript";
 try{
  script.appendChild(document.createTextNode(code));
 }catch(e){
 script.text = code;
 }
 document.body.appendChild(script);
}
```
### 动态样式
```javascript
function loadStyle(url){
 var link = document.createElement("link");
 link.rel = "stylesheet";
 link.type = "text/css";
 link.href = url;
 var head = document.getElementsByTagname("head")[0];
 head.appendChild(link);
}
function loadStyleString(css){
 var style = document.createElement("style");
 style.type = "text/css";
 try{
  style.appendChild(document.createTextNode(css));
 }catch(e){
  style.styleSheet.cssText = css;
 }
 var head = document.getElementsByTagname("head")[0];
 head.appendChild(style);
}
```
