$(function(){
	//购物车
	$(".topshopcart").hover(function(){
		$(".cart-tips").css({"display":"block"});
		$(".topshopcart").css({"background":"#FFF","border-bottom":"none"})
	},function(){
		$(".cart-tips").css("display","none");
		$(".topshopcart").css({"background":"#f9f9f9","border":"1px solid #bfbfbf"})
	})
	//导航隐藏的Li sublistboxnone
	$(".left-sub-list").hide();
	$(".side-categorydown li").hover(function(){
		$(this).find(".left-sub-list").show();
		//$(this).find(".side-categorydown li").css("bcakground","rgba(255,255,255,0.88)");

	},function(){
		$(this).find(".left-sub-list").hide();
	})

	//导航隐藏的Li sublistboxnone
	$(".sublistbox").hide();
	$(".top-container1 ul li").hover(function(){
		$(this).find(".sublistbox").show();
	},function(){
		$(this).find(".sublistbox").hide();
	})

	//轮播图
	$(".banner-bg li").hide();
	var count=-1;
	var bannerle = $(".banner-bg li").length;
	m = setInterval(pic,2000);

	pic();
	function pic(){
		count++;
		if(count>=bannerle){count=0}
		if(count<0){count=bannerle-1}
		$(".banner-bg li").fadeOut(2000);
		$(".banner-bg li").eq(count).fadeIn(2000);
		$(".curr-point li").css({"background":"rgba(0,0,0,.3)","border":"none"});
		$(".curr-point li").eq(count).css({"background":"rgba(255,255,255,9)","border":"1px #9e9e9e solid"});
		
	}
	//鼠标经过圆球
	$(".curr-point li").hover(function(){
		clearInterval(m);
		count=$(this).index()-1;
		pic();

	},function(){
		m = setInterval(pic,2000);
	})
	
	$(".banner-bg").hover(function(){
		clearInterval(m);
	},function(){
		m = setInterval(pic,2000);
	})


	$(".slide-prev").click(function () {
	clearInterval(m)
	console.log(count)
	count-=2;
		pic()
    })

    $(".slide-next").click(function () {
    	clearInterval(m)
    	console.log(count)
		pic()
    })
    
	//电梯图
	$(".elevator_box").hide();
	//电梯图点击到达指定楼层
	$(".elevator_list>li").click(function(){
		//点击获取点击楼层下标

		var s=$(this).index();
		var b=$(".bigbox .big").eq(s).offset().top;
		$("html").animate({scrollTop:(b-100)},200);
		$("body").animate({scrollTop:(b-100)},200);
	})

	$(".slidebar li:nth-child(3)").click(function(){
		$("html,body").animate({scrollTop:0},500);
	});

})
//电梯图



$(window).scroll(function () {
	//电梯图显示条件

	var a = $(this).scrollTop();//文本文档的偏移量（滚轴滚动的高度）
	if(a<300){
		$(".slidebar li:nth-child(3)").css("display","block");
	}
	//判断电梯图显示的条件
	//文档垂直偏移量大于1200像素是 电梯图显示否则消失
	if(a>1200){
		$(".elevator_box").show();
	}else{
		$(".elevator_box").hide();
	}
		var Length = $(".bigbox .big").length;
		//alert(Length)

		//遍历所有和电梯图对应的div
		for(var i=0;i<Length;i++){
			var b = $(".bigbox .big").eq(i).offset().top;//窗口到顶端的高度
			var h = $(".bigbox .big").height();//文本高度
			if ((b-200)< a  && b > (h-a-200)) {
				$(".elevator_list li").css({"background":"#fff"})
				$(".elevator_list li").eq(i).css({"background":"#666"})
			}
		}


})