'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test:unit', ['karma:unit']);
};
