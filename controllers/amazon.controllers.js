
// const {sequelize,PaytmPayments,Machine}=require('../models');
// const mqtt = require('mqtt');
// const {Op} =require('sequelize');

// const mqttHandler=require('../mqtt');
// const MakeRefund = require('../helpers/paytmRefund');
// var mqttClient = new mqttHandler();

// var events = require('../helpers/events');

const fs = require('fs');
const IpnHandler = require('../helpers/ipnhandler.js');



function storeNotification(notification) {
    const filePath = './notification.json';
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      let notifications = [];
      if (!err && data) {
        notifications = JSON.parse(data); // Parse existing notifications
      }
      notifications.push(notification); // Add new notification
  
      fs.writeFile(filePath, JSON.stringify(notifications, null, 2), (err) => {
        if (err) {
          console.error('Error storing notification:', err);
        } else {
          console.log('Notification stored successfully.');
        }
      });
    });
  }



const getAmazonMessage=async(req,res)=>{
    try{
        const snsPayload = req.body;
        console.log(req.body);
        // console.log(snsPayload["SubscribeURL"]);
        storeNotification(snsPayload)
        // // Parse SNS payload (if required)
        // let parsedPayload;
        // try {
        //     parsedPayload = JSON.parse(snsPayload);
        // } catch (e) {
        //     return res.status(400).send('Invalid SNS Payload');
        // }
    
        // // Validate and process SNS notification
        // IpnHandler(parsedPayload, (err, message) => {
        //     if (err) {
        //         console.error('IPN Handler Error:', err.message);
        //         return res.status(400).send('Invalid Notification');
        //     }
    
        //     console.log('Processed Message:', message);
    
        //     // TODO: Handle your business logic here
        //     // e.g., update the database, log the transaction, etc.
    
        //     res.status(200).send('Notification Received');
        // });

        // res.status(200).json("okay");
       
    }
    catch(err){
        res.status(505).json("Error");

    }
}


module.exports={getAmazonMessage};