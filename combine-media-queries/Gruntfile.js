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
    copy: {
      demo: {
        files: [
          { expand: true, cwd: 'src', dest: 'target/www', src: ['*.html'] },
          { expand: true, cwd: 'src/images', dest: 'target/<%= meta.assets %>/images', src: [ '**/*' ]},
          { expand: true, cwd: 'src/fonts/inconsolata/fonts', dest: 'target/<%= meta.assets %>/fonts', src: [ '**/*' ]},
        ]
      }
    },
    // Pre-PreProcessor
    less_imports: {
      styles: {
        files: {
          'target/less/<%= pkg.name %>.less': [
            'bower_components/normalize-css/normalize.css',
            'src/fonts/**/less/*.less',
            'src/less/variables/*.less',
            'src/less/mixins/*.less',
            'src/less/global/*.less',
            'src/components/**/less/*.less',
            'src/templates/**/less/*.less',
          ]
        }
      }
    },
    // PreProcessor
    less: {
      styles: {
        options: {
          compile: true
        },
        dest: 'target/<%= meta.css %>/<%= pkg.name %>.css',
        src: [ 'target/less/<%= pkg.name %>.less' ]
      }
    },
    cmq: {
      options:  {
        log: false
      },
      files: {
        src: 'target/<%= meta.css %>/<%= pkg.name %>.css',
        dest: 'target/<%= meta.css %>/<%= pkg.name %>.css'
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

  grunt.registerTask('build', [ 'clean', 'jshint', 'copy', 'less_imports', 'less', 'cmq' ] );

};
