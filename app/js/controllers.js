(function() {
  'use strict';

  angular.module('smuPortFolio.controllers', ['smuPortFolio.services', 'scceUser.services', 'scceSvg.directives']).

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

})();