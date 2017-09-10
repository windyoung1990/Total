```javascript
var fs = require('fs');
var standardHtmlSize = 50;
var wrongHtmlSize = 18;
var ratial = wrongHtmlSize / standardHtmlSize;
// 遍历需要更改rem的文件夹目录
var dirName = "/home/";
// 定义匹配rem数字的正则
var patten = /(\d{0,3}?\.?\d{1,4}?)(?=rem)/gi;
fs.readdir(__dirname + dirName,function(err,files){
	if(err){
		return console.error(err,"遍历文件夹目录失败！");
	}
	files.forEach(function(file){
		console.log(file);//index.css
		var fileNameSplit = file.split(".");
		var newFileName = fileNameSplit[0] + "_new." + fileNameSplit[1];
		if((/\.css/g).test(file) && (file.indexOf("_new") == -1)){
			// 读取文件内容
			fs.readFile(__dirname + dirName + file,function(err,data){
				if(err){
					console.error(err,"读取文件内容失败");
				}
				var data = data.toString();
				data = data.replace(patten,function($0){
							return parseFloat(ratial * $0).toFixed(2);
						});
				fs.writeFile(__dirname + dirName + newFileName,data,function(err){
					if(err){
						return console.error(err);
					}
					console.log("写入数据完成！");
				})
			});
		}
	});
});
```
