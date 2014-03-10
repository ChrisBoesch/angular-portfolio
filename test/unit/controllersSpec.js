/*global describe, beforeEach, it, inject, expect*/

(function () {
  'use strict';

  describe('controllers', function(){
    var ctrl, scope;

    beforeEach(module('smuPortFolio.controllers'));


    describe('SmuPFHomeCtrl', function(){
      var getList, route;

      beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        getList = $q.defer();
        getList.promise.$object = [];
        scope.page = {};

        ctrl = $controller('SmuPFHomeCtrl', {
          $scope: scope,
          smuPFApi: {
            'all': function(r) {
              route = r;
              return {
                'getList': function(){
                  return getList.promise;
                }
              };
            }
          }
        });

      }));

      it('should set the student', function() {
        expect(route).toBe('students');
        expect(scope.students).toEqual([]);
      });

    });

    describe('SmuPFPortfolioCtrl', function(){
      var get, route, id;

      beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        get = $q.defer();
        get.promise.$object = [];
        scope.page = {};

        ctrl = $controller('SmuPFPortfolioCtrl', {
          $scope: scope,
          $routeParams: {
            'studentId': 1
          },
          smuPFPortfolioApi: {
            'all': function(r) {
              route = r;
              return {
                'get': function(i) {
                  id = i;
                  return get.promise;
                }
              };
            }
          }
        });

      }));

      it('should set the greeting', function() {
        expect(route).toBe('students');
        expect(id).toBe(1);
        expect(scope.portfolio).toEqual([]);
      });

    });


    describe('SmuPFExamCtrl', function(){
      var httpBackend, results;

      beforeEach(inject(function($controller, $rootScope, _$httpBackend_){
        scope = $rootScope.$new();
        scope.page = {};
        httpBackend = _$httpBackend_;
        results = {
          "id": "10",
          "name": "CP 2",
          "serie": {
            "id": "s1",
            "name": "Performance Exams"
          },
          "results": {
            "t1": {
              "topic": {
                "name": "Bahvioral Sciences",
                "id": "t1"
              },
              "data": {
                "min": -1.6183654441963882,
                "max": 0.6080622356384993,
                "mean": -0.11444422187155445
              }
            },
            "t2": {
              "topic": {
                "id": "t2",
                "name": "Biochemitry"
              },
              "data": {
                "min": -1.007976780482568,
                "max": 0.7360302161425352,
                "mean": -0.2466772289259196
              }
            }
          }
        };

        ctrl = $controller('SmuPFExamCtrl', {
          $scope: scope,
          $routeParams: {
            'studentId': 2,
            'examId': 10,
          }
        });
      }));

      it('should query the exam result for the student', function() {
        httpBackend.expectGET('/api/v1/portfolio/students/2/exams/10').respond(results);
        httpBackend.flush();
      });
    });


    describe('SmuPFEvaluationCtrl', function(){
      var httpBackend, results;

      beforeEach(inject(function($controller, $rootScope, _$httpBackend_){
        scope = $rootScope.$new();
        scope.page = {};
        httpBackend = _$httpBackend_;
        results = {}; // TODO: update with new schema

        ctrl = $controller('SmuPFEvaluationCtrl', {
          $scope: scope,
          $routeParams: {
            'studentId': 2,
            'evaluationId': 10,
          }
        });
      }));

      it('should query the exam result for the student', function() {
        httpBackend.expectGET('/api/v1/portfolio/students/2/evaluations/10').respond(results);
        httpBackend.flush();
      });
    });
  });
})();
