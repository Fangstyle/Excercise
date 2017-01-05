/**
 * Created by Administrator on 2017/1/4.
 */


/*软件分为开发环境和生产环节和测试环境
*
*  gulp 用自动化构建工具增强你的工作流程！
*
* 本插件的意义 在于将 开发环境下的产物 进行封装压缩混淆 最终成为一个开发环境下的产物
* 引入gulp的不同插件 进行一系列的操作(压缩 合并 混淆 输出)
* 引入browser-sync 这个gulp插件的目的在于搭建一个服务器 当文件发生变化的时候实时监控
* 并且让开发环境下的产物  与 开发环境下的产物 进行同步 (边生产变出产品）
* */

/*引入包
* gulp-less less-->css 的包
* gulp-cssnano css压缩
* gulp-concat  js合并
* gulp-uglify js混淆
* browser-sync 建立服务器 进行同步刷新 同步操作等
* */
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin')
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
/*
gulp.task('hello', function() {
    console.log("hello word");
});*/
gulp.task('style',function () {
        gulp.src(['src/styles/*.less','!src/styles/_*.less'])
            .pipe(less()) //管道思想  将less --> css
            .pipe(cssnano())//管道思想  将css --> 压缩
            .pipe(gulp.dest('dist/styles')) //管道思想  将产物输出文件夹
            .pipe(browserSync.reload({
                    stream: true
            }));
});
// 2. JS合并 压缩混淆   目的是把所有的js文件 （相互引用的js文件 打包到一个js文件中）
gulp.task('script',function () {
        gulp.src(['src/scripts/*.js'])
            .pipe(concat('Fangscript.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({
                    stream: true
            }));
});
//3 图片的复制
gulp.task('images',function () {
        gulp.src(['src/images/*.*'])
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({
                    stream: true
            }));
});
//4 html文件的压缩
gulp.task('html',function () {
        gulp.src('src/*.html')
            .pipe(htmlmin({
                    collapseWhitespace: true,
                    removeComments: true
            }))
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.reload({
                    stream: true
            }));
});
// 使用browser-sync 建立一个服务，每次文件发生更改时 进行一下操作
gulp.task('startFangService', function() {
        browserSync({
                server: {
                        baseDir: ['dist']
                },
        }, function(err, bs) {
                console.log(bs.options.getIn(["urls", "local"]));
        });
        gulp.watch('src/styles/*.less',['style']);
        gulp.watch('src/scripts/*.js',['script']);
        gulp.watch('src/images/*.*',['image']);
        gulp.watch('src/*.html',['html']);
});
