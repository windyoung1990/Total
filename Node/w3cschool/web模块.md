## 使用node创建web服务器
```javascript
var http = require('http');
var fs = require('fs');
var url = require('url');
// 创建服务器
http.createServer(function(request,response){
	// 解析请求，包含文件名
	var pathname = url.parse(request.url).pathname;
	// 输出请求的文件名
	console.log("Request fot:" + pathname + "received");
	console.log(pathname)
	// 从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
			// HTTP 状态码: 404 : NOT FOUND
         	// Content Type: text/plain
			response.writeHead(404,{"Content-Type" : "text/html"});
		}else{
			// HTTP 状态码: 200 : OK
         	// Content Type: text/plain
         	response.writeHead(200,{"Content-Type" : "text/html"});
         	// 响应文件内容
         	response.write(data.toString());
		}
		// 发送响应数据
		response.end();
	});
}).listen(8080);
console.log("Server running at localhost");
```
## 使用 Node 创建 Web 客户端
```javascript
/*使用 Node 创建 Web 客户端*/ 
var http = require('http');
// 用于请求的选项
var options = {
	host : "localhost",
	port : 8081,
	path : "/index.html"
};
// 处理响应的回调函数
var callback = function(response){
	// 不断更新数据
	var body = "";
	response.on("data",function(chunck){
		body += chunck;
	});
	response.on("end",function(){
		// 数据接收完成
		console.log(body);
	});
};
// 向服务端发送请求
var req = http.request(options,callback);
req.end();
```
