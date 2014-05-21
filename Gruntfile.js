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
            files: ['Gruntfile.js', 'src/js/**/*.js', 'test/unit/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
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
                dest: 'build/js/app.js'
            }
        },
        copy: {
            main: {
                files: [
                  {
                      src: [
                          "src/bower_components/jquery/dist/jquery.min.js",
                          "src/bower_components/jquery/dist/jquery.min.map",
                          "src/bower_components/underscore/underscore.js",
                          "src/bower_components/toastr/toastr.min.js",
                          "src/bower_components/toastr/toastr.min.js.map",
                          "src/bower_components/select2/select2.min.js",
                          "src/bower_components/angular/angular.min.js",
                          "src/bower_components/angular/angular.min.js.map",
                          "src/bower_components/angular-bootstrap/ui-bootstrap.min.js",
                          "src/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
                          "src/bower_components/angular-sanitize/angular-sanitize.min.js",
                          "src/bower_components/angular-sanitize/angular-sanitize.min.js.map",
                          "src/bower_components/angular-ui-select2/src/select2.js"
                      ],
                      dest: "build/js",
                      expand: true,
                      flatten: true
                  },
                  {
                      src: [
                          "src/bower_components/bootstrap/dist/css/bootstrap.min.css",
                          "src/bower_components/toastr/toastr.min.css",
                          "src/bower_components/select2/select2.css",
                          "src/bower_components/select2/select2-spinner.gif",
                          "src/bower_components/select2/select2-spinner.png"
                      ],
                      dest: "build/css",
                      expand: true,
                      flatten: true
                  },
                  {
                      src: [
                          "src/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
                          "src/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
                          "src/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                          "src/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"
                      ],
                      dest: "build/fonts",
                      expand: true,
                      flatten: true
                  }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'concat', 'copy']);
};
