require.ensure(['./a'],function(){
	var content = require('./a');
	console.log(content);
	document.open();
	document.write('<h1>'+content+'</h1>');
	document.close();
});