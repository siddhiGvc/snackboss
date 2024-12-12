const https = require('https');
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
const PaytmChecksum = require('./PaytmChecksum');


const MakeRefund=(mid,orderId,txnId,amt,refId,merchentKey)=>{
    console.log(mid);
    var paytmParams = {};

paytmParams.body = {
    "mid"          : `${mid}`,
    "txnType"      : "REFUND",
    "orderId"      : orderId,
    "txnId"        : txnId,
    "refId"        : refId,
    "refundAmount" : `${amt}`,
};

/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),merchentKey).then(function(checksum){

    paytmParams.head = {
        "signature"  : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: '/refund/apply',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log('Response: ', response);
        });
    });

    post_req.write(post_data);
    post_req.end();
});

}



module.exports=MakeRefund;