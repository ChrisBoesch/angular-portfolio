(function(){
  'use strict';

  angular.module('smuPortFolio.controllers', ['smuPortFolio.services']).

    /**
     * Should fetch login info and update scope.log with it
     */
    controller('smuPFLoginInfoCtrl', ['$scope', 'smuPFUser', '$window', function($scope, smuPFUser, window) {
      $scope.log = {isLoggedIn: null};
      smuPFUser().then(function(data) {
        window.jQuery.extend($scope.log, data);
        return data;
      });
    }]).

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
    controller('SmuPFPortfolioCtrl', ['$scope', '$routeParams', 'smuPFPortfolioApi', function($scope, $routeParams, api) {
      var studentId = $routeParams.studentId;

      $scope.page.title = "Results and Evaluations";
      $scope.portfolio = api.all('students').get(studentId).$object;
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
      'SmuPFExamCtrl', ['$scope', '$window', '$routeParams', 'smuPFPortfolioApi', 'smuPFSvgLayout', function($scope, window, params, api, layout) {
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
        Object.keys(resp.results).forEach(function(topicId) {
          $scope.yScale(resp.results[topicId].topic.name);
        });
        $scope.yScale = $scope.yScale.rangePoints([$scope.layout.innerHeight, 0], 1);
      });

    }]).

    controller('SmuPFEvaluationCtrl', ['$scope', '$routeParams', 'smuPFPortfolioApi', function($scope, params, api) {
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
