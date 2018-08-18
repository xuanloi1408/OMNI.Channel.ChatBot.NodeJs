const request = require('request');
const config = require('../config');
const PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;

const parameterSentGraph = (endpoint, sender_psid, response) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/" + endpoint,
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // Message has been successfully received by Facebook.
            console.log(
                `Successfully sent message to endpoint: `,
                JSON.stringify(body)
            );
        } else {
            console.error(
                `Failed calling Messenger API endpoint`,
                response.statusCode,
                response.statusMessage,
                body.error
            );
        }
    });
}

const getInforCustomerChatWithPage = (_Userid,) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${_Userid}?fields=first_name,last_name,profile_pic&access_token=${config.PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                console.error(
                    `Failed calling Messenger API endpoint`,
                    response.statusCode,
                    response.statusMessage,
                    body.error
                );
                reject(response.statusCode);
            }
        });
    })
}

///<PSID>?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>"

// const result =

module.exports = {
    parameterSentGraph,
    getInforCustomerChatWithPage
}
