/*global describe, beforeEach, it, inject, expect*/

(function () {
  'use strict';

  describe('services', function(){
    var $httpBackend, scope;

    beforeEach(module('smuPortFolio.services'));

    beforeEach(inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
    }));

    describe('smuPFApi', function(){
      var api;

      beforeEach(inject(function(smuPFApi) {
        api = smuPFApi;
      }));

      describe('students', function(){
        var students;

        beforeEach(function(){
          students = [
            {fullName: 'Alice Smith', id: 'X2010200001', photo: 'http://placehold.it/300x400'},
            {fullName: 'Bob Taylor', id: 'X2010200002', photo: 'http://placehold.it/300x400'},
          ];
        });

        it('should get list of student details', function() {
          var data;

          $httpBackend.expectGET('/api/v1/students.json').respond(students);

          api.all('students').getList().then(function(resp){
            data = resp;
          });

          $httpBackend.flush();

          expect(data[0].fullName).toBe('Alice Smith');
          expect(data[0].id).toBe('X2010200001');
          expect(data[0].photo).toBe('http://placehold.it/300x400');
          expect(data[1].fullName).toBe('Bob Taylor');
          expect(data[1].id).toBe('X2010200002');
          expect(data[1].photo).toBe('http://placehold.it/300x400');
        });

      });

    });
  
  });

})();
