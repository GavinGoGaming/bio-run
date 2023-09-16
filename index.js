var express = require('express');
var app = express();
var port = process.env.PORT||3000;

app.get('/log', (req, res)=>{
    // log the ?user=x&pass=y to users.json
    var fs = require('fs');
    var user = req.query.user;
    var pass = req.query.pass;
    var data = fs.readFileSync('users.json');
    print(data);
    var users = JSON.parse(data);
    // users is an array, add the {username:user,password:pass} to the array and write it back
    users.push({username:user,password:pass});
    var data2 = JSON.stringify(users);
    fs.writeFileSync('users.json', data2);
    res.send("success");
});
app.use('*', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static(__dirname + '/public'));

app.listen(port, ()=>{
    console.log("App listening on port " + port);
});