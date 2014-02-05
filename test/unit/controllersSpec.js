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

    
    describe('SmuPFEvaluationCtrl', function(){
      var httpBackend, results;

      beforeEach(inject(function($controller, $rootScope, _$httpBackend_){
        scope = $rootScope.$new();
        scope.page = {};
        httpBackend = _$httpBackend_;
        results = {
          "student": {
            "id": 1
          },
          "groupName": "TBD Evaluations",
          "name": "Evaluation 1",
          "id": 1,
          "data": [
            {
              "name": "History Taking Skills",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.5268168936017901,
                  "mean": 0.1916148867458105
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.1289110267534852,
                  "mean": 0.9300329736433923
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.6935996015090495,
                  "mean": 0.07018861337564886
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.08605310507118702,
                  "mean": 0.3072892427444458
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.44993431703187525,
                  "mean": 0.9569643563590944
                }
              ]
            },
            {
              "name": "Physical Examination Skills",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.8831050903536379,
                  "mean": 0.47146357130259275
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.7712152989115566,
                  "mean": 0.4178096242249012
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.6741840564645827,
                  "mean": 0.6119645915459841
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.4306478127837181,
                  "mean": 0.8177181016653776
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.7735878764651716,
                  "mean": 0.5926235148217529
                }
              ]
            },
            {
              "name": "Analytical Skills",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.18855467066168785,
                  "mean": 0.03392917872406542
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.017404031241312623,
                  "mean": 0.00808137864805758
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.3632864817045629,
                  "mean": 0.5723525115754455
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.0293243988417089,
                  "mean": 0.15286723151803017
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.7776265763677657,
                  "mean": 0.9470766375306994
                }
              ]
            },
            {
              "name": "Communication Skills",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.18130489718168974,
                  "mean": 0.412641289178282
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.12782692187465727,
                  "mean": 0.4739603460766375
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.7757244082167745,
                  "mean": 0.11390866409055889
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.5907814330421388,
                  "mean": 0.19722597114741802
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.4053937636781484,
                  "mean": 0.9000865023117512
                }
              ]
            },
            {
              "name": "Medical Knowledge",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.6485809586010873,
                  "mean": 0.5314977073576301
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.6974104284308851,
                  "mean": 0.7347326630260795
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.9235866591334343,
                  "mean": 0.9897217385005206
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.1619907096028328,
                  "mean": 0.06087519787251949
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.9947495649103075,
                  "mean": 0.2362806722521782
                }
              ]
            },
            {
              "name": "Management Skills",
              "data": [
                {
                  "name": "Do Not Meet",
                  "student": 0.3070675090420991,
                  "mean": 0.5185722378082573
                },
                {
                  "name": "Occasionally Meet",
                  "student": 0.06571229896508157,
                  "mean": 0.760105145862326
                },
                {
                  "name": "Consistently Meet",
                  "student": 0.4603277218993753,
                  "mean": 0.8228615904226899
                },
                {
                  "name": "Occasionally Exceeds",
                  "student": 0.30316847562789917,
                  "mean": 0.6758687177207321
                },
                {
                  "name": "Consistently Exceeds",
                  "student": 0.3203497277572751,
                  "mean": 0.5905426887329668
                }
              ]
            }
          ]
        };

        ctrl = $controller('SmuPFEvaluationCtrl', {
          $scope: scope,
          $routeParams: {
            'studentId': 2,
            'evaluationId': 10,
          }
        });
      }));

      it('should query the exam result for the student', function() {
        httpBackend.expectGET('/api/v1/students/2/evaluations/10.json').respond(results);
        httpBackend.flush();
      });
    });
  });
})();
