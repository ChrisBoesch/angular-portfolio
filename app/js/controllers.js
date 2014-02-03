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
