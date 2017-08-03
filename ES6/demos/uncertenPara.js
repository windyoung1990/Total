function add(...x){
	return x.reduce((m,n) => m + n);
}
console.log(add(2,3,4));
console.log(add(1,2,3,4,5))
