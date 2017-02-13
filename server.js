var express = require('express');
var app     = express();
var port    = 2043 || process.env.PORT;


var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cakin_it_app_frontend';
mongoose.connect(mongoUri);

app.use(express.static('public'));


app.listen(port, function() {
  console.log("Cakin' It Frontend running on port: ", port);
});
