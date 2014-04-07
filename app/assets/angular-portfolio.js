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
    "<h4>{{data.topic.name}}</h4>\n" +
    "<smupf-svg-container>\n" +
    "  <svg smupf-viewbox=\"layout\">\n" +
    "\n" +
    "    <g class=\"rulers\">\n" +
    "      <line ng-repeat=\"v in yAxisScale.ticks(10)\"\n" +
    "        ng-if=\"!$first\"\n" +
    "        ng-attr-transform=\"translate(0,{{yAxisScale(v)}})\"\n" +
    "        ng-attr-x2=\"{{layout.innerWidth}}\"\n" +
    "      />\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"chart\">\n" +
    "      <g class=\"series\" ng-repeat=\"series in data.data\" ng-attr-transform=\"translate({{xScale(series.name)}},0)\">\n" +
    "        <rect ng-repeat=\"field in xSubScale.domain()\"\n" +
    "          ng-class=\"translate(field)|dash\"\n" +
    "          ng-attr-x=\"{{xSubScale(field)}}\"\n" +
    "          ng-attr-y=\"{{layout.innerHeight-yScale(series[field])}}\"\n" +
    "          ng-attr-width=\"{{xSubScale.rangeBand()}}\"\n" +
    "          ng-attr-height=\"{{yScale(series[field])}}\"\n" +
    "        />\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"axis x-axis\" ng-attr-transform=\"translate(0, {{layout.innerHeight}})\">\n" +
    "      <line ng-attr-x2=\"{{layout.innerWidth}}\"/>\n" +
    "      <g class=\"tick\" ng-repeat=\"name in xScale.domain()\" ng-attr-transform=\"translate({{xScale(name)}},0)\">\n" +
    "        <line y2=\"7\" ng-attr-transform=\"translate({{xScale.rangeBand()}},0)\"/>\n" +
    "        <text ng-attr-x=\"{{xScale.rangeBand()/2}}\" dy=\"10\">{{name}}</text>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"legend\"\n" +
    "      ng-repeat=\"name in legendScale.domain()\"\n" +
    "      ng-attr-transform=\"translate({{legendScale(name)}},{{layout.height}})\"\n" +
    "    >\n" +
    "      <rect ng-class=\"translate(name)|dash\" y=\"-2em\" width=\"1em\" height=\"1em\"/>\n" +
    "      <text y=\"-1.5em\" x=\"2em\">{{translate(name)}}</text>\n" +
    "    </g>\n" +
    "\n" +
    "    <g class=\"axis y-axis\">\n" +
    "      <line ng-attr-y2=\"{{layout.innerHeight}}\"/>\n" +
    "      <g class=\"tick\" ng-repeat=\"v in yAxisScale.ticks(10)\" ng-attr-transform=\"translate(0,{{yAxisScale(v)}})\">\n" +
    "        <line x2=\"-7\"/>\n" +
    "        <text dx=\"-12\">{{v|percent}}</text>\n" +
    "      </g>\n" +
    "    </g>\n" +
    "\n" +
    "  </svg>\n" +
    "</smupf-svg-container>");
}]);

