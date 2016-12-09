var express = require('express');
var app = express();

app.use(express.static(__dirname + '/view'));


app.get('/', function(req , res){
	res.sendFile('./view/index.html');
    res.sendFile('./view/index.css')
});

app.listen(process.env.PORT || 3000);