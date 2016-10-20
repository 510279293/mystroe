/**
 * Created by Administrator on 2016/10/20.
 */
require.config({
    baseUrl:"js/", //基目录
    paths:{
        sp:"swiper",  //模块别名:模块名
        sa:"swiper.animate1.0.2.min", //模块别名:模块名
        tc:"touch", //模块别名:模块名
        in:"index" //模块别名:模块名
    },
    shim:{  //把非amd编写的模块转化为amd编写的模块
        'sp':{
            exports:"sp"
          },
        'sa':{
            //deps:["sp"],
            erports:"sa"
        },
        'tc':{
            deps:["sp"],
            exports:"tc"
        },
        'in':{
            //deps:["sp","sa","tc"],
            exports:"in"
        }
    }
});
require(["sp","sa","tc","in"],function(p,a,t,i){
    var swiper=new p(".swiper-container",{
        "direction":"vertical",
        "autoplay":5000,
        "pagination":".swiper-pagination",
        "effect":"coverflow",
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })
})