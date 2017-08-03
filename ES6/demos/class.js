// 类的定义
class Animal{
	constructor(name){
		this.name = name;
	}
	sayName(){
		console.log("My name is " + this.name);
	}
}
// 类的继承
class Programmer extends Animal{
	constructor(name){
		// 直接调用父类的构造器进行初始化
		super(name);
	}
	program(){
		console.log("I am coding");
	}
}

var animal = new Animal("dummy"),
	wayou = new Programmer("wayou");
	animal.sayName();
	wayou.sayName();
	wayou.program();
