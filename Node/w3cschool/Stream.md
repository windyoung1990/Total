##从流中读取数据
```javascript
var fs = require("fs");
var data = '';
// 创建可读流
var readerStream = fs.createReadStream("index.css");
// 设置编码为uft8
readerStream.setEncoding("UTF8");
// 处理流事件－－> data,end,and error
readerStream.on('data',function(chunk){
	data += chunk;
});
readerStream.on('end',function(){
	console.log(data);
});
readerStream.on('error',function(err){
	console.log(err.stack);
});
```
## 写入流
```javascript
var fs = require('fs');
var data = "菜鸟教程官网地址：www.runoob.com";
// 创建一个可以写入的流，写入到文件output.text中
var writeStream = fs.createWriteStream("output.txt");
// 使用UTF8编码写入数据
writeStream.write(data,"UTF8");
// 标记文件末位
writeStream.end();
// 处理流事件-->finish,error
writeStream.on("finish",function(){
	console.log("写入完成！");
});
writeStream.on("error",function(err){
	console.log(err.stack);
});
console.log("程序执行完毕！");
```
## 管道
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据，并将数据传递到另外一个流中  
```javasript
var fs = require('fs');
// 创建一个可读流
var readerStream = fs.createReadStream('index.css');
// 创建一个可写流
var writeStream = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取index.css文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writeStream);
console.log("程序执行完毕！");

## 链式流
```javascript
/*链式流*/ 
// 链式时通过连接输出流到另外一个流病创建多个对流操作链的机制。链式流一般用于管道操作。
var fs = require('fs');
var zlib = require('zlib');
// 压缩index.css文件为index.css.gz
fs.createReadStream('index.css')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('index.css.gz'));
console.log("文件压缩完成");
```
```
