var express = require('express'),
  app = express();


var STUDENTS = [
  {fullName: 'Alice Smith', id: 'X2010200001', photo: 'http://placehold.it/300x400'},
  {fullName: 'Bob Taylor', id: 'X2010200002', photo: 'http://placehold.it/300x400'},
];

// Simulate slow network with a delay
var DELAY = process.env.DELAY || 1000;

app.use(express.bodyParser());

app.get('/', function(req, res) {
  setTimeout(function(){
    res.send({'greeting': 'hello world'});
  }, DELAY);
});


app.get('/students.json', function(req, res) {
  setTimeout(function(){
    res.send(STUDENTS);
  }, DELAY);
});


app.listen(9090);

console.log('Listening on port 9090');
