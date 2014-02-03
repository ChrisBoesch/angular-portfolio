(function(){
  'use strict';

  angular.module('smuPortFolio.config', []).
    
    constant('SMU_PL_TPL_PATH', 'partials/smuPortFolio').
    constant('SMU_PL_API_BASE', '/api/v1')

    ;
  
})();
;angular.module('templates-main', ['partials/smuPortFolio/evaluation.html', 'partials/smuPortFolio/exam.html', 'partials/smuPortFolio/home.html', 'partials/smuPortFolio/portfolio.html']);

angular.module("partials/smuPortFolio/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/evaluation.html",
    "TODO");
}]);

angular.module("partials/smuPortFolio/exam.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/exam.html",
    "TODO");
}]);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<h1>Students</h1>\n" +
    "<ul>\n" +
    "  <li ng-repeat=\"student in students\">\n" +
    "    <a ng-href=\"#/portfolio/{{student.id}}\">{{student.fullName}}</a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("partials/smuPortFolio/portfolio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/portfolio.html",
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-8\">\n" +
    "    <div class=\"page-header\">\n" +
    "      <h1>The Title Goes Here</h1>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4 side-bar\">\n" +
    "    <img src=\"http://placehold.it/300x100&text=logo\" alt=\"logo\" class=\"img-thumbnail\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-8\">\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "      <div class=\"col-md-6\">\n" +
    "        <p ng-if=\"!student.exams\">You have not taken part to any exam.</p>\n" +
    "        \n" +
    "        <div ng-repeat=\"(groupName, exams) in student.exams\">\n" +
    "          \n" +
    "          <h3 ng-bind=\"groupName\">Exam type</h3>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"exam in exams\">\n" +
    "              <a ng-href=\"#/portfolio/{{student.id}}/exam/{{exam.id}}\" ng-bind=\"exam.name\">No exam</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-md-6\">\n" +
    "        <p ng-if=\"!student.evaluations\">You have not taken part to any evaluation.</p>\n" +
    "\n" +
    "        <div ng-repeat=\"(groupName, evaluations) in student.evaluations\">\n" +
    "          \n" +
    "          <h3 ng-bind=\"groupName\">Evaluation type</h3>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"evaluation in evaluations\">\n" +
    "              <a ng-href=\"#/portfolio/{{student.id}}/evaluation/{{evaluation.id}}\" ng-bind=\"evaluation.name\">No evaluation</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "        \n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"col-md-4 side-bar\">\n" +
    "    \n" +
    "    <img ng-src=\"{{student.photo}}\" alt=\"student portrait\" class=\"img-thumbnail\"/>\n" +
    "    <h3>\n" +
    "      <span ng-bind=\"student.fullName\">Student name</span> \n" +
    "      <small ng-bind=\"student.matricule\">student matricule</small>\n" +
    "    </h3>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
;(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE);
        RestangularConfigurer.setRequestSuffix('.json');
      });
    }])
  
  ;
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.filters', []);
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.controllers', ['smuPortFolio.services']).
    
    /**
     * Should set:
     * 
     * - set a list of student
     * 
     */
    controller('SmuPFHomeCtrl', ['$scope', 'smuPFApi', function($scope, smuPFApi) {
      $scope.students = smuPFApi.all('students').getList().$object;
    }]).

    /**
     * Should set the student:
     *
     * - details
     * - nested list of exam results
     * - nested list of evaluations
     */
    controller('SmuPFPortfolioCtrl', ['$scope', '$routeParams', 'smuPFApi', function($scope, $routeParams, smuPFApi) {
      var studentId = $routeParams.studentId;

      $scope.student = smuPFApi.all('students').get(studentId).$object;
    }]).

    controller('SmuPFExamCtrl', [function(){}]).

    controller('SmuPFEvaluationCtrl', [function() {}])

    ;
  
})();
;(function(){
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
