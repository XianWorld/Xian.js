/**
 * Created by Dianyan on 2014/11/19.
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('watch', function() {
    var bundler = watchify(browserify('./index.js'));

    // Optionally, you can apply transforms
    // and other configuration options on the
    // bundler just as you would with browserify
    //bundler.transform('brfs');

    bundler.on('update', rebundle);
    bundler.on('log', function (msg) {console.log(msg)})

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', function(err){console.error(err.message);})
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dist'));
    }

    return rebundle();
});

var getBundleName = function () {
    var version = require('../../package.json').version;
    var name = require('../../package.json').name;
    return version + '.' + name + '.' + 'min';
};

gulp.task('javascript', function() {

    var bundler = browserify({
        entries: ['./index.js'],
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source('bundle.js'))
            //.pipe(buffer())
            //.pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            //.pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'));
    };

    return bundle();
});