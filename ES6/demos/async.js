var async = require("async");
require("babel-core/register");
var a = function(){
	return new Promise(function(resolve,reject){
		setTimeout(() =>{
			resolve(1)
		},2000);
	})
}
async function b(){
	var val = await a();
	console.log(val);
}
b();