var oauth2 = require('./oauth');
var passport = require('passport');
var UserModel = require('../models/auth').UserModel;

//require('.auth');

module.exports = app => {
	
app.use(passport.initialize());	

app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
        function(req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate a scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
        }
);

app.post('/createUser',function(req,res){
  UserModel.createTrade(trade,function(error,trade){
    if(error){
      throw error;
    }else{
       res.json(trade);
       //res.render('trade', { title: 'All trades' });
 
    }
 
  });
 });
}