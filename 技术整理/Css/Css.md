1.-webkit-transform:scale();会导致继承关系，子元素也会被相应放大或者缩小，且放大缩小的origin是元素的中心，通过-webkit-transform-origin:left top;可以改变中心位置。
2.多行文本多出显示省略号：overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;
3.body高度为0时，window.onscroll事件不执行
4.盒模型兼容写法
.parent{display: -webkit-box;-webkit-box-align: center;}
.child1{-webkit-box-flex:1;}
.child2{width:1.2rem;}
5.接近苹果手机默认字体：font-family:Helvetica;
6.通配符有适用于所有元素，而且有0特殊性，其颜色指定的值要优先于继承值。继承值完全没有特殊性
7.行内元素的边框边界由font-size而不是line-height控制
8.四种状态
a:link{color:red;}
a:visited{color:red;}
a:hover{color:red;}
a:active{color:red;}
9.伪类:after注意事项（必须带有content属性，否则，设置的背景图不会出来）
10.form表单选择框  去掉默认样式  -webkit-appearance: none;border: 0;
11.手机上系统默认选择框   <select><option></option></select>
12.输入框去掉阴影：-webkit-appearance: none;
13.盒模型等比划分时，每部分字体不一样，导致的宽度不一样的解决办法：给每部分加属性：width:0%;
14.内联元素空白处理：父级元素font-size:0;
15.禁止iPhone把数字当成电话号码而导致的数字颜色变化：<meta name="format-detection" content="telephone=no"/>
16.-webkit-box-flex:1不能等分bug   每一项加width:0%;
17.换行符导致部分子元素不能与父元素紧贴，父元素设置字体font-size:0;
18.移动端页面滑动不流畅 ：  overflow: auto;-webkit-overflow-scrolling:touch
19.三角形   .triangle{width:0px;height:0px;border:100px solid;border-color:red green transparent transparent;}dd
20.button:padding bug  firefox :  button:-moz-focus-inner{padding:0;}   ie7:   文字越多，左右padding值越大   button:{overflow:visible;}
21.overflow  导致的padding-bottom缺失现象
22.#parent{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    子元素可单独定义沿交叉轴排列的方式 #son{align-self:center}