var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var DocumentClient = require('documentdb').DocumentClient;

var host = "https://location-occupancy.documents.azure.com:443/";
var masterKey = "bzxl0hucWsUBlfhj2Blmrw2lTO0JvRPlFRzQhfSESlVvyiK3msvmDxIgwltxGnlyex1Fpr1BmUtSd7F3cWJCDg==";
var client = new DocumentClient(host, {masterKey: masterKey});

var dbQuery = {
             query: 'SELECT * FROM root r WHERE r.id= @id',
             parameters: [{
                 name: '@id',
                 value: 'location-occupancy'
             }]
         };
var colQuery = {
             query: 'SELECT * FROM root r WHERE r.id= @id',
             parameters: [{
                 name: '@id',
                 value: 'locations'
             }]
         };

var colLink = "";
client.queryDatabases(dbQuery).toArray(function(err,dbs) {
  console.log(dbs);
  client.queryCollections(dbs[0]._self, colQuery).toArray(function(err,cols) {
    console.log(cols);
    colLink = cols[0]._self;
    client.queryDocuments(cols[0]._self, "SELECT d.id, d.occupancy, d.max FROM docs d").toArray(function(err,docs) {
      console.log(docs);
    });
  });
});


var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
  //res.json({ message: 'hooray! api works' });
  
  client.queryDocuments(colLink, "SELECT d.id, d.occupancy, d.max FROM docs d").toArray(function (err, results) {
    if (err) {
    } else {
      res.json(results);
    }
  });
});

router.get('/increment/:id', function(req, res) {
  console.log(req.params.id);
  client.queryDocuments(colLink, "SELECT * FROM docs d WHERE d.id = '"+req.params.id+"'").toArray(function (err, results) {
    console.log(results);
    var item = results[0];
    item.occupancy = item.occupancy+1;
    client.replaceDocument(results[0]._self, item, function (err, data) {
      if (err) {console.log(err);}
      console.log(data);
    }); 
  });
  res.end();
});

router.get('/decrement/:id', function(req, res) {
  console.log(req.params.id);
  client.queryDocuments(colLink, "SELECT * FROM docs d WHERE d.id = '"+req.params.id+"'").toArray(function (err, results) {
    console.log(results);
    var item = results[0];
    item.occupancy = item.occupancy-1;
    client.replaceDocument(results[0]._self, item, function (err, data) {
      if (err) {console.log(err);}
      console.log(data);
    }); 
  });
  res.end();
});

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
