var mongo= require('mongoose');
var counterpartySchema =mongo.Schema({
name:{
  type:String,
 }
});

var counterparty=module.exports=mongo.model('counterparty',counterpartySchema);

