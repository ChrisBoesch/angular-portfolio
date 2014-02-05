(function(){
  'use strict';

  angular.module('smuPortFolio.config', []).
    
    constant('SMU_PL_TPL_PATH', 'partials/smuPortFolio').
    constant('SMU_PL_API_BASE', '/api/v1')

    ;
  
})();
;angular.module('templates-main', ['partials/smuPortFolio/charts/bars.html', 'partials/smuPortFolio/evaluation.html', 'partials/smuPortFolio/exam.html', 'partials/smuPortFolio/home.html', 'partials/smuPortFolio/portfolio.html']);

angular.module("partials/smuPortFolio/charts/bars.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/charts/bars.html",
    "<h4>{{data.name}}</h4>\n" +
    "<svg>\n" +
    "  \n" +
    "</svg>");
}]);

angular.module("partials/smuPortFolio/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/evaluation.html",
    "<div class=\"col-md-12 evaluation\">\n" +
    "  <div class=\"row \">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"i in [0,1,2]\">\n" +
    "      <smupf-bars smupf-data=\"evaluation.data[i]\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"i in [3,4,5]\">\n" +
    "      <smupf-bars smupf-data=\"evaluation.data[i]\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/exam.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/exam.html",
    "<div class=\"col-md-8\">\n" +
    "  <svg smupf-viewbox=\"layout\">\n" +
    "    \n" +
    "    <g class=\"chart\">\n" +
    "      <rect class=\"border\" ng-attr-width=\"{{layout.innerWidth}}\" ng-attr-height=\"{{layout.innerHeight}}\"/>\n" +
    "      <line class=\"mean\" ng-attr-transform=\"translate({{layout.innerWidth/2}},0)\" ng-attr-y2=\"{{layout.innerHeight}}\"/>\n" +
    "\n" +
    "      <g class=\"results\" ng-repeat=\"r in exam.data\" ng-attr-transform=\"translate(0,{{yScale(r.name)}})\">\n" +
    "        <text ng-attr-transform=\"translate({{-layout.margin.left+10}},0)\">\n" +
    "          {{r.name}}\n" +
    "        </text>\n" +
    "        <line ng-attr-x1=\"{{xScale(r.min)}}\" ng-attr-x2=\"{{xScale(r.max)}}\"/>\n" +
    "        <line class=\"min\" ng-attr-transform=\"translate({{xScale(r.min)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "        <line class=\"max\" ng-attr-transform=\"translate({{xScale(r.max)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "        <rect ng-attr-transform=\"translate({{xScale(r.student)-4}},-4)\" width=\"8\" height=\"8\"/>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"axis x-axis\" ng-attr-transform=\"translate(0,{{layout.innerHeight}})\">\n" +
    "      <line ng-attr-x2=\"{{layout.innerWidth}}\"/>\n" +
    "      <g class=\"tick\" ng-repeat=\"t in ticks\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "        <line y2=\"5\"/>\n" +
    "      </g>\n" +
    "      <g class=\"main-tick\" ng-repeat=\"t in [-2, -1, 0, 1, 2]\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "        <line y1=\"5\" y2=\"8\"/>\n" +
    "        <text dy=\"12\">{{t}}</text>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "  </svg>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4\">\n" +
    "  <h3>Interpretation</h3>\n" +
    "  <p>\n" +
    "    This graph provides information about your performance relative to the \n" +
    "    performance of all other students on each topic.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The green line represents the mean percentage of questions that all students \n" +
    "    have answered correctly on this topic, over time (not necessarily the same \n" +
    "    questions that you have answered on each topic).\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The red box is your mean score, and the hatch marks represent the standard \n" +
    "    deviation of your scores.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    By comparing the red boxes, you can determine the disciplines and organ \n" +
    "    systems in which your performance is relatively weak or strong.\n" +
    "  </p>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<div class=\"col-md-12\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"student in students\">\n" +
    "      <a ng-href=\"#/portfolio/{{student.id}}\">{{student.fullName}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/portfolio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/portfolio.html",
    "<div class=\"col-md-8\">\n" +
    "  <div class=\"row\">\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"!student.exams\">You have not taken part to any exam.</p>\n" +
    "      \n" +
    "      <div ng-repeat=\"(groupName, exams) in student.exams\">\n" +
    "        \n" +
    "        <h3 ng-bind=\"groupName\">Exam type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"exam in exams\">\n" +
    "            <a ng-href=\"#/portfolio/{{student.id}}/exam/{{exam.id}}\" ng-bind=\"exam.name\">No exam</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"!student.evaluations\">You have not taken part to any evaluation.</p>\n" +
    "\n" +
    "      <div ng-repeat=\"(groupName, evaluations) in student.evaluations\">\n" +
    "        \n" +
    "        <h3 ng-bind=\"groupName\">Evaluation type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"evaluation in evaluations\">\n" +
    "            <a ng-href=\"#/portfolio/{{student.id}}/evaluation/{{evaluation.id}}\" ng-bind=\"evaluation.name\">No evaluation</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      \n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4 side-bar\">\n" +
    "  \n" +
    "  <img ng-src=\"{{student.photo}}\" alt=\"student portrait\" class=\"img-thumbnail\"/>\n" +
    "  <h3>\n" +
    "    <span ng-bind=\"student.fullName\">Student name</span> \n" +
    "    <small ng-bind=\"student.matricule\">student matricule</small>\n" +
    "  </h3>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
;(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []).

    /**
     * Directive to set the a `svga element `viewBox` attribute
     * from values from the scope.
     *
     * With:
     *  
     *  <svg ng-attr-viewBox="0 0 {{100}} {{100}}"/>
     *
     * Angular would produce the correct attribute but it would have no effect. 
     * This directive edit the viewBox.baseVal property directly.
     *
     * Usage:
     *
     *  <svg smu-pf-view-box="layout"/>
     *
     * where `$scope.layout == {width: 100, height: 100, margin:{top:10, left:20}}`
     *
     * TODO: should create package that scoreboard and portfolio can share.
     * 
     */
    directive('smupfViewbox', function(){
      return {
        scope: {
          'viewBox': '=?smupfViewbox'
        },
        link: function(scope, element) {
          
          element.get(0).setAttribute('preserveAspectRatio', 'xMinYMin meet');

          scope.$watch('viewBox', function(){
            var vb = scope.viewBox;

            element.get(0).setAttribute(
              'viewBox',
              [-vb.margin.left, -vb.margin.top, vb.width, vb.height].join(' ')
            );

          });
        }
      };
    }).

    directive('smupfBars', ['SMU_PL_TPL_PATH', function(path) {
          return {
            restrict: 'E',
            'templateUrl': path + '/charts/bars.html',
            scope: {
              'data': '=smupfData'
            }
          };
        }])

  ;
  
})();
;(function(){
  'use strict';

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE);
        RestangularConfigurer.setRequestSuffix('.json');
      });
    }]).

    factory('smuPFSvgLayout', [function() {
      return function(margin, width, height) {
        margin = margin || {top: 10, right: 10, bottom:10, left: 10};
        width = width || 600;
        height = height || 450;

        return {
          margin: margin,
          width: width,
          height: height,
          innerWidth: width - margin.right - margin.left,
          innerHeight: height - margin.top - margin.bottom
        };

      };
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
      $scope.page.title = "students";
      $scope.students = smuPFApi.all('students').getList().$object;
    }]).

    /**
     * Should set the student:
     *
     * - details
     * - nested list of exam results
     * - nested list of evaluations
     * 
     */
    controller('SmuPFPortfolioCtrl', ['$scope', '$routeParams', 'smuPFApi', function($scope, $routeParams, smuPFApi) {
      var studentId = $routeParams.studentId;

      $scope.page.title = "Results and Evaluations";
      $scope.student = smuPFApi.all('students').get(studentId).$object;
    }]).

    /**
     * Should set:
     * 
     * - the exam result.
     * - the svg layout.
     * - the scale.
     *
     * TODO: The last two would pobably be better in a directive.
     * 
     */
    controller(
      'SmuPFExamCtrl', ['$scope', '$window', '$routeParams', 'smuPFApi', 'smuPFSvgLayout', function($scope, window, params, api, layout) {
      var studentId = params.studentId,
        examId = params.examId,
        exam = api.one('students', studentId).all('exams').get(examId),
        d3 = window.d3,
        _ = window._;

      $scope.exam = exam.$object;
      $scope.layout = layout({top: 10, right: 10, bottom:30, left: 300});
      $scope.xScale = d3.scale.linear().
        domain([-2,2]).
        range([0, $scope.layout.innerWidth])
      ;
      $scope.ticks = _.range(-20,21).map(function(x){return x/10;});
      $scope.yScale = d3.scale.ordinal();

      exam.then(function(resp){
        $scope.page.title = resp.name;
        resp.data.forEach(function(result) {
          $scope.yScale(result.name);
        });
        $scope.yScale = $scope.yScale.rangePoints([$scope.layout.innerHeight, 0], 1);
      });

    }]).

    controller('SmuPFEvaluationCtrl', ['$scope', '$routeParams', 'smuPFApi', function($scope, params, api) {
      var studentId = params.studentId,
        evaluationId = params.evaluationId,
        evaluation = api.one('students', studentId).all('evaluations').get(evaluationId);

      $scope.evaluation = evaluation.$object;
      evaluation.then(function(resp){
        $scope.page.title = resp.name;
      });
    }])

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
