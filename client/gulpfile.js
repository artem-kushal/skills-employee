'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins')
var plugins = gulpLoadPlugins();
var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser');

var path = {
    watch: {
        html: 'app/**/*.html',
        partials: 'app/partials/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/css/*.css',
        img: 'app/images/**/*.*',
        fonts: 'app/font/**/*.*',
        bower: 'bower.json'
    },
    clean: 'build',
    src_folder: {
        js: 'app/js',
        bower: 'app/bower_components'
    }
};

gulp.task('server', function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(require('connect-livereload')({
        port: 35729
    }));
    app.use(express.static(__dirname + '/app')); // для того чтобы смог найтись путь к js, css и т. д.
    app.use('/*', function (req, res) {
        res.sendFile(__dirname + '/app/index.html');
    });
    server.listen(3000, function () {
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
    // plugins.watch([path.watch.bower], ['libs']);
});

gulp.task('start', ['server', 'livereload', 'watch']);