angular.module("partials/smuPortFolio/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/evaluation.html",
    "<div class=\"col-md-12 evaluation\">\n" +
    "  <div class=\"row \">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"(_, topic) in evaluation.results\">\n" +
    "      <smupf-bars smupf-data=\"topic\" ng-if=\"$index < 3\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-4\" ng-repeat=\"(_, topic) in evaluation.results\">\n" +
    "      <smupf-bars smupf-data=\"topic\" ng-if=\"$index >= 3 && $index < 6\"></smupfBars>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/exam.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/exam.html",
    "<div class=\"col-md-8\">\n" +
    "  <smupf-svg-container>\n" +
    "    <svg smupf-viewbox=\"layout\">\n" +
    "\n" +
    "      <g class=\"chart\">\n" +
    "        <rect class=\"border\" ng-attr-width=\"{{layout.innerWidth}}\" ng-attr-height=\"{{layout.innerHeight}}\"/>\n" +
    "        <line class=\"mean\" ng-attr-transform=\"translate({{layout.innerWidth/2}},0)\" ng-attr-y2=\"{{layout.innerHeight}}\"/>\n" +
    "\n" +
    "        <g class=\"results\" ng-repeat=\"(_, r) in exam.results\" ng-attr-transform=\"translate(0,{{yScale(r.topic.name)}})\">\n" +
    "          <text ng-attr-transform=\"translate({{-layout.margin.left+10}},0)\">\n" +
    "            {{r.topic.name}}\n" +
    "          </text>\n" +
    "          <line ng-attr-x1=\"{{xScale(r.data.min)}}\" ng-attr-x2=\"{{xScale(r.data.max)}}\"/>\n" +
    "          <line class=\"min\" ng-attr-transform=\"translate({{xScale(r.data.min)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "          <line class=\"max\" ng-attr-transform=\"translate({{xScale(r.data.max)}})\" y1=\"-5\" y2=\"5\"/>\n" +
    "          <rect ng-attr-transform=\"translate({{xScale(r.data.mean)-4}},-4)\" width=\"8\" height=\"8\"/>\n" +
    "        </g>\n" +
    "      </g>\n" +
    "\n" +
    "      <g class=\"axis x-axis\" ng-attr-transform=\"translate(0,{{layout.innerHeight}})\">\n" +
    "        <line ng-attr-x2=\"{{layout.innerWidth}}\"/>\n" +
    "        <g class=\"tick\" ng-repeat=\"t in ticks\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "          <line y2=\"5\"/>\n" +
    "        </g>\n" +
    "        <g class=\"main-tick\" ng-repeat=\"t in [-2, -1, 0, 1, 2]\" ng-attr-transform=\"translate({{xScale(t)}},0)\">\n" +
    "          <line y1=\"5\" y2=\"8\"/>\n" +
    "          <text dy=\"12\">{{t}}</text>\n" +
    "        </g>\n" +
    "      </g>\n" +
    "\n" +
    "    </svg>\n" +
    "  </smupf-svg-container>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4\">\n" +
    "  <h3>Interpretation</h3>\n" +
    "  <p>\n" +
    "    This graph provides information about your performance relative to the\n" +
    "    performance of all other students on each topic.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The green line represents the mean percentage of questions that all students\n" +
    "    have answered correctly on this topic, over time (not necessarily the same\n" +
    "    questions that you have answered on each topic).\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    The red box is your mean score, and the hatch marks represent the standard\n" +
    "    deviation of your scores.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    By comparing the red boxes, you can determine the disciplines and organ\n" +
    "    systems in which your performance is relatively weak or strong.\n" +
    "  </p>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/home.html",
    "<div class=\"col-md-12\">\n" +
    "  <p ng-if=\"loading\" class=\"alert alert-info\">Loading student's portfololio list...</p>\n" +
    "  <p ng-if=\"loadingError\" class=\"alert alert-danger\" ng-bind=\"loadingError\"></p>\n" +
    "  \n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"student in students\">\n" +
    "      <a ng-href=\"#/portfolio/{{student.id}}\">{{student.firstName}} {{student.lastName}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module("partials/smuPortFolio/portfolio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/smuPortFolio/portfolio.html",
    "<div class=\"col-md-12\">\n" +
    "  <p ng-if=\"loading\" class=\"alert alert-info\">Loading student's portfololio list...</p>\n" +
    "  <p ng-if=\"loadingError\" class=\"alert alert-danger\" ng-bind=\"loadingError\"></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-8\" ng-if=\"portfolioLoaded\">\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"portfolio.examSeries|isEmpty\">You have not taken part to any exam.</p>\n" +
    "\n" +
    "      <div ng-repeat=\"(_, series) in portfolio.examSeries\">\n" +
    "\n" +
    "        <h3 ng-bind=\"series.name\">Exam type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"(_, exam) in series.exams\">\n" +
    "            <a ng-href=\"#/portfolio/{{portfolio.id}}/exam/{{exam.id}}\" ng-bind=\"exam.name\">No exam</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <p ng-if=\"portfolio.evaluationSeries|isEmpty\">You have not taken part to any evaluation.</p>\n" +
    "\n" +
    "      <div ng-repeat=\"(_, series) in portfolio.evaluationSeries\">\n" +
    "\n" +
    "        <h3 ng-bind=\"series.name\">Evaluation type</h3>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"(_, evaluation) in series.evaluations\">\n" +
    "            <a ng-href=\"#/portfolio/{{portfolio.id}}/evaluation/{{evaluation.id}}\" ng-bind=\"evaluation.name\">No evaluation</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-4 side-bar\" ng-if=\"portfolioLoaded\">\n" +
    "\n" +
    "  <img ng-src=\"{{portfolio.student.photo}}\" alt=\"student portrait\" class=\"img-thumbnail\"/>\n" +
    "  <h3>\n" +
    "    <span ng-bind=\"portfolio.student.firstName\">Student first name</span>\n" +
    "    <span ng-bind=\"portfolio.student.lastName\">Student last name</span>\n" +
    "    <small ng-bind=\"portfolio.student.id\">student studentId</small>\n" +
    "  </h3>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
;(function(){
  'use strict';

  angular.module('smuPortFolio.directives', []).

    directive('smupfSvgContainer', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope){

          $scope.container = {
            'display': 'inline-block',
            'position': 'relative',
            'width': '100%',
            'padding-bottom': '100%',
            'vertical-align': 'middle',
            'overflow': 'hidden'
          };

          this.setRatio = function(ratio) {
            console.log(ratio);
            $scope.container['padding-bottom'] = (ratio * 100) + '%';
          };

        },
        template: '<div ng-transclude ng-style="container"></div>',
        link: function(scope, element) {
          element.find('svg').css({
            'display': 'inline-block',
            'position': 'absolute',
            'top': '0',
            'left': '0'
          });
        }
      };
    }).


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
        require: '?^smupfSvgContainer',
        scope: {
          'viewBox': '=?smupfViewbox'
        },
        link: function(scope, element, attrs, containerCtrl) {

          element.get(0).setAttribute('preserveAspectRatio', 'xMinYMin meet');

          scope.$watch('viewBox', function(){
            var vb = scope.viewBox;

            element.get(0).setAttribute(
              'viewBox',
              [-vb.margin.left, -vb.margin.top, vb.width, vb.height].join(' ')
            );

            if (containerCtrl && containerCtrl.setRatio) {
              containerCtrl.setRatio(vb.height / vb.width);
            }

          });
        }
      };
    }).

    directive('smupfBars', ['SMU_PL_TPL_PATH', 'smuPFSvgLayout', '$window', function(path, layout, window) {
          return {
            restrict: 'E',
            'templateUrl': path + '/charts/bars.html',
            scope: {
              'data': '=smupfData',
              'width': '&smupfWidth',
              'height': '&smupfHeight'
            },
            link: function(scope) {
              var onDataChange, d3 = window.d3;

              scope.layout = layout(
                {top: 10, right: 10, bottom:70, left: 60},
                scope.width(),
                scope.height()
              );

              onDataChange = function() {
                if (!scope.data) {
                  return;
                }

                scope.xScale = d3.scale.ordinal();
                scope.xSubScale = d3.scale.ordinal();
                scope.yScale = d3.scale.linear();

                // set domains
                scope.data.data.forEach(function(type){
                  scope.xScale(type.name);
                });
                scope.xSubScale = scope.xSubScale.domain(['value', 'mean']);
                scope.yScale = scope.yScale.domain([0, 1]);

                // set ranges
                scope.xScale = scope.xScale.rangeBands([0, scope.layout.innerWidth], 0, 0);
                scope.xSubScale = scope.xSubScale.rangeBands(
                  [0, scope.layout.innerWidth/scope.xScale.domain().length], 0, 1)
                ;
                scope.legendScale = scope.xSubScale.copy().rangeBands([0, scope.layout.innerWidth], 0.1, 1);
                scope.yScale = scope.yScale.range([0, scope.layout.innerHeight]).nice();
                scope.yAxisScale = scope.yScale.copy().range([scope.layout.innerHeight, 0]).nice();

                // Translate legend name
                scope.translate = function(fieldName) {
                  var t = {'value': 'You', 'mean': 'All others'};
                  return t[fieldName] ? t[fieldName] : fieldName;
                };
              };

              scope.$watch('data', onDataChange);
            }
          };
        }])

  ;

})();
;(function(){
  'use strict';

  var interceptor = function(data, operation, what) {
    var resp;

    if (operation === "getList") {
      resp = data[what] ? data[what] : [];
      resp.cursor = data.cursor ? data.cursor : null;
    } else {
      resp = data;
    }
    return resp;
  };

  angular.module('smuPortFolio.services', ['smuPortFolio.config', 'restangular']).

    factory('smuPFApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE);
        RestangularConfigurer.addResponseInterceptor(interceptor);
      });
    }]).

    factory('smuPFPortfolioApi', ['SMU_PL_API_BASE', 'Restangular', function(SMU_PL_API_BASE, Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SMU_PL_API_BASE + '/portfolio');
        RestangularConfigurer.addResponseInterceptor(interceptor);
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

  angular.module('smuPortFolio.filters', []).

    filter('percent',  ['$window', function(window){
      var d3 = window.d3,
        formatter = d3.format(".00%");

      return function(v) {
        return formatter(v);
      };
    }]).


    filter('dash', function(){
      return function(v) {
        return v.replace(' ', '-');
      };
    }).


    filter('isEmpty', function(){
      return function(o){
        return !o || Object.keys(o).length === 0;
      };
    });


})();
;(function() {
  'use strict';

  angular.module('smuPortFolio.controllers', ['smuPortFolio.services', 'scceUser.services']).

  /**
   * Should fetch login info and update scope.log with it
   */
  controller('smuPFLoginInfoCtrl', ['$scope', 'scceCurrentUserApi',
    function($scope, scceCurrentUserApi) {
      $scope.user = scceCurrentUserApi;
      scceCurrentUserApi.auth();
    }
  ]).

  /**
   * Should set:
   *
   * - set a list of student
   *
   */
  controller('SmuPFHomeCtrl', ['$scope', 'smuPFApi',
    function($scope, smuPFApi) {
      var students = smuPFApi.all('students').getList();

      $scope.page.title = "students";
      $scope.page.parent = null;
      $scope.students = students.$object;
      $scope.loading = true;
      $scope.loadingError = "";

      students.
      catch (function(resp) {
        var code = resp.status,
          msgs = {
            401: "You need to log in to list the student's portfolios.",
            403: "Only member of the staffs can list the student's portfolios.",
            'default': "There was an error loading student's portfolios."
          };

        $scope.loadingError = msgs[code] ? msgs[code] : msgs['default'];

      })['finally'](function() {
        $scope.loading = false;
      });

    }
  ]).

  /**
   * Should set the student:
   *
   * - details
   * - nested list of exam results
   * - nested list of evaluations
   *
   */
  controller('SmuPFPortfolioCtrl', ['$scope', '$routeParams', 'scceCurrentUserApi', 'smuPFPortfolioApi',
    function($scope, $routeParams, userApi, api) {
      var studentId = $routeParams.studentId,
        portfolio = api.all('students').get(studentId);

      $scope.page.title = "Results and Evaluations";
      userApi.auth().then(function(user) {
        if (user.isAdmin || user.staffId) {
          $scope.page.parent = "#/";
        }
      });

      $scope.loading = true;
      $scope.portfolioLoaded = false;
      $scope.loadingError = "";
      $scope.portfolio = portfolio.$object;

      portfolio.then(function() {
        $scope.portfolioLoaded = true;
      }).
      catch (function(resp) {
        var code = resp.status,
          msgs = {
            401: "You need to log in to visit a portfolios.",
            403: "Only member of the staffs can visit someone else portfolios.",
            404: "The portfolio could not be found.",
            'default': "There was an error loading this portfolio."
          };

        $scope.loadingError = msgs[code] ? msgs[code] : msgs['default'];
      })['finally'](function() {
        $scope.loading = false;
      });
    }
  ]).

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
    'SmuPFExamCtrl', ['$scope', '$window', '$routeParams', 'smuPFPortfolioApi', 'smuPFSvgLayout',
      function($scope, window, params, api, layout) {
        var studentId = params.studentId,
          examId = params.examId,
          exam = api.one('students', studentId).all('exams').get(examId),
          d3 = window.d3,
          _ = window._;

        $scope.exam = exam.$object;
        $scope.layout = layout({
          top: 10,
          right: 10,
          bottom: 30,
          left: 300
        });
        $scope.xScale = d3.scale.linear().
        domain([-2, 2]).
        range([0, $scope.layout.innerWidth]);
        $scope.ticks = _.range(-20, 21).map(function(x) {
          return x / 10;
        });
        $scope.yScale = d3.scale.ordinal();

        $scope.page.parent = '#/portfolio/' + studentId;
        exam.then(function(resp) {
          $scope.page.title = resp.name;
          
          Object.keys(resp.results).forEach(function(topicId) {
            $scope.yScale(resp.results[topicId].topic.name);
          });
          $scope.yScale = $scope.yScale.rangePoints([$scope.layout.innerHeight, 0], 1);
        });

      }
    ]).

  controller('SmuPFEvaluationCtrl', ['$scope', '$routeParams', 'smuPFPortfolioApi',
    function($scope, params, api) {
      var studentId = params.studentId,
        evaluationId = params.evaluationId,
        evaluation = api.one('students', studentId).all('evaluations').get(evaluationId);

      $scope.page.parent = '#/portfolio/' + studentId;
      $scope.evaluation = evaluation.$object;
      evaluation.then(function(resp) {
        $scope.page.title = resp.name;
      });
    }
  ])

  ;

})();;(function(){
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
