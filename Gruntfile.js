module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    shell: {
      npm_install: {
        command: 'npm install'
      }
    },

    connect: {
      options: {
        base: 'app/'
      },
      devserver: {
        options: {
          hostname: '0.0.0.0',
          port: 8888,
          middleware: function(connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            // Setup the proxy
            middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        },
        proxies: [
          {
            context: '/api/v1',
            host: '0.0.0.0',
            port: 9090,
            rewrite: {
              '^/api/v1': ''
            }
          }
        ]
      },
      testserver: {
        options: {
          port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: 5555,
          keepalive: true
        }
      },
      screenshots: {
        options: {
          base: 'screenshots/',
          port: 5556,
          keepalive: true
        }
      }
    },

    express: {
      options: {
        // Override defaults here
      },
      api: {
        options: {
          script: 'api/server.js'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/js/*.js'
      ]
    },

    html2js: {
      options: {
        base: 'app'
      },
      main: {
        src: ['app/partials/**/*.html'],
        dest: 'app/js/templates.js'
      },
    },

    concat: {
      'app-styles': {
        dest: 'app/assets/angular-portfolio.css',
        src: [
          'app/css/app.css',
          'app/css/chart.css'
        ]
      },
      'dev-styles': {
        dest: 'app/assets/angular-portfolio-dep.css',
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/bootstrap/dist/css/bootstrap-theme.css'
        ]
      },
      'app-scripts': {
        options: {
          separator: ';'
        },
        dest: 'app/assets/angular-portfolio.js',
        src: [
          'app/js/config.js',
          'app/js/templates.js',
          'app/js/directives.js',
          'app/js/services.js',
          'app/js/filters.js',
          'app/js/controllers.js',
          'app/js/app.js'
        ]
      },
      'dep-scripts': {
        options: {
          separator: ';'
        },
        dest: './app/assets/angular-portfolio-dep.js',
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/dist/lodash.js',
          'bower_components/angular/angular.js',
          'bower_components/d3/d3.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/restangular/dist/restangular.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        nonull: true
      }

    },

    cssmin: {
      options: {},
      'all': {
        dest: 'app/assets/angular-portfolio-all.min.css',
        src: [
          'app/assets/angular-portfolio.css',
          'app/assets/angular-portfolio-dep.css',
          'app/css/app.css',
          'app/css/chart.css'
        ]
      }
    },

    uglify: {
      'app-scripts': {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        dest: 'app/assets/angular-portfolio-all.min.js',
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/dist/lodash.js',
          'bower_components/angular/angular.js',
          'bower_components/d3/d3.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/restangular/dist/restangular.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'app/js/config.js',
          'app/js/templates.js',
          'app/js/directives.js',
          'app/js/services.js',
          'app/js/filters.js',
          'app/js/controllers.js',
          'app/js/app.js'
        ],
        nonull: true
      }
    },

    copy: {
      fontAwesome: {
        src: 'bower_components/bootstrap/dist/fonts/*',
        dest: 'app/fonts/',
        expand: true,
        flatten: true
      }
    },

    watch: {
      options: {
        livereload: 7777
      },
      assets: {
        files: ['app/css/**/*.css', 'app/js/**/*.js'],
        tasks: ['concat', 'cssmin']
      },
      templates: {
        files: ['app/partials/**/*.html'],
        tasks: ['html2js', 'concat', 'cssmin']
      }
    },

    open: {
      devserver: {
        path: 'http://0.0.0.0:8888'
      },
      coverage: {
        path: 'http://0.0.0.0:5555'
      },
      screenshots: {
        path: 'http://0.0.0.0:5556'
      }
    },

    karma: {
      unit: {
        configFile: './config/karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './config/karma.conf.js',
        autoWatch: true,
        singleRun: false
      },
      e2e: {
        configFile: './config/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e_auto: {
        configFile: './config/karma-e2e.conf.js',
        autoWatch: true,
        singleRun: false
      },
      unit_coverage: {
        configFile: './config/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/js/*.js': ['coverage']
        },
        coverageReporter: {type: 'html', dir : 'coverage/'}
      },
      unit_coverage_shell: {
        configFile: './config/karma.phantomjs.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/js/*.js': ['coverage']
        },
        coverageReporter: {type: 'text', dir : 'coverage/'}
      }
    },

    autoshot: {
      default_options: {
        options: {
          path: 'screenshots/',
          viewport: ['1024x655'],
          local: false,
          remote: {
            files: [
              {src: 'http://0.0.0.0:8888/#/', dest: 'students.jpg'},
              {src: 'http://0.0.0.0:8888/#/portfolio/X2010200001', dest: 'portfolio.jpg'},
              {src: 'http://0.0.0.0:8888/#/portfolio/X2010200001/exam/1', dest: 'exam.jpg'},
              {src: 'http://0.0.0.0:8888/#/portfolio/X2010200001/evaluation/1', dest: 'evaluation.jpg'}
            ]
          }
        }
      }
    }
  });

  //single run tests
  grunt.registerTask('test', ['test:unit']);
  grunt.registerTask('test:unit', ['html2js', 'jshint', 'karma:unit']);
  grunt.registerTask('test:shell', ['html2js', 'jshint', 'karma:unit_coverage_shell']);

  //autotest and watch tests
  grunt.registerTask('autotest', ['autotest:unit']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);

  //coverage testing
  grunt.registerTask('test:coverage', ['karma:unit_coverage']);
  grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);

  //installation-related
  grunt.registerTask('build', ['build:dev', 'cssmin', 'uglify',]);
  grunt.registerTask('build:dev', ['shell:npm_install', 'html2js', 'concat', 'copy']);

  //defaults
  grunt.registerTask('default', ['dev']);

  //development
  grunt.registerTask(
    'server:dev',
    ['express:api', 'configureProxies:devserver', 'connect:devserver']
  );
  grunt.registerTask('dev', ['build:dev', 'server:dev', 'watch']);

  //screenshots
  grunt.registerTask(
    'screenshots',
    ['build:dev', 'server:dev', 'autoshot', 'connect:screenshots', 'open:screenshots']);
};
