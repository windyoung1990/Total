## Javasript语言自身自由字符串类型数据，没有二进制数据类型，但在处理像TCP流或文件流时，必须使用到二进制数据。因此在Node中，定义了一个buffer类，该类用来创建一个专门存放二进制数据的缓存去
一个buffer类似于一个整数数组  
## 创建buffer类
### 方法一
```javascript
//创建长度为10字节的Buffer实例
var buf = new Buffer(10);
```
### 方法二
```javascript
//通过给定的数组创建Buffer实例
var buf = new Buffer([10,20,30,40,50]);
```
### 方法三
```javascript
//通过创建一个字符串来创建Buffer实例
var buf = new Buffer("www.runobb.com","utf-8");
```
## 写入缓冲区
实例  
```javascript
var buf = new Buffer(256);
var len = buf.write("www.runobb.com");
console.log("写入字节数：" + len);
```
## 从缓冲区中读取数据
实例  
```javascript
var buf = new Buffer(26);
for(var i=0;i<26;i++){
	buf[i] = i + 97;
}
console.log(buf.toString("utf-8"));//abcdefghijklmnopqrstuvwxyz
console.log(buf.toString("utf-8",0,5));//abcde
```
## 将Buffer转换为JSON对象
语法  
```javascript
buf.toJSON()
```
返回值  
＊ 返回JSON对象
## 缓冲区合并
实例  
```javascript
var buf1 = new Buffer("菜鸟教程");
var buf2 = new Buffer("www.runobb.com");
var buf3 = Buffer.concat([buf1,buf2]);
console.log("buf3内容：" + buf3.toString());
```
## 缓冲区比较
返回值：返回一个数字，表示buf在otherBufffer之前，之后或相同  
实例  
```javascript
var buf1 = new Buffer("ABC");
var buf2 = new Buffer("ABCD");
var result = buf1.compare(buf2);
if(result < 0){
	console.log(buf1 + "在" + buf2 + "之前");
}else if(result == 0){
	console.log(buf1 + "与" + buf2 + "相同");
}else {
	console.log(buf1 + "在" + buf2 + "之后");
} 
```
## 拷贝缓冲区
```javascript
var buf1 = new Buffer("ABC");
var buf2 = new Buffer("123");
buf1.copy(buf2);
console.log(buf2.toString()); 
```
## 缓冲区裁剪
```javascript
var buf1 = new Buffer("runobb");
var buf2 = buf1.slice(0,2);
console.log("buf2 content:" + buf2);
```
