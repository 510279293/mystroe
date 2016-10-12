
$(function(){
	var audios = document.querySelector("audio");
	var curindex=0;
	var myscnum=0;
	$(".contain .mysc").click(function(){
		myscnum++;
		if(myscnum%2==0){
			$(".contain").stop().animate({width:640},400);
		}else{
			$(".contain").stop().animate({width:280},400);
		}
		
	});

	$.get("json/music.json",function(data){
		var html="";
		$.each(data,function(i,o){
			html+='<div class="listitem" data-src="'+ o.src+'">'
				+'<dl><dt>'+(i+1)+'</dt><dd><p>'+o.name+'</p><p>'+ o.who+'</p>'
				+'</dd></dl><i></i></div>'
		});
		$(".list").html(html);
		var playnum=0;
		$(".contain .playban .play").click(function(){
			playnum++;
			if(playnum%2==0){
				$(this).removeClass().addClass("play");
				audios.pause();
			}else{
				$(this).removeClass().addClass("pause");
				audios.play();
			}

		});

		function getstyle(){
			$(".contain .playban p").css({
				"width":0,
				"background":"pink"
			});
			$(".contain .list .listitem").removeClass("listitemon");
			$(".contain .list .listitem").eq(curindex).addClass("listitemon");
			$(".contain .list .listitem dl dd p").css("color","#fff");
			$(".contain .list .listitem").eq(curindex).children("dl").children("dd").children("p").css("color","red");
			var src=$(".contain .list .listitem").eq(curindex).data("src");
			audios.setAttribute("src",src);
			setTimeout(function(){
				$(".contain .playban #play").removeClass().addClass("pause");
				audios.play();
			},1000);
		}

		$(".contain .list .listitem").click(function(){
			curindex = $(this).index();
			$(".contain .list .listitem").removeClass("listitemon");
			$(".contain .list .listitem dl dd p").css("color","#fff");
			$(this).children("dl").children("dd").children("p").css("color","red");
			$(this).addClass("listitemon");
			var src=$(this).data("src");
			console.log(src);
			audios.setAttribute("src",src);
			audios.play();
			$(".contain .playban #play").removeClass().addClass("pause");
		});

		$(" .contain .playban .next").click(function(){
			$(".contain .playban #play").removeClass().addClass("play");
			curindex++;
			if(curindex==15){
				curindex=0;
			}
			getstyle();
		})

		$(" .contain .playban .prev").click(function(){
			$(".contain .playban #play").removeClass().addClass("play");
			console.log(1);
			curindex--;
			if(curindex<0){
				curindex=15;
			}
			getstyle();
		})

		var totaltime;
		audios.ontimeupdate=function(){
			//console.log(audios.currentTime);

			totaltime = audios.duration;
			var curtime = audios.currentTime;
			var wid=curtime/totaltime*100;
			$(".contain .playban p").css({
				"width":wid+"%",
				"background":"red"
			});
			$(".contain .playban p i").css({
				"left":"100%",
				"background":"green"
			})
			if(totaltime==curtime){
				$(".contain .playban #play").removeClass().addClass("play");
				curindex++;
				if(curindex==15){
					curindex=0;
				}
				getstyle();
			}

		};

		var iii=document.querySelector(".contain .playban p i");
		iii.onmousedown=function(){
			document.onmousemove=function(e){
				var e = e||window.event;
				var left= e.clientX-$(".contain .playban p").offset().left;
				totaltime = audios.duration;
				$(".contain .playban p i").css("left",left-3);
				$(".contain .playban p").css({"top":"-2px","width":left});
				audios.currentTime = left/640*audios.duration;

			}
		};
		document.onmouseup=function(){
			//audios.currentTime=currtime;
			document.onmousemove=null;
		}

		//顺序播放
		$(".setitem dl").eq(1).click(function(){
            var len = data.length;
			curindex = parseInt(Math.random()*len);
			$(".contain .list .listitem").removeClass("listitemon");
			$(".contain .list .listitem dl dd p").css("color","#fff");
			$(".contain .list .listitem").eq(curindex).children("dl").children("dd").children("p").css("color","red");
			$(".contain .list .listitem").eq(curindex).addClass("listitemon");
			$(".contain .playban #play").removeClass().addClass("pause");
			var src = data[curindex].src;
			audios.setAttribute("src",src);
			audios.play();
		});

       //换皮肤
      $(".setitem dl").eq(4).click(function(){
		  var bgnum = parseInt(Math.random()*10);
		  console.log(bgnum)
		  $(".contain .list").css('background','url(img/bg'+bgnum+'.gif) 50% 50%');
	  })


	})




});

