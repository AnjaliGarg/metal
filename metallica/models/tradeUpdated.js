var mongo= require('mongoose');
var location= require('./location');
var counterparty= require('./counterparty');
var commodity= require('./commodity');
var config = require('../config');
const uuidv1 = require('uuid/v1');

// TODO: Update the Date type to timestamp
// No explicit unique key created; However, trade id is given unique value by default
// And if tried to enter duplicate value by manually entering, old doc will get deleted
var tradeSchema = mongo.Schema({
    side:{
        type:String,
        enum:['Buy','Sell'],
        default:'Buy'
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
        enum:['Open','Nominated'],
        default:'Open'
    },
    tradeId:{
        type:String,
        default:uuidv1(),
        unique : true,
        dropDups: true
    },
    location:{ type: String, default:'' },
    counterParty:{ type: String, default:'' },
    commodity:{ type: String, default:'' }
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

// Creates a trade entry;
// Though this will make an entry in the db with default values
// even if some values don't match the criteria and fail
module.exports.createTrade = function(tradeObj,res){
  trade.create(tradeObj, res,function(err, result){
      if(err) {
          console.log("Error couu" + err._message)
          console.log(err)
          res.send({"success": false, "data": err._message});
      }   else {
          console.log("Taste the success!");
          console.log(result)
          res.send({"success": true, "data": "Doc with Id - " + result.tradeId + " inserted in DB successfully!"});
      }
  });
}

// Assumption: Only price allowed to be updated
module.exports.updateTrade = function(tradeObj,res){
    console.log("Here is the object being sent")
    console.log(tradeObj)
  var query={tradeId:tradeObj.tradeId};
  console.log(query)
  var update={
    price : tradeObj.price
  }
  console.log("Fine")
  trade.findOneAndUpdate(query,update,function(err, result){
      console.log("Process")
      if(err) {
          res.send({"success": false, "data": err._message});
      }   else {
          console.log(result)
          res.send({"success": true, "data": "Doc with Id - updated successfully!"});
      }
  });
}

module.exports.deleteTrade = function(id,callback){
  var query={_id:id};
  trade.remove(query,callback);
}
