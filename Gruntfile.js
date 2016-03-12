module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                includePaths: [
                    'node_modules/foundation-sites/scss'
                ],
            },
            dist: {
                files: {
                    'css/main.css': 'sass/main.scss',
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('build', ['sass', 'postcss']);
    grunt.registerTask('default', ['build', 'watch']);
}
