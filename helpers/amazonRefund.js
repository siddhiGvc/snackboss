const https = require('https');
const crypto = require('crypto');

/**
 * Helper function to generate a signature for the request
 */
const generateSignature = (stringToSign, secretKey) => {
    const hmac = crypto.createHmac('sha384', secretKey);
    hmac.update(stringToSign);
    return hmac.digest('hex');
};

/**
 * Refund API Call
 */
const initiateRefundWithParameters = (
    merchantId,sellerOrderId,storeId,chargeId,amount,reason,accessKey, secretKey
) => {
    const host = "https://amazonpay-sandbox.amazon.in" // Extract host from endpoint
    const timestamp = new Date().toISOString().replace(/[:-]/g, '').replace(/\.\d{3}Z$/, 'Z'); // ISO 8601 format
    const stringToSign = `${amount}INR${storeId}${sellerOrderId}${chargeId}${merchantId}${reason}${reason}${timestamp}`;
    const signature = generateSignature(stringToSign, secretKey);

    const body = JSON.stringify({
        amount: amount,
        currencyCode: 'INR',
        refundId: storeId,
        chargeIdType: sellerOrderId,
        chargeId: chargeId,
        merchantId: merchantId,
        noteToCustomer: reason,
        softDescriptor: reason
    });

    const options = {
        hostname: host,
        path: '/v1/offline/payments/refund',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-amz-client-id': merchantId,
            'x-amz-source': "ios",
            'x-amz-user-ip': "165.232.180.111",
            'x-amz-user-agent': "siddhi",
            'x-amz-algorithm': 'AWS4-HMAC-SHA384',
            'Authorization': `AMZ ${accessKey}:${signature}`,
            'x-amz-date': timestamp,
            'x-amz-expires': 60,
            'Content-Length': Buffer.byteLength(body)
        }
    };

    const req = https.request(options, (res) => {
        let response = '';

        res.on('data', (chunk) => {
            response += chunk;
        });

        res.on('end', () => {
            console.log('Refund API Response:', response);
        });
    });

    req.on('error', (e) => {
        console.error('Error with Refund API:', e.message);
    });

    req.write(body);
    req.end();
};

module.exports = initiateRefundWithParameters;

