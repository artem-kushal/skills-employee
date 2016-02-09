'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins')
var plugins = gulpLoadPlugins();
var imageminPngquant = require('imagemin-pngquant');
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser');

var path = {
    src: { 
        html: 'app/*.html', 
        partials: 'app/partials/*.html',
        js: 'app/js/*.js',
        style: 'app/css/style.css',
        img: 'app/images/**/*.*', 
        fonts: ['app/bower_components/materialize/font/**/*.*', 'app/font/*.*']
    },
    watch: {
        html: 'app/**/*.html',
        partials: 'app/partials/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/css/*.css',
        img: 'app/images/**/*.*',
        fonts: 'app/font/**/*.*'
    },
    build: { 
        html: 'build/',
        partials: 'build/partials/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/images/',
        fonts: 'build/font/'        
    },
    clean: 'build'
};

// -------------------------- task for watching changes and livereload --------------------------

gulp.task('server', function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(require('connect-livereload')({
        port: 35729
    }));
    app.use(express.static(__dirname + '/build')); // для того чтобы смог найтись путь к js, css и т. д.
    app.use('/*', function (req, res) {
        res.sendFile(__dirname + '/build/index.html');
    });
    server.listen(5000, function () {
        console.log('Server start on port %d', server.address().port);
    });
});

var tinylr;
gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('watch', function () {
    plugins.watch([path.watch.html], notifyLiveReload);
    plugins.watch([path.watch.js], notifyLiveReload);
    plugins.watch([path.watch.partials], notifyLiveReload);
    plugins.watch([path.watch.style], notifyLiveReload);
});

gulp.task('start', ['server', 'livereload', 'watch']);

// ---------------------- task for build --------------------------

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.build.html)); 
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(plugins.uglify()) 
        .pipe(gulp.dest(path.build.js));
});

gulp.task('libs:build', function () {
    gulp.src('app/index.html')
        .pipe(plugins.useref())
        // .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(plugins.minifyCss({rebase: false, keepSpecialComments: 0}))
        .pipe(plugins.autoprefixer({browsers: ['last 2 versions'], cascade: false})) 
        // .pipe(plugins.csso())
        .pipe(gulp.dest(path.build.style));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(plugins.imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('partials:build', function() {
    gulp.src(path.src.partials)
        .pipe(gulp.dest(path.build.partials));
});

gulp.task('clean', function (cb) {
    return gulp.src(path.clean, {read: false}).pipe(plugins.clean());
});

gulp.task('build', [
    'clean',
    'html:build',
    // 'js:build',
    'libs:build',
    'style:build',
    'fonts:build',
    'image:build',
    'partials:build'
]);

