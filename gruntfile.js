module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: "",

        connect: {
            keepalive: {
                options: {
                    port: 10000,
                    base: 'src/'
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/assets/styles',
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            files: ['src/**/*.*'],
            tasks: ['build']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('build', ['compass']);
    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('default', ['build']);
};