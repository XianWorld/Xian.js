/**
 * Created by Dianyan on 2014/11/18.
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

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    var bundler = watchify(browserify('./src/xian/xian.js'));

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

gulp.task('examples_test', function() {

    var bundler = browserify({
        entries: ['./examples/test/index.js'],
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
            .pipe(gulp.dest('./examples/test/dist'));
    };

    return bundle();
});

gulp.task('examples_test_3d', function() {

    var bundler = browserify({
        entries: ['./examples/test_3d/index.js'],
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
            .pipe(gulp.dest('./examples/test_3d/dist'));
    };

    return bundle();
});

gulp.task('examples_particleSystem', function() {

    var bundler = browserify({
        entries: ['./examples/particleSystem/index.js'],
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
            .pipe(gulp.dest('./examples/particleSystem/dist'));
    };

    return bundle();
});

gulp.task('examples_zombie_rampage', function() {

    var bundler = browserify({
        entries: ['./examples/zombie_rampage/index.js'],
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
            .pipe(gulp.dest('./examples/zombie_rampage/dist'));
    };

    return bundle();
});

// Examples task
gulp.task('examples', function() {
    gulp.start('examples_test', 'examples_test_3d', 'examples_particleSystem','examples_zombie_rampage');
});
