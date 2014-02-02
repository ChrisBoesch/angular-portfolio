/*global describe, beforeEach, it, inject, expect*/

(function () {
  'use strict';

  describe('controllers', function(){
    var ctrl, scope;

    beforeEach(module('smuPortFolio.controllers'));

    describe('SmuPFHomeCtrl', function(){

      beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        ctrl = $controller('SmuPFHomeCtrl', {
          $scope: scope
        });

      }));

      it('should set the greeting', function() {
        expect(scope.greeting).toBe('Hello world!');
      });

    });
  
  });

})();
