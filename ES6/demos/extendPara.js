var people = ["ab","cd","ef"];
function sayHello(p1,p2,p3){
	console.log(`Hello ${p1},${p2},${p3}`);
}
sayHello(...people)