
const {sequelize,AmazonPayments,Machine}=require('../models');
const mqtt = require('mqtt');
// const {Op} =require('sequelize');

const mqttHandler=require('../mqtt');
const MakeRefund = require('../helpers/amazonRefund');
var mqttClient = new mqttHandler();

var events = require('../helpers/events');

const fs = require('fs');
const IpnHandler = require('../helpers/ipnhandler.js');
const path = require('path');
const moment=require('moment');


function storeNotification(rawBody) {
    
    // Parse the plain text into JSON
    const notification = JSON.parse(rawBody);

    // Define the file path
    const filePath = path.join(__dirname, './notification.json');

    // Read the existing file (if exists) and append the new notification
    fs.readFile(filePath, 'utf8', (err, data) => {
      let notifications = [];

      if (!err && data) {
        notifications = JSON.parse(data); // Parse existing data
      }

      notifications.push({...notification,dateTime:moment().tz('Asia/Kolkata').format('DD-MM-YYYY hh:mm:ss A')}) // Add the new notification

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(notifications, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        //   return res.status(500).send('Error storing notification.');
        }
        console.log('Notification stored successfully.');
        // res.status(200).send('Notification stored successfully.');
      });
    });
  }



const getAmazonMessage=async(req,res)=>{
    try{
      const snsPayload = JSON.parse(req.body); // req.body is plain text, parse it to JSON
      const message = JSON.parse(snsPayload.Message); // Parse the Message field

      console.log('SNS Message:', message.status.status);
        storeNotification(req.body);
     
    
        // // // Validate and process SNS notification
        // IpnHandler(snsPayload, (err, message) => {
        //     if (err) {
        //         console.error('IPN Handler Error:', err.message);
        //         return res.status(400).send('Invalid Notification');
        //     }
    
        //     console.log('Processed Message:', message);
    
        //     // TODO: Handle your business logic here
        //     // e.g., update the database, log the transaction, etc.
    
        //     res.status(200).send('Notification Received');
        // });

        if(message.status.status=="SUCCESS")
            {
    
                let command=false;
    //            command=mqttClient.getMessage(serial);
                var i=0;
                const interval=setTimeout(()=>{ 
                  MakeRefund(message.merchantId,message.sellerOrderId,message.storeId,snsPayload.MessageId,message.orderTotalAmount,"no stock",message.merchantStoreId,"ghfvhgfgfdf")
                },5000)
    
                events.pubsub.on('amazon_success', function(msg,amnt) {
                    // msg = JSON.parse(msg);
                    //console.log(msg);
                    if(msg === message.sellerOrderId) {
                      clearInterval(interval);
                      console.log('timer cleared');
                    }
                  });
    
                  events.pubsub.on('partialRefund', function(msg,amnt) {
                    // msg = JSON.parse(msg);
                    //console.log(msg);
                    if(msg === message.sellerOrderId) {
                        MakeRefund(message.merchantId,message.sellerOrderId,message.storeId,snsPayload.MessageId,amnt/100,"extra amount paid",message.merchantStoreId,"ghfvhgfgfdf")
                        clearInterval(interval);
                        console.log('partial refund Rs-',amnt/100);
                    }
                  });
    
    
                //    if(command== true)
                //    {
                //     console.log("cleared");
                //     clearTimeout(interval);
                //    }


                const payment = await AmazonPayments.create({
                  mid:message.merchantId,
                  amt:message.orderTotalAmount,
                  orderID:message.sellerOrderId,
                  txnDate:message.transactionDate,
                  txnID:message.storeId
              });
     
             
                var machines = await Machine.findOne({ where: { data4:message.merchantId} });
                // console.log(machines[0].dataValues.serial)
                if(machines){
                var serial=machines.dataValues.serial;
                var merchantKey = machines.dataValues.data3;
                var amount=parseInt(message.orderTotalAmount)*100;
                var msg="*UPI,"+amount+','+message.sellerOrderId+','+message.transactionDate+"#";
                // var Mqtt = mqtt.connect(`${process.env.BROKER}`, {
                //     username: process.env.USER_NAME,
                //     password: process.env.PASSWORD
                // });
                mqttClient.sendMessage('GVC/VM/' + serial,msg);
                }
               
               // someExternalfunction('GVC/VM/' + serial,message)
                /*
                some external function will in turn call mqtt.publish(topic,message)
                some external function needs to be in mqtt.js only as that has mqtt.client
                */
                }    

        res.status(200).json("okay");
       
    }
    catch(err){
        console.log(err);
        res.status(505).json("Error");

    }
}


module.exports={getAmazonMessage};