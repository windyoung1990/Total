## 实例
```javascript
function say(world){
	console.log(world);
}
function execute(someFunction,value){
	someFunction(value);
}
execute(say,"Hello");
```
## 匿名函数
```javascript
function execute(someFunction,world){
	someFunction(world);
}
execute(function(world){
	console.log(world);
},"world") 
```
## 函数传递如何让HTTP服务器工作的
```javascript
 var http = require('http');
 function onRequest(request,response){
 	response.writeHead(200,{'Content-Type' : "text/plain"});
 	response.write("你好啊！","utf8");
 	// response.setEncoding("utf8");
 	response.end();
 }
 http.createServer(onRequest).listen(8888)
```
