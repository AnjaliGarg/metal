var mongo= require('mongoose');
var location= require('./location');
var counterparty= require('./counterparty');
var commodity= require('./commodity');
var tradeSchema =mongo.Schema({
side:{
  type:String,
  enum:['BUY','SELL'],
  default:'BUY' 
 },
 quantity:{
  type:Number,
  default:0
 },
 price:{
  type:Number,
  default:0
 },
 tradeDate:{
   type:Date,
   default: Date.now
 },
 status:{
  type:String,
  enum:['OPEN','NOMINATED'],
  default:'OPEN' 
 },
 location:[{ type: mongo.Schema.Types.ObjectId, ref: 'location' }],
 counterparty:[{ type: mongo.Schema.Types.ObjectId, ref: 'counterparty' }],
 commodity:[{ type: mongo.Schema.Types.ObjectId, ref: 'commodity' }]
});

var trade=module.exports=mongo.model('trade',tradeSchema);

//get all trades
module.exports.getTrades = function(callback,lim){
  trade.find(callback).limit(lim);
}


//get trade by id
module.exports.getTradesById = function(id,callback){
  trade.findById(id,callback);
}

//get all trades
module.exports.createTrade = function(tradeObj,callback){
  trade.create(tradeObj,callback);
}

//update trade
module.exports.updateTrade = function(id,tradeObj,options,callback){
  var query={_id:id};
  var update={
    price : tradeObj.price
  }
  trade.findOneAndUpdate(query,update,options,callback);
}

module.exports.deleteTrade = function(id,callback){
  var query={_id:id};
  trade.remove(query,callback);
}
