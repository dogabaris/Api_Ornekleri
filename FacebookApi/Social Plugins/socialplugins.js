const express = require('express');
//const express = require('body-parser');
const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static(__dirname + '/view'));

app.get('/', function(req , res){
	res.sendFile('./view/index.html');
});

app.listen(process.env.PORT || 3000);
