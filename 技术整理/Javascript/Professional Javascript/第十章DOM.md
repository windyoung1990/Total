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
