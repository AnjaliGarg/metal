var express = require('express');
var mongoose = require('mongoose');
var Trade = require('../models/tradeUpdated');
var config = require('../config');

var url = config.mongoose.uri;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app => {
    app.get('/fetchTrade/:_id', (req, res) => {
        var id = req.params._id;
        Trade.fetchTrade(id,res);
    });

    /* GET all trades */
    app.get('/allTrades', function(req, res) {

        Trade.getTrades(function(error, result) {
            if (error) {
                res.send({
                    "success": false,
                    "error": "Error Occurred. | " + error
                });
            } else {
                res.send({
                    "success": true,
                    "data": result
                });
            }

        });
    });

    app.post('/createTrade', function(req, res) {
        var trade = req.body;
        console.log(trade)
        console.log("Add entry called")
        Trade.createTrade(trade, res);
    });

    app.put('/updateTrade', function(req, res) {
        var tradeObj = req.body;
        console.log(req.body)
        Trade.updateTrade(tradeObj, res);
    });

    app.delete('/deleteTrade/:_id', function(req, res) {
        var id = req.params._id;
        Trade.deleteTrade(id,res);
    });
}