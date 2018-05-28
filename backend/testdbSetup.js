var mongoose = require('mongoose');

const dbURI ="mongodb://WaqasMongo:mongoPass00@ds237620.mlab.com:37620/testdbjs";

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});
