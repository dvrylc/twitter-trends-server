// External imports
const app = require('http').createServer(handler);
const io  = require('socket.io')(app);

// Internal imports
const api = require('./api');

// Request handler
function handler (req, res) {
  res.end();
}

// Connect to Twitter API
api.stream('statuses/sample', stream => {
  // Start socket.io server
  io.on('connection', socket => {
    const clientIP = socket.client.request.headers['x-forwarded-for'] || socket.conn.remoteAddress;
    console.log(`[CONNECT]\t\t${clientIP}`);
    
    // Set unlimited clients
    socket.setMaxListeners(0);
    
    // Emit incoming tweets if tweet is not null
    stream.on('data', tweet => {
      if (tweet.text) {
        socket.emit('tweet', tweet.text);
      }
    });
    
    // Emit errors
    stream.on('error', err => {
      socket.emit('error', err);
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`[DISCONNECT]\t${clientIP}`);
    });
  });
});

// Bind server to port
app.listen(process.env.PORT || 8000, () => {
  console.log('[INFO]\t\tServer started');
});
