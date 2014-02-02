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
        expect(scope.students).toBe(getList.$object);
      });

    });
  
  
  });

})();
