
const mqtt = require('mqtt')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

const dotenv=require("dotenv");

dotenv.config();
const p=process.env.PATH;


const url = `mqtt://${process.env.MQTT_SERVER}:${process.env.MQTT_PORT}`
const conf = {
    clientId: process.env.MQTT_CLIENT,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
}

var count=0;
var flag=false;

class MqttHandler {
     constructor(){
        this.clientmqtt = mqtt.connect(`${process.env.BROKER}`, {
            username: process.env.USER_NAME,
            password: process.env.PASSWORD
        });
      
     }
    

     connect(){
       
        const logPath = path.resolve(__dirname, 'mqtt.log');
    
      
        // this.clientmqtt = mqtt.connect(`${process.env.BROKER}`, { username: this.UserName, password: this.Password});
        

        this.clientmqtt.on('error', (err) => {
            // console.log(err);
            // this.mqttClient.end();
        });

        // // Connection callback
        this.clientmqtt.on('connect', () => {
          
            // console.log(`mqtt client connected`);
            this.clientmqtt.subscribe('GVC/VM/SVR');
        });

        // this.clientmqtt.on('connect', function () {
        //     console.log('connected to cloudmqtt');
        //     clientmqtt.subscribe('GVC/VM/#');
        // });
    
       
    
        this.clientmqtt.on('message',async(topic, message)=> {
            // message is Buffer 
            //console.log(message.toString());
            // example *12345,SUM,BST,1,2,3,4,5,6,7,8#
    
            
           flag=true;
            var payload = message.toString(); 
            console.log(payload); 
        
            console.log("received hbt")
               var payload = message.toString();  
              
            payload = payload.replace('*','');
            payload = payload.replace('#','') ;
            if(payload=="TST")
            {
                console.log("Simulate Error");
                flag=false;
            }
            const parts = payload.split(',');
             

          
        
        });

        //    return client;
    }
    sendMessage(topic, message) {
        if (this.clientmqtt) {
            console.log(topic, message);
            this.clientmqtt.publish(topic, message);
        } else {
            console.error('Error: MQTT client is not initialized.');
        }
    }

    getMessage(){
      
        if (this.clientmqtt) {
           
              // // Connection callback
        this.clientmqtt.on('connect', () => {
           
            this.clientmqtt.subscribe('GVC/VM/SVR');
        });

       
           this.clientmqtt.on('message',async(topic, message)=> {
                // message is Buffer 
                // console.log(1);
                // const payload=console.log(message.toString());
             
                // example *12345,SUM,BST,1,2,3,4,5,6,7,8#
                  
                
               
                // var payload = message.toString();  
                // payload = payload.replace('*','');
                // payload = payload.replace('#','') ;
                // const parts = payload.split(',');
                // if(parts[0]==serial && parts[1]=="CashRecieved")
                // {
                //   return true;
                // }
               
        
            });
        } else {
            console.error('Error: MQTT client is not initialized.');
        }
       
    }

    sub(topic) {
        this.clientmqtt.subscribe(topic, (err) => {
        });
    }
}


// create .env file and transfer hard coded to .env file



    //    const mqttHandler=new MqttHandler();
    //    mqttHandler.connect();

module.exports=MqttHandler;
