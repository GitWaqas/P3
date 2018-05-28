var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    type : String,
    company : String,
    companyUrl : String
});

var UserSchema = new Schema({
    firstName : String,
    lastName :  String,
    userName : { type: String, required : true, unique : true },
    password : { type: String, required : true },
    created : { type: Date, default : Date.now },
    lastUpdated : Date,
    job: [ JobSchema ],
});


UserSchema.pre("save", function(next){
    
    this.lastUpdated = Date.now;
    next();
});


module.exports = mongoose.model("User", UserSchema);