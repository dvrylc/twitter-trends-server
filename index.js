// Internal imports
const api = require('./api');

api.stream('statuses/sample', function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
