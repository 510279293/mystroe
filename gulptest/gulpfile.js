/**
 * Created by Administrator on 2016/10/13.
 */
var gulp=require("gulp");  //gulp核心模块
var sass=require("gulp-sass");//sass编译
var server=require("gulp-connect");//服务器
var concat = require("gulp-concat");//合并
var uglify = require("gulp-uglify");//js压缩
var minifyCss = require("gulp-minify-css");//css压缩
var imgmin = require("gulp-imagemin");//图片压缩
var rename = require("gulp-rename");//对文件进行重命名
var rev = require("gulp-rev");//给静态资源添加一个hash值后缀
var revCollecter =  require("gulp-rev-collector");//根据rev生成manifest用来替换html link
var prefixer=require("gulp-autoprefixer");//自动添加浏览器厂商前缀
var htmlmin = require("gulp-htmlmin");//对页面进行压缩

gulp.task("default",["copyindex","copy-img","watch"]);
//copy文件并对页面进行压缩
//<!--copy src:操作的目录 dest:目标目录-->
gulp.task("copyindex",function(){
    return gulp.src("src/html/index.html").pipe(htmlmin({
        minifyCss:true,
        minifyJS:true,
        removeComments:true,
        collapseWhitespace:true
    })).pipe(gulp.dest("dist/html/"))
});
//copy多文件
gulp.task("copy-img",function(){
    return gulp.src("src/images/**/*").pipe(gulp.dest("dist/img/"));
})
//sass编译
gulp.task("sass",function(){
    return gulp.src("src/scss/**/*.scss").pipe(sass())
        .pipe(gulp.dest("dist/css/"));
})
//js编译
gulp.task("js",function(){
    return gulp.src("src/js/**/*").pipe(gulp.dest("dist/js/"));
})
//监听文件
gulp.task("watch",function(){
    gulp.watch("src/html/index.html",["copyindex"]);
    gulp.watch("src/images/**/*",["copy-img"]);
    gulp.watch("src/scss/index.scss",["sass"]);
})
//创建服务器
gulp.task("server",function(){
    server.server({
        root:"dist"
    })
})
//合并文件
gulp.task("concat",function(){
      return gulp.src("src/js/**/*")
          .pipe(concat("all.js")).pipe(gulp.dest("dist/js/"))
})
//js文件压缩
gulp.task("uglify",function(){
    return gulp.src("src/js/**/*").pipe(concat("all1.js")).pipe(uglify()).pipe(gulp.dest("dist/js/"))
})
//css文件压缩并添加随机后缀
gulp.task("mini-css",function(){
    return gulp.src("src/css/**/*.css").pipe(minifyCss())
        .pipe(gulp.dest("dist/css/")).pipe(rev())
        .pipe(gulp.dest("dist/css/")).pipe(rev.manifest()).pipe(gulp.dest("dist/css/"))
})
//批量copy图片并压缩
gulp.task("copyAndminInmg",function(){
    return gulp.src("src/images/**/*").pipe(imgmin())
        .pipe(gulp.dest("dist/images/"))
})
//对文件重命名
gulp.task("rename",function(){
    return gulp.src("src/css/**/*.css").pipe(concat("all1.css")).pipe(rename("all.css"))
        .pipe(gulp.dest("dist/css/"));
})
//根据rev-manifest对link路径进行替换
gulp.task("rev-collector",function(){
    return gulp.src(["dist/css/**/*.json","dist/html/index.html"])
        .pipe(revCollecter({
            replaceReved:true,
        })).pipe(gulp.dest("dist/html"))
})
//自动添加浏览器厂商前缀
gulp.task("addPrx",function(){
    return gulp.src("src/css/*.css")
        .pipe(prefixer({
            browsers:['last 2 version','Android>=4.0'],
            cascade:true,//是否美化属性值
            remove:true//是否去掉不必要的前缀 默认：true
        })).pipe(gulp.dest("dist/css/"))
})

