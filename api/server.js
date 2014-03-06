var express = require('express'),
  app = express(),
  _ = require('lodash');


function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}

/** Mock data **/


var STUDENTS = [
  {firstName: 'Alice', lastName: 'Smith', id: 'X2010200001', photo: 'http://placehold.it/300x400&text=portrait'},
  {firstName: 'Bob', lastName: 'Taylor', id: 'X2010200002', photo: 'http://placehold.it/300x400&text=portrait'},
];


var examId = 1, EXAMS = {
  '1': {
    id: '1',
    name: 'Some Exam Preparation',
    exams: [
      {name: 'External Exam 1', id: examId++},
      {name: 'External Exam 2', id: examId++},
      {name: 'External Exam 3', id: examId++},
      {name: 'External Exam 4', id: examId++}
    ]
  },
  '2': {
    id: '2',
    name: 'Another Exam Preparation',
    exams: [
      {name: 'Another Data Results 1', id: examId++},
      {name: 'Another Data Results 2', id: examId++},
      {name: 'Another Data Results 3', id: examId++},
      {name: 'Another Data Results 4', id: examId++}
    ]
  },
  '3': {
    id: '3',
    name: 'Performance Exams',
    exams: [
      {name: 'CP 1', id: examId++},
      {name: 'CP 2', id: examId++}
    ]
  },
  '4': {
    id: '4',
    name: 'AAA Exams',
    exams: [
      {name: 'Area 1', id: examId++},
      {name: 'Area 2', id: examId++},
      {name: 'Area 3', id: examId++},
      {name: 'Area 4', id: examId++},
      {name: 'Area 5', id: examId++},
      {name: 'Area 6', id: examId++}
    ]
  }
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

var EXAM_FIELDS = [
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

var EVALUATION_FIELDS = [
  'History Taking Skills',
  'Physical Examination Skills',
  'Analytical Skills',
  'Communication Skills',
  'Medical Knowledge',
  'Management Skills'
];

var EVALUATION_RESULTS_TYPE = [
  'Do Not Meet',
  'Occasionally Meet',
  'Consistently Meet',
  'Occasionally Exceeds',
  'Consistently Exceeds'
];

_.forEach(EXAMS, function(serie) {
  _.forEach(serie.exams, function(exam){
    var fieldId = 1;

    EXAM_RESULTS[exam.id] = {
      id: exam.id,
      name: exam.name,
      serie: {
        id: serie.id,
        name: serie.name
      },
      results: {}
    };

    _.forEach(EXAM_FIELDS, function (name) {
      var min = getRandomArbitary(-1.8, -0.3),
        max = getRandomArbitary(0.3, 1.9),
        mean = getRandomArbitary(min, max),
        field = {name: name, id: fieldId++};

      EXAM_RESULTS[exam.id].results[field.id] = {
        topic: field,
        data: {
          max: max,
          min: min,
          mean: mean
        }
      };
    });
  });
});

_.forEach(EVALUATIONS, function(evaluations, groupName) {
  EVALUATION_RESULTS[groupName] = {};
  _.forEach(evaluations, function(evaluation){
    EVALUATION_RESULTS[groupName][evaluation.name] = _.map(EVALUATION_FIELDS, function(field) {
      return {
        name: field,
        data: _.map(EVALUATION_RESULTS_TYPE, function(type) {
          return {
            name: type,
            // will not create consistant data;
            // I assuming the sum of all type of result should equal 100%,
            // but the mock up only return random percentage
            'You': getRandomArbitary(0, 1),
            'All others': getRandomArbitary(0, 1),
          };
        })
      };
    });
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


app.get('/students', function(req, res) {
  setTimeout(function(){
    res.send({
      students: STUDENTS,
      cursor: ''
    });
  }, DELAY);
});


app.get('/portfolio/students/:id', function(req, res) {
  var id = req.params.id,
    student = _.find(STUDENTS, function(s){return s.id === id;});

  // for this mock up we assume all students took part to the same exams and
  // evaluations.
  student.examSeries = EXAMS;
  student.evaluations = EVALUATIONS;

  setTimeout(function(){
    res.send(student);
  }, DELAY);
});

app.get('/portfolio/students/:studentId/exams/:examId', function(req, res) {
  var examId = req.params.examId,
    resp = EXAM_RESULTS[examId];


  setTimeout(function(){
    res.send(resp);
  }, DELAY);

});

app.get('/portfolio/students/:studentId/evaluations/:evaluationId', function(req, res) {
  var evaluationId = req.params.evaluationId,
    result = {
      student: {id: req.params.studentId}
    };

  _.find(EVALUATIONS, function(evaluations, groupName){
    return _.find(evaluations, function(evaluation) {
      if (evaluation.id === evaluationId) {
        result.groupName = groupName;
        result.name = evaluation.name;
        result.id = evaluation.id;

        return true;
      }
      return false;
    });
  });

  result.data = EVALUATION_RESULTS[result.groupName][result.name];

  setTimeout(function(){
    res.send(result);
  }, DELAY);

});


app.listen(9090);

console.log('Listening on port 9090');
