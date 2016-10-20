/**
 * Created by Administrator on 2016/10/20.
 */
(function(){
    //var swiper = new Swiper(".swiper-container",{
    //    "direction":"vertical",
    //    "autoplay":5000,
    //    "pagination":".swiper-pagination",
    //    "effect":"coverflow",
    //    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    //        swiperAnimateCache(swiper); //隐藏动画元素
    //        swiperAnimate(swiper); //初始化完成开始动画
    //    },
    //    onSlideChangeEnd: function(swiper){
    //        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    //    }
    //});

    var musicC = document.querySelector(".music-c");
    var musicnote = document.querySelector(".music-note");
    var audio = document.querySelector("audio");
    musicC.addEventListener("click",function(){
        if(audio.paused){
            audio.play();
            musicnote.style.display="block";
            musicC.style.animationPlayState = "running";
        }else{
            audio.pause();
            musicnote.style.display="none";
            musicC.style.animationPlayState = "paused";
        }
    })

})()