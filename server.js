var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var port    = 2043 || process.env.PORT;


var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/cakin_it_app_frontend';
mongoose.connect(mongoUri);

mongoose.connection.once('open', function(){
    console.log('connected to mongod');
});

app.use(express.static('public'));


app.listen(port, function() {
  console.log("Cakin' It Frontend running on port: ", port);
});
