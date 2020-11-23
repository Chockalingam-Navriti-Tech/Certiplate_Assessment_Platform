module.exports = function(grunt) {

  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        sourceMap: true
      },
      dist: {
        src: 'js/videopopup.js',
        dest: 'dist/videopopup.min.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: false
      },
      dist: {
        files: {
          'dist/videopopup.min.js': ['dist/videopopup.min.js']
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: [
            'less/videopopup.less',
          ],
          cleancss: true
        },
        files: {
          'dist/videopopup.min.css': 'less/videopopup.less'
        }
      }
    },
    autoprefixer: {
      dist: {
        src: 'dist/videopopup.min.css',
        dest: 'dist/videopopup.min.css'
      }
    },
    jshint: {
      dist: {
        options: {
          force: true,
          reporter: require('jshint-stylish')
        },
        files: {
          src: ['js/videopopup.js']
        }
      }
    },
    bower: {
      all: {}
    },
    focus: {
      all: {}
    },
    watch: {
      js: {
        files: ['js/videopopup.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          nospawn: true
        }
      },
      less: {
        files: ['less/videopopup.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-composer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-focus');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('css', ['less', 'autoprefixer']);
  grunt.registerTask('default', ['js', 'css']);
  grunt.registerTask('watch-all', ['focus:all']);
};
