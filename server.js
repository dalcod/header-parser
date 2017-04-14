var express = require("express");
var os = require("os");
var ip = require("ip");
var uaParser = require("ua-parser-js");
var app = express();
var port = process.env.PORT || 8080;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var obj = {};
app.locals.obj = obj;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res){
    res.render("index");
});

app.get("/:lang", function(req, res){
    var ua = uaParser(req.headers['user-agent']);
    console.log(ua);
    var opSys = "";
    var obj = {};
    var winVer = [
        {"a": 5.0, "b": "Windows 2000"},
        {"a": 5.1, "b": "Windows XP"},
        {"a": 6.0, "b": "Windows Vista"},
        {"a": 6.1, "b": "Windows 7"},
        {"a": 6.2, "b": "Windows 8"},
        {"a": 10, "b": "Windows 10"}
    ];
    var macVer = [
        {"a": 7.8, "b": "Mac OS X Panther"},
        {"a": 10.0, "b": "Mac OS X Snow Leopard "},
        {"a": 11.3, "b": "Mac OS X Lion"},
        {"a": 12.3, "b": "OS X Mountain Lion"},
        {"a": 13.0, "b": "OS X Mavericks"},
        {"a": 14.0, "b": "OS X Yosemite"},
        {"a": 15.0, "b": "OS X El Capitan"},
        {"a": 16.7, "b": "macOS Sierra"}
    ];
    var linVer = [
        {"a": "2.6.35-22-generic", "b": 6.35, "c": "Linux Mint 10 'Julia' 64-bit"},
        {"a": "2.6.38-10-generic", "b": 6.38, "c": "Ubuntu 11.04"},
        {"a": "2.6.35.7-unity1", "b": 35.7, "c": "Unity Linux"},
        {"a": "3.2.0-1425-omap4", "b": 3.2, "c": "Ubuntu 12.0.4 on Pandaboard ES"},
        {"a": "3.13.6-100.fc19.i686", "b": 3.13, "c": "Fedora 19"},
        {"a": "3.4.0-perf-ge039dcb", "b": 3.4, "c": "Android 4.2.1 on Nexus 4"},
    ];
    if (os.type().indexOf("Windows") != -1) {
        winVer.forEach(function(o){
            if (os.release().indexOf(o.a) != -1) {
                opSys = "Windows, " + o.b + " " + os.arch();
            }
        }); 
    } else if (os.type().indexOf("Darwin") != -1) {
        macVer.forEach(function(o){
            if (os.release().indexOf(o.a) != -1) {
                opSys = "Macintosh, " + o.b + " " + os.arch();
            }
        }); 
    } else if (os.type().indexOf("Linux") != -1) {
        linVer.forEach(function(o){
            if (os.release().indexOf(o.a) != -1 || os.release().indexOf(o.b) != -1) {
                opSys = "Linux, " + o.c + " " + os.arch();
            }
        });
    } else {
        opSys = os.type() + " " + os.release() + " " + os.arch(); 
    }
    var myOS = ua.device.type + ", " + ua.os.name + ua.os.version + " " + ua.cpu.architecture;
    var lang = req.params.lang;
    res.json({
        lang: lang,
        ip: ip.address(),
        servOpSys: opSys,
        myOpSys: myOS
    });
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(port, function(){
    console.log("The app is running")
});