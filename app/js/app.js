(function(){
  'use strict';

  angular.module('smuPortFolio', [
    'ngRoute',
    'smuPortFolio.config',
    'smuPortFolio.filters',
    'smuPortFolio.services',
    'smuPortFolio.directives',
    'smuPortFolio.controllers',
    'templates-main',
    'ui.bootstrap',
    'restangular'
  ]).

  config(['$routeProvider', 'SMU_PL_TPL_PATH', function($routeProvider, SMU_PL_TPL_PATH) {
    $routeProvider.when('/', {templateUrl: SMU_PL_TPL_PATH + '/home.html', controller: 'SmuPFHomeCtrl'});
    $routeProvider.when('/portfolio/:studentId', {templateUrl: SMU_PL_TPL_PATH + '/portfolio.html', controller: 'SmuPFPortfolioCtrl'});
    $routeProvider.when('/portfolio/:studentId/exam/:examId', {templateUrl: SMU_PL_TPL_PATH + '/exam.html', controller: 'SmuPFExamCtrl'});
    $routeProvider.when('/portfolio/:studentId/evaluation/:evaluationId', {templateUrl: SMU_PL_TPL_PATH + '/evaluation.html', controller: 'SmuPFEvaluationCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
  
})();
