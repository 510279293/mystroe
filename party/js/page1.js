$(function(){
	window.onresize=function(){
		var w= document.documentElement.clientWidth;
		console.log(w);
	}

	var clicknum=1;
	$(".top ul li").click(function(){
		clicknum++;
		$(".top .titem").hide();
		$(".top ul li a").removeClass("aon");
		if(clicknum%2==0){
			$(this).children(".titem").show();
			$(this).children("a").addClass("aon");
		}else{
			$(this).children(".titem").hide();
			$(".top ul li a").removeClass("aon");
		}	
	});
	
	$(".contain .contain-left .clitem h4").click(function(){
		$(".contain .contain-left .clitem h4").removeClass("h4");
		$(".contain .contain-left .clitem").children("p").hide();
		$(this).addClass("h4").parent().children("p").show();
	})
	
})
