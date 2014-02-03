var express = require('express'),
  app = express(),
  _ = require('lodash');


function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}

/** Mock data **/


var STUDENTS = [
  {fullName: 'Alice Smith', id: 1, matricule: 'X2010200001', photo: 'http://placehold.it/300x400&text=portrait'},
  {fullName: 'Bob Taylor', id: 2, matricule: 'X2010200002', photo: 'http://placehold.it/300x400&text=portrait'},
];


var examId = 1, EXAMS = {
  'Some Exam Preparation': [
    {name: 'External Exam 1', id: examId++},
    {name: 'External Exam 2', id: examId++},
    {name: 'External Exam 3', id: examId++},
    {name: 'External Exam 4', id: examId++}
  ],
  'Another Exam Preparation': [
    {name: 'Another Data Results 1', id: examId++},
    {name: 'Another Data Results 2', id: examId++},
    {name: 'Another Data Results 3', id: examId++},
    {name: 'Another Data Results 4', id: examId++}
  ],
  'Performance Exams': [
    {name: 'CP 1', id: examId++},
    {name: 'CP 2', id: examId++}
  ],
  'AAA Exams':[
    {name: 'Area 1', id: examId++},
    {name: 'Area 2', id: examId++},
    {name: 'Area 3', id: examId++},
    {name: 'Area 4', id: examId++},
    {name: 'Area 5', id: examId++},
    {name: 'Area 6', id: examId++}
  ]
};
var EXAM_RESULTS = {};

var evaluationId=1, EVALUATIONS = {
  'TBD Evaluations': [
    {name: 'Evaluation 1', id: evaluationId++},
    {name: 'Evaluation 2', id: evaluationId++},
    {name: 'Evaluation 3', id: evaluationId++},
    {name: 'Evaluation 4', id: evaluationId++},
    {name: 'Evaluation 5', id: evaluationId++}
  ]
};

var EVALUATION_RESULTS = {};

var FIELDS = [
  'Bahvioral Sciences',
  'Biochemitry',
  'Biostatistics & Epidemiology',
  'Cardiovascular System',
  'Gastrointestinal System',
  'General Principles of Heatlth & Diseases',
  'Genetics',
  'Gross Anatomy & Embryology',
  'Hematpoletic & Lymphoreticular Systems',
  'Histology & immunology',
  'Medicine',
  'Musculoskeletal, Skin & Connective Tissue',
  'Nervous System/Special Senses',
  'Nutrition',
  'Pathology',
  'Pharmacology',
  'Physiology',
  'Renal/Urinary System',
  'Reproductive & Endocrine Systems',
  'Respiratory System',
  'Surgery'
];

_.forEach(EXAMS, function(exams, groupName) {
  EXAM_RESULTS[groupName] = {};
  _.forEach(exams, function(exam){
    EXAM_RESULTS[groupName][exam.name] = _.map(FIELDS, function (name) {
      var min = getRandomArbitary(-1.8, -0.3),
        max = getRandomArbitary(0.3, 1.9);

      return {
        name: name,
        min: min,
        max: max,
        // The mock won't create random value for each student
        student: getRandomArbitary(min, max)
      };
    });
  });
});

_.forEach(EVALUATIONS, function(evaluations, groupName) {
  EVALUATION_RESULTS[groupName] = {};
  _.forEach(evaluations, function(evaluation){
    EVALUATION_RESULTS[groupName][evaluation.name] = {
      student: getRandomArbitary(0, 1),
      mean: getRandomArbitary(0.35, 0.65)
    };
  });
});

// Simulate slow network with a delay
var DELAY = process.env.DELAY || 1000;

app.use(express.bodyParser());


app.get('/', function(req, res) {
  setTimeout(function(){
    res.send({'greeting': 'hello world!!!'});
  }, DELAY);
});


app.get('/students.json', function(req, res) {
  setTimeout(function(){
    res.send(STUDENTS);
  }, DELAY);
});


app.get('/students/:id(\\d+).json', function(req, res) {
  var id = parseInt(req.params.id, 10),
    student = _.find(STUDENTS, function(s){return s.id === id;});

  // for this mock up we assume all students took part to the same exams and
  // evaluations.
  student.exams = EXAMS;
  student.evaluations = EVALUATIONS;

  setTimeout(function(){
    res.send(student);
  }, DELAY);
});

app.get('/students/:studentId(\\d+)/exams/:examId(\\d+).json', function(req, res) {
  var examId = parseInt(req.params.examId, 10),
    result = {
      student: {id: parseInt(req.params.studentId, 10)}
    };

  _.find(EXAMS, function(exams, groupName){
    return _.find(exams, function(exam) {
      if (exam.id === examId) {
        result.groupName = groupName;
        result.name = exam.name;
        result.id = exam.id;

        return true;
      }
      return false;
    });
  });

  result.data = EXAM_RESULTS[result.groupName][result.name];

  setTimeout(function(){
    res.send(result);
  }, DELAY);

});


app.listen(9090);

console.log('Listening on port 9090');
