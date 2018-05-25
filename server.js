var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

// > Configuration
app.use(express.static(__dirname + '/client')); 

// API routes

app.get('/api/user/login', function(req, res) {
    res.send('Hello, API User');
})

// Application
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/main.html');
})


// otherwise ...
app.all('*', function(req, res) {
    res.redirect("/");
});
 
app.listen(port);
console.log("App listening on port " + port);
