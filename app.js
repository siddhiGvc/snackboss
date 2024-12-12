var express = require('express');
require('dotenv').config();
var db=require('./models/index');
var path = require('path');


var cors=require('cors');

var mqttHandler = require('./mqtt');
var mqttClient = new mqttHandler();
const PORT=process.env.PORT || 443;
const amazonRouterRouter=require("./routes/amazonRoutes");

var app = express();


app.use(cors({
  origin:"*",
  methods:"GET"/"POST"
}));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
  (async () => {
    await db.sequelize.sync();
  })();
 
  app.use('/', paytmRouter);
 
  
 


app.listen(PORT,()=>{
    mqttClient.connect();
    console.log(`Server listening ont ${PORT}`);
})