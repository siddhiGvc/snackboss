const crypto = require('crypto');
const https = require('https');
const url = require('url');

function IpnHandler(payload, callback) {
    const requiredFields = [
        'Message',
        'MessageId',
        'SignatureVersion',
        'Signature',
        'SigningCertURL',
        'Timestamp',
        'TopicArn',
        'Type',
    ];

    // Ensure required fields are present
    for (const field of requiredFields) {
        if (!payload[field]) {
            return callback(new Error(`Missing required field: ${field}`));
        }
    }

    // Validate the SigningCertURL
    const parsedUrl = url.parse(payload.SigningCertURL);
    const isValidCertURL = parsedUrl.protocol === 'https:' &&
        parsedUrl.hostname.endsWith('.amazonaws.com') &&
        parsedUrl.path.endsWith('.pem');

    if (!isValidCertURL) {
        return callback(new Error('Invalid SigningCertURL'));
    }

    // Fetch the certificate
    https.get(payload.SigningCertURL, (res) => {
        let certData = '';

        res.on('data', (chunk) => {
            certData += chunk;
        });

        res.on('end', () => {
            // Verify the Signature
            const verifier = crypto.createVerify('SHA1');
            const signableFields = [
                'Message',
                'MessageId',
                'Subject',
                'SubscribeURL',
                'Timestamp',
                'Token',
                'TopicArn',
                'Type',
            ];

            signableFields.forEach((field) => {
                if (payload[field]) {
                    verifier.update(`${field}\n${payload[field]}\n`);
                }
            });

            const isValidSignature = verifier.verify(certData, payload.Signature, 'base64');
            if (!isValidSignature) {
                return callback(new Error('Signature verification failed'));
            }

            // If valid and it's a notification, parse the message
            if (payload.Type === 'Notification') {
                try {
                    const message = JSON.parse(payload.Message);
                    return callback(null, message);
                } catch (err) {
                    return callback(new Error('Failed to parse Message JSON'));
                }
            } else {
                return callback(null, payload);
            }
        });
    }).on('error', (err) => {
        callback(new Error(`Error fetching SigningCertURL: ${err.message}`));
    });
}

module.exports = IpnHandler;
