const axios = require('axios');
async function sendNotification(data) {
    try 
    {
        
        let config = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: { 
              'Authorization': '', 
              'Content-Type': 'application/json'
            },
            data : data
        };
        let response = await axios(config);
        return response.data;
        
    }
    catch (err) {
        return err;
    }
}
module.exports={ sendNotification }