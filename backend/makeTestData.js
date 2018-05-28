require("./dbSetup.js");


var User = require("./models/user");
var LocationBlog = require("./models/locationBlog");
var Position = require("./models/position");


function userCreate (firstName, lastName, userName, password, type, company, companyUrl){
    var job = [{type, company, companyUrl},{type, company, companyUrl}];
    var user = {firstName, lastName,userName, password, job:job};
    var u = new User(user);
    return u.save();
}

function postionCreator(lon,lat,userId,keep){
    var posDetail = { user: userId, loc: { coordinates: [lon,lat]}};
    if(keep){
        posDetail.created = new Date();
    }
    var postion = new Position(posDetail);
    return postion.save();
}

function LocationBlogCreator(info, author, longitude, latitude){
    var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new LocationBlog(LocationBlogDetail);
    return blog.save();
}

// await has need to have a function as async
async function createUsers(){
    // remove all data in tables
    await User.remove({});
    await Position.remove({});
    await LocationBlog.remove({});
    // now the user has the promise
    // return an array of promises
    var userPromises =[
        userCreate("Kurt","Wonnegut","asf","test","wow","comp","comp.url"),
        userCreate("a","b","asfas","tasfest","wow","comp","comp.url"),
        userCreate("a","b","asdf","test","wow","comp","comp.url"),
        userCreate("a","b","sfda","test","wow","comp","comp.url"),
        userCreate("a","b","sfsd","test","wow","comp","comp.url")
    ]
    var users = await Promise.all(userPromises);

    var blogPromises = [
        LocationBlogCreator("Cool Place", users[0]._id,23,435),
        LocationBlogCreator("Decent Place", users[1]._id,324,452),
        LocationBlogCreator("Alright Place", users[2]._id,23423,43235),
        LocationBlogCreator("Pretty Place", users[3]._id,23123,4234635),
    ];

    var blogs = await Promise.all(blogPromises);
    
    var posPromises =[
        postionCreator(12.505874633789062,55.7717454171889,users[0]._id,true),
        postionCreator(12.53042221069336,55.67787478340033,users[1]._id,true),
        postionCreator(12.571449279785156,55.6863914122751,users[2]._id,true),
        postionCreator(12.534027099609373,55.7106729731916,users[3]._id,true)
    ]
    //var user1 = await userCreate("a","b","annb","test","wow","comp","comp.url");
    // This is will take time, cuz now promise wil run in seriel insteted paralle
    // var user2 = await userCreate("a","b","annsb","test","wow","comp","comp.url");
    // create an array and put all users in the array
    // so Promise.all create a list of array in rigtig order and run it
   
    var positions = await Promise.all(posPromises);
}

async function createLocationUsers(){
    await User.remove({});
    await Position.remove({});
    await LocationBlog.remove({});
    
    var userPromises =[
        userCreate("Kurt","Wonnegut","Swimmer1","test","wow","comp","comp.url"),
        userCreate("user1","b","xcl","Swimmer2","wow","comp","comp.url"),
        userCreate("a","b","weow","Runner1","wow","comp","comp.url"),
        userCreate("a","b","sdf0","Runner10","wow","comp","comp.url"),
        userCreate("Tester","b","Tester","test","wow","comp","comp.url")
    ]

    // await sikker os at vi får users før vi går videre
    var users = await Promise.all(userPromises);

    var positionPromises =[
        postionCreator(12.505874633789062,55.7717454171889,users[0]._id,true),
        postionCreator(12.53042221069336,55.67787478340033,users[1]._id,true),
        postionCreator(12.571449279785156,55.6863914122751,users[2]._id,true),
        postionCreator(12.534027099609373,55.7106729731916,users[3]._id,true)
    ]
 
    var positions = await Promise.all(positionPromises);

}
createLocationUsers();
//createUsers();
