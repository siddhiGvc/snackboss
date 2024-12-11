const https = require('https');
const fs = require('fs');

// Replace with your SSL certificate and key paths
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

https.createServer(options, (req, res) => {
  // Respond to requests
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Snackboss IoT!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(443, () => {
  console.log('Server running at https://snackboss-iot.in/');
});
