// 定义被监听的目标对象
var engineer = {
	name : "Jhon",
	salary : 50
}

// 定义处理程序
 var interceptor = {
 	set(receiver,property,value){
 		console.log(property,"is changed to ", value);
 		receiver[property] = value;
 	}
 }
 // 创建代理以进行监听
 engineer = new Proxy(engineer,interceptor);
 // 做些改动触发代理
 engineer.salary = 60;