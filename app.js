var express = require('express'),
  mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/populateDemo');


var app = express();
var server = app.listen(2000,function(){
  console.log('Express.js server listening on port 2000');
});
var mongoose = require('mongoose'), Schema = mongoose.Schema;

var UserSchema = Schema({
  _id:Number,
  name : String,
  sex:String
});
var RoomSchema = Schema({
  roomNumber:String,
  roomMember:[{
    type:Number, ref: 'users'
  }],
})
var User = mongoose.model('users', UserSchema);
var Room = mongoose.model('rooms',RoomSchema);
var lily = new User({'_id':1000,'name': 'lily','sex':'F'});
var lucy = new User({'_id':1001,'name':'lucy','sex':'F'});
var room = new Room({
  'roomNumber':'1',
  'roomMember':[lily._id,lucy._id]
});
function callback(err,user){
  if(err) throw err;
  console.log(user);
};
lily.save(callback);
lucy.save(callback);
room.save(callback);
app.get('/',function(req,res,next){


  Room.findOne({roomNumber: '1'}).populate({
    path:'roomMember'}).exec(callback);
  function callback(err,user){
    if(err) return next(err);
    console.log(user);
    res.send('hello');
  };
})
module.exports = app;

