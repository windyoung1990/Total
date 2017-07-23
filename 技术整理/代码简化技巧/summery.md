1.处理上一张、下一张中index
var imgs = [];
var index = 0,
       len = imgs.length;
$(".btn").on("click",function(){
 if('prev' ===  $(this).data("control")){
//上一张
index = Math.max(0,--index);
}else{
//下一张
index = Math.min(len-1,++index);
})