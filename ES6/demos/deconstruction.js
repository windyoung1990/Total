var [x,y] = getVal(),// 函数返回值的解构
	[name,,age] = ["wayou","male","secrect"];//数组解构
function getVal(){
	return [1,2];
}
console.log("x:" + x + ",y:" + y);
console.log("name:" + name + ",age:" + age);
