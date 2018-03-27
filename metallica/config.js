var config = {};

config.security = {};
config.mongoose = {};
config.client= {};

config.security.tokenLife = 3600;
// config.security.username='divya';
// config.security.password='Admin@123';

config.client.clientId='metallica';
config.client.token='metallica';

config.mongoose.uri='mongodb://localhost:27017/metallica';

module.exports = config;
