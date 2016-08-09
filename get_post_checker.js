var express = require("express");
var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("port", 8080);

app.get("/",function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({"name":p,"value":req.query[p]})
  }
  var context = {};
  context.method = req.method;
  context.queryList = qParams;
  res.render("checker", context);
});


app.post("/",function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({"name":p,"value":req.query[p]})
  }
  var bParams = [];
  for (var p in req.body){
    bParams.push({"name":p,"value":req.body[p]})
  }
  var context = {};
  context.method = req.method;
  context.queryList = qParams;
  context.bodyList = bParams;
  res.render("checker", context);
});

app.use(function(req,res){
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


