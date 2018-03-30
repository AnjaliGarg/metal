var mongo= require('mongoose');
var location= require('./location');
var counterparty= require('./counterparty');
var commodity= require('./commodity');
var config = require('../config');
const uuidv1 = require('uuid/v1');

// TODO: Update the Date type to timestamp
// No explicit unique key created; However, trade id is given unique value by default
// And if tried to enter duplicate value; It will generate the error
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

// Schema Model - Mongoose
var trade = module.exports=mongo.model('trade',tradeSchema);

// Get all trades
module.exports.getTrades = function(callback,lim){
  trade.find(callback).limit(lim);
}

// Returns the trade row by trade id
module.exports.fetchTrade = function(id,res){
  trade.findOne({'tradeId':id},function (err, result) {
      if(err)
          res.send({"success":false, "error":"Error Occurred | " + err._message})
      else
          res.send({"success":true, "data":result})
  });
}

// Creates a trade entry
module.exports.createTrade = function(tradeObj,res){
    var addEntry = new trade(tradeObj)
    addEntry.save()
        .then(item=>{
            console.log("Fresh added entry is ")
            console.log(item)
            res.send({"success": true, "data": "Doc with Id - " + item.tradeId + " inserted in DB successfully!"})
        })
        .catch(err => {
            res.status(400).send({"success":false, "error":"Error Occurred | " +  err._message});
        });
}

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
          res.send({"success":false, "error":"Error Occurred | " +  err._message});
      }   else {
          console.log(result)
          res.send({"success": true, "data": "Doc with Id - updated successfully!"});
      }
  });
}

// Delete the trade row having the passed trade id
module.exports.deleteTrade = function(id,res,callback) {
    var query = {tradeId: id};
    trade.remove(query, function (err, item) {
    }).exec()
        .then(result => {
            res.send({"success": true, "data": "Doc deleted successfully!"});
        })
        .catch(err => {
            res.send({"success":false, "error":"Error Occurred | " +  err._message})
        });
}