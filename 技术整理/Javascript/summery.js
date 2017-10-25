//类属性
function classof(o) {  
	if (o === null) return "Null";  
	if (o === undefined) return "Undefined";  
	return Object.prototype.toString.call(o).slice(8, -1);
}

//让不同时区的时间显示一致
  
var time = new Date();  
var offsetTime = -(time.getTimezoneOffset() + 480) * 60000;   
console.log(offsetTime);   
var time1 = new Date(data.activity.startTime - offsetTime);   
var time2 = new Date(data.activity.endTime - offsetTime);

//使用type=file上传图片

function upload() {

	//获取input type=file 的ID

	var id = $(this)[0].id;
	var $this = $(this);
	var file = document.getElementById(id).files[0];
	var formData = new FormData();
	formData.append("fileUpload", file);
	formData.append("dataType", 6);
	formData.append("extName", file.type.substr(6));
	var XHR = new XMLHttpRequest();
	var onProgressHandler = function(event) {
		if (event.lengthComputable) {
			$this.siblings(".add").hide().siblings(".progress").show();
			var howmuch = parseInt((event.loaded / event.total) * 100) + "%";
			console.log(howmuch);
			$this.siblings(".progress").find(".progress-line").width(howmuch);
		} else {
			console.log("Can't determine the size of the file");

		}
	}
	var onReadyStateHandler = function(event) {
		if (event.target.readyState == 4 && event.target.status == 200) {
			//获取返回图片地址
			var imgUrl = JSON.parse(event.currentTarget.response).url;
			$this.siblings('.finished').children("img").attr("src", imgUrl);
			console.log(imgUrl)
		}

	}
	XHR.upload.addEventListener("progress", onProgressHandler, false);
	XHR.open('POST', 'http://m.mvbox.cn/sod/fileUpload');
	// XHR.onreadystatechange = onReadyStateHandler;
	// 上传完成
	XHR.upload.onload = function() {
		// console.log("上传完成")
		$this.siblings(".progress").hide().siblings(".finished").show();
	}
	XHR.send(formData);
}

//获取文件选择框
var upload1 = document.getElementById("upload1");
var upload2 = document.getElementById("upload2");
var upload3 = document.getElementById("upload3");
upload1.addEventListener("change", upload, false);
upload2.addEventListener("change", upload, false);
upload3.addEventListener("change", upload, false); 
//存储，如果有本地存储，则执行本地存储，否则，使用cookie
//获取cookie值
  
function getCookie(name) {        
	var cookie = document.cookie.split('; ');
	for(var i = 0; i < cookie.length; i++)  {            
		var arr = cookie[i].split('=');            
		if(name == arr[0])  {                
			return arr[1];            
		}        
	}        
	return undefined;    
}
	//设置cookie值
	    
function setCookie(key,  value) {        
	document.cookie  =  key  +  '='  +  value;    
}
//获取本地存储值
	    
function getGuid(){        
	var  guid;        
	if(localStorage){             // 有缓存
		if(localStorage.getItem('guid')){                
			guid  =  localStorage.getItem('guid');                
			return  guid;            
		} 
		else{   //无缓存 生成新guid
			guid  =  this.guid();                
			localStorage.setItem('guid',  guid);                
			return  guid;            
		}        
	} 
	else{            
		if(this.getCookie('guid')){                
			guid  =  this.getCookie('guid');                
			return  guid;            
		}            
		else{                
			guid  =  this.guid();                
			this.setCookie('guid',  guid);                
			return  guid;            
		}        
	}    
}
```javascript
// 常用的一些工具库
var littleTools = {
var littleTools = {
    // 数组中的最大值
    maxValueInArray: function(arr) {
        return Math.max.apply(Math, arr);
    },
    //获取url参数
    getUrlParam: function(name) {
        var  reg  = new  RegExp("(^|&)"  + name  +  "=([^&]*)(&|$)");  //构造一个含有目标参数的正则表达式对象      
        var  r = window.location.search.substr(1).match(reg);   //匹配目标参数   
        if (r  != null)  {        
            return  r[2];    
        } 
        else {        
            return null;  //返回参数值       
        }
    },
    // 数字 三位一组分割，添加逗号
    addChar: function(str) {
        var  newStr  =  "";            
        var  count  =  0;            
        str  = str + "";            
        for (var i = str.length - 1; i >= 0; i--) {                
            if (count % 3  == 0  &&  count  !=  0) {                    
                newStr  = str.charAt(i)  + ","  + newStr;                
            } else {                    
                newStr  = str.charAt(i)  + newStr;                
            }                
            count++;            
        }            
        str = newStr  +  "";            
        return  str; 
    },
    // 过滤标签
    replaceLable: function(str) {
        return str.replace(/<.*?style[^>]*?>.*?(<\/.*?style.*?>)*/ig, '');
    },
    // 是否是函数
    isFunction: function(obj) {
        return Object.prototype.toString().call(obj) === "[object Function]";
    },
    // 判断一个对象是否是空对象
    isEmptyObj: function(obj) {
        var isEmpty = false;  
        for (var prop in obj) {     
            isEmpty = true;  
        }  
        return isEmpty;
    },
    // 获取对象样式兼容处理
    getStyle: function(obj, name) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, false)[name];
        } else {
            return obj.currentStyle[name];
        }
    },
    // 设置样式
    setStyle: function(obj, name, value) {
        obj.style[name] = value;
    },
    // 操作样式
    operateStyle: function(obj, name, value) {
        if (value) {
            this.setStyle(obj, name, value)
        } else {
            this.getStyle(obj, name)
        }
    },
    // 数组对象排序 调用方式arr.sort(sortFunction("a"))
    sortFunction: function(property) {
        return function(obj1, obj2) {
            if (obj1[property]  >  obj2[property]) {            
                return  1;        
            } 
        }
    },
    
}
}
```
