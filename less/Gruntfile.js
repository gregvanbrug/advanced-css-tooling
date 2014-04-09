module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      assets: 'www/assets',
      css: 'www/assets/css'
    },
    jshint: {
      options: {
        jshintrc: '../.jshintrc',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    // PreProcessor
    less: {
      options: {
        compile: true
      },
      vars: {
        dest: 'target/<%= meta.css %>/variables.css',
        src: [ 'src/less/variables/*.less' ]
      },
      mixins: {
        dest: 'target/<%= meta.css %>/mixins.css',
        src: [ 'src/less/mixins/*.less' ]
      },
      extends: {
        dest: 'target/<%= meta.css %>/extends.css',
        src: [ 'src/less/extends/*.less' ]
      }
    },
    clean: {
      target: [ 'target' ],
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ]
      },
      target: {
        files: [ 'src/**/*' ],
        tasks: [ 'default' ]
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', [ 'build' ] );
  grunt.registerTask('build', [ 'clean', 'jshint', 'less' ] );

};
