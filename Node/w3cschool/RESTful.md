## 什么是REST
REST即表述性状态传递（英文：Representational State Transfer，简称REST）  
## HTTP 方法
* GET - 用于获取数据。
* PUT - 用于更新或添加数据。
* DELETE - 用于删除数据。
* POST - 用于添加数据。
## RESTful Web Services
由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。
## 创建RESTful
```javascript
//创建一个 json 数据资源文件 users.json
{
   "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
   },
   "user2" : {
      "name" : "suresh",
      "password" : "password2",
      "profession" : "librarian",
      "id": 2
   },
   "user3" : {
      "name" : "ramesh",
      "password" : "password3",
      "profession" : "clerk",
      "id": 3
   }
}
```
## 获取用户列表
```javascript
var express = require('express');
var app = express();
var fs = require('fs');
app.get('/listusers',function(req,res){
	fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
		console.log(data);
		res.end(data);
	});
});
var server = app.listen(8080,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```
## 添加用户
```javascript
var express = require('express');
var app = express();
var fs = require('fs');
//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
};
app.get('/addUser',function(req,res){
	// 读取已存在的文件
	fs.readFile(__dirname + "/" + "users.json",function(err,data){
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		console.log(data);
		res.end(JSON.stringify(data));
	})
});
var server = app.listen(8080,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```
## 删除用户
```javascript
var express = require('express');
var app = express();
var fs = require("fs");
var id = 2;
app.get('/deleteUser',function(req,res){
	// 读取已存在的文件
	fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
		data = JSON.parse(data);
		console.log(global.data,"global");//undefined
		delete data["user" + id];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});
var server = app.listen(8080,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```
## 显示用户详情
```javascript
var express = require('express');
var app = express();
var fs = require('fs');
app.get("/:id",function(req,res){
	// 读取已存在的文件
	fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){
		data = JSON.parse(data);
		var user = data["user" + req.params.id];
		console.log(user);
		res.end(JSON.stringify(user));
	});
});
var server = app.listen(8080,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```
