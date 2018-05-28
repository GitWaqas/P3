var mongoose = require('mongoose');

const dbURI = "mongodb://WaqasMongo:mongoPass00>@ds137740.mlab.com:37740/mongominiproject";
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});
