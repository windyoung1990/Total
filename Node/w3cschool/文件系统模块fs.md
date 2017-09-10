## 异步读取文件信息
```javascript
var fs = require('fs');
// 异步读取
fs.readFile('index.css',function(err,data){
	if(err){
		return console.log(err);
	}
	console.log("异步读取：" + data.toString());
});
console.log("程序执行完毕！");
```
## 打开文件
```javascript
var fs = require('fs');
// 异步打开文件 
console.log("准备打开文件！");
fs.open('index.css','r+',function(err,fd){
	if(err){
		console.log("打开文件失败！");
	}
	console.log("文件打开成功！");
})
```
## 获取文件信息
fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件  
```javascript
var fs = require('fs');
console.log("准备打开文件！");
fs.stat('index.css',function(err,stats){
	// console.log(stats.isFile());
	if(err){
		return console.error(err);
	}
	console.log(stats);
	console.log("文件读取信息成功！");
	// 检测文件类型
	console.log("是否为文件（isFile）？" + stats.isFile());
	console.log("是否为目录（isDirectory）？" + stats.isDirectory());
})
```
## 写入文件
```javascript
// 如果文件存在，该方法写入的内容会覆盖旧的文件内容。
var fs = require('fs');
console.log("准备写入文件！");
fs.writeFile('index.css','.aa{border:1px solid #ccc}',function(err){
	if(err){
		return console.error(err);
	}
	console.log("数据写入成功！");
	console.log("------我是分割线------");
	fs.readFile('index.css',function(err,data){
		if(err){
			return console.error(err);
		}
		console.log("异步读取文件信息：" + data.toString());
	})
}) 
```
## 读取文件
```javascript

var fs = require('fs');
var buf = new Buffer(1024);
console.log("准备打开已存在的文件！");
fs.open('index.css','r+',function(err,fd){
	if(err){
		return console.error(err);
	}
	console.log("文件打开成功！");
	console.log("准备读取文件！");
	fs.read(fd,buf,0,buf.length,0,function(err,bytes){
		if(err){
			console.log(err);
		}
		console.log(bytes + "字节被读取");
		// 仅输出读取的字节
		if(bytes > 0){
			console.log(buf.slice(0,bytes).toString());
		}
	})
});
```
## 关闭文件
```javascript
var fs = require('fs');
var buf = new Buffer(1024);
console.log("准备打开已存在的文件！");
fs.open('index.css','r+',function(err,fd){
	if(err){
		return console.error(err);
	}
	console.log("文件打开成功！");
	console.log("准备读取文件！");
	fs.read(fd,buf,0,buf.length,0,function(err,bytes){
		if(err){
			console.log(err);
		}
		console.log(bytes + "字节被读取");
		// 仅输出读取的字节
		if(bytes > 0){
			console.log(buf.slice(0,bytes).toString());
		}
	});
	// 关闭文件
	fs.close(fd,function(err){
		if(err){
			console.log(err);
		}
		console.log("文件关闭成功！");
	})
});
```
## 截取文件
```javascript
var fs = require('fs');
var buf = new Buffer(1024);
console.log("准备打开文件！");
fs.open('index.css','r+',function(err,fd){
	if(err){
		return console.error(err);
	}
	console.log("文件打开成功！");
	console.log("截取10字节后的文件内容。");
	// 截取文件
	fs.ftruncate(fd,10,function(err){
		if(err){
			console.log(err);
		}
		console.log("文件截取成功！");
		console.log("读取相同的文件。");
		fs.read(fd,buf,0,buf.length,0,function(err,bytes){
			if(err){
				console.log(err);
			}
			// 仅输出读取的字节
			if(bytes > 0){
				console.log(buf.slice(0,bytes).toString());
			}
			// 关闭文件
			fs.close(fd,function(err){
				if(err){
					console.log(err);
				}
				console.log("文件关闭成功！");
			});
		});
	});
});
```
## 创建目录
```javascript
// tips 创建目录需要一层一层创建  ／tmp／test/的方式创建看不到创建的目录结构
var fs = require('fs');
console.log("创建目录 ／tmp／test/");
fs.mkdir("./temp2",function(err){
	if(err){
		return console.error(err);
	}
	console.log("目录创建成功！");
});
```
## 读取目录
 ```javascript
 var fs = require('fs');
console.log("查看tmp目录");
fs.readdir("/tmp/",function(err,files){
	if(err){
		return console.error(err);
	}
	var num=0;
	files.forEach(function(file){
		console.log(file,num++);
	})
}); 
 ```
