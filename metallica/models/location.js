var mongo= require('mongoose');
var locationSchema =mongo.Schema({
name:{
  type:String,
 }
});

var location=module.exports=mongo.model('location',locationSchema);

