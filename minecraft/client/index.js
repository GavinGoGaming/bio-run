var express = require('express');
var app = express();
// Static /public
app.use(express.static(__dirname + '/public'));
// Listen on process.env.PORT or 3000
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});