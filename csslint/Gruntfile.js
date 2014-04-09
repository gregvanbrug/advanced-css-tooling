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
    // Pre-PreProcessor
    less_imports: {
      styles: {
        files: {
          'target/less/<%= pkg.name %>.less': [
            'src/less/variables/*.less',
            'src/less/mixins/*.less',
            'src/less/global/*.less',
            'src/less/extends/*.less',
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
    // Lint
    csslint: {
      styles: {
        options: {
          csslintrc: '../.csslintrc'
        },
        src: [ 'target/<%= meta.css %>/<%= pkg.name %>.css' ]
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
  grunt.registerTask('build', [ 'clean', 'jshint', 'less_imports', 'less', 'csslint' ] );

};
