// import { Transaction, MachineData, Machine, RejectedRecord, sequelize ,batteryTransactions } from '../models';

var events = require('./events');
//a
const num = a => {
    if (['BST', 'BEN', 'BER'].indexOf(a) > -1) return a == 'BST' ? 1 : a == 'BEN' ? 0 : 2;
    if (isNaN(parseInt(a))) return null;
    else return parseInt(a);
}
//q
module.exports.parse = (payload, mqttClient,topic) => {
    if (!/.*?(\*[0-9A-Za-z\,]*\#)+?.*?/gm.test(payload)) return;
    var commands = [...payload.toString().matchAll(/.*?(\*[0-9A-Za-z\,]*\#)+?.*?/gm)].map(q => q[0]);
    commands.forEach(cmd => {
        try {
            parseInternal(cmd, mqttClient,topic);
        } catch (ex) {
            console.log('Exception in MQTT:', ex);
        }
    })
}

const parseInternal = (payload, mqttClient,topic) => {
    // 'Parsing message - ' + payload
    try {
        
        var cleaned = /^\**(.*?)\#*$/.exec(payload)[1];
        var parts = cleaned.split(',');
        // 211023 - ignore test with numeric number, allow commands in parts[0] 
        //if (!/^\d+$/.test(parts[0])) return;

        // 211023 added code for detecting machine packets ie *SSN,12345# sent to GVC/VM/#
       

    
        if (parts[1] == 'UPI')
        {
         //   console.log(parts);
            events.pubsub.emit('amazon_success',parts[3],parts[2]) ;
        }   


        if (parts[1] == 'RFN')
        {
         //   console.log(parts);
            events.pubsub.emit('partialRefund',parts[3],parts[2]) ;
        }   
       
        
          
        
    } catch (ex) {
        console.log('Failed to parse message', ex);
        // 'Failed to parse message'
    }
}

