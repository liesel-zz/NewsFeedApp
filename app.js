var express = require('express');
var app 	= express();

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/app/public/index.html');
});

app.use("/styles", express.static(__dirname + '/app/public/css'));
app.use("/js", express.static(__dirname + '/app/public/js'));
app.use("/angular", express.static(__dirname + '/bower_components/angular'));
app.use("/angular-resource", express.static(__dirname + '/bower_components/angular-resource'));
app.use("/jquery", express.static(__dirname + '/bower_components/jquery'));
app.use("/materialize", express.static(__dirname + '/bower_components/materialize'));
app.use("/ng-facebook", express.static(__dirname + '/bower_components/ng-facebook'));
app.use("/images", express.static(__dirname + '/app/public/images/'));

var server 	= app.listen(3000, function(){
	var host 	= server.address().address;
	var port 	= server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
