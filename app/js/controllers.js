(function(){
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
        examId = params.studentId,
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

    controller('SmuPFEvaluationCtrl', [function() {}])

    ;
  
})();
