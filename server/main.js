var express = require('express');
var app = express();
var fs = require("fs");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/data');

app.get('/listUsers', function (req, res) {
    var collection = db.get('usercollection');
    collection.find({},{limit:20},function(e,docs){
	    res.json(docs);
	});
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server listening at http://%s:%s", host, port)

})