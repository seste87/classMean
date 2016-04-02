'use strict';

require('./database');
require('./seed');

var express = require('express'),
    parser = require('body-parser'),
    router = require('./api'),
    app = express();

// var router = express.Router();

app.use(express.static('public'));
app.use(parser.json());
app.use('/api', router);

// router.get('/todos', function(req, res) {
//
//   res.json({todos: []});
//
// });

app.listen(3000, function(){
  console.log("The server is running on port 3000");
});
