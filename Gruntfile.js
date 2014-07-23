
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wrap: {
      all: {
        cwd: 'src/',
        expand: true,
        src: ['**/*.js'],
        dest: '.tmp/',
        options: {
          seperator: '\n',
          indent: '\t',
          wrapper: ['define(function (require, exports, module) {\n', '\n});']
        }
      }
    },
    transport: {
      options: {
        debug: true,
        idleading: '<%= pkg.family %>/<%= pkg.name %>/<%= pkg.version %>/',
        alias: '<%= pkg.spm.alias %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: ['*.js'],
          dest: '.build/'
        }]
      }
    },

    concat: {
      nocmd: {
        options: {
          noncmd: true
        },
        files: {
          'build/handlebars-<%= pkg.version %>.js':['src/dateformat.js', 'src/handlebars-helpers.js']
        }
      },
      cmd: {
        options: {
          debug: true,
          include: 'relative',
          paths: ['sea-modules']
        },
        files: [{
          expand: true,
          cwd: '.build/',
          src: ['**/*.js', '**/*-debug.js'],
          dest: 'dist/'
        }]
      }

    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          'ascii_only': true
        },
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*.js', '!**/*-debug.js'],
          dest: 'dist/'
        }]
      }
    },
    clean: {
      build: {
        src: [".build/**"]
      },
      tmp: {
        src: [".tmp/**"]
      }
    }

  });

  grunt.loadNpmTasks('grunt-wrap');

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-cmd-transport');

  grunt.registerTask('build', ['wrap','transport', 'concat','uglify','clean']);
};