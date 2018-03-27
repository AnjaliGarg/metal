var mongo= require('mongoose');
var commoditySchema =mongo.Schema({
name:{
  type:String,
 }
});

var commodity=module.exports=mongo.model('commodity',commoditySchema);

