/**
 * Created by Dianyan on 2014/12/1.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                ignores: ['src/context/socket.io.js'],
                shadow: true,
                node: true,
                browser: true,
                supernew: true,
                eqnull: true,
                expr: true,
                globals: {
                    alert: true
                }
            },
            all: ['src/**/*.js'],
            dev: ['src/math/**/*.js']
        },
        watch: {
            all: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint:all']
            },
            dev: {
                files: ['<%= jshint.dev %>'],
                tasks: ['jshint:dev']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

};

//module.exports = function (grunt) {
//    var transport = require('grunt-cmd-transport');
//    var style = transport.style.init(grunt);
//    var text = transport.text.init(grunt);
//    var script = transport.script.init(grunt);
//    grunt.initConfig({
//        pkg : grunt.file.readJSON("package.json"),
//        transport : {
//            options : {
//                paths : ['spm_modules'],
//                alias: '<%= pkg.spm.dependencies %>',
//                parsers : {
//                    '.js' : [script.jsParser],
//                    '.css' : [style.css2jsParser],
//                    '.html' : [text.html2jsParser]
//                }
//            },
//            styles : {
//                options : {
//                    idleading : 'dist/styles/'
//                },
//                files : [
//                    {
//                        cwd : 'styles/',
//                        src : '**/*',
//                        filter : 'isFile',
//                        dest : '.build/styles'
//                    }
//                ]
//            },
//            app1 : {
//                options : {
//                    idleading : 'src/'
//                },
//                files : [
//                    {
//                        expand: true,
//                        cwd : 'src',
//                        src : '**/*',
//                        filter : 'isFile',
//                        dest : '.build/src'
//                    }
//                ]
//            }
//        },
//        seajs_transport: {
//            app1: {
//                options: {
//                    space: false
//                },
//                files: [{
//                    expand: true,
//                    cwd: 'src',
//                    src: '**/*.js',
//                    dest : '.build/src'
//                }]
//            }
//        },
//        wrap: {
//            server: {
//                // base directory
//                base: '.',
//                // server listening port
//                port: 8080,
//                // files to be wrapped
//                wrap: function(url) {
//                    return /^\/(src).+\.js$/.test(url);
//                }
//            }
//        },
//        concat : {
//            options : {
//                paths : ['.'],
//                include : 'relative'
//            },
//            styles : {
//                files: [
//                    {
//                        expand: true,
//                        cwd: '.build/',
//                        src: ['styles/**/*.js'],
//                        dest: 'dist/',
//                        ext: '.js'
//                    }
//                ]
//            },
//            app1 : {
//                options : {
//                    include : 'all'
//                },
//                files: [
//                    {
//                        expand: true,
//                        cwd: '.build/',
//                        src: ['src/**/*.js'],
//                        dest: 'dist/',
//                        ext: '.js'
//                    }
//                ]
//            }
//        },
//        uglify : {
//            styles : {
//                files: [
//                    {
//                        expand: true,
//                        cwd: 'dist/',
//                        src: ['styles/**/*.js', '!styles/**/*-debug.js'],
//                        dest: 'dist/',
//                        ext: '.js'
//                    }
//                ]
//            },
//            app1 : {
//                files: [
//                    {
//                        expand: true,
//                        cwd: 'dist/',
//                        src: ['src/**/*.js', '!src/**/*-debug.js'],
//                        dest: 'dist/',
//                        ext: '.js'
//                    }
//                ]
//            }
//        },
//        clean : {
//            spm : ['.build']
//        }
//    });
//    grunt.loadNpmTasks('grunt-cmd-wrap');
//    grunt.loadNpmTasks('grunt-seajs-transport');
//    grunt.loadNpmTasks('grunt-cmd-transport');
//    grunt.loadNpmTasks('grunt-cmd-concat');
//    grunt.loadNpmTasks('grunt-contrib-clean');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles', 'clean']);
//    grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
////    grunt.registerTask('default', ['clean']);
//};


//module.exports = function(grunt) {
//
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        concat: {
//            options: {
//                separator: ';'
//            },
//            dist: {
//                src: ['src/**/*.js'],
//                dest: 'dist/<%= pkg.name %>.js'
//            }
//        },
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
//            },
//            dist: {
//                files: {
//                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
//                }
//            }
//        },
//        qunit: {
//            files: ['test/**/*.html']
//        },
//        jshint: {
//            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
//            options: {
//                // options here to override JSHint defaults
//                globals: {
//                    jQuery: true,
//                    console: true,
//                    module: true,
//                    document: true
//                }
//            }
//        },
//        watch: {
//            files: ['<%= jshint.files %>'],
//            tasks: ['jshint', 'qunit']
//        }
//    });
//
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-qunit');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//
//    grunt.registerTask('test', ['jshint', 'qunit']);
//
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
//
//};