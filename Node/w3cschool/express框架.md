## 第一个 Express 框架实例
```javascript
var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send("Hello World!");
});
var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址：http://%s:%s",host,port);
});
```
## 路由 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。
```javascript
var express = require('express');
var app = express();
// 主页输出Hello World
app.get("/",function(req,res){
	console.log("主页 GET 请求");
	res.send("Hello GET");
});
// POST请求
app.post("/",function(req,res){
	console.log("主页 POST 请求");
	res.send("Hello POST");
});
//  /list_user页面GET请求
app.get('/list_user',function(req,res){
	console.log("/list_user GET 请求");
    res.send('用户列表页面');
});
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd',function(req,res){
	console.log("/ab*cd GET 请求");
    res.send('正则匹配');
});
var server = app.listen(8081,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
```
## 静态资源
```javascript
var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8089, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});
```
## GET
```javascript
//express_get.js
var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/index_get.html',function(req,res){
	res.sendFile(__dirname + "/" + "index_get.html");
});
app.get('/process_get',function(req,res){
	// 输出JSON格式
	var response = {
		"first_name" : req.query.first_name,
		"last_name" : req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});
var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
//index_get.html
<html>
<body>
<form action="http://127.0.0.1:8080/process_get" method="GET">
First Name: <input type="text" name="first_name">  <br>
 
Last Name: <input type="text" name="last_name">
<input type="submit" value="Submit">
</form>
</body>
</html>
```
## POST 方法
```javascript
//express_post.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
app.get('/index_post.html',function(req,res){
	res.sendFile(__dirname + "/" + "index_post.html");
});
app.post("/process_post",urlencodedParser,function(req,res){
	// 输出JSON格式
	console.log("ssssss");
	var response = {
		"first_name" : req.body.first_name,
		"last_name" : req.body.last_name
	};
	console.log(response);

	res.end(JSON.stringify(response));
});
var server = app.listen(8081,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
//index_post.html
<html>
<body>
<form action="http://127.0.0.1:8081/process_post" method="POST">
First Name: <input type="text" name="first_name">  <br>
 
Last Name: <input type="text" name="last_name">
<input type="submit" value="Submit">
</form>
</body>
</html>
```
##文件上传
```javascript
//express_form_upload.js
var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
app.get('/index_form.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index_form.html" );
});
app.post('/file_upload',function(req,res){
	console.log(req.files[0]);
	var des_file = __dirname + "/" + req.files[0].originalname;
	fs.readFile(req.files[0].path,function(err,data){
		fs.writeFile(des_file,data,function(err){
			if(err){
				console.log(err);
			}else{
				response = {
					message : "File uploaded successfully",
					filename : req.files[0].originalname
				};
				console.log(response);
				res.end(JSON.stringify(response));
			}
		})
	})
});
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
//index_form.html
<html>
	<head>
		<title>文件上传表单</title>
	</head>
	<body>
		<h3>文件上传</h3>
		选择一个文件上传：<br/>
		<form action="/file_upload" method="post" enctype="multipart/form-data">
			<input type="file" name="image" size="50" />
			<br />
			<input type="submit" value="上传文件" />
		</form>
	</body>
</html>
```
