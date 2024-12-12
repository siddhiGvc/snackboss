var ipnhandler = require('IpnHandler');

// This can be placed in your controller for a method
// that is configured to receive a "POST" IPN from Amazon.

var bodyarr = []

req.on('data', function(chunk){
        bodyarr.push(chunk);
      })

req.on('end', function(){

var notifJson=JSON.parse(bodyarr.join(''))
var headers = req.headers;

var ipn = new ipnhandler(notifJson, function(error, result) {

            if(error){
                console.log(error);
                res.send(error.toString())
            } else {
                // result contains the JSON representation of the response
                // You can parse the JSON to get the values
                console.log(JSON.stringify(result));
                res.send(result)
            }
        });
      });