const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

var mqttHandler = require('./mqtt');
var mqttClient = new mqttHandler();

// Import your database and router
const db = require('./models/index');
const amazonRouter = require('./routes/amazonRoutes');

// Replace with your SSL certificate and key paths
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
  (async () => {
    await db.sequelize.sync();
  })();
 

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Snackboss IoT!');
});

// Add your router
app.use('/', amazonRouter);

// Start the HTTPS server using the Express app
https.createServer(options, app).listen(443, () => {
  mqttClient.connect();
  console.log('Server running at https://snackboss-iot.in/');
});
