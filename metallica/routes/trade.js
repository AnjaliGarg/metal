var express = require('express');
var mongoose= require('mongoose');
var Trade= require('../models/trade');
var config = require('../config');


var url=config.mongoose.uri;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = app => {
  app.get('/api/trades', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });
  
  /* GET all trades */
app.get('/api/allTrades',function(req,res){
 
  Trade.getTrades(function(error,trades){
   if(error){
     throw error;
   }else{
      res.json(trades);
     }

 });
});

app.post('/createTrade',function(req,res){
   var trade=req.body;
   Trade.createTrade(trade,function(error,trade){
    if(error){
      throw error;
    }else{
       res.json(trade);
       //res.render('trade', { title: 'All trades' });
 
    }
 
  });
 });
 
  app.put('/updateTrade/:_id',function(req,res){
  var id=req.params._id;
  var tradeObj=req.body;
  Trade.updateTrade(id,tradeObj,{},function(error,tradeObj){
   if(error){
     throw error;
   }else{
      res.json(tradeObj);
      //res.render('trade', { title: 'All trades' });

   }

 });
});

app.delete('/deleteTrade/:_id',function(req,res){
  var id=req.params._id;
  Trade.deleteTrade(id,function(error,tradeObj){
   if(error){
     throw error;
   }else{
      res.json(tradeObj);
      //res.render('trade', { title: 'All trades' });

   }

 });
});
}  










 
