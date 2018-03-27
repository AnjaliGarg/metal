var config                  = require('../config');
var passport                = require('passport');
var BasicStrategy           = require('passport-http').BasicStrategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var UserModel               = require('../models/auth').UserModel;
var ClientModel             = require('../models/auth').ClientModel;
var AccessTokenModel        = require('../models/auth').AccessTokenModel;
var RefreshTokenModel       = require('../models/auth').RefreshTokenModel;
var oauth2orize = require('oauth2orize');


// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    UserModel.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }

        RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });
        AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
        var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
        refreshToken.save(function (err) {
            if (err) { return done(err); }
        });
        var info = { scope: '*' }
        token.save(function (err, token) {
            if (err) { return done(err); }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
        });
    });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });
            AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('hex');
            var refreshTokenValue = crypto.randomBytes(32).toString('hex');
            var token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
            var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
            refreshToken.save(function (err) {
                if (err) { return done(err); }
            });
            var info = { scope: '*' }
            token.save(function (err, token) {
                if (err) { return done(err); }
                done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
            });
        });
    });
}));

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
]