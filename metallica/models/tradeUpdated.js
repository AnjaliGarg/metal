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
        unique : true,
        dropDups: true,
        default:uuidv1
    },
    location:{ type: String, default:'' },
    counterParty:{ type: String, default:'' },
    commodity:{ type: String, default:'' }
});


var trade = module.exports=mongo.model('trade',tradeSchema);

//get all trades
module.exports.getTrades = function(callback,lim){
  trade.find(callback).limit(lim);
}

//get trade by id
module.exports.getTradesById = function(id,callback){
  trade.findById(id,callback);
}

// Creates a trade entry;
module.exports.createTrade = function(tradeObj,res){
    var addEntry = new trade(tradeObj)
    addEntry.save()
        .then(item=>{
            console.log("Fresh added entry is ")
            console.log(item)
            res.send({"success": true, "data": "Doc with Id - " + item.tradeId + " inserted in DB successfully!"})
        })
        .catch(err => {
            res.status(400).send({"success": false, "data": err._message});
        });
}

// Assumption: Only price allowed to be updated
// Returning updated values but not saving it in db :P
module.exports.updateTrade = function(tradeObj,res){
  var query={tradeId:tradeObj.tradeId};
  console.log(query)
  console.log(tradeObj)
  // This needs to be updated
  trade.findOneAndUpdate(query,
      tradeObj,{new: false, upsert: true},function(err, result){
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
