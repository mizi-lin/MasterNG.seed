//expand：如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
//cwd：需要处理的文件（input）所在的目录,  相对于当前路径所匹配的所有src路径(但不包括当前路径。)
//src：相对于cwd路径的匹配模式, 表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
//dest：表示处理后的文件名或所在目录, 目标文件路径前缀。
//ext：使用这个属性值替换生成的dest路径中所有实际存在文件的扩展名(比如我们通常将压缩后的文件命名为.min.js)。
//flatten从生成的dest路径中移除所有的路径部分。
//rename对每个匹配的src文件调用这个函数(在执行ext和flatten之后)。传递dest和匹配的src路径给它，这个函数应该返回一个新的dest值。
    //如果相同的dest返回不止一次，每个使用它的src来源都将被添加到一个数组中。


//*：匹配任意数量的字符，不包括/。
//?：匹配单个字符，不包括/。
//**：匹配任意数量的字符，包括/。
//{}：允许使用逗号分隔的列表，表示“or”（或）关系。
//!：用于模式的开头，表示只返回不匹配的情况。

module.exports = function(grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    /**
     *  自定义 requirejs build
     *  去除 define and require
     */
    grunt.loadTasks('requirejsbuild');

    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        config: appConfig,

        //监控页面改变
        watch: {
            options: {
                livereload: true
            },

            bower: {
                files: ['bower.json']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,**/}*.html',
                    '<%= config.app %>/{,**/}*.js',
                    '<%= config.app %>/{,**/}*.css'
                ]
            },
            simple: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,**/}*.css'
                ]
            },
            html: {
                files: [
                    '<%= config.app %>/{,*/}*.html'
                ]
            }
        },

        connect: {
            options: {
                port: 9091,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'dev.tagace.com',
                livereload: 35731,
                base: 'app'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://dev.tagace.com/crm/index.html'
                    }
                }
            }
        },

        // build前清空文件夹
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // 代码风格检测
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: ['<%= config.app %>/src/intro.js', '<%= config.app %>/src/outro.js']
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/src/{,*/}*.js'
            ]
        },

        // 修改文件名
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/{,*/}*.js'
                    ]
                }
            }
        },

        requirejsbuild: {
            all: {
                dest: '<%= config.dist %>/mu.js'
            }
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            },

            build: {
                src: '<%= config.dist %>/mu.js',
                dest: '<%= config.dist %>/mu.min.js'
            }
        }
    });

    grunt.registerTask('bower', ['bower']);
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'requirejsbuild',
        'uglify',
        'clean:server'
    ]);
};