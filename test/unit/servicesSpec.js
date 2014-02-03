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
        var students, alice;

        beforeEach(function(){
          students = [
            {fullName: 'Alice Smith', id: 1, matricule: 'X2010200001', photo: 'http://placehold.it/300x400'},
            {fullName: 'Bob Taylor', id: 2, matricule: 'X2010200002', photo: 'http://placehold.it/300x400'},
          ];
          alice = {
            "fullName": "Alice Smith",
            "id": 1,
            "matricule": "X2010200001",
            "photo": "http://placehold.it/300x400&text=portrait",
            "exams": {
              "Some Exam Preparation": [
                {
                  "name": "External Exam 1",
                  "id": 1
                },
                {
                  "name": "External Exam 2",
                  "id": 2
                }
              ],
              "Another Exam Preparation": [
                {
                  "name": "Another Data Results 1",
                  "id": 5
                },
                {
                  "name": "Another Data Results 2",
                  "id": 6
                }
              ]
            },
            "evaluations": {
              "TBD Evaluations": [
                {
                  "name": "Evaluation 1",
                  "id": 1
                },
                {
                  "name": "Evaluation 2",
                  "id": 2
                }
              ]
            }
          };
        });

        it('should get list of student details', function() {
          var data;

          $httpBackend.expectGET('/api/v1/students.json').respond(students);

          api.all('students').getList().then(function(resp){
            data = resp;
          });

          $httpBackend.flush();

          expect(data[0].id).toBe(1);
          expect(data[0].fullName).toBe('Alice Smith');
          expect(data[0].matricule).toBe('X2010200001');
          expect(data[1].id).toBe(2);
          expect(data[1].fullName).toBe('Bob Taylor');
          expect(data[1].matricule).toBe('X2010200002');
        });

        it('should get the details of one student', function(){
          var data;

          $httpBackend.expectGET('/api/v1/students/1.json').respond(alice);

          api.all('students').get(1).then(function(resp){
            data = resp;
          });

          $httpBackend.flush();

          expect(data.id).toBe(1);
          expect(data.fullName).toBe('Alice Smith');
          expect(data.matricule).toBe('X2010200001');

        });

      });

    });
  
  });

})();
