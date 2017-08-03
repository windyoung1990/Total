// 增强的对象字面量具体表现在
/*
	***可以在对象字面量里面定义原型
	***定义方法可以不用function关键字
	***直接调用父类方法
*/

var human = {
	breath(){
		console.log("breathing...");
	}
}
var worker = {
	__proto__ : human,	//设置此对象的原型为human,相当于继承human
	company : 'freelancer',
	work(){
		console.log("working...");
	},
	sleep(){
		console.log("sleeping...");
	}
}
human.breath();
worker.breath();	//调用继承来的breath方法
worker.work();
worker.sleep();
