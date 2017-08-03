var promise  = new Promise(function(resolve,reject){
	if(!typeof resolve){
		resolve("Stuff worked!");
	}else{
		reject(Error("It broke"));
	}
});
promise.then(function(result){
	console.log(result);
},function(err){
	console.log(err);
})