var express = require('express');
var app = express();
var port = process.env.PORT||3000;

app.use('*', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static(__dirname + '/public'));

app.listen(port, ()=>{
    console.log("App listening on port " + port);
});