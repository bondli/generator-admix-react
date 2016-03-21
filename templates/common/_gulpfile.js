// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var glob = require('glob');
var fs = require('fs');

// 获取当前项目工程的git版本
var curVer = '0.0.1';
try{
    var versionData = fs.readFileSync('.git/HEAD').toString('utf-8');
    if(versionData){
        curVer = versionData.substring(versionData.lastIndexOf('/')+1).replace(/^\s+|\s+$/g, '')
    }
}
catch(e){console.log('warning:your project not in gitlab!');}

// Configurable paths for the application
var appConfig = {
    cdnPrefix: '//g.alicdn.com/',
    group: 'o2o',
    appName: '<%= appname %>',
    curVer: curVer
};

/**
 * 监听文件变化和启动服务器
 * @return {[type]}   [description]
 */
gulp.task('watch', function() {
    gulp.watch(['./htmls/*.html'], ['watch-html']);

    gulp.watch(['./app/scss/*.scss'], ['watch-scss']);

    gulp.watch(['./app/**/*.js', './app/components/**/*.js'], ['watch-script']);

    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['./']
    });

});

/**
 * 监听html文件变化
 * @return {[type]}     [description]
 */
gulp.task('watch-html', function() {
    gulp.src(['./htmls/*.html'])
        .pipe(browserSync.reload({
            stream: true
        }));

});

/**
 * 监听脚本文件变化
 * @return {[type]}     [description]
 */
gulp.task('watch-script', function() {
    glob('./app/pages/*.js', {}, function(err, files) {
        files.forEach(function(file) {
            console.log(file);
            browserify(file, {
                transform: [reactify]
            })
            .bundle()
            .pipe(source(file.replace('./app/pages/', '')))
            .pipe(gulp.dest('.tmp/js'))
            .pipe(browserSync.reload({
                stream: true
            }));
        });
    });

});

/**
 * 监听样式文件变化
 * @return {[type]}   [description]
 */
gulp.task('watch-scss', function() {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/css'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

/**
 * 清除临时目录
 * @return {[type]}   [description]
 */
gulp.task('tmp-clean', function () {
    return gulp.src('.tmp', {read: false})
        .pipe(clean());
});

/**
 * 生成索引文件
 * @return {[type]}   [description]
 */
gulp.task('tmp-index', function () {
    glob('./htmls/*.html', {}, function(err, files) {
        var str = '';
        files.forEach(function(file) {
            str += '<li><a href="' + file + '">' + file + '</a></li>';
        });
        var prefixTpl = '<html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style type="text/css">h3{font-size:14px;}ul{list-style:none;}ul li {padding:5px;}</style></head><body><h3>本项目下的页面有：</h3><ul>',
            suffixTpl = '</ul></body></html>';

        fs.writeFile('index.html', prefixTpl + str + suffixTpl, function (err) {
            if (err) throw err ;
        }) ;
    });
});

/**
 * 样式提取
 * @return {[type]}   [description]
 */
gulp.task('tmp-scss', function() {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('.tmp/css'));

});

/**
 * 脚本提取
 * @return {[type]}     [description]
 */
gulp.task('tmp-script', function() {
    glob('./app/pages/*.js', {}, function(err, files) {
        files.forEach(function(file) {
            browserify(file, {
                transform: [reactify]
            })
            .bundle()
            .pipe(source(file.replace('./app/pages/', '')))
            .pipe(gulp.dest('.tmp/js'));
        });
    });

});


/**
 * 清除原来打包好的文件
 * @return {[type]}   [description]
 */
gulp.task('build-clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});


/**
 * 监听html文件变化
 * @return {[type]}     [description]
 */
gulp.task('build-html', function() {
    var path = appConfig.cdnPrefix + appConfig.group + '/' + appConfig.appName + '/' + appConfig.curVer + '/';
    gulp.src(['./htmls/*.html'])
        .pipe(htmlreplace({
            js: {
                src: 'js',
                tpl: '<script src="'+ path + '%s/%f.js"></script>'
            },
            css: {
                src: 'css',
                tpl: '<link rel="stylesheet" href="'+ path + '%s/%f.css">'
            }
        }))
        .pipe(gulp.dest('htmls-dist'));

});

/**
 * 样式打包和压缩
 * @return {[type]}   [description]
 */
gulp.task('build-scss', function() {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));

});

/**
 * 脚本打包提取依赖
 * @return {[type]}     [description]
 */
gulp.task('build-script', function() {
    glob('./app/pages/*.js', {}, function(err, files) {
        files.forEach(function(file) {
            console.log(file);
            browserify(file, {
                transform: [reactify]
            })
            .bundle()
            .pipe(source(file.replace('./app/pages', 'js')))
            .pipe(streamify(uglify('build/js/'+file+'.js')))
            .pipe(gulp.dest('build'));
        });
    });

});


gulp.task('default', function (cb) {
    gulpSequence(
        'tmp-clean',
        'tmp-index',
        'tmp-scss',
        'tmp-script',
        'watch',
        cb
    );
});

gulp.task('build', function (cb) {
    gulpSequence(
        'build-clean',
        'build-html',
        'build-scss',
        'build-script',
        'tmp-clean',
        cb
    );
});
