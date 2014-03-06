module.exports = function(config){
  config.set({
    basePath : '../',

    files : [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/angular/angular.js',
      'bower_components/d3/d3.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/js/*.js',
      'test/unit/*.js'
    ],

    exclude : [],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
