/**
 * Created by Dianyan on 2014/11/18.
 */
'use strict';

var gulp = require('gulp');

//var map = require('map-stream');
var jshint = require('gulp-jshint');
//var stylish = require('jshint-stylish');

//var gutil = require('gulp-util');
//var source = require('vinyl-source-stream');
//var watchify = require('watchify');
//var browserify = require('browserify');
//var buffer = require('vinyl-buffer');

//var uglify = require('gulp-uglify');
//var sourcemaps = require('gulp-sourcemaps');
//var del = require('del');
//var concat = require('gulp-concat');
//
//
//
//var paths = {
//    main: './index1.js',
//    src_scripts: ['./src/**/*.js'],
//    build_dir: './build'
//};
//
//var getBundleName = function () {
//    var version = require('./package.json').version;
//    var name = require('./package.json').name;
//    return version + '.' + name + '.' + 'min';
//};

gulp.task('lint', function() {
    return gulp.src(["/index.js"])
        .pipe(jshint())
        //.pipe(myReporter);
        .pipe(jshint.reporter('default'));
    //.pipe(jshint.reporter(stylish));
});
//
//// Rerun the task when a file changes
//gulp.task('watch_lint_src_scripts', function() {
//    gulp.watch(paths.src_scripts, ['lint_src_scripts']);
//});
//
//gulp.task('develop_lint_src_scripts', ['watch_lint_src_scripts', 'lint_src_scripts']);
//
//// Not all tasks need to use streams
//// A gulpfile is just another node program and you can use all packages available on npm
//gulp.task('clean', function(cb) {
//    // You can use multiple globbing patterns as you would with `gulp.src`
//    del(paths.build_dir, cb);
//});
//
//gulp.task('build_src_scripts', ['clean'], function() {
//    // Minify and copy all JavaScript (except vendor scripts)
//    // with sourcemaps all the way down
//    return gulp.src(paths.src_scripts)
//        //.pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(concat('all.min.js'))
//        //.pipe(sourcemaps.write())
//        .pipe(gulp.dest('./build/js'));
//});
//
//// Rerun the task when a file changes
//gulp.task('watch_build_src_scripts', function() {
//    gulp.watch(paths.src_scripts, ['build_src_scripts']);
//});
//
//gulp.task('watch_browserify_src_scripts', function() {
//    var bundler = watchify(browserify(paths.main));
//
//    // Optionally, you can apply transforms
//    // and other configuration options on the
//    // bundler just as you would with browserify
//    //bundler.transform('brfs');
//
//    bundler.on('update', rebundle);
//    bundler.on('log', function (msg) {console.log(msg)})
//
//    function rebundle() {
//        return bundler.bundle()
//            // log errors if they happen
//            .on('error', function(err){console.error(err.message);})
//            .pipe(source('bundle.js'))
//            .pipe(gulp.dest('./dist'));
//    }
//
//    return rebundle();
//});
//
//var myReporter = map(function (file, cb) {
//    if (!file.jshint.success) {
//        console.log('JSHINT fail in '+file.path);
//        file.jshint.results.forEach(function (err) {
//            if (err) {
//                console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
//            }
//        });
//    }
//    else
//    {
//        console.log('JSHINT succ in '+file.path);
//    }
//    cb(null, file);
//});
