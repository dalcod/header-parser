var express = require("express");
var os = require("os");
var app = express();
var port = process.env.PORT || 8080;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var obj = {};
app.locals.obj = obj;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    var obj = {};
    
    res.render("index");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(port, function(){
    console.log("The app is running")
});