// External imports
const Twitter = require('twitter');

// Internal imports
const secrets = require('./secrets.json');

// Create client
const client = new Twitter(secrets.twitter);

// Export
module.exports = client;
