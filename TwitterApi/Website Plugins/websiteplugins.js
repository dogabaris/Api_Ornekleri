const express = require('express');
var Twitter = require("node-twitter-api");
const app = express();

app.use(express.static(__dirname + '/view'));

var twitter = new Twitter({
    consumerKey: "qwbOIbEbTvvPIQousRBqa052d",
    consumerSecret: "1mOQ8dViOgw0o0kxxJUSaH4XJqumQhpyAF7kcRD7RCyRxmphiq",
    callback: "http://apiornekleri-94050.onmodulus.net/access-token"
});

var _requestSecret;

app.get("/request-token", function(req, res) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
});

app.get("/access-token", function(req, res) {
   var requestToken = req.query.oauth_token,
   verifier = req.query.oauth_verifier;

   twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
       if (err)
           res.status(500).send(err);
       else
           twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
               if (err)
                   res.status(500).send(err);
               else
                   res.send(user);
           });
   });
});

app.get('/', function(req , res){
	res.sendFile('./view/index.html');
});

app.listen(process.env.PORT || 3000);
