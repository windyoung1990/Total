1.clientHeight和clientWidth只包含内容区域和内边距；offsetHeight和offsetWidth包含内容区域、内边距和边框的高度
2.自动滚动到底部位置:$("#").scrollTop($("#")[0].scrollHeight);
3.offsetWidth   offsetHeight clientWidth  clientHeight scrollWidth scrollHeight比较
clientWidth和clientHeight类似offsetWidth和offsetHeight,不同的是它们不包含边框大小，只包含内容和内边距。并且内联元素的clientWidth和clientHeight总是返回0。

scrollWidth和scrollHeight是元素的内容区域加上内边距再加上任何溢出内容的尺寸。
4.时间概念   new Date(2016,6,31,23,59,59)  是2016.7.31  24:00
   			new Date(2016,6,31,0,0,0)  是2016.7.31  00:00
5.arguments.length (实参个数)  arguments.callee.length(形参个数)
6.判断是QQ浏览器
var UA = navigator.userAgent;
var isQQ = (/qq/gi).test(UA) && (!(/qqbrowser/gi).test(UA));