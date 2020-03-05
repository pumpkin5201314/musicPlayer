var gulp = require("gulp");
// var htmlClean=require('gulp-htmlclean')
// var imageMin=require('gulp-imagemin')
// var uglify=require('gulp-uglify')
// var stripDebug=require('gulp-strip-debug')
// var less=require('gulp-less')
// var cleanCss=require('gulp-clean-css')
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var connect = require("gulp-connect");

// //set NODE_ENV=production  development   设置当前环境变量
// var devMod=process.env.Node_ENV=='development';//判断当前环境变量
// var folder={
//     src:'src/',
//     dist:'test/'
// }

// gulp.task('server',function(){
//     connect.server({
//         port:'8888',
//         livereload:true
//     })

// })

// gulp.task('image',function(){
//    var page= gulp.src(folder.src+'images/*')
//         .pipe(connect.reload());
//         if(!devMod){
//             page.pipe(imageMin())

//         }
//         page.pipe(gulp.dest(folder.dist+'images/'))

// })
// gulp.task('html',function(){
//     var page= gulp.src(folder.src+'html/*')
//        .pipe(connect.reload());
//        if(!devMod){
//         page .pipe(htmlClean())
    
//     }
//         page.pipe(gulp.dest(folder.dist+'html/'))

// })
// gulp.task('css',function(){
//    var page= gulp.src(folder.src+'css/*')
//        .pipe(connect.reload())
//         .pipe(less())
//         .pipe(postcss([autoprefixer()]))
//         if(!devMod){
//             page.pipe(cleanCss())

//         }
//         page.pipe(gulp.dest(folder.dist+'css/'))

// })
// gulp.task('js',function(){
//    var page= gulp.src(folder.src+'js/*')
//        .pipe(connect.reload())
//         .pipe(stripDebug())
//         if(!devMod){
//             page.pipe(uglify())

//         }
//         page.pipe(gulp.dest(folder.dist+'js/'))

// })
// gulp.task('watch',function(){
//      gulp.watch(folder.src+'html/*',['html'])
//      gulp.watch(folder.src+'js/*',['js'])

//      gulp.watch(folder.src+'css/*',['css'])
//      gulp.watch(folder.src+'images/*',['image'])



// })

// gulp.task('default',['html','css','js','image','server','watch' ]);



var imagemin = require("gulp-imagemin") //压缩图片
var htmlclean = require("gulp-htmlclean");//压缩html
var uglify = require("gulp-uglify");//压缩js
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var deporder = require("gulp-deporder");
var less = require("gulp-less"); //less->css
var postcss = require("gulp-postcss");//自动添加前缀
var autoprefixer = require("autoprefixer");//自动添加前缀
var cssnano = require("cssnano");
var connect = require("gulp-connect");//开启服务器



var folder = {
    src : "src/",
    dist : "dist/"
}

var devMode = process.env.NODE_ENV !== "production";

//流操作 task running
gulp.task("html",function(){
    var page =  gulp.src(folder.src + "html/index.html")
                    .pipe(connect.reload());
    if(!devMode){
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images/"))
})
gulp.task("js",function(){
    var js = gulp.src(folder.src+"js/*")
            .pipe(connect.reload());
    if(!devMode){
        js.pipe(uglify())
        .pipe(stripDebug())
    }   
    js.pipe(gulp.dest(folder.dist+"js/"))
})
gulp.task("css",function(){
    var css = gulp.src(folder.src+"css/*")
                .pipe(connect.reload())
                .pipe(less());
    var options = [autoprefixer()];
    if(!devMode){
        options.push(cssnano())
    }
        
    css.pipe(postcss(options))
    .pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "css/*",["css"]);
})
gulp.task("server",function(){
    connect.server({
        port : "8081",
        livereload : true
    });
})

gulp.task("default",["html","images","js","css","watch","server"]);