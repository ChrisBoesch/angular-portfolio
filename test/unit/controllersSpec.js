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
        getList.$object = [];
        scope.page = {};

        ctrl = $controller('SmuPFHomeCtrl', {
          $scope: scope,
          smuPFApi: {
            'all': function(r) {
              route = r;
              return {
                'getList': function(){
                  return getList;
                }
              };
            }
          }
        });

      }));

      it('should set the student', function() {
        expect(route).toBe('students');
        expect(scope.students).toBe(getList.$object);
      });

    });

    describe('SmuPFPortfolioCtrl', function(){
      var get, route, id;

      beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        get = $q.defer();
        get.$object = [];
        scope.page = {};

        ctrl = $controller('SmuPFPortfolioCtrl', {
          $scope: scope,
          $routeParams: {
            'studentId': 1
          },
          smuPFApi: {
            'all': function(r) {
              route = r;
              return {
                'get': function(i) {
                  id = i;
                  return get;
                }
              };
            }
          }
        });

      }));

      it('should set the greeting', function() {
        expect(route).toBe('students');
        expect(id).toBe(1);
        expect(scope.student).toBe(get.$object);
      });

    });

    describe('SmuPFExamCtrl', function(){
      var httpBackend, results;

      beforeEach(inject(function($controller, $rootScope, _$httpBackend_){
        scope = $rootScope.$new();
        scope.page = {};
        httpBackend = _$httpBackend_;
        results = {
          "student": {
            "id": 2
          },
          "groupName": "Performance Exams",
          "name": "CP 2",
          "id": 10,
          "data": [
            {
              "name": "Bahvioral Sciences",
              "min": -1.6183654441963882,
              "max": 0.6080622356384993,
              "student": -0.11444422187155445
            },
            {
              "name": "Biochemitry",
              "min": -1.007976780482568,
              "max": 0.7360302161425352,
              "student": -0.2466772289259196
            }
          ]
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
        httpBackend.expectGET('/api/v1/students/2/exams/10.json').respond(results);
        httpBackend.flush();
      });
    });
  
  
  });

})();
