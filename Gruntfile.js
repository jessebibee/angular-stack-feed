module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/js/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    angular: true
                }
            }
        },
        clean: {
            all: {
                src: ['build/**/*.*']
            }
        },
        uglify: {
            all: {
                files: [
                    {
                        expand: true,
                        src: ['src/js/**/*.js'],
                        dest: 'build/',
                        ext: '.min.js'
                    }
                ]
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: ['build/src/**/*.min.js'],
                dest: 'build/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('default', ['clean', 'uglify', 'concat']);
};
