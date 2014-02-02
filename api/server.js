var express = require('express'),
  app = express();


// Simulate slow network with a delay
var DELAY = process.env.DELAY || 1000;

app.use(express.bodyParser());

app.get('/', function(req, res) {
  setTimeout(function(){
    res.send({'greeting': 'hello world'});
  }, DELAY);
});


app.listen(9090);

console.log('Listening on port 9090');
