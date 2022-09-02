require('dotenv').config()
const axios = require('axios')
const options = {
    method: 'GET',
    url: 'https://service-chat.qontak.com/api/open/v1/templates/whatsapp',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.AUTH_TOKEN }
};

const getWaTemplate = (req, res) => {
    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send(error);
    });
}

module.exports = getWaTemplate