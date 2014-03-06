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

    describe('smuPFApi', function() {
      var api;

      beforeEach(inject(function(smuPFApi) {
        api = smuPFApi;
      }));

      describe('students', function() {
        var students;

        beforeEach(function() {
          students = {
            'students': [
              {fullName: 'Alice Smith', id: 1, matricule: 'X2010200001', photo: 'http://placehold.it/300x400'},
              {fullName: 'Bob Taylor', id: 2, matricule: 'X2010200002', photo: 'http://placehold.it/300x400'},
            ]
          };
        });

        it('should get list of student details', function() {
          var data;

          $httpBackend.expectGET('/api/v1/students').respond(students);

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
      });
    });


    describe('smuPFPortfolioApi', function(){
      var api;

      beforeEach(inject(function(smuPFPortfolioApi) {
        api = smuPFPortfolioApi;
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

        it('should get the details of one student', function(){
          var data;

          $httpBackend.expectGET('/api/v1/portfolio/students/1').respond(alice);

          api.all('students').get(1).then(function(resp){
            data = resp;
          });

          $httpBackend.flush();

          expect(data.id).toBe(1);
          expect(data.fullName).toBe('Alice Smith');
          expect(data.matricule).toBe('X2010200001');

        });

        it('should get a student exam', function(){
          var alice, aliceData, examData;

          $httpBackend.expectGET('/api/v1/portfolio/students/1').respond(alice);
          $httpBackend.expectGET('/api/v1/portfolio/students/1/exams/2').respond(alice);

          alice = api.one('students',1);
          alice.get().then(function(resp){
            aliceData = resp;
          });

          alice.all('exams').get(2).then(function(resp){
            examData = resp;
          });

          $httpBackend.flush();

        });

      });

    });

    describe('smuPFSvgLayout', function(){
      var layout;

      beforeEach(inject(function(smuPFSvgLayout) {
        layout = smuPFSvgLayout;
      }));

      it('should calculate innerWidth and innedHeight width default values', function() {
        expect(layout()).toEqual({
          margin: {top: 10, right: 10, bottom:10, left: 10},
          width: 600,
          height: 450,
          innerWidth: 580,
          innerHeight: 430
        });
      });

      it('should calculate innerWidth and innedHeight width given margins', function() {
        expect(layout({top: 10, right: 10, bottom:30, left: 300})).toEqual({
          margin: {top: 10, right: 10, bottom:30, left: 300},
          width: 600,
          height: 450,
          innerWidth: 290,
          innerHeight: 410
        });
      });

      it('should calculate innerWidth and innedHeight width all arguments', function() {
        expect(layout({top: 10, right: 10, bottom:30, left: 250}, 500, 350)).toEqual({
          margin: {top: 10, right: 10, bottom:30, left: 250},
          width: 500,
          height: 350,
          innerWidth: 240,
          innerHeight: 310
        });
      });

    });

  });

})();
