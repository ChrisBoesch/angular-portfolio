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

      it('should set the greeting', function() {
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
  
  
  });

})();
