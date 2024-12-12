
// const {sequelize,PaytmPayments,Machine}=require('../models');
// const mqtt = require('mqtt');
// const {Op} =require('sequelize');

// const mqttHandler=require('../mqtt');
// const MakeRefund = require('../helpers/paytmRefund');
// var mqttClient = new mqttHandler();

// var events = require('../helpers/events');



const getAmazonMessage=async(req,res)=>{
    try{
    //     var id=process.env.PAYTM_ID;
    //     console.log(id);
    //     var xid='req.body.';
    //     xid=xid+process.env.PAYTM_ID
    //    console.log(xid)
    //      var zid=xid.replace(/['"]+/g, '');
    //     var uid=zid;
         console.log(req.body);
//         if(req.body.STATUS=="TXN_SUCCESS")
//         {

//             let command=false;
// //            command=mqttClient.getMessage(serial);
//             var i=0;
//             const interval=setTimeout(()=>{ 
//               MakeRefund(req.body.MID,req.body.ORDERID,req.body.TXNID,req.body.TXNAMOUNT,req.body.BANKTXNID,merchantKey)
//             },60000)

//             events.pubsub.on('paytm_success', function(msg,amnt) {
//                 // msg = JSON.parse(msg);
//                 //console.log(msg);
//                 if(msg === req.body.TXNID) {
//                   clearInterval(interval);
//                   console.log('timer cleared');
//                 }
//               });

//               events.pubsub.on('partialRefund', function(msg,amnt) {
//                 // msg = JSON.parse(msg);
//                 //console.log(msg);
//                 if(msg === req.body.TXNID) {
//                     MakeRefund(req.body.MID,req.body.ORDERID,req.body.TXNID,amnt/100,req.body.BANKTXNID,merchantKey)
//                     clearInterval(interval);
//                     console.log('partial refund Rs-',amnt/100);
//                 }
//               });


//             //    if(command== true)
//             //    {
//             //     console.log("cleared");
//             //     clearTimeout(interval);
//             //    }
 
         
//             var machines = await Machine.findAll({ where: { data4:req.body.MID} });
//             // console.log(machines[0].dataValues.serial)
//             var serial=machines[0].dataValues.serial;
//             var merchantKey = machines[0].dataValues.data3;
//             var amount=parseInt(req.body.TXNAMOUNT)*100;
//             var message="*UPI,"+amount+','+req.body.TXNID+','+req.body.Masked_customer_mobile_number+"#";
//             // var Mqtt = mqtt.connect(`${process.env.BROKER}`, {
//             //     username: process.env.USER_NAME,
//             //     password: process.env.PASSWORD
//             // });
//             mqttClient.sendMessage('GVC/VM/' + serial,message);
           
           
           // someExternalfunction('GVC/VM/' + serial,message)
            /*
            some external function will in turn call mqtt.publish(topic,message)
            some external function needs to be in mqtt.js only as that has mqtt.client
            */

           
        //  }
        res.status(200).json("Okay");

    }
    catch(err){
        res.status(505).json("Error");

    }
}










module.exports={getAmazonMessage};